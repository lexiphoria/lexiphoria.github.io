/* Immersion Town – giao diện: hội thoại kiểu L2 Speak, Poke & Prod, Phrase Translator, Booklets,
   sổ từ thích ứng, đấu Boss và hồ sơ Local Host. Nội dung lấy từ thư mục data/. */
(() => {
  'use strict';

  const IT = window.IT;
  const W = IT.world;
  const C = IT.core;
  const { store } = C;
  const d = () => store.data;
  const $ = (sel) => document.querySelector(sel);

  const PLAYER_BASE = { skin: '#f1c27d', hair: '#2b2b2b', style: 'short' };
  const MIN_TYPED_WORDS = 5;
  const MIN_SPOKEN_WORDS = 4;
  const SPEAK_PASS_RATIO = 0.6;
  const SHOW_MODEL_AFTER = 2;
  const BATTERY_PACK = 2;
  const SOLAR_COOLDOWN = 3 * 60 * 1000;
  const MAP_LABEL = { day: 'Phố cổ (ban ngày)', night: 'Phố Lồng Đèn & bến sông (đêm)' };
  const TYPE_LABEL = {
    phrase_builder: 'Ghép cụm từ',
    multiple_choice: 'Chọn câu trả lời',
    typing: 'Viết câu trả lời',
    speaking: 'Nói',
  };
  const MIC_BLOCKED = 'Micro đang bị chặn. Hãy cho phép dùng micro trong cài đặt trình duyệt rồi chọn "Chuyển sang nói", hoặc gõ câu trả lời bên dưới.';
  const MIC_ERRORS = {
    'unsupported': 'Trình duyệt này chưa hỗ trợ nhận dạng giọng nói (thường gặp ở Firefox và một số iPhone). Bạn hãy gõ câu trả lời, vẫn được tính điểm. Muốn luyện nói, hãy mở bằng Chrome hoặc Edge.',
    'not-allowed': MIC_BLOCKED,
    'service-not-allowed': MIC_BLOCKED,
    'audio-capture': 'Không tìm thấy micro trên thiết bị. Bạn hãy gõ câu trả lời bên dưới.',
    'network': 'Không kết nối được dịch vụ nhận dạng giọng nói (cần Internet). Bạn hãy gõ câu trả lời bên dưới.',
    'language-not-supported': 'Thiết bị chưa hỗ trợ nhận dạng tiếng Anh. Bạn hãy gõ câu trả lời bên dưới.',
  };

  let LEX = {};
  let LEX_LIST = [];
  let LEX_MATCH = [];
  let DATA = null;
  let BOOKLETS = [];
  let BANK = null;
  let engine = null;
  let quest = null;
  let battle = null;
  let preferTyping = false;

  /* ---------- Tiện ích ---------- */

  function el(tag, props, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'style') node.style.cssText = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) node.append(kid);
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

  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const save = () => store.save();
  const questsDone = () => DATA.quests.filter((q) => (d().quests[q.id] || {}).done).length;
  const bookletCount = () => BOOKLETS.filter((b) => d().collected[b.id]).length;
  const outfitById = (id) => DATA.outfits.find((o) => o.id === id);
  const charOf = (id) => DATA.characters[id];
  const voiceOf = (ch) => ({ langs: (ch && ch.voice) || ['en-US', 'en-GB'], pitch: (ch && ch.pitch) || 1 });
  const questByNpc = (id) => DATA.quests.find((q) => q.npc === id || q.turns.some((t) => t.speaker === id));

  function toast(text) {
    const box = $('#toasts');
    const t = el('div', { class: 'toast' }, text);
    box.append(t);
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3100);
  }

  function addXp(n, why) {
    if (!n) return;
    d().xp += n;
    save();
    renderHud();
    toast(`⭐ +${n} XP${why ? ` · ${why}` : ''}`);
  }

  function setPaused(on) {
    if (!engine) return;
    engine.paused = on;
    engine.keyDir = null;
    if (on) {
      engine.player.path = [];
      engine.player.onArrive = null;
    }
  }

  function avatarCanvas(look, size = 64) {
    const c = el('canvas', { class: 'avatar-canvas', width: 32, height: 44, style: `width:${size * 0.727}px;height:${size}px` });
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    W.drawPerson(ctx, 16, 43, look, 'down', 0);
    return c;
  }

  function playerLook(outfitId) {
    const o = outfitById(outfitId || d().outfit) || DATA.outfits[0];
    return { ...PLAYER_BASE, ...o.look };
  }

  /* ---------- HUD ---------- */

  function renderHud() {
    $('#hud-xp').textContent = d().xp;
    $('#hud-battery').textContent = `${d().battery}/${store.BATTERY_MAX}`;
    $('#hud-booklets').textContent = `${bookletCount()}/${BOOKLETS.length}`;
    const sound = $('#btn-sound');
    sound.textContent = d().soundOn ? '🔊' : '🔇';
    sound.setAttribute('aria-pressed', String(d().soundOn));
    const labels = $('#btn-labels');
    labels.setAttribute('aria-pressed', String(d().labels));
    labels.classList.toggle('on', d().labels);
    const open = DATA ? DATA.bosses.filter((b) => questsDone() >= b.unlock_quests).length : 0;
    $('#btn-boss .badge').textContent = open ? String(open) : '';
  }

  function showBanner(map) {
    const b = $('#map-banner');
    b.replaceChildren(el('b', {}, map.name), el('span', {}, map.subtitle));
    b.classList.remove('show');
    void b.offsetWidth;
    b.classList.add('show');
  }

  /* ---------- Poke & Prod: thẻ từ ---------- */

  function closeWordCard() {
    $('#word-card').hidden = true;
  }

  function openWordCard(id, opts = {}) {
    const w = LEX[id];
    if (!w) return;
    const rec = store.word(id);
    const known = store.wordState(id) === 'known';
    const card = $('#word-card');
    const meaning = el('p', { class: 'wc-vi', hidden: known }, w.vi);
    const reveal = known
      ? el('button', { class: 'link-btn', type: 'button', onclick: () => { meaning.hidden = false; reveal.remove(); } }, '👁 Hiện nghĩa (từ đã biết)')
      : null;
    const tag = (status) => {
      store.tagWord(id, status);
      save();
      closeWordCard();
      toast(status === 'known' ? `✅ "${w.word}": Known, lần sau sẽ hiện màu xanh và ẩn nghĩa` : `❓ "${w.word}": Unknown, đã thêm vào danh sách ưu tiên`);
    };
    let extra = null;
    if (opts.recharge) {
      const wait = d().solarAt + SOLAR_COOLDOWN - Date.now();
      const full = d().battery >= store.BATTERY_MAX;
      extra = el('div', { class: 'wc-extra' },
        el('button', {
          class: 'btn primary small', type: 'button', disabled: wait > 0 || full,
          onclick: () => {
            store.addBattery(1);
            d().solarAt = Date.now();
            save();
            renderHud();
            closeWordCard();
            toast('⚡ Sạc năng lượng mặt trời: +1 pin');
          },
        }, full ? '🔋 Pin đã đầy' : wait > 0 ? `⚡ Sạc lại sau ${Math.ceil(wait / 60000)} phút` : '⚡ Sạc 1 pin'));
    }
    card.replaceChildren(...[
      el('button', { class: 'wc-close', type: 'button', 'aria-label': 'Đóng', onclick: closeWordCard }, '✕'),
      el('div', { class: 'wc-head' },
        el('button', { class: 'icon-btn', type: 'button', 'aria-label': `Nghe "${w.word}"`, onclick: () => C.speak(w.word) }, '🔊'),
        el('div', {},
          el('p', { class: 'wc-word', lang: 'en' }, w.word),
          el('p', { class: 'wc-phon' }, w.phonetic, ' ', el('em', {}, w.type)))),
      meaning,
      reveal,
      el('div', { class: 'wc-ex' },
        el('p', { lang: 'en' }, w.example, ' ', el('button', { class: 'mini-btn', type: 'button', 'aria-label': 'Nghe câu ví dụ', onclick: () => C.speak(w.example) }, '🔊')),
        known ? null : el('p', { class: 'wc-ex-vi' }, w.example_vi)),
      el('p', { class: 'wc-meta' }, `Đã gặp ${rec.seen} lần · Gắn Unknown ${rec.unk} lần`),
      el('div', { class: 'wc-actions' },
        el('button', { class: 'btn tag-unknown' + (rec.status === 'unknown' ? ' active' : ''), type: 'button', onclick: () => tag('unknown') }, '❓ Unknown'),
        el('button', { class: 'btn tag-known' + (rec.status === 'known' ? ' active' : ''), type: 'button', onclick: () => tag('known') }, '✅ Known')),
      extra,
    ].filter(Boolean));
    card.hidden = false;
    if (d().soundOn) C.speak(w.word);
  }

  function pokeWord(id) {
    const firstEver = !d().words[id];
    store.pokeWord(id);
    save();
    if (firstEver) addXp(2, 'khám phá từ mới');
    openWordCard(id);
  }

  /* ---------- Thu thập ---------- */

  function onCollect(item) {
    if (item.type === 'battery') {
      if (d().battery >= store.BATTERY_MAX) {
        toast('🔋 Pin đang đầy. Dùng máy dịch câu rồi quay lại nhặt nhé.');
        return;
      }
      const got = store.addBattery(BATTERY_PACK);
      d().collected[item.id] = true;
      d().stats.packs += 1;
      save();
      renderHud();
      toast(`🔋 Nhặt được Battery Pack: +${got} pin cho máy dịch câu`);
      return;
    }
    d().collected[item.id] = true;
    save();
    renderHud();
    toast('📘 Bạn tìm thấy một Booklet ngữ pháp!');
    openBooklet(item.id);
  }

  /* ---------- Hội thoại kiểu L2 Speak ---------- */

  function wordButton(id, text) {
    const state = store.wordState(id);
    return el('button', {
      class: `term ${state === 'known' ? 'k' : state === 'unknown' ? 'u' : 'n'}`,
      type: 'button',
      onclick: () => pokeWord(id),
    }, text);
  }

  // Tô sáng các từ có trong từ điển; từ Known màu xanh, Unknown màu cam
  function tokenize(text) {
    const re = /[A-Za-zÀ-ỹ0-9]+(?:['’][A-Za-z]+)?/g;
    const words = [];
    let m;
    while ((m = re.exec(text))) words.push({ s: m.index, e: m.index + m[0].length, stem: C.stem(C.normalize(m[0])) });
    const out = [];
    const seen = new Set();
    let pos = 0;
    for (let i = 0; i < words.length;) {
      const hit = LEX_MATCH.find((entry) => i + entry.stems.length <= words.length && entry.stems.every((st, j) => words[i + j].stem === st));
      if (!hit) {
        i += 1;
        continue;
      }
      const s = words[i].s;
      const e = words[i + hit.stems.length - 1].e;
      if (s > pos) out.push(text.slice(pos, s));
      out.push(wordButton(hit.id, text.slice(s, e)));
      seen.add(hit.id);
      pos = e;
      i += hit.stems.length;
    }
    if (pos < text.length) out.push(text.slice(pos));
    seen.forEach((id) => store.seeWord(id));
    return out;
  }

  function dialog(nameTag, role, ...body) {
    const box = $('#dialog');
    box.replaceChildren(
      el('div', { class: 'dlg-tag' }, nameTag, role ? el('span', { class: 'dlg-role' }, role) : null),
      el('button', { class: 'dlg-close', type: 'button', 'aria-label': 'Đóng hội thoại', onclick: closeQuest }, '✕'),
      el('div', { class: 'dlg-body' }, ...body));
    box.hidden = false;
    if (window.matchMedia('(max-width: 720px)').matches) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function openQuest(q) {
    closeWordCard();
    C.stopListening();
    C.stopAudio();
    quest = { q, step: -1, mistakes: 0, xp: 0, voice: 0, typed: 0, firstTry: 0, replay: Boolean((d().quests[q.id] || {}).done) };
    setPaused(true);
    renderQuest();
  }

  function closeQuest() {
    C.stopListening();
    C.stopAudio();
    $('#dialog').hidden = true;
    quest = null;
    setPaused(Boolean(!$('#sheet').hidden));
  }

  function goStep(step) {
    quest.step = step;
    quest.mistakes = 0;
    if (step === quest.q.turns.length) finishQuest();
    else renderQuest();
  }

  function renderQuest() {
    C.stopListening();
    C.stopAudio();
    if (quest.step < 0) renderBrief();
    else renderTurn();
  }

  function renderBrief() {
    const { q } = quest;
    const vocab = (q.target_vocabulary || []).filter((id) => LEX[id]);
    const todo = vocab.filter((id) => store.wordState(id) !== 'known').sort((a, b) => store.priority(b) - store.priority(a));
    const known = vocab.filter((id) => store.wordState(id) === 'known');
    dialog('🎯 Nhiệm vụ Local Host', MAP_LABEL[q.map],
      el('h3', { class: 'dlg-title' }, `${q.icon} ${q.title}`, el('small', { lang: 'en' }, q.title_en)),
      el('p', {}, q.mission),
      el('ul', { class: 'objectives' }, q.objectives.map((o) => el('li', {}, o))),
      todo.length
        ? el('div', { class: 'prep' },
          el('p', { class: 'prep-title' }, '📌 Từ nên ôn trước (xếp theo mức ưu tiên của bạn):'),
          el('div', { class: 'chips' }, todo.map((id) => wordButton(id, LEX[id].word))))
        : null,
      known.length ? el('p', { class: 'muted' }, `✓ Bạn đã biết: ${known.map((id) => LEX[id].word).join(', ')}`) : null,
      quest.replay ? el('p', { class: 'notice' }, 'Bạn đã hoàn thành nhiệm vụ này. Chơi lại để luyện tập (không cộng thêm XP).') : null,
      el('div', { class: 'actions' },
        el('button', { class: 'btn primary', type: 'button', onclick: () => goStep(0) }, 'Bắt đầu ➜'),
        el('button', { class: 'btn', type: 'button', onclick: closeQuest }, 'Để sau')));
  }

  function renderTurn() {
    const { q, step } = quest;
    const turn = q.turns[step];
    const ch = charOf(turn.speaker) || { name: turn.speaker, lang: 'en' };
    const isVi = ch.lang === 'vi';
    const trans = el('p', { class: 'dlg-trans', hidden: true });
    const replay = () => (isVi ? C.speak(turn.text, { langs: ['vi-VN', 'vi'] }) : C.playLine(turn.audio_file, turn.text, voiceOf(ch)));
    let translateBtn = null;
    if (!isVi && turn.vi) {
      translateBtn = el('button', {
        class: 'tool-btn', type: 'button', disabled: d().battery < 1,
        title: 'Phrase Translator: dịch cả câu, tốn 1 pin',
        onclick: () => {
          if (d().battery < 1) return;
          d().battery -= 1;
          d().stats.translations += 1;
          save();
          renderHud();
          trans.textContent = `🇻🇳 ${turn.vi}`;
          trans.hidden = false;
          translateBtn.disabled = true;
          translateBtn.textContent = '🔋 Đã dịch';
          C.speak(turn.text, { ...voiceOf(ch), rate: 0.78 });
        },
      }, d().battery < 1 ? '🪫 Hết pin dịch' : `🔋 Dịch câu (−1 · còn ${d().battery})`);
    }
    if (!isVi) d().stats.linesSeen += 1;
    const feedback = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const ctx = { turn, ch, feedback, locked: false, body: null };
    ctx.body = buildTask(ctx);
    save();

    dialog(ch.name, ch.role,
      el('p', { class: 'dlg-step' }, `Lượt ${step + 1}/${q.turns.length} · ${TYPE_LABEL[turn.interaction_type] || turn.interaction_type}`),
      el('p', { class: 'dlg-text' + (isVi ? ' vi' : ''), lang: isVi ? 'vi' : 'en' }, isVi ? `“${turn.text}”` : tokenize(turn.text)),
      trans,
      el('div', { class: 'dlg-tools' },
        translateBtn,
        el('button', { class: 'tool-btn', type: 'button', onclick: replay }, '🔊 Nghe lại')),
      turn.prompt ? el('p', { class: 'dlg-prompt' }, `🗣️ ${turn.prompt}`) : null,
      ctx.body,
      feedback);
    if (d().soundOn) {
      const current = quest;
      setTimeout(() => { if (quest === current && current.step === step) replay(); }, 250);
    }
  }

  function buildTask(ctx) {
    switch (ctx.turn.interaction_type) {
      case 'phrase_builder': return buildPhrase(ctx);
      case 'multiple_choice': return buildChoice(ctx);
      case 'typing': return buildTyping(ctx);
      case 'speaking': return buildSpeaking(ctx);
      default:
        return el('div', { class: 'task' },
          el('p', { class: 'notice' }, `Dạng tương tác "${ctx.turn.interaction_type}" chưa được hỗ trợ.`),
          el('div', { class: 'actions' }, el('button', { class: 'btn', type: 'button', onclick: () => goStep(quest.step + 1) }, 'Bỏ qua ➜')));
    }
  }

  function showFeedback(ctx, kind, ...content) {
    const fb = ctx.feedback;
    fb.className = 'feedback';
    void fb.offsetWidth;
    fb.className = `feedback ${kind}`;
    fb.replaceChildren(...content.filter(Boolean));
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function markMistake(ctx, message, ...extra) {
    quest.mistakes += 1;
    showFeedback(ctx, 'bad', el('p', {}, message), ...extra);
  }

  function passTurn(ctx, extras = []) {
    if (ctx.locked) return;
    ctx.locked = true;
    const base = (ctx.turn.reward || {}).xp || 0;
    const firstTry = quest.mistakes === 0;
    const gained = quest.replay ? 0 : firstTry ? base : Math.ceil(base / 2);
    quest.xp += gained;
    d().xp += gained;
    d().stats[firstTry ? 'firstTry' : 'retries'] += 1;
    if (firstTry) quest.firstTry += 1;
    save();
    renderHud();
    ctx.body.querySelectorAll('button:not(.keep), textarea').forEach((n) => { n.disabled = true; });
    const isLast = quest.step === quest.q.turns.length - 1;
    const next = el('button', { class: 'dlg-next', type: 'button', 'aria-label': isLast ? 'Hoàn thành nhiệm vụ' : 'Lượt tiếp theo', onclick: () => goStep(quest.step + 1) }, isLast ? '🎉' : '➜');
    showFeedback(ctx, 'good',
      el('p', { class: 'fb-title' }, firstTry ? '✅ Chính xác! ' : '✅ Hoàn thành! ', el('b', {}, quest.replay ? '(luyện tập)' : `+${gained} XP`)),
      ...extras,
      el('div', { class: 'next-row' }, next));
    next.focus({ preventScroll: true });
  }

  function modelAnswer(label, text) {
    return el('div', { class: 'model' },
      el('div', {},
        el('p', { class: 'model-label' }, label),
        el('p', { class: 'model-text', lang: 'en' }, tokenize(text))),
      el('button', { class: 'icon-btn keep', type: 'button', 'aria-label': 'Nghe câu này', onclick: () => C.speak(text) }, '🔊'));
  }

  /* Ghép cụm từ */
  function buildPhrase(ctx) {
    const blocks = ctx.turn.phrase_blocks || [];
    const answer = ctx.turn.correct_response || blocks.join(' ');
    const target = C.normalize(answer);
    const items = blocks.map((text, id) => ({ text, id }));
    let bank = shuffled(items);
    for (let k = 0; blocks.length > 1 && k < 10 && bank.every((b, i) => b.id === i); k++) bank = shuffled(items);
    let placed = [];
    let locked = 0;
    const slots = el('div', { class: 'slots', 'aria-label': 'Câu trả lời của bạn' });
    const bankEl = el('div', { class: 'bank', 'aria-label': 'Các cụm từ' });
    const check = el('button', { class: 'btn primary', type: 'button', onclick: onCheck }, 'Kiểm tra');

    function draw() {
      slots.replaceChildren(...(placed.length
        ? placed.map((b, i) => el('button', {
          class: 'block placed' + (i < locked ? ' locked' : ''), type: 'button', lang: 'en',
          disabled: ctx.locked || i < locked,
          onclick: () => { placed.splice(i, 1); bank.push(b); draw(); },
        }, b.text))
        : [el('span', { class: 'slots-empty' }, 'Chạm các cụm từ bên dưới theo đúng thứ tự')]));
      bankEl.replaceChildren(...bank.map((b, i) => el('button', {
        class: 'block', type: 'button', lang: 'en', disabled: ctx.locked,
        onclick: () => { bank.splice(i, 1); placed.push(b); draw(); },
      }, b.text)));
      check.disabled = ctx.locked || bank.length > 0;
    }

    function onCheck() {
      if (C.normalize(placed.map((b) => b.text).join(' ')) === target) {
        passTurn(ctx, [modelAnswer('Câu trả lời của bạn', answer)]);
        draw();
        return;
      }
      let k = 0;
      while (k < placed.length && placed[k].text === blocks[k]) k++;
      locked = k;
      bank = shuffled(bank.concat(placed.splice(k)));
      draw();
      markMistake(ctx, k ? `Chưa đúng thứ tự. ${k} cụm đầu đã đúng (màu xanh), hãy xếp tiếp phần còn lại.` : 'Chưa đúng thứ tự. Hãy thử lại!');
    }

    draw();
    return el('div', { class: 'task' },
      el('p', { class: 'task-hint' }, 'Sắp xếp các cụm từ thành câu trả lời hoàn chỉnh.'),
      slots, bankEl,
      el('div', { class: 'actions' }, check));
  }

  /* Chọn câu trả lời */
  function buildChoice(ctx) {
    const list = el('div', { class: 'choices' });
    shuffled(ctx.turn.options || []).forEach((opt) => {
      const btn = el('button', {
        class: 'choice', type: 'button', lang: 'en',
        onclick: () => {
          if (ctx.locked) return;
          if (opt.is_correct) {
            btn.classList.add('right');
            passTurn(ctx, [modelAnswer('Câu trả lời của bạn', opt.text)]);
          } else {
            btn.classList.add('wrong');
            btn.disabled = true;
            markMistake(ctx, opt.why || 'Câu này chưa đáp ứng điều khách cần. Chọn lại nhé!');
          }
        },
      }, opt.text);
      list.append(btn);
    });
    return el('div', { class: 'task' }, el('p', { class: 'task-hint' }, 'Chọn câu trả lời phù hợp nhất của Local Host.'), list);
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

  function answerBox(placeholder) {
    return el('textarea', {
      class: 'answer', rows: 3, lang: 'en', spellcheck: 'true', autocapitalize: 'sentences',
      placeholder, 'aria-label': 'Câu trả lời của bạn',
    });
  }

  /* Viết câu trả lời */
  function buildTyping(ctx) {
    const { turn } = ctx;
    const hints = turn.typing_hints || [];
    const helper = turn.helper_prompt;
    const area = answerBox('Viết câu trả lời bằng tiếng Anh…');
    const chipEls = hints.map((h) => el('button', { class: 'chip add', type: 'button', lang: 'en', title: 'Chèn vào câu trả lời', onclick: () => insertAtCursor(area, h) }, h));
    const helperBox = el('div', { class: 'helper', hidden: true });
    const sampleBox = el('div', { hidden: true }, modelAnswer('Câu mẫu tham khảo', turn.sample_correct_response));
    const check = el('button', { class: 'btn primary', type: 'button', disabled: true, onclick: onCheck }, 'Kiểm tra');
    let helperBtn = null;
    if (helper) {
      const cost = helper.energy_cost ?? 1;
      helperBtn = el('button', {
        class: 'tool-btn', type: 'button', disabled: d().battery < cost,
        onclick: () => {
          if (d().battery < cost) return;
          d().battery -= cost;
          save();
          renderHud();
          helperBox.replaceChildren(el('p', {}, '💡 ', el('b', { lang: 'en' }, helper.term), `: ${helper.definition}`));
          helperBox.hidden = false;
          helperBtn.remove();
        },
      }, d().battery >= cost ? `💡 Gợi ý nghĩa (−${cost} 🔋)` : '🪫 Hết pin gợi ý');
    }
    area.addEventListener('input', () => {
      check.disabled = !area.value.trim();
      const { hits } = C.scoreKeywords(area.value, hints);
      chipEls.forEach((c, i) => c.classList.toggle('hit', hits[i]));
    });
    function onCheck() {
      const r = C.scoreKeywords(area.value, hints);
      if (r.words < MIN_TYPED_WORDS) {
        showFeedback(ctx, 'warn', el('p', {}, `Câu trả lời hơi ngắn. Hãy viết một câu hoàn chỉnh (ít nhất ${MIN_TYPED_WORDS} từ).`));
        return;
      }
      if (hints.length && !r.count) {
        markMistake(ctx, `Hãy dùng ít nhất 1 từ gợi ý: ${hints.join(', ')}.`);
        if (quest.mistakes >= SHOW_MODEL_AFTER) sampleBox.hidden = false;
        return;
      }
      sampleBox.remove();
      passTurn(ctx, [modelAnswer('Câu mẫu tham khảo', turn.sample_correct_response)]);
    }
    return el('div', { class: 'task' },
      el('p', { class: 'task-hint' }, 'Viết câu trả lời. Nên dùng ít nhất 1 từ gợi ý (chạm để chèn):'),
      el('div', { class: 'chips' }, chipEls),
      helperBtn ? el('div', { class: 'row' }, helperBtn) : null,
      helperBox, area, sampleBox,
      el('div', { class: 'actions' }, check));
  }

  /* Nói, có phương án gõ câu trả lời thay thế */
  function buildSpeaking(ctx) {
    const { turn } = ctx;
    const keywords = turn.expected_keywords || [];
    const need = Math.max(1, Math.ceil(keywords.length * SPEAK_PASS_RATIO));
    const chipEls = keywords.map((k) => el('span', { class: 'chip', lang: 'en' }, C.firstAlt(k)));
    const model = el('div', { hidden: true }, modelAnswer('Câu mẫu', turn.target_speech));
    const showModelBtn = el('button', { class: 'tool-btn', type: 'button', onclick: () => revealModel() }, '👁 Xem câu mẫu');
    const modeBox = el('div', { class: 'mode-box' });
    const hint = el('p', { class: 'task-hint' });
    const listener = charOf(quest.q.npc);

    function revealModel() {
      model.hidden = false;
      showModelBtn.remove();
    }
    const paintHits = (hits) => chipEls.forEach((c, i) => c.classList.toggle('hit', Boolean(hits[i])));

    function evaluate(text, mode) {
      const r = C.scoreKeywords(text, keywords);
      paintHits(r.hits);
      if (r.count >= need && r.words >= MIN_SPOKEN_WORDS) {
        quest[mode] += 1;
        d().stats[mode] += 1;
        model.remove();
        passTurn(ctx, [
          mode === 'typed' ? el('p', {}, '⌨️ Bạn đã gõ thay vì nói ở lượt này. Lần sau hãy thử nói nhé!') : null,
          modelAnswer('Câu mẫu', turn.target_speech),
        ].filter(Boolean));
        return;
      }
      const missing = keywords.filter((k, i) => !r.hits[i]).map(C.firstAlt);
      const msg = r.count >= need
        ? `Câu trả lời hơi ngắn. Hãy nói/viết thành câu hoàn chỉnh (ít nhất ${MIN_SPOKEN_WORDS} từ).`
        : `Mới có ${r.count}/${need} từ khoá cần thiết. Còn thiếu: ${missing.join(', ')}.`;
      const extra = [];
      if (quest.mistakes + 1 >= SHOW_MODEL_AFTER) {
        revealModel();
        if (mode === 'voice') extra.push(el('button', { class: 'link-btn', type: 'button', onclick: () => useTyping() }, '⌨️ Khó nói? Gõ câu trả lời'));
      }
      markMistake(ctx, msg, ...extra);
    }

    function useTyping(reason) {
      preferTyping = C.canListen;
      renderText(reason);
      const area = modeBox.querySelector('textarea');
      if (area && !reason) area.focus();
    }

    function renderVoice() {
      hint.textContent = `Nói với ${listener ? listener.name : 'khách'} bằng tiếng Anh. Câu nói cần có ít nhất ${need}/${keywords.length} từ khoá:`;
      const transcript = el('p', { class: 'transcript', 'aria-live': 'polite' });
      const mic = el('button', { class: 'mic', type: 'button' }, '🎙️ Nhấn để nói');
      const setListening = (on) => {
        mic.classList.toggle('listening', on);
        mic.textContent = on ? '⏹ Đang nghe… nhấn để dừng' : '🎙️ Nhấn để nói';
      };
      mic.addEventListener('click', () => {
        if (ctx.locked) return;
        if (C.isListening()) {
          C.stopRecognizer();
          return;
        }
        transcript.textContent = '';
        C.startListening({
          onState: setListening,
          onText: (text, interim) => {
            transcript.className = 'transcript' + (interim ? ' interim' : '');
            transcript.textContent = `Bạn nói: “${text}”`;
          },
          onResult: (alts) => {
            const best = alts.reduce((a, b) => (C.scoreKeywords(b, keywords).count > C.scoreKeywords(a, keywords).count ? b : a));
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
      C.stopListening();
      hint.textContent = `Gõ câu bạn muốn nói với ${listener ? listener.name : 'khách'}. Câu trả lời cần có ít nhất ${need}/${keywords.length} từ khoá:`;
      const area = answerBox('Gõ câu trả lời bằng tiếng Anh…');
      const check = el('button', { class: 'btn primary', type: 'button', disabled: true, onclick: () => evaluate(area.value, 'typed') }, 'Kiểm tra');
      area.addEventListener('input', () => {
        check.disabled = !area.value.trim();
        paintHits(C.scoreKeywords(area.value, keywords).hits);
      });
      modeBox.replaceChildren(...[
        reason ? el('p', { class: 'notice' }, reason) : null,
        area,
        el('div', { class: 'actions' }, check),
        C.canListen ? el('button', { class: 'link-btn', type: 'button', onclick: () => { preferTyping = false; renderVoice(); } }, '🎙️ Chuyển sang nói') : null,
      ].filter(Boolean));
    }

    if (!C.canListen) renderText(MIC_ERRORS.unsupported);
    else if (preferTyping) renderText();
    else renderVoice();

    return el('div', { class: 'task' },
      hint,
      el('div', { class: 'chips' }, chipEls),
      el('div', { class: 'row' },
        el('button', { class: 'tool-btn keep', type: 'button', onclick: () => C.speak(turn.target_speech, voiceOf(null)) }, '🔊 Nghe câu mẫu'),
        showModelBtn),
      model,
      modeBox);
  }

  /* Kết thúc nhiệm vụ */
  function unlockOutfit(id) {
    if (!id || d().outfits.includes(id)) return null;
    d().outfits.push(id);
    return outfitById(id);
  }

  function addTitle(title) {
    if (!title || d().titles.includes(title)) return false;
    d().titles.push(title);
    d().title = title;
    return true;
  }

  function finishQuest() {
    const { q } = quest;
    const rec = d().quests[q.id] || {};
    const first = !rec.done;
    const doneBefore = questsDone();
    const r = q.rewards || {};
    const items = [el('li', {}, quest.replay ? '⭐ Lượt luyện tập (không cộng XP)' : `⭐ XP từ các lượt: +${quest.xp}`)];
    let outfit = null;
    if (first) {
      if (r.xp) {
        d().xp += r.xp;
        items.push(el('li', {}, `🎁 Thưởng hoàn thành: +${r.xp} XP`));
      }
      if (addTitle(r.title)) items.push(el('li', {}, `🏅 Danh hiệu mới: ${r.title}`));
      outfit = unlockOutfit(r.outfit);
      if (outfit) items.push(el('li', {}, `👘 Trang phục mới: ${outfit.name}`));
      if (r.battery) {
        const got = store.addBattery(r.battery);
        if (got) items.push(el('li', {}, `🔋 +${got} pin`));
      }
    }
    d().quests[q.id] = {
      done: true,
      voice: (rec.voice || 0) + quest.voice,
      typed: (rec.typed || 0) + quest.typed,
      firstTry: Math.max(rec.firstTry || 0, quest.firstTry),
      turns: q.turns.length,
    };
    if (quest.voice + quest.typed) items.push(el('li', {}, `🎙️ Nói: ${quest.voice} lượt · ⌨️ Gõ thay: ${quest.typed} lượt`));
    items.push(el('li', {}, `🎯 Đúng ngay lần đầu: ${quest.firstTry}/${q.turns.length} lượt`));
    const nowDone = questsDone();
    DATA.bosses.forEach((b) => {
      if (doneBefore < b.unlock_quests && nowDone >= b.unlock_quests) items.push(el('li', {}, `⚔️ Mở khoá Boss: ${b.name_vi}. Tới Hội Quán (Phố Lồng Đèn) để khiêu chiến!`));
    });
    save();
    renderHud();
    const next = DATA.quests.find((x) => !(d().quests[x.id] || {}).done);
    dialog('🎉 Hoàn thành nhiệm vụ', q.title,
      el('div', { class: 'finish' },
        avatarCanvas(playerLook(outfit ? outfit.id : null), 72),
        el('div', {},
          el('h3', { class: 'dlg-title' }, `${q.icon} ${q.title}`),
          el('ul', { class: 'reward-list' }, items))),
      next ? el('p', { class: 'muted' }, `Nhiệm vụ tiếp theo: ${next.icon} ${next.title} (${MAP_LABEL[next.map]})`) : el('p', { class: 'notice' }, '🏆 Bạn đã hoàn thành cả 4 nhiệm vụ Local Host! Hãy thử sức với các Boss ở Hội Quán.'),
      el('div', { class: 'actions' },
        outfit ? el('button', { class: 'btn primary', type: 'button', onclick: () => { d().outfit = outfit.id; save(); toast(`👘 Đang mặc: ${outfit.name}`); closeQuest(); } }, `Mặc ${outfit.name}`) : null,
        el('button', { class: 'btn', type: 'button', onclick: closeQuest }, 'Đóng')));
  }

  /* ---------- Bảng (sheet) ---------- */

  function openSheet(title, ...body) {
    closeWordCard();
    $('#sheet-title').textContent = title;
    $('#sheet-body').replaceChildren(...body.filter(Boolean));
    $('#sheet').hidden = false;
    $('#sheet-body').scrollTop = 0;
    setPaused(true);
    $('#sheet-close').focus({ preventScroll: true });
  }

  function closeSheet() {
    if (battle && !battle.ended && !window.confirm('Rút lui khỏi trận đấu Boss?')) return;
    battle = null;
    $('#sheet').hidden = true;
    setPaused(Boolean(quest));
  }

  /* Nhật ký nhiệm vụ */
  function openQuestLog() {
    openSheet('🎯 Nhiệm vụ Local Host',
      el('p', { class: 'muted' }, 'Bạn là Local Host, đại sứ hiếu khách của Hội An. Gặp du khách có dấu ! trên đầu để giúp họ bằng tiếng Anh.'),
      el('div', { class: 'quest-list' }, DATA.quests.map((q) => {
        const rec = d().quests[q.id] || {};
        const npc = charOf(q.npc);
        return el('article', { class: 'quest-card' + (rec.done ? ' done' : '') },
          el('h3', {}, `${q.icon} ${q.title}`),
          el('p', { class: 'muted' }, `${npc.name} · ${MAP_LABEL[q.map]}`),
          el('p', {}, q.topic),
          el('div', { class: 'quest-foot' },
            el('span', { class: 'status' }, rec.done ? '✓ Đã hoàn thành' : `${q.turns.length} lượt hội thoại`),
            el('button', { class: 'btn primary small', type: 'button', onclick: () => goToQuest(q) }, rec.done ? 'Chơi lại' : 'Đi tới ➜')));
      })));
  }

  function goToQuest(q) {
    closeSheet();
    if (engine.map.id !== q.map) engine.load(q.map);
    setTimeout(() => {
      if (!engine.goToNpc(q.npc)) toast('Không tìm được đường tới nhân vật.');
    }, 50);
  }

  /* Sổ từ (danh sách ưu tiên Unknown, đã biết, đã gặp) */
  function openWordBook(tab = 'priority') {
    const all = Object.keys(d().words).filter((id) => LEX[id]);
    const lists = {
      priority: store.priorityList().filter((id) => LEX[id]),
      known: all.filter((id) => store.wordState(id) === 'known'),
      seen: all.sort((a, b) => (d().words[b].seen || 0) - (d().words[a].seen || 0)),
    };
    const tabs = [['priority', `❓ Ưu tiên (${lists.priority.length})`], ['known', `✅ Đã biết (${lists.known.length})`], ['seen', `👀 Đã gặp (${lists.seen.length})`]];
    const rows = lists[tab].map((id, i) => {
      const w = LEX[id];
      const rec = d().words[id];
      const known = rec.status === 'known';
      return el('li', { class: 'word-row' + (known ? ' known' : rec.status === 'unknown' ? ' unknown' : '') },
        tab === 'priority' ? el('span', { class: 'rank' }, String(i + 1)) : null,
        el('button', { class: 'icon-btn', type: 'button', 'aria-label': `Nghe "${w.word}"`, onclick: () => C.speak(w.word) }, '🔊'),
        el('div', { class: 'word-main' },
          el('p', {}, el('b', { lang: 'en' }, w.word), ' ', el('span', { class: 'phon' }, w.phonetic)),
          el('p', { class: 'muted' }, known ? 'Nghĩa đã ẩn (Known)' : w.vi)),
        el('span', { class: 'word-meta' }, `gặp ${rec.seen} · ❓${rec.unk}${rec.miss ? ` · sai ${rec.miss}` : ''}`),
        el('button', { class: 'btn small', type: 'button', onclick: () => { store.tagWord(id, known ? 'unknown' : 'known'); save(); openWordBook(tab); } }, known ? '❓' : '✅'));
    });
    openSheet('📒 Sổ từ của bạn',
      el('p', { class: 'muted' }, `Đã khám phá ${all.length}/${LEX_LIST.length} từ quanh Hội An. Từ gắn Unknown càng nhiều lần càng xếp cao trong danh sách ưu tiên.`),
      el('div', { class: 'tabs' }, tabs.map(([key, label]) => el('button', { class: 'tab' + (key === tab ? ' active' : ''), type: 'button', onclick: () => openWordBook(key) }, label))),
      tab === 'priority' && lists.priority.length
        ? el('div', { class: 'actions' }, el('button', { class: 'btn primary', type: 'button', onclick: () => startReview() }, `🧠 Ôn ${Math.min(5, lists.priority.length)} từ ưu tiên`))
        : null,
      rows.length ? el('ul', { class: 'word-list' }, rows) : el('p', { class: 'notice' }, tab === 'priority' ? 'Chưa có từ Unknown. Chạm vào vật thể hoặc từ tô sáng, rồi chọn "❓ Unknown" cho từ bạn chưa chắc.' : 'Chưa có từ nào ở mục này.'));
  }

  function meaningQuestion(id) {
    const w = LEX[id];
    const others = shuffled(LEX_LIST.filter((x) => x.id !== id && x.vi !== w.vi)).slice(0, 3);
    const options = shuffled([w, ...others]);
    return { id, prompt: w.word, phon: w.phonetic, options: options.map((o) => o.vi), answer: options.indexOf(w) };
  }

  function startReview() {
    const ids = store.priorityList().filter((id) => LEX[id]).slice(0, 5);
    let i = 0;
    let right = 0;
    const learned = [];
    const step = () => {
      if (i >= ids.length) {
        save();
        openSheet('🧠 Kết quả ôn tập',
          el('p', { class: 'fb-title' }, `Đúng ${right}/${ids.length} từ.`),
          learned.length ? el('p', { class: 'notice good' }, `🎉 Đã thuộc (tự chuyển sang Known): ${learned.join(', ')}`) : el('p', { class: 'muted' }, 'Trả lời đúng một từ 2 lần liên tiếp để nó tự chuyển sang Known.'),
          el('div', { class: 'actions' },
            el('button', { class: 'btn primary', type: 'button', onclick: () => openWordBook('priority') }, '📒 Về Sổ từ'),
            el('button', { class: 'btn', type: 'button', onclick: closeSheet }, 'Đóng')));
        return;
      }
      const q = meaningQuestion(ids[i]);
      const fb = el('div', { class: 'feedback', 'aria-live': 'polite' });
      const opts = q.options.map((text, k) => el('button', {
        class: 'choice', type: 'button',
        onclick: () => {
          opts.forEach((b) => { b.disabled = true; });
          const ok = k === q.answer;
          opts[q.answer].classList.add('right');
          if (!ok) opts[k].classList.add('wrong');
          if (ok) right += 1;
          if (store.reviewWord(q.id, ok)) learned.push(LEX[q.id].word);
          fb.className = `feedback ${ok ? 'good' : 'bad'}`;
          fb.replaceChildren(el('p', {}, ok ? '✅ Đúng rồi!' : `❌ Nghĩa đúng: ${LEX[q.id].vi}`),
            el('div', { class: 'next-row' }, el('button', { class: 'dlg-next', type: 'button', onclick: () => { i += 1; step(); } }, '➜')));
        },
      }, text));
      openSheet(`🧠 Ôn từ ưu tiên ${i + 1}/${ids.length}`,
        el('div', { class: 'quiz-word' },
          el('button', { class: 'icon-btn', type: 'button', onclick: () => C.speak(q.prompt) }, '🔊'),
          el('p', {}, el('b', { lang: 'en' }, q.prompt), ' ', el('span', { class: 'phon' }, q.phon))),
        el('p', { class: 'task-hint' }, 'Chọn nghĩa đúng:'),
        el('div', { class: 'choices' }, opts),
        fb);
      if (d().soundOn) C.speak(q.prompt);
    };
    step();
  }

  /* Booklets ngữ pháp */
  function openBookletShelf() {
    openSheet('📘 Booklets ngữ pháp',
      el('p', { class: 'muted' }, `Đã tìm ${bookletCount()}/${BOOKLETS.length} cuốn. Booklet được giấu quanh phố: tìm biểu tượng sách màu xanh.`),
      el('div', { class: 'booklet-grid' }, BOOKLETS.map((b) => {
        const has = d().collected[b.id];
        return el('button', { class: 'booklet-card' + (has ? '' : ' locked'), type: 'button', disabled: !has, onclick: () => openBooklet(b.id) },
          el('span', { class: 'bk-icon' }, has ? b.icon : '❔'),
          el('b', {}, has ? b.title : 'Chưa tìm thấy'),
          el('small', {}, has ? (d().bookletChecks[b.id] ? '✓ Đã làm bài kiểm tra' : b.title_en) : `Gợi ý: ${b.where}`));
      })));
  }

  function openBooklet(id) {
    const b = BOOKLETS.find((x) => x.id === id);
    if (!b) return;
    const answered = new Array(b.check.length).fill(false);
    let correct = 0;
    const done = el('div', {});
    const checks = b.check.map((q, qi) => {
      const fb = el('p', { class: 'muted' });
      const opts = q.options.map((text, k) => el('button', {
        class: 'choice', type: 'button', lang: 'en',
        onclick: () => {
          if (answered[qi]) return;
          answered[qi] = true;
          opts.forEach((o) => { o.disabled = true; });
          opts[q.answer].classList.add('right');
          if (k !== q.answer) opts[k].classList.add('wrong');
          else correct += 1;
          fb.textContent = `${k === q.answer ? '✅' : '❌'} ${q.explain}`;
          if (answered.every(Boolean)) {
            const first = !d().bookletChecks[b.id];
            if (first && correct === b.check.length) {
              d().bookletChecks[b.id] = true;
              save();
              addXp(15, 'hoàn thành Booklet');
              done.replaceChildren(el('p', { class: 'notice good' }, '🎉 Bạn đã nắm vững Booklet này!'));
            } else if (correct < b.check.length) {
              done.replaceChildren(el('p', { class: 'notice' }, 'Còn câu sai. Đọc lại quy tắc rồi mở lại Booklet để làm lại nhé.'));
            }
          }
        },
      }, text));
      return el('div', { class: 'bk-check' }, el('p', { lang: 'en' }, el('b', {}, `${qi + 1}. `), q.q), el('div', { class: 'choices' }, opts), fb);
    });
    openSheet(`${b.icon} Booklet: ${b.title_en}`,
      el('h3', { class: 'bk-title' }, b.title),
      el('p', { class: 'bk-rule' }, b.rule),
      el('table', { class: 'bk-table' }, el('tbody', {}, b.patterns.map((p) => el('tr', {}, el('td', { lang: 'en' }, p.form), el('td', {}, p.note))))),
      el('h4', {}, 'Ví dụ trong Hội An'),
      el('ul', { class: 'bk-examples' }, b.examples.map((ex) => el('li', {},
        el('button', { class: 'mini-btn', type: 'button', 'aria-label': 'Nghe', onclick: () => C.speak(ex.en) }, '🔊'),
        el('div', {}, el('p', { lang: 'en' }, ex.en), el('p', { class: 'muted' }, ex.vi))))),
      el('h4', {}, d().bookletChecks[b.id] ? 'Kiểm tra nhanh (đã hoàn thành)' : 'Kiểm tra nhanh (+15 XP khi đúng hết)'),
      ...checks,
      done);
  }

  /* ---------- Boss ---------- */

  function openBossLobby() {
    const doneCount = questsDone();
    openSheet('⚔️ Đấu trường Boss · Hội Quán',
      el('p', { class: 'muted' }, 'Các dạng bài khó trên Portal hoá thành Boss. Trả lời đúng để tấn công, trả lời sai bị mất tim. Đúng 3 câu liên tiếp ra đòn chí mạng!'),
      el('div', { class: 'boss-list' }, DATA.bosses.map((b) => {
        const open = doneCount >= b.unlock_quests;
        const rec = d().bosses[b.id] || {};
        return el('article', { class: 'boss-card' + (open ? '' : ' locked') },
          el('img', { src: b.img, alt: '', class: 'boss-thumb' }),
          el('div', {},
            el('h3', {}, b.name_vi),
            el('p', { class: 'muted', lang: 'en' }, b.name),
            el('p', {}, b.description),
            el('p', { class: 'status' }, open ? (rec.wins ? `🏆 Đã thắng ${rec.wins} lần` : 'Chưa hạ') : `🔒 Hoàn thành ${b.unlock_quests} nhiệm vụ để mở (${doneCount}/${b.unlock_quests})`),
            el('button', { class: 'btn primary small', type: 'button', disabled: !open, onclick: () => startBoss(b) }, open ? 'Khiêu chiến ⚔️' : 'Chưa mở')));
      })));
  }

  async function startBoss(boss) {
    if (boss.source !== 'lexicon' && !BANK) {
      try {
        const res = await fetch('data/boss-bank.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        BANK = await res.json();
      } catch (err) {
        toast(`Không tải được câu hỏi Boss (${err.message}).`);
        return;
      }
    }
    battle = { boss, hp: boss.hp, hearts: boss.hearts, combo: 0, asked: new Set(), right: 0, wrong: 0, ended: false };
    const rec = d().bosses[boss.id] || { wins: 0, tries: 0 };
    rec.tries += 1;
    d().bosses[boss.id] = rec;
    save();
    C.sfx('start');
    nextBossQuestion();
  }

  function lexiconQuestion() {
    const encountered = Object.keys(d().words).filter((id) => LEX[id]);
    const ranked = encountered.sort((a, b) => store.priority(b) - store.priority(a)).filter((id) => store.wordState(id) !== 'known');
    let pool = ranked.filter((id) => !battle.asked.has(id));
    if (pool.length < 3) pool = pool.concat(shuffled(LEX_LIST.map((w) => w.id)).filter((id) => !battle.asked.has(id) && !pool.includes(id)));
    const id = pool.slice(0, 4)[Math.floor(Math.random() * Math.min(4, pool.length))];
    battle.asked.add(id);
    const w = LEX[id];
    const others = shuffled(LEX_LIST.filter((x) => x.id !== id)).slice(0, 3);
    const opts = shuffled([w, ...others]);
    const kind = pick(['meaning', 'word', 'gap']);
    const re = new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (kind === 'gap' && re.test(w.example)) {
      return { wordId: id, q: w.example.replace(re, '_____'), options: opts.map((o) => o.word), answer: opts.indexOf(w), explain: `${w.word}: ${w.vi}`, tag: 'Điền từ vào chỗ trống' };
    }
    if (kind === 'word') {
      return { wordId: id, q: `Từ tiếng Anh nào có nghĩa: “${w.vi}”?`, options: opts.map((o) => o.word), answer: opts.indexOf(w), explain: `${w.word} ${w.phonetic}`, tag: 'Chọn từ' };
    }
    return { wordId: id, q: `“${w.word}” ${w.phonetic} nghĩa là gì?`, options: opts.map((o) => o.vi), answer: opts.indexOf(w), explain: `${w.word}: ${w.vi}`, tag: 'Chọn nghĩa' };
  }

  function bankQuestion() {
    const list = BANK[battle.boss.source] || [];
    let idx = Math.floor(Math.random() * list.length);
    for (let k = 0; k < 20 && battle.asked.has(idx); k++) idx = Math.floor(Math.random() * list.length);
    battle.asked.add(idx);
    const item = list[idx];
    const order = shuffled(item.options.map((text, i) => ({ text, i })));
    return { q: item.q, options: order.map((o) => o.text), answer: order.findIndex((o) => o.i === item.answer), explain: item.explain, tag: item.note };
  }

  function nextBossQuestion() {
    const b = battle;
    b.current = b.boss.source === 'lexicon' ? lexiconQuestion() : bankQuestion();
    renderBattle();
  }

  function renderBattle(result) {
    const b = battle;
    const q = b.current;
    const img = el('img', { src: b.boss.img, alt: b.boss.name, class: 'boss-img' + (result ? (result.ok ? ' hit' : ' attack') : '') });
    const hpPct = Math.max(0, b.hp) / b.boss.hp * 100;
    const arena = el('div', { class: 'arena' },
      img,
      el('div', { class: 'arena-info' },
        el('p', { class: 'boss-name' }, b.boss.name_vi),
        el('div', { class: 'hp-bar', role: 'progressbar', 'aria-valuenow': String(Math.max(0, b.hp)), 'aria-valuemax': String(b.boss.hp), 'aria-label': 'Máu Boss' },
          el('span', { style: `width:${hpPct}%` })),
        el('p', { class: 'hearts', 'aria-label': `Còn ${b.hearts} tim` }, '❤️'.repeat(Math.max(0, b.hearts)) + '🖤'.repeat(Math.max(0, b.boss.hearts - b.hearts)),
          b.combo >= 2 ? el('span', { class: 'combo' }, ` 🔥 x${b.combo}`) : null)));
    const fb = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const opts = q.options.map((text, k) => el('button', { class: 'choice', type: 'button', lang: 'en', onclick: () => answerBoss(k, opts, fb) }, text));
    openSheet(`⚔️ ${b.boss.name_vi}`,
      arena,
      el('p', { class: 'q-tag' }, q.tag || ''),
      el('p', { class: 'boss-q', lang: 'en' }, q.q),
      el('div', { class: 'choices' }, opts),
      fb);
  }

  function answerBoss(k, opts, fb) {
    const b = battle;
    if (!b || b.locked) return;
    b.locked = true;
    const q = b.current;
    const ok = k === q.answer;
    opts.forEach((o) => { o.disabled = true; });
    opts[q.answer].classList.add('right');
    let line;
    if (ok) {
      b.combo += 1;
      const dmg = b.combo >= 3 ? 2 : 1;
      b.hp -= dmg;
      b.right += 1;
      d().stats.bossRight += 1;
      if (q.wordId) store.reviewWord(q.wordId, true);
      C.sfx(dmg > 1 ? 'crit' : 'hit');
      line = dmg > 1 ? `💥 Chí mạng! Boss mất ${dmg} máu.` : '⚔️ Trúng đòn! Boss mất 1 máu.';
    } else {
      opts[k].classList.add('wrong');
      b.combo = 0;
      b.hearts -= 1;
      b.wrong += 1;
      d().stats.bossWrong += 1;
      if (q.wordId) store.missWord(q.wordId);
      C.sfx('hurt');
      line = '💔 Sai rồi! Bạn mất 1 tim.';
    }
    save();
    const img = document.querySelector('.boss-img');
    if (img) {
      img.classList.remove('hit', 'attack');
      void img.offsetWidth;
      img.classList.add(ok ? 'hit' : 'attack');
    }
    document.querySelector('.hp-bar span').style.width = `${Math.max(0, b.hp) / b.boss.hp * 100}%`;
    document.querySelector('.hearts').firstChild.textContent = '❤️'.repeat(Math.max(0, b.hearts)) + '🖤'.repeat(Math.max(0, b.boss.hearts - b.hearts));
    const over = b.hp <= 0 ? 'win' : b.hearts <= 0 ? 'lose' : null;
    fb.className = `feedback ${ok ? 'good' : 'bad'}`;
    fb.replaceChildren(
      el('p', { class: 'fb-title' }, line),
      ok ? null : el('p', {}, 'Đáp án đúng: ', el('b', { lang: 'en' }, q.options[q.answer])),
      q.explain ? el('p', { class: 'muted' }, q.explain) : null,
      el('div', { class: 'next-row' }, el('button', {
        class: 'dlg-next', type: 'button',
        onclick: () => {
          b.locked = false;
          if (over) endBoss(over === 'win');
          else nextBossQuestion();
        },
      }, over ? '🏁' : '➜')));
  }

  function endBoss(win) {
    const b = battle;
    b.ended = true;
    const rec = d().bosses[b.boss.id];
    const items = [el('li', {}, `✅ Đúng ${b.right} · ❌ Sai ${b.wrong}`)];
    let outfit = null;
    if (win) {
      C.sfx('victory');
      const first = !rec.wins;
      rec.wins = (rec.wins || 0) + 1;
      const r = b.boss.rewards || {};
      if (first) {
        d().xp += r.xp || 0;
        items.push(el('li', {}, `⭐ +${r.xp || 0} Cultural Host XP`));
        if (addTitle(r.title)) items.push(el('li', {}, `🏅 Danh hiệu mới: ${r.title}`));
        outfit = unlockOutfit(r.outfit);
        if (outfit) items.push(el('li', {}, `👘 Trang phục mới: ${outfit.name}`));
        if (r.battery) {
          const got = store.addBattery(r.battery);
          if (got) items.push(el('li', {}, `🔋 +${got} pin`));
        }
      } else {
        d().xp += 20;
        items.push(el('li', {}, '⭐ +20 XP (thắng lại)'));
      }
    } else {
      C.sfx('defeat');
    }
    save();
    renderHud();
    const boss = b.boss;
    openSheet(win ? '🏆 Chiến thắng!' : '💀 Thua trận',
      el('div', { class: 'finish' },
        el('img', { src: boss.img, alt: '', class: 'boss-thumb' + (win ? ' defeated' : '') }),
        el('div', {},
          el('h3', {}, win ? `Bạn đã hạ ${boss.name_vi}!` : `${boss.name_vi} vẫn còn đứng vững.`),
          el('ul', { class: 'reward-list' }, items))),
      win ? null : el('p', { class: 'muted' }, 'Mẹo: ôn Sổ từ hoặc đọc lại Booklet rồi quay lại khiêu chiến.'),
      el('div', { class: 'actions' },
        outfit ? el('button', { class: 'btn primary', type: 'button', onclick: () => { d().outfit = outfit.id; save(); toast(`👘 Đang mặc: ${outfit.name}`); } }, `Mặc ${outfit.name}`) : null,
        el('button', { class: 'btn' + (outfit ? '' : ' primary'), type: 'button', onclick: () => startBoss(boss) }, win ? 'Đấu lại' : 'Thử lại ⚔️'),
        el('button', { class: 'btn', type: 'button', onclick: openBossLobby }, 'Về Hội Quán')));
  }

  /* ---------- Hồ sơ Local Host ---------- */

  function openProfile() {
    const s = d().stats;
    const totals = { booklets: BOOKLETS.length };
    const a = C.analyzeStyle(d(), totals);
    const packsTotal = Object.values(W.maps).reduce((n, m) => n + m.collectibles.filter((c) => c.type === 'battery').length, 0);
    const title = d().title || DATA.default_title;
    const stat = (label, value) => el('div', { class: 'stat' }, el('b', {}, String(value)), el('span', {}, label));
    const turns = s.firstTry + s.retries;
    openSheet('👤 Hồ sơ Local Host',
      el('div', { class: 'profile-head' },
        avatarCanvas(playerLook(), 96),
        el('div', {},
          el('p', { class: 'profile-title' }, `🏅 ${title}`),
          el('p', {}, `⭐ ${d().xp} Cultural Host XP`),
          el('p', { class: 'muted' }, `Nhiệm vụ ${questsDone()}/${DATA.quests.length} · Booklets ${bookletCount()}/${BOOKLETS.length}`))),
      d().titles.length
        ? el('div', {},
          el('h4', {}, 'Danh hiệu'),
          el('div', { class: 'chips' }, [DATA.default_title, ...d().titles].map((t) => el('button', {
            class: 'chip' + (t === title ? ' hit' : ''), type: 'button',
            onclick: () => { d().title = t === DATA.default_title ? null : t; save(); openProfile(); },
          }, t))))
        : null,
      el('h4', {}, 'Tủ đồ Local Host'),
      el('div', { class: 'wardrobe' }, DATA.outfits.map((o) => {
        const has = d().outfits.includes(o.id);
        const wearing = d().outfit === o.id;
        return el('button', {
          class: 'outfit' + (wearing ? ' wearing' : '') + (has ? '' : ' locked'), type: 'button', disabled: !has,
          onclick: () => { d().outfit = o.id; save(); openProfile(); },
        }, avatarCanvas(playerLook(o.id), 64), el('b', {}, o.name), el('small', {}, wearing ? 'Đang mặc' : has ? 'Chạm để mặc' : `🔒 ${o.how}`));
      })),
      el('h4', {}, '📊 Thống kê học tập'),
      el('div', { class: 'stats' },
        stat('từ đã khám phá', `${a.discovered}/${LEX_LIST.length}`),
        stat('từ Known', a.known),
        stat('từ Unknown', a.unknown),
        stat('lần chạm khám phá', s.pokes),
        stat('câu đã dịch (🔋)', s.translations),
        stat('Battery Pack', `${s.packs}/${packsTotal}`),
        stat('đúng ngay lần đầu', turns ? `${Math.round((s.firstTry / turns) * 100)}%` : '–'),
        stat('lượt nói / gõ thay', `${s.voice} / ${s.typed}`),
        stat('câu Boss đúng / sai', `${s.bossRight} / ${s.bossWrong}`)),
      el('h4', {}, '🧭 Phong cách học của bạn'),
      a.traits.length ? el('ul', { class: 'traits' }, a.traits.map(([icon, name, desc]) => el('li', {}, el('b', {}, `${icon} ${name}: `), desc))) : null,
      a.tips.length ? el('ul', { class: 'tips' }, a.tips.map((t) => el('li', {}, `💡 ${t}`))) : null,
      el('div', { class: 'actions' },
        el('button', {
          class: 'link-btn', type: 'button',
          onclick: () => {
            if (!window.confirm('Xoá toàn bộ tiến độ (XP, từ vựng, vật phẩm, trang phục) để chơi lại từ đầu?')) return;
            store.reset();
            closeSheet();
            engine.load('day');
            renderHud();
          },
        }, '↺ Chơi lại từ đầu')));
  }

  /* ---------- Khởi động ---------- */

  const hooks = {
    lookFor(npc) {
      const ch = charOf(npc.id);
      return (ch && ch.look) || npc.look || {};
    },
    playerLook: () => playerLook(),
    isCollected: (id) => Boolean(d().collected[id]),
    onCollect,
    onPoke(spot) {
      if (!spot.word) return;
      d().poked[spot.key] = true;
      const firstEver = !d().words[spot.word];
      store.pokeWord(spot.word);
      save();
      if (firstEver) addXp(2, 'khám phá từ mới');
      openWordCard(spot.word, { recharge: spot.action === 'recharge' });
    },
    onNpc(npc) {
      const q = questByNpc(npc.id);
      if (q) openQuest(q);
    },
    onAction(action) {
      if (action === 'boss') openBossLobby();
    },
    onExit(exit) {
      closeWordCard();
      engine.load(exit.to, exit.spawn);
    },
    wordState: (id) => store.wordState(id),
    wordLabel: (id) => (LEX[id] ? LEX[id].word : null),
    isPoked: (key) => Boolean(d().poked[key]),
    labelsOn: () => d().labels,
    questMark(npc) {
      const q = DATA && DATA.quests.find((x) => x.npc === npc.id);
      if (!q) return null;
      return (d().quests[q.id] || {}).done ? '✓' : '!';
    },
    greetFor(npc) {
      const q = DATA && questByNpc(npc.id);
      if (q && (d().quests[q.id] || {}).done) return charOf(npc.id) && charOf(npc.id).lang === 'vi' ? 'Cảm ơn cháu nhiều!' : 'Thank you so much! 😊';
      return npc.greet;
    },
    onMapChange(map) {
      d().map = map.id;
      save();
      showBanner(map);
    },
  };

  function savePosition() {
    if (!engine || !engine.map) return;
    const p = engine.player;
    const pos = { x: p.x, y: p.y, dir: p.dir };
    const prev = d().pos;
    if (!prev || prev.x !== pos.x || prev.y !== pos.y || d().map !== engine.map.id) {
      d().pos = pos;
      d().map = engine.map.id;
      save();
    }
  }

  async function loadJson(path) {
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    return res.json();
  }

  async function init() {
    try {
      const [lex, dlg, bk] = await Promise.all([loadJson('data/lexicon.json'), loadJson('data/npc-dialogues-v3.json'), loadJson('data/booklets.json')]);
      LEX_LIST = lex.words;
      LEX = Object.fromEntries(LEX_LIST.map((w) => [w.id, w]));
      LEX_MATCH = LEX_LIST.flatMap((w) => [w.word, ...(w.forms || [])].map((f) => ({ id: w.id, stems: C.tokensOf(f) })))
        .filter((e) => e.stems.length)
        .sort((a, b) => b.stems.length - a.stems.length);
      DATA = dlg;
      BOOKLETS = bk.booklets;
    } catch (err) {
      $('#loading').replaceChildren(el('p', {}, `Không tải được dữ liệu trò chơi (${err.message}). `,
        location.protocol === 'file:' ? 'Bạn đang mở tệp trực tiếp trên máy; hãy mở qua máy chủ web (GitHub Pages hoặc localhost).' : 'Hãy tải lại trang.'));
      return;
    }

    $('#loading').remove();
    engine = new IT.Engine($('#world'), hooks);
    IT.engine = engine;
    const mapId = W.maps[d().map] ? d().map : 'day';
    engine.load(mapId);
    const pos = d().pos;
    if (pos && engine.isFree(pos.x, pos.y)) Object.assign(engine.player, { x: pos.x, y: pos.y, px: pos.x * W.T, py: pos.y * W.T, dir: pos.dir || 'down' });
    setInterval(savePosition, 2000);
    window.addEventListener('pagehide', () => { savePosition(); C.stopAudio(); C.stopListening(); });

    // Chạm vào bản đồ thì đóng thẻ từ (chạy trước khi engine xử lý cú chạm mới)
    $('#frame').addEventListener('pointerdown', (e) => { if (e.target === $('#world')) closeWordCard(); }, true);
    $('#btn-sound').addEventListener('click', () => {
      d().soundOn = !d().soundOn;
      if (!d().soundOn) C.stopAudio();
      save();
      renderHud();
    });
    $('#btn-labels').addEventListener('click', () => {
      d().labels = !d().labels;
      save();
      renderHud();
    });
    $('#btn-quests').addEventListener('click', openQuestLog);
    $('#btn-words').addEventListener('click', () => openWordBook());
    $('#btn-booklets').addEventListener('click', openBookletShelf);
    $('#btn-boss').addEventListener('click', openBossLobby);
    $('#btn-profile').addEventListener('click', openProfile);
    $('#sheet-close').addEventListener('click', closeSheet);
    $('#sheet').addEventListener('click', (e) => { if (e.target === $('#sheet')) closeSheet(); });
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!$('#sheet').hidden) closeSheet();
      else if (!$('#word-card').hidden) closeWordCard();
      else if (quest) closeQuest();
    });
    renderHud();
  }

  init();
})();
