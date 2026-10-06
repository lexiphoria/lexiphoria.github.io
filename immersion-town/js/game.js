/* Immersion Town – trò chơi nhập vai luyện giao tiếp tiếng Anh.
   Nội dung hội thoại nằm trong data/npc-dialogues-v2.json: sửa tệp đó để đổi NPC, câu thoại, từ khoá. */
(() => {
  'use strict';

  const DATA_URL = 'data/npc-dialogues-v2.json';
  const STORE_KEY = 'immersionTown.v2';
  const START_ENERGY = 3;
  const MIN_TYPED_WORDS = 5;    // lượt "typing": câu hoàn chỉnh, có ít nhất 1 từ gợi ý
  const MIN_SPOKEN_WORDS = 4;   // lượt "speaking" (nói hoặc gõ thay)
  const SPEAK_PASS_RATIO = 0.6; // tỉ lệ từ khoá tối thiểu ở lượt nói
  const SHOW_MODEL_AFTER = 2;   // số lần sai trước khi tự hiện câu mẫu

  // Toạ độ (% bản đồ) của từng địa điểm; location_id không có ở đây chỉ hiện trong danh sách.
  const SPOTS = {
    'spot-banyan-ev': { x: 19, y: 25, icon: '🌳' },
    'spot-ocop-cafe': { x: 77, y: 31, icon: '☕' },
    'spot-hoian-tailor': { x: 23, y: 61, icon: '👗' },
    'spot-lantern-workshop': { x: 78, y: 63, icon: '🏮' },
  };

  // Hình đại diện dự phòng khi chưa có ảnh; langs = giọng đọc ưu tiên của Web Speech API.
  const NPC_LOOK = {
    npc_mark: { emoji: '🎒', color: '#1565C0', langs: ['en-US'], pitch: 0.95 },
    npc_emma: { emoji: '📸', color: '#E91E63', langs: ['en-US', 'en-GB'], pitch: 1.1 },
    npc_sarah: { emoji: '🧵', color: '#FBC02D', langs: ['en-GB', 'en-US'], pitch: 1.05 },
    npc_david: { emoji: '🎓', color: '#FF6F00', langs: ['en-AU', 'en-GB', 'en-US'], pitch: 0.9 },
  };
  const DEFAULT_LOOK = { emoji: '🙂', color: '#0f766e', langs: ['en-US'], pitch: 1 };

  const TYPE_LABEL = {
    phrase_builder: 'Ghép cụm từ',
    multiple_choice: 'Chọn đáp án',
    typing: 'Viết câu trả lời',
    speaking: 'Nói',
  };

  const MIC_BLOCKED = 'Micro đang bị chặn. Hãy cho phép dùng micro trong cài đặt trình duyệt rồi chọn "Chuyển sang nói", hoặc gõ câu trả lời bên dưới.';
  const MIC_ERRORS = {
    'unsupported': 'Trình duyệt này chưa hỗ trợ nhận dạng giọng nói (thường gặp ở Firefox và một số iPhone). Bạn hãy gõ câu trả lời, vẫn được tính điểm. Muốn luyện nói, hãy mở trò chơi bằng Chrome hoặc Edge.',
    'not-allowed': MIC_BLOCKED,
    'service-not-allowed': MIC_BLOCKED,
    'audio-capture': 'Không tìm thấy micro trên thiết bị. Bạn hãy gõ câu trả lời bên dưới.',
    'network': 'Không kết nối được dịch vụ nhận dạng giọng nói (cần Internet). Bạn hãy gõ câu trả lời bên dưới.',
    'language-not-supported': 'Thiết bị chưa hỗ trợ nhận dạng tiếng Anh. Bạn hãy gõ câu trả lời bên dưới.',
  };

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canListen = Boolean(SpeechRec) && window.isSecureContext;
  const canSpeak = 'speechSynthesis' in window;

  const $ = (sel) => document.querySelector(sel);

  let npcs = [];
  let progress = loadProgress();
  let combo = 0;
  let preferTyping = false;   // người chơi tự chọn gõ thay vì nói (chỉ giữ trong lần mở trang này)
  let session = null;         // { npc, step, xp, mistakes, voice, typed, result }
  let recognizer = null;
  let currentAudio = null;
  let voices = [];
  const missingFiles = new Set();

  /* ---------- Lưu tiến độ ---------- */

  function defaultProgress() {
    return { energy: START_ENERGY, done: {}, badges: [], unlocks: [], soundOn: true };
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (saved && typeof saved === 'object') return Object.assign(defaultProgress(), saved);
    } catch (e) { /* bộ nhớ trình duyệt bị chặn: vẫn chơi được, chỉ không lưu */ }
    return defaultProgress();
  }

  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) { /* bỏ qua */ }
  }

  function totalXp() {
    return npcs.reduce((sum, n) => sum + ((progress.done[n.id] || {}).xp || 0), 0);
  }

  /* ---------- Tiện ích DOM ---------- */

  function el(tag, props, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'style') node.style.cssText = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const kid of kids.flat()) {
      if (kid != null && kid !== false) node.append(kid);
    }
    return node;
  }

  function shuffled(items) {
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /* ---------- So khớp câu trả lời ---------- */

  function normalize(s) {
    return String(s || '').toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[^a-z0-9'\s]+/g, ' ')
      .replace(/'/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stem(w) {
    if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
    if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
    return w;
  }

  // Khớp từ khoá theo từ (bỏ đuôi -s/-ed/-ing), chấp nhận cả khi máy nghe tách/gộp từ ("Viet QR" = "VietQR").
  function keywordHit(tokens, keyword) {
    const kTokens = normalize(keyword).split(' ').filter(Boolean).map(stem);
    if (!kTokens.length) return false;
    const kJoined = kTokens.join('');
    for (let i = 0; i < tokens.length; i++) {
      if (kTokens.every((t, j) => tokens[i + j] === t)) return true;
      let joined = '';
      for (let j = i; j < Math.min(tokens.length, i + 3); j++) {
        joined += tokens[j];
        if (joined === kJoined) return true;
      }
    }
    return false;
  }

  function scoreKeywords(text, keywords) {
    const norm = normalize(text);
    const tokens = norm ? norm.split(' ').map(stem) : [];
    const hits = keywords.map((k) => keywordHit(tokens, k));
    return { hits, count: hits.filter(Boolean).length, words: tokens.length };
  }

  /* ---------- Âm thanh ---------- */

  function refreshVoices() {
    voices = canSpeak ? speechSynthesis.getVoices() : [];
  }

  function pickVoice(langs) {
    for (const lang of langs) {
      const matches = voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(lang.toLowerCase()));
      if (matches.length) return matches.find((v) => /natural|google|premium|enhanced/i.test(v.name)) || matches[0];
    }
    return voices.find((v) => /^en/i.test(v.lang)) || null;
  }

  function speak(text, look = DEFAULT_LOOK) {
    if (!canSpeak || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(look.langs);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : 'en-US';
    u.rate = 0.92;
    u.pitch = look.pitch;
    speechSynthesis.speak(u);
  }

  // Phát tệp ghi âm nếu có; chưa có tệp (hoặc lỗi) thì đọc bằng giọng máy.
  function playLine(src, text, look) {
    stopAudio();
    if (!src || missingFiles.has(src)) {
      speak(text, look);
      return;
    }
    const audio = new Audio(src);
    currentAudio = audio;
    let handled = false;
    const fallback = () => {
      if (handled) return;
      handled = true;
      missingFiles.add(src);
      if (currentAudio === audio) speak(text, look);
    };
    audio.addEventListener('error', fallback);
    audio.play().catch((err) => {
      if (err && (err.name === 'NotAllowedError' || err.name === 'AbortError')) return;
      fallback();
    });
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (canSpeak) speechSynthesis.cancel();
  }

  /* ---------- Nhận dạng giọng nói ---------- */

  function startListening({ onText, onResult, onFail, onState }) {
    stopAudio();
    let rec;
    try {
      rec = new SpeechRec();
    } catch (e) {
      onFail('unsupported');
      return;
    }
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.continuous = false;

    let finals = null;
    let interim = '';
    let error = null;
    let aborted = false;

    rec.onresult = (e) => {
      const results = Array.from(e.results);
      const last = results[results.length - 1];
      const head = results.slice(0, -1).map((r) => r[0].transcript).join(' ');
      const alts = Array.from(last).map((a) => `${head} ${a.transcript}`.trim());
      if (last.isFinal) finals = alts;
      else interim = alts[0];
      onText(alts[0], !last.isFinal);
    };
    rec.onerror = (e) => { error = e.error || 'unknown'; };
    rec.onend = () => {
      if (recognizer && recognizer.rec === rec) recognizer = null;
      onState(false);
      if (aborted) return;
      if (finals) return onResult(finals);
      if (error && error !== 'no-speech' && error !== 'aborted') return onFail(error);
      if (interim) return onResult([interim]);
      onFail('no-speech');
    };

    recognizer = {
      rec,
      stop: () => rec.stop(),
      abort: () => { aborted = true; rec.abort(); },
    };
    try {
      rec.start();
      onState(true);
    } catch (e) {
      recognizer = null;
      onFail('unsupported');
    }
  }

  function stopListening() {
    if (!recognizer) return;
    const r = recognizer;
    recognizer = null;
    try { r.abort(); } catch (e) { /* đã dừng */ }
  }

  function stopAll() {
    stopListening();
    stopAudio();
  }

  /* ---------- HUD ---------- */

  function renderHud() {
    $('#hud-xp').textContent = totalXp();
    $('#hud-combo').textContent = combo;
    $('#hud-energy').textContent = progress.energy;
    const btn = $('#btn-sound');
    btn.textContent = progress.soundOn ? '🔊' : '🔇';
    btn.setAttribute('aria-pressed', String(progress.soundOn));
  }

  /* ---------- Màn bản đồ ---------- */

  function lookOf(npc) {
    return NPC_LOOK[npc.id] || DEFAULT_LOOK;
  }

  function renderMap() {
    const layer = $('#hotspots');
    const list = $('#spot-list');
    layer.replaceChildren();
    list.replaceChildren();

    npcs.forEach((npc) => {
      const spot = SPOTS[npc.location_id];
      const record = progress.done[npc.id];
      if (spot) {
        layer.append(el('button', {
          class: 'hotspot' + (record ? ' done' : ''),
          type: 'button',
          style: `left:${spot.x}%;top:${spot.y}%`,
          'aria-label': `Gặp ${npc.name} tại ${npc.location_name}`,
          onclick: () => openNpc(npc.id),
        },
        el('span', { class: 'pin', 'aria-hidden': 'true' }, record ? '✓' : '!'),
        el('span', { class: 'pin-label', 'aria-hidden': 'true' }, npc.name)));
      }

      const types = [...new Set(npc.dialogue_flow.map((t) => t.interaction_type))];
      list.append(el('article', { class: 'spot-card' + (record ? ' done' : '') },
        el('div', { class: 'spot-head' },
          el('span', { class: 'spot-icon', 'aria-hidden': 'true' }, (spot && spot.icon) || '📍'),
          el('div', {},
            el('h3', {}, npc.location_name),
            el('p', { class: 'spot-npc' }, `${npc.name} · ${npc.role}`))),
        el('p', { class: 'spot-topic' }, npc.topic),
        el('div', { class: 'chips' }, types.map((t) => el('span', { class: 'chip small' }, TYPE_LABEL[t] || t))),
        el('div', { class: 'spot-foot' },
          el('span', { class: 'status' }, record ? `✓ Đã hoàn thành · ${record.xp} XP` : `${npc.dialogue_flow.length} lượt hội thoại`),
          el('button', { class: 'btn primary', type: 'button', onclick: () => openNpc(npc.id) }, record ? 'Chơi lại' : 'Trò chuyện →'))));
    });
    renderSummary();
  }

  function renderSummary() {
    const box = $('#map-summary');
    const doneCount = npcs.filter((n) => progress.done[n.id]).length;
    box.replaceChildren(el('p', { class: 'summary-line' }, `Đã gặp ${doneCount}/${npcs.length} du khách · ⭐ ${totalXp()} XP`));
    if (npcs.length && doneCount === npcs.length) {
      box.prepend(el('p', { class: 'summary-win' }, '🎉 Bạn đã hoàn thành Immersion Town!'));
    }
    if (progress.badges.length || progress.unlocks.length) {
      box.append(el('div', { class: 'chips' },
        progress.badges.map((b) => el('span', { class: 'chip small badge' }, `🏅 ${b}`)),
        progress.unlocks.map((u) => el('span', { class: 'chip small badge' }, `📚 ${u}`))));
    }
    $('#btn-reset').hidden = !doneCount && progress.energy === START_ENERGY;
  }

  /* ---------- Điều hướng ---------- */

  function showView(name) {
    stopAll();
    $('#view-map').hidden = name !== 'map';
    $('#view-chat').hidden = name !== 'chat';
    if (name === 'map') {
      session = null;
      renderMap();
    }
    window.scrollTo(0, 0);
  }

  function openNpc(id) {
    const npc = npcs.find((n) => n.id === id);
    if (!npc) return;
    session = { npc, step: -1, xp: 0, mistakes: 0, voice: 0, typed: 0, result: null };
    showView('chat');
    renderStep();
  }

  function goStep(step) {
    session.step = step;
    session.mistakes = 0;
    if (step === session.npc.dialogue_flow.length) finishNpc();
    renderStep();
  }

  function renderStep() {
    stopAll();
    const { npc, step } = session;
    const view = $('#view-chat');
    let content;
    if (step < 0) content = renderPrep();
    else if (step < npc.dialogue_flow.length) content = renderTurn();
    else content = renderFinish();
    view.replaceChildren(chatHeader(), content);
    const target = view.querySelector('[data-focus]');
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }

  function chatHeader() {
    const { npc, step } = session;
    const spot = SPOTS[npc.location_id] || {};
    return el('div', { class: 'chat-head' },
      el('button', { class: 'link-btn', type: 'button', onclick: () => showView('map') }, '← Bản đồ'),
      el('div', { class: 'chat-loc' },
        el('span', { class: 'loc-icon', 'aria-hidden': 'true' }, spot.icon || '📍'),
        el('div', {},
          el('h2', { class: 'loc-name' }, npc.location_name),
          el('p', { class: 'loc-topic' }, npc.topic))),
      el('div', { class: 'chat-meta' },
        el('ol', { class: 'steps', 'aria-label': 'Tiến trình hội thoại' },
          npc.dialogue_flow.map((t, i) => el('li', {
            class: i < step ? 'done' : (i === step ? 'now' : ''),
            'aria-label': `Lượt ${i + 1}${i < step ? ' (xong)' : ''}`,
          }, String(i + 1)))),
        el('span', { class: 'session-xp' }, `+${session.xp} XP`)));
  }

  function avatar(npc) {
    const look = lookOf(npc);
    const box = el('div', { class: 'avatar', style: `--npc:${look.color}` });
    const useEmoji = () => box.replaceChildren(el('span', { class: 'avatar-emoji', role: 'img', 'aria-label': npc.name }, look.emoji));
    if (npc.avatar && !missingFiles.has(npc.avatar)) {
      box.append(el('img', {
        src: npc.avatar,
        alt: npc.name,
        onerror: () => { missingFiles.add(npc.avatar); useEmoji(); },
      }));
    } else {
      useEmoji();
    }
    return box;
  }

  /* ---------- Bước chuẩn bị từ vựng ---------- */

  function renderPrep() {
    const { npc } = session;
    const look = lookOf(npc);
    return el('section', { class: 'panel' },
      el('div', { class: 'intro' }, avatar(npc),
        el('div', {},
          el('h3', { class: 'task-title', 'data-focus': true }, `Bạn sắp gặp ${npc.name}`),
          el('p', { class: 'intro-role' }, npc.role))),
      el('p', { class: 'task-hint' }, 'Ôn nhanh các từ sẽ xuất hiện trong cuộc trò chuyện. Chạm 🔊 để nghe phát âm.'),
      el('ul', { class: 'vocab-list' }, (npc.target_vocabulary || []).map((v) => el('li', {},
        el('button', { class: 'icon-btn', type: 'button', 'aria-label': `Nghe "${v.word}"`, onclick: () => speak(v.word, look) }, '🔊'),
        el('div', {},
          el('p', { class: 'vocab-word' }, el('b', { lang: 'en' }, v.word), ' ', el('span', { class: 'phon' }, v.phonetic || ''), ' ', el('em', {}, v.type || '')),
          el('p', { class: 'vocab-mean' }, v.meaning || ''))))),
      el('div', { class: 'actions' },
        el('button', { class: 'btn primary', type: 'button', onclick: () => goStep(0) }, 'Bắt đầu trò chuyện →')));
  }

  /* ---------- Một lượt hội thoại ---------- */

  function renderTurn() {
    const { npc, step } = session;
    const turn = npc.dialogue_flow[step];
    const look = lookOf(npc);
    const termBox = el('div', { class: 'term-box', hidden: true });
    const feedback = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const ctx = { npc, turn, look, feedback, locked: false, body: null };
    ctx.body = buildTask(ctx);

    const replay = () => playLine(turn.audio_file, turn.npc_text, look);
    if (progress.soundOn) {
      const current = session;
      setTimeout(() => { if (session === current && current.step === step) replay(); }, 300);
    }

    return el('div', {},
      el('div', { class: 'npc-row' }, avatar(npc),
        el('div', { class: 'bubble' },
          el('p', { class: 'npc-name' }, npc.name),
          el('p', { class: 'npc-line', lang: 'en' }, highlightTerms(turn.npc_text, turn.highlight_term, termBox, npc)),
          el('button', { class: 'icon-btn replay', type: 'button', 'aria-label': 'Nghe lại lời thoại', onclick: replay }, '🔊'))),
      termBox,
      el('section', { class: 'panel task' },
        el('h3', { class: 'task-title', 'data-focus': true },
          `Lượt ${step + 1}/${npc.dialogue_flow.length} · ${TYPE_LABEL[turn.interaction_type] || turn.interaction_type}`),
        ctx.body,
        feedback));
  }

  // Tô sáng từ trọng tâm; chạm vào để nghe phát âm (nghĩa tiếng Việt để dành cho gợi ý Trà Đá).
  function highlightTerms(text, highlight, termBox, npc) {
    const terms = String(highlight || '').split('&').map((s) => s.trim()).filter(Boolean);
    if (!terms.length) return [text];
    const re = new RegExp(`(${terms.map(escapeRe).join('|')})`, 'gi');
    return text.split(re).map((part, i) => (i % 2
      ? el('button', { class: 'term', type: 'button', onclick: () => showTerm(part, termBox, npc) }, part)
      : part));
  }

  function showTerm(part, box, npc) {
    const look = lookOf(npc);
    const key = normalize(part);
    const v = (npc.target_vocabulary || []).find((x) => {
      const w = normalize(x.word);
      return key.startsWith(w) || w.startsWith(key);
    });
    const word = v ? v.word : part;
    speak(word, look);
    box.hidden = false;
    box.replaceChildren(...[
      el('b', { lang: 'en' }, word),
      v && v.phonetic ? el('span', { class: 'phon' }, v.phonetic) : null,
      v && v.type ? el('em', {}, v.type) : null,
      el('button', { class: 'icon-btn', type: 'button', 'aria-label': `Nghe "${word}"`, onclick: () => speak(word, look) }, '🔊'),
    ].filter(Boolean));
  }

  function buildTask(ctx) {
    switch (ctx.turn.interaction_type) {
      case 'phrase_builder': return buildPhrase(ctx);
      case 'multiple_choice': return buildChoice(ctx);
      case 'typing': return buildTyping(ctx);
      case 'speaking': return buildSpeaking(ctx);
      default:
        return el('div', { class: 'task-body' },
          el('p', { class: 'notice' }, `Dạng tương tác "${ctx.turn.interaction_type}" chưa được hỗ trợ.`),
          el('div', { class: 'actions' },
            el('button', { class: 'btn', type: 'button', onclick: () => goStep(session.step + 1) }, 'Bỏ qua →')));
    }
  }

  function showFeedback(ctx, kind, ...content) {
    const fb = ctx.feedback;
    fb.className = 'feedback';
    void fb.offsetWidth; // chạy lại hiệu ứng rung khi sai liên tiếp
    fb.className = `feedback ${kind}`;
    fb.replaceChildren(...content.filter(Boolean));
  }

  function markMistake(ctx, message, ...extra) {
    session.mistakes += 1;
    combo = 0;
    renderHud();
    showFeedback(ctx, 'bad', el('p', {}, message), ...extra);
  }

  function passTurn(ctx, extras = []) {
    if (ctx.locked) return;
    ctx.locked = true;
    const base = (ctx.turn.reward || {}).xp || 0;
    const firstTry = session.mistakes === 0;
    const gained = firstTry ? base : Math.ceil(base / 2);
    combo = firstTry ? combo + 1 : 0;
    session.xp += gained;
    ctx.body.querySelectorAll('button:not(.keep), textarea').forEach((n) => { n.disabled = true; });

    const isLast = session.step === session.npc.dialogue_flow.length - 1;
    const next = el('button', { class: 'btn primary', type: 'button', onclick: () => goStep(session.step + 1) },
      isLast ? 'Hoàn thành 🎉' : 'Tiếp tục →');
    showFeedback(ctx, 'good',
      el('p', { class: 'fb-title' }, firstTry ? '✅ Chính xác! ' : '✅ Hoàn thành! ', el('b', {}, `+${gained} XP`),
        combo > 1 ? ` · 🔥 Combo x${combo}` : ''),
      ...extras,
      el('div', { class: 'actions' }, next));

    const xpTag = document.querySelector('#view-chat .session-xp');
    if (xpTag) xpTag.textContent = `+${session.xp} XP`;
    renderHud();
    next.focus({ preventScroll: true });
    next.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function modelAnswer(label, text) {
    return el('div', { class: 'model' },
      el('div', {},
        el('p', { class: 'model-label' }, label),
        el('p', { class: 'model-text', lang: 'en' }, text)),
      el('button', { class: 'icon-btn keep', type: 'button', 'aria-label': 'Nghe câu này', onclick: () => speak(text) }, '🔊'));
  }

  /* Dạng 1: ghép cụm từ */
  function buildPhrase(ctx) {
    const blocks = ctx.turn.phrase_blocks || [];
    const answer = ctx.turn.correct_response || blocks.join(' ');
    const target = normalize(answer);
    const items = blocks.map((text, id) => ({ text, id }));
    let bank = shuffled(items);
    for (let tries = 0; blocks.length > 1 && tries < 10 && bank.every((b, i) => b.id === i); tries++) bank = shuffled(items);
    let placed = [];
    let locked = 0; // số cụm đầu đã được xác nhận đúng vị trí

    const slots = el('div', { class: 'slots', 'aria-label': 'Câu trả lời của bạn' });
    const bankEl = el('div', { class: 'bank', 'aria-label': 'Các cụm từ' });
    const check = el('button', { class: 'btn primary', type: 'button', onclick: onCheck }, 'Kiểm tra');

    function draw() {
      slots.replaceChildren(...(placed.length
        ? placed.map((b, i) => el('button', {
          class: 'block placed' + (i < locked ? ' locked' : ''),
          type: 'button',
          lang: 'en',
          disabled: ctx.locked || i < locked,
          onclick: () => { placed.splice(i, 1); bank.push(b); draw(); },
        }, b.text))
        : [el('span', { class: 'slots-empty' }, 'Chạm vào các cụm từ bên dưới theo đúng thứ tự')]));
      bankEl.replaceChildren(...bank.map((b, i) => el('button', {
        class: 'block',
        type: 'button',
        lang: 'en',
        disabled: ctx.locked,
        onclick: () => { bank.splice(i, 1); placed.push(b); draw(); },
      }, b.text)));
      check.disabled = ctx.locked || bank.length > 0;
    }

    function onCheck() {
      if (normalize(placed.map((b) => b.text).join(' ')) === target) {
        passTurn(ctx, [modelAnswer('Câu trả lời của bạn', answer)]);
        draw();
        return;
      }
      // Giữ lại các cụm đầu đã đúng, trả phần còn lại về kho để xếp tiếp.
      let k = 0;
      while (k < placed.length && placed[k].text === blocks[k]) k++;
      locked = k;
      bank = shuffled(bank.concat(placed.splice(k)));
      draw();
      markMistake(ctx, k
        ? `Chưa đúng thứ tự. ${k} cụm đầu đã đúng (màu xanh), hãy xếp tiếp phần còn lại.`
        : 'Chưa đúng thứ tự. Hãy thử lại!');
    }

    draw();
    return el('div', { class: 'task-body' },
      el('p', { class: 'task-hint' }, 'Sắp xếp các cụm từ thành câu trả lời hoàn chỉnh.'),
      slots, bankEl,
      el('div', { class: 'actions' }, check));
  }

  /* Dạng 2: chọn đáp án */
  function buildChoice(ctx) {
    const list = el('div', { class: 'choices' });
    shuffled(ctx.turn.options || []).forEach((opt) => {
      const btn = el('button', {
        class: 'choice',
        type: 'button',
        lang: 'en',
        onclick: () => {
          if (ctx.locked) return;
          if (opt.is_correct) {
            btn.classList.add('right');
            passTurn(ctx, [modelAnswer('Câu trả lời của bạn', opt.text)]);
          } else {
            btn.classList.add('wrong');
            btn.disabled = true;
            markMistake(ctx, 'Câu này chưa đáp ứng điều du khách cần. Chọn lại nhé!');
          }
        },
      }, opt.text);
      list.append(btn);
    });
    return el('div', { class: 'task-body' },
      el('p', { class: 'task-hint' }, 'Chọn câu trả lời phù hợp nhất.'),
      list);
  }

  /* Dạng 3: viết câu trả lời */
  function buildTyping(ctx) {
    const { turn } = ctx;
    const hints = turn.typing_hints || [];
    const helper = turn.helper_prompt;
    const area = el('textarea', {
      class: 'answer', rows: 3, lang: 'en', spellcheck: 'true', autocapitalize: 'sentences',
      placeholder: 'Viết câu trả lời bằng tiếng Anh…', 'aria-label': 'Câu trả lời của bạn',
    });
    const chipEls = hints.map((h) => el('button', {
      class: 'chip', type: 'button', lang: 'en', title: 'Chèn vào câu trả lời',
      onclick: () => insertAtCursor(area, h),
    }, h));
    const helperBox = el('div', { class: 'helper', hidden: true });
    const sampleBox = el('div', { hidden: true }, modelAnswer('Câu mẫu tham khảo', turn.sample_correct_response));
    const check = el('button', { class: 'btn primary', type: 'button', disabled: true, onclick: onCheck }, 'Kiểm tra');

    let helperBtn = null;
    if (helper) {
      const cost = helper.energy_cost ?? 1;
      const enough = progress.energy >= cost;
      helperBtn = el('button', {
        class: 'btn ghost', type: 'button', disabled: !enough,
        onclick: () => {
          if (progress.energy < cost) return;
          progress.energy -= cost;
          saveProgress();
          renderHud();
          helperBox.replaceChildren(el('p', {}, '🍵 ', el('b', { lang: 'en' }, helper.term), `: ${helper.definition}`));
          helperBox.hidden = false;
          helperBtn.remove();
        },
      }, enough ? `🍵 Gợi ý nghĩa (−${cost} Trà Đá)` : '🍵 Hết Trà Đá');
    }

    area.addEventListener('input', () => {
      check.disabled = !area.value.trim();
      const { hits } = scoreKeywords(area.value, hints);
      chipEls.forEach((c, i) => c.classList.toggle('hit', hits[i]));
    });

    function onCheck() {
      const r = scoreKeywords(area.value, hints);
      if (r.words < MIN_TYPED_WORDS) {
        showFeedback(ctx, 'warn', el('p', {}, `Câu trả lời hơi ngắn. Hãy viết một câu hoàn chỉnh (ít nhất ${MIN_TYPED_WORDS} từ).`));
        return;
      }
      if (hints.length && !r.count) {
        markMistake(ctx, `Hãy dùng ít nhất 1 từ gợi ý: ${hints.join(', ')}.`);
        if (session.mistakes >= SHOW_MODEL_AFTER) sampleBox.hidden = false;
        return;
      }
      sampleBox.remove();
      passTurn(ctx, [modelAnswer('Câu mẫu tham khảo', turn.sample_correct_response)]);
    }

    return el('div', { class: 'task-body' },
      el('p', { class: 'task-hint' }, 'Viết câu trả lời của bạn. Nên dùng ít nhất 1 từ gợi ý (chạm để chèn):'),
      el('div', { class: 'chips' }, chipEls),
      helperBtn ? el('div', { class: 'row' }, helperBtn) : null,
      helperBox,
      area,
      sampleBox,
      el('div', { class: 'actions' }, check));
  }

  function insertAtCursor(area, text) {
    const start = area.selectionStart ?? area.value.length;
    const end = area.selectionEnd ?? start;
    const before = area.value.slice(0, start);
    const after = area.value.slice(end);
    const pad = before && !/\s$/.test(before) ? ' ' : '';
    area.value = `${before}${pad}${text} ${after.replace(/^\s+/, '')}`;
    const pos = before.length + pad.length + text.length + 1;
    area.focus();
    area.setSelectionRange(pos, pos);
    area.dispatchEvent(new Event('input'));
  }

  /* Dạng 4: nói, có phương án gõ câu trả lời thay thế */
  function buildSpeaking(ctx) {
    const { turn, npc } = ctx;
    const keywords = turn.expected_keywords || [];
    const need = Math.max(1, Math.ceil(keywords.length * SPEAK_PASS_RATIO));
    const chipEls = keywords.map((k) => el('span', { class: 'chip', lang: 'en' }, k));
    const model = el('div', { hidden: true }, modelAnswer('Câu mẫu', turn.target_speech));
    const showModelBtn = el('button', {
      class: 'btn ghost', type: 'button',
      onclick: () => revealModel(),
    }, '👁 Xem câu mẫu');
    const modeBox = el('div', { class: 'mode-box' });
    const hint = el('p', { class: 'task-hint' });

    function revealModel() {
      model.hidden = false;
      showModelBtn.remove();
    }

    function paintHits(hits) {
      chipEls.forEach((c, i) => c.classList.toggle('hit', Boolean(hits[i])));
    }

    function evaluate(text, mode) {
      const r = scoreKeywords(text, keywords);
      paintHits(r.hits);
      if (r.count >= need && r.words >= MIN_SPOKEN_WORDS) {
        session[mode] += 1;
        model.remove();
        passTurn(ctx, [
          mode === 'typed' ? el('p', {}, '⌨️ Bạn đã gõ thay vì nói ở lượt này. Lần sau hãy thử nói nhé!') : null,
          modelAnswer('Câu mẫu', turn.target_speech),
        ].filter(Boolean));
        return;
      }
      const missing = keywords.filter((k, i) => !r.hits[i]);
      const msg = r.count >= need
        ? `Câu trả lời hơi ngắn. Hãy nói/viết thành câu hoàn chỉnh (ít nhất ${MIN_SPOKEN_WORDS} từ).`
        : `Mới có ${r.count}/${need} từ khoá cần thiết. Còn thiếu: ${missing.join(', ')}.`;
      const extra = [];
      if (session.mistakes + 1 >= SHOW_MODEL_AFTER) {
        revealModel();
        if (mode === 'voice') {
          extra.push(el('button', { class: 'link-btn', type: 'button', onclick: () => useTyping() }, '⌨️ Khó nói? Gõ câu trả lời'));
        }
      }
      markMistake(ctx, msg, ...extra);
    }

    function useTyping(reason) {
      preferTyping = Boolean(canListen);
      renderText(reason);
      const area = modeBox.querySelector('textarea');
      if (area && !reason) area.focus();
    }

    function useVoice() {
      preferTyping = false;
      renderVoice();
    }

    function renderVoice() {
      hint.textContent = `Trả lời ${npc.name} bằng giọng nói. Câu trả lời cần có ít nhất ${need}/${keywords.length} từ khoá:`;
      const transcript = el('p', { class: 'transcript', 'aria-live': 'polite' });
      const mic = el('button', { class: 'mic', type: 'button' }, '🎙️ Nhấn để nói');
      const setListening = (on) => {
        mic.classList.toggle('listening', on);
        mic.textContent = on ? '⏹ Đang nghe… nhấn để dừng' : '🎙️ Nhấn để nói';
      };
      mic.addEventListener('click', () => {
        if (ctx.locked) return;
        if (recognizer) {
          recognizer.stop();
          return;
        }
        transcript.textContent = '';
        startListening({
          onState: setListening,
          onText: (text, isInterim) => {
            transcript.className = 'transcript' + (isInterim ? ' interim' : '');
            transcript.textContent = `Bạn nói: “${text}”`;
          },
          onResult: (alts) => {
            const best = alts.reduce((a, b) => (scoreKeywords(b, keywords).count > scoreKeywords(a, keywords).count ? b : a));
            transcript.className = 'transcript';
            transcript.textContent = `Bạn nói: “${best}”`;
            evaluate(best, 'voice');
          },
          onFail: (code) => {
            if (code === 'no-speech') {
              transcript.className = 'transcript';
              transcript.textContent = 'Chưa nghe thấy giọng nói. Nhấn 🎙️ rồi nói lại, hoặc gõ câu trả lời.';
              return;
            }
            useTyping(MIC_ERRORS[code] || `Nhận dạng giọng nói gặp lỗi (${code}). Bạn hãy gõ câu trả lời bên dưới.`);
          },
        });
      });
      modeBox.replaceChildren(mic, transcript,
        el('button', { class: 'link-btn', type: 'button', onclick: () => useTyping() }, '⌨️ Không nói được? Gõ câu trả lời'));
    }

    function renderText(reason) {
      stopListening();
      hint.textContent = `Gõ câu bạn muốn nói với ${npc.name}. Câu trả lời cần có ít nhất ${need}/${keywords.length} từ khoá:`;
      const area = el('textarea', {
        class: 'answer', rows: 3, lang: 'en', spellcheck: 'true', autocapitalize: 'sentences',
        placeholder: 'Gõ câu trả lời bằng tiếng Anh…', 'aria-label': 'Câu trả lời của bạn',
      });
      const check = el('button', { class: 'btn primary', type: 'button', disabled: true, onclick: () => evaluate(area.value, 'typed') }, 'Kiểm tra');
      area.addEventListener('input', () => {
        check.disabled = !area.value.trim();
        paintHits(scoreKeywords(area.value, keywords).hits);
      });
      modeBox.replaceChildren(...[
        reason ? el('p', { class: 'notice' }, reason) : null,
        area,
        el('div', { class: 'actions' }, check),
        canListen ? el('button', { class: 'link-btn', type: 'button', onclick: useVoice }, '🎙️ Chuyển sang nói') : null,
      ].filter(Boolean));
    }

    if (!canListen) renderText(MIC_ERRORS.unsupported);
    else if (preferTyping) renderText();
    else renderVoice();

    return el('div', { class: 'task-body' },
      hint,
      el('div', { class: 'chips' }, chipEls),
      el('div', { class: 'row' },
        el('button', { class: 'btn ghost keep', type: 'button', onclick: () => speak(turn.target_speech) }, '🔊 Nghe câu mẫu'),
        showModelBtn),
      model,
      modeBox);
  }

  /* ---------- Kết thúc một du khách ---------- */

  function finishNpc() {
    const { npc } = session;
    const prev = progress.done[npc.id];
    const result = { badges: [], unlocks: [], tea: 0, prevXp: prev ? prev.xp : null };
    npc.dialogue_flow.forEach((t) => {
      const reward = t.reward || {};
      if (reward.badge_unlock) result.badges.push(reward.badge_unlock);
      if (reward.vocab_unlock) result.unlocks.push(reward.vocab_unlock);
      result.tea += reward.tea_helper_bonus || 0;
    });
    if (prev) result.tea = 0; // Trà Đá thưởng chỉ nhận ở lần hoàn thành đầu tiên
    progress.energy += result.tea;
    result.badges.forEach((b) => { if (!progress.badges.includes(b)) progress.badges.push(b); });
    result.unlocks.forEach((u) => { if (!progress.unlocks.includes(u)) progress.unlocks.push(u); });
    progress.done[npc.id] = {
      xp: Math.max(prev ? prev.xp : 0, session.xp),
      voice: session.voice,
      typed: session.typed,
    };
    session.result = result;
    saveProgress();
    renderHud();
  }

  function renderFinish() {
    const { npc, result } = session;
    const next = npcs.find((n) => !progress.done[n.id]);
    const items = [el('li', {}, `⭐ +${session.xp} XP`,
      result.prevXp != null ? ` (kỷ lục: ${Math.max(result.prevXp, session.xp)} XP)` : '')];
    result.badges.forEach((b) => items.push(el('li', {}, `🏅 Huy hiệu: ${b}`)));
    result.unlocks.forEach((u) => items.push(el('li', {}, `📚 Mở khoá: ${u}`)));
    if (result.tea) items.push(el('li', {}, `🍵 +${result.tea} Trà Đá`));
    if (session.voice + session.typed) {
      items.push(el('li', {}, `🎙️ Nói: ${session.voice} lượt · ⌨️ Gõ thay: ${session.typed} lượt`));
    }
    if (!next) items.push(el('li', {}, '🎉 Bạn đã gặp tất cả du khách trong Immersion Town!'));

    return el('section', { class: 'panel finish' },
      avatar(npc),
      el('h3', { class: 'finish-title', 'data-focus': true }, `Hoàn thành cuộc trò chuyện với ${npc.name}!`),
      el('ul', { class: 'reward-list' }, items),
      el('div', { class: 'actions' },
        next ? el('button', { class: 'btn primary', type: 'button', onclick: () => openNpc(next.id) }, `Gặp ${next.name} →`) : null,
        el('button', { class: 'btn', type: 'button', onclick: () => showView('map') }, 'Về bản đồ')));
  }

  /* ---------- Khởi động ---------- */

  async function loadData() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      npcs = (json.npcs || []).filter((n) => Array.isArray(n.dialogue_flow) && n.dialogue_flow.length);
      if (!npcs.length) throw new Error('tệp dữ liệu không có NPC nào');
      renderHud();
      renderMap();
    } catch (err) {
      $('#map-summary').replaceChildren(el('p', { class: 'notice error' },
        `Không tải được dữ liệu trò chơi (${err.message}). `,
        location.protocol === 'file:'
          ? 'Bạn đang mở tệp trực tiếp trên máy; hãy mở qua máy chủ web (GitHub Pages hoặc localhost).'
          : 'Hãy tải lại trang.'));
    }
  }

  function init() {
    if (canSpeak) {
      refreshVoices();
      speechSynthesis.onvoiceschanged = refreshVoices;
    }
    $('#btn-sound').addEventListener('click', () => {
      progress.soundOn = !progress.soundOn;
      if (!progress.soundOn) stopAudio();
      saveProgress();
      renderHud();
    });
    $('#btn-reset').addEventListener('click', () => {
      if (!window.confirm('Xoá toàn bộ tiến độ (XP, huy hiệu, Trà Đá) để chơi lại từ đầu?')) return;
      progress = Object.assign(defaultProgress(), { soundOn: progress.soundOn });
      combo = 0;
      saveProgress();
      renderHud();
      renderMap();
    });
    window.addEventListener('pagehide', stopAll);
    renderHud();
    loadData();
  }

  init();
})();
