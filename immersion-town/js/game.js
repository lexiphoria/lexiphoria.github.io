/* Immersion Town – giao diện Đông Hồ: khung thoại có chân dung, Poke & Prod, Trà Đá Helper, Booklets,
   sổ từ thích ứng, đấu Boss, hồ sơ và giấy chứng nhận Local Host. Nội dung lấy từ thư mục data/. */
(() => {
  'use strict';

  const IT = window.IT;
  const C = IT.core;
  const { store } = C;
  const d = () => store.data;
  const $ = (sel) => document.querySelector(sel);

  const AVATARS = {
    boy: { name: ['Local Host nam', 'Local Host · boy'], note: ['Đồng phục học sinh, đi được 4 hướng', 'School uniform, walks in 4 directions'] },
    girl: { name: ['Local Host nữ', 'Local Host · girl'], note: ['Áo dài, nón lá, cờ hướng dẫn viên; đi được 4 hướng', 'Áo dài, conical hat and guide flag; walks in 4 directions'] },
  };
  const MIN_TYPED_WORDS = 5;
  const MIN_SPOKEN_WORDS = 4;
  const SPEAK_PASS_RATIO = 0.6;
  const SHOW_MODEL_AFTER = 2;
  // Các chỉ dẫn có hai bản [tiếng Việt, tiếng Anh]; L() chọn theo nút EN/VI
  const ZONE_LABEL = {
    ev: ['Bãi xe điện ngoại vi', 'Outer EV Hub'],
    street: ['Phố đi bộ', 'Walking Street'],
    river: ['Bến sông Hoài', 'Hoai River Pier'],
    festival: ['Quảng trường Hội An Quán', 'Assembly Hall Square'],
  };
  const TYPE_LABEL = {
    phrase_builder: ['Ghép cụm từ', 'Phrase builder'],
    multiple_choice: ['Chọn câu trả lời', 'Multiple choice'],
    typing: ['Viết câu trả lời', 'Write your answer'],
    speaking: ['Nói', 'Speaking'],
  };
  // Giờ trong ngày chạy theo tiến độ: mỗi nhiệm vụ chính xong thì trời muộn hơn (sáng → trưa → chiều → hoàng hôn → tối)
  const PHASES = ['morning', 'noon', 'afternoon', 'sunset', 'night'];
  const PHASE_LABEL = {
    morning: ['🌅 Buổi sáng', '🌅 Morning'],
    noon: ['☀️ Buổi trưa', '☀️ Midday'],
    afternoon: ['🌤️ Buổi chiều', '🌤️ Afternoon'],
    sunset: ['🌇 Hoàng hôn', '🌇 Sunset'],
    night: ['🌙 Buổi tối', '🌙 Night'],
  };
  const PHASE_NEWS = {
    noon: ['☀️ Trời đã trưa ở Hội An.', "☀️ It's midday in Hoi An."],
    afternoon: ['🌤️ Nắng chiều vàng trên phố cổ.', '🌤️ The afternoon sun glows over the old town.'],
    sunset: ['🌇 Hoàng hôn buông, đèn lồng bắt đầu sáng. Chuyến thuyền đêm sắp khởi hành!', '🌇 The sun is setting and the lanterns light up. The night cruise is about to leave!'],
    night: ['🌙 Đêm hội di sản đã bắt đầu ở Quảng trường Hội An Quán!', '🌙 The Heritage Night has begun at Assembly Hall Square!'],
  };
  const MIC_BLOCKED = [
    'Micro đang bị chặn. Hãy cho phép dùng micro trong cài đặt trình duyệt rồi chọn "Chuyển sang nói", hoặc gõ câu trả lời bên dưới.',
    'The microphone is blocked. Allow microphone access in your browser settings, then choose "Switch to speaking", or type your answer below.',
  ];
  const MIC_ERRORS = {
    'unsupported': [
      'Trình duyệt này chưa hỗ trợ nhận dạng giọng nói (thường gặp ở Firefox và một số iPhone). Bạn hãy gõ câu trả lời, vẫn được tính điểm. Muốn luyện nói, hãy mở bằng Chrome hoặc Edge.',
      'This browser does not support speech recognition (common in Firefox and on some iPhones). Type your answer instead; it still counts. To practise speaking, open the game in Chrome or Edge.',
    ],
    'not-allowed': MIC_BLOCKED,
    'service-not-allowed': MIC_BLOCKED,
    'audio-capture': ['Không tìm thấy micro trên thiết bị. Bạn hãy gõ câu trả lời bên dưới.', 'No microphone was found on this device. Type your answer below.'],
    'network': ['Không kết nối được dịch vụ nhận dạng giọng nói (cần Internet). Bạn hãy gõ câu trả lời bên dưới.', 'Could not reach the speech recognition service (Internet needed). Type your answer below.'],
    'language-not-supported': ['Thiết bị chưa hỗ trợ nhận dạng tiếng Anh. Bạn hãy gõ câu trả lời bên dưới.', 'This device cannot recognise English speech. Type your answer below.'],
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
  let reopenSheet = null;
  let lastPhase = null;
  const calledOut = new Set(); // người địa phương đã rao trong lượt chơi này

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
  // Tên trang phục theo nhân vật đang chọn (bộ mặc định của Local Host nữ là áo dài tím hướng dẫn viên)
  const outfitName = (o) => (d().avatar === 'girl' && o.name_girl ? tx(o, 'name_girl') : tx(o, 'name'));
  const charOf = (id) => DATA.characters[id];
  const voiceOf = (ch) => ({ langs: (ch && ch.voice) || ['en-US', 'en-GB'], pitch: (ch && ch.pitch) || 1 });
  const isDone = (id) => Boolean((d().quests[id] || {}).done);
  const sideQuests = () => DATA.side_quests || [];
  const sideOpen = (q) => !q.requires || isDone(q.requires);
  const isSide = (q) => sideQuests().includes(q);
  const allMainDone = () => questsDone() >= DATA.quests.length;
  // Điều kiện xuất hiện của NPC trong Tiled: id nhiệm vụ, hoặc 'all' (đã xong cả 4 nhiệm vụ chính)
  const cond = (id) => (id === 'all' ? allMainDone() : isDone(id));
  const questByNpc = (id) => DATA.quests.find((q) => q.npc === id || q.turns.some((t) => t.speaker === id))
    || sideQuests().find((q) => q.npc === id && sideOpen(q));
  const playerName = () => d().name || 'Local Host';

  // Ngôn ngữ chỉ dẫn: 'en' (mặc định, nhập vai tiếng Anh) hoặc 'vi' (hỗ trợ học sinh mới bắt đầu)
  const viUI = () => d().lang === 'vi';
  const L = (vi, en) => (viUI() ? vi : en);
  // Trường dữ liệu theo ngôn ngữ chỉ dẫn: obj.key (tiếng Việt) hoặc obj.key_en (tiếng Anh)
  const tx = (obj, key) => (!viUI() && obj[`${key}_en`] != null ? obj[`${key}_en`] : obj[key]);
  const zoneLabel = (id) => (ZONE_LABEL[id] ? L(...ZONE_LABEL[id]) : id);
  const questTitle = (q) => L(q.title, q.title_en || q.title);
  const clockIndex = () => Math.min(4, Math.max(d().clock || 0, questsDone()));
  const phase = () => PHASES[clockIndex()];
  // Tên khu theo giờ: Quảng trường Hội An Quán ban ngày thành Đêm hội di sản khi trời tối
  const nightKey = (zone, key) => (phase() === 'night' && zone[`${key}_night`] ? `${key}_night` : key);
  const zoneName = (zone) => tx(zone, nightKey(zone, 'name'));

  function toast(text) {
    const box = $('#toasts');
    const t = el('div', { class: 'toast dongho-panel' }, text);
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

  // Tạm dừng nhân vật và làm mờ nền giấy phía sau khi có khung thoại, thẻ từ hoặc bảng
  function syncPause() {
    if (!engine) return;
    const open = !$('#dialog').hidden || !$('#word-card').hidden || !$('#sheet').hidden || !$('#title-screen').hidden;
    engine.paused = open;
    engine.keys.clear();
    if (open) {
      engine.player.path = [];
      engine.player.onArrive = null;
    }
    $('#paper-blur').classList.toggle('show', !$('#dialog').hidden || !$('#word-card').hidden);
  }

  // Tờ sprite của Local Host: nam 4 hàng × 4 khung, nữ 3 khung (trước, nghiêng, sau)
  function playerSheet(avatar = d().avatar, outfitId = d().outfit) {
    const o = outfitById(outfitId) || DATA.outfits[0];
    const kind = avatar === 'girl' ? 'girl' : 'boy';
    return { kind, src: `assets/chars/host_${kind}_${o.color}.webp?v=20261009` };
  }

  function wear(id) {
    d().outfit = id;
    save();
    engine.setPlayerSheet(playerSheet());
  }

  function ambassadorSprite() {
    return d().avatar === 'girl' ? 'assets/chars/classmate_boy.webp' : 'assets/chars/classmate_girl.webp';
  }

  // Cắt khung nhìn trước của tờ sprite: toàn thân, hoặc chỉ phần đầu làm chân dung
  function spriteCanvas(src, kind, size, faceOnly) {
    const c = faceOnly
      ? el('canvas', { class: 'host-canvas', width: 120, height: 120 })
      : el('canvas', { class: 'host-canvas', width: 150, height: 216, style: `width:${Math.round(size * 0.7)}px;height:${size}px` });
    const im = new Image();
    im.onload = () => {
      const cw = kind === 'single' ? im.width : im.width / 4;   // Local Host nam và nữ: tờ 4 hướng × 4 khung
      const ch = kind === 'single' ? im.height : im.height / 4;
      const ctx = c.getContext('2d');
      if (faceOnly) ctx.drawImage(im, cw * 0.14, 0, cw * 0.72, cw * 0.72, 0, 0, 120, 120);
      else ctx.drawImage(im, 0, 0, cw, ch, 0, 0, 150, 216);
    };
    im.src = src;
    return c;
  }

  function portraitOf(id) {
    const ch = charOf(id);
    if (id === 'ambassador') return spriteCanvas(ambassadorSprite(), 'single', 96, true);
    if (!ch) {
      const s = playerSheet();
      return spriteCanvas(s.src, s.kind, 96, true);
    }
    return el('img', { src: ch.face, alt: tx(ch, 'name') });
  }

  /* ---------- HUD ---------- */

  function renderHud() {
    $('#hud-xp').textContent = d().xp;
    const cups = $('#tea-cups');
    cups.replaceChildren(...Array.from({ length: store.TEA_MAX }, (_, i) => el('span', { class: 'cup' + (i < d().tea ? ' active' : '') }, '☕')));
    cups.setAttribute('aria-label', L(`Trà Đá Helper: còn ${d().tea}/${store.TEA_MAX} cốc`, `Trà Đá Helper: ${d().tea}/${store.TEA_MAX} cups left`));
    $('#hud-booklets').textContent = `${bookletCount()}/${BOOKLETS.length}`;
    $('#hud-lanterns').textContent = DATA ? `${questsDone()}/${DATA.quests.length}` : '0/4';
    const sound = $('#btn-sound');
    sound.textContent = d().soundOn ? '🔊' : '🔇';
    sound.setAttribute('aria-pressed', String(d().soundOn));
    const lang = $('#btn-lang');
    lang.textContent = viUI() ? 'VI' : 'EN';
    lang.setAttribute('aria-label', L('Ngôn ngữ chỉ dẫn: Tiếng Việt. Bấm để chuyển sang tiếng Anh', 'Instruction language: English. Tap to switch to Vietnamese'));
    const labels = $('#btn-labels');
    labels.setAttribute('aria-pressed', String(d().labels));
    const open = DATA ? DATA.bosses.filter((b) => questsDone() >= b.unlock_quests).length : 0;
    $('#btn-boss .badge').textContent = open ? String(open) : '';
  }

  function useTea(n = 1) {
    if (d().tea < n) return false;
    d().tea -= n;
    save();
    renderHud();
    return true;
  }

  /* ---------- Khu phố ---------- */

  // Vào khu mới: không báo tên địa điểm cho người chơi, chỉ cập nhật giờ trong ngày
  function onZone() {
    updateChip();
  }

  // Hành trình hôm nay: mỗi nhiệm vụ chính thắp một đèn trên cổng Đêm hội
  function journeyRow() {
    return el('div', { class: 'journey' },
      el('span', {}, L('Hành trình hôm nay:', "Today's journey:")),
      DATA.quests.map((q) => el('span', { class: 'jl' + (isDone(q.id) ? ' lit' : ''), title: questTitle(q) }, '🏮')),
      el('span', {}, d().ceremony ? L('→ 🏅 Đã nhận danh hiệu', '→ 🏅 Title received') : L('→ 🌙 Lễ trao danh hiệu ở Đêm hội', '→ 🌙 Award ceremony at the Heritage Night')));
  }

  function updateChip() {
    if (!engine || !engine.zone) return;
    $('#zone-chip').textContent = L(...PHASE_LABEL[phase()]);
  }

  // Giờ thay đổi (xong nhiệm vụ chính, hoặc chờ tới hoàng hôn): báo tin, đổi ánh sáng, thả hoa đăng buổi tối
  function checkPhase() {
    const ph = phase();
    if (lastPhase && ph !== lastPhase) {
      if (PHASE_NEWS[ph]) toast(L(...PHASE_NEWS[ph]));
      if (engine && engine.map) engine.refresh(true);
    }
    lastPhase = ph;
    updateChip();
  }

  /* ---------- Poke & Prod: thẻ từ (Tra cứu từ vựng Đông Hồ) ---------- */

  function closeWordCard() {
    $('#word-card').hidden = true;
    syncPause();
  }

  function openWordCard(id) {
    const w = LEX[id];
    if (!w) return;
    const rec = store.word(id);
    const known = store.wordState(id) === 'known';
    const card = $('#word-card');
    const meaning = el('p', { class: 'wc-vi', hidden: known }, w.vi);
    const reveal = known
      ? el('button', { class: 'link-btn', type: 'button', onclick: () => { meaning.hidden = false; reveal.remove(); } }, L('👁 Hiện nghĩa (từ đã biết)', '👁 Show meaning (known word)'))
      : null;
    const tag = (status) => {
      store.tagWord(id, status);
      save();
      closeWordCard();
      toast(status === 'known'
        ? L(`✅ "${w.word}": Known · lần sau hiện màu xanh và ẩn nghĩa`, `✅ "${w.word}": Known · shown in green with the meaning hidden next time`)
        : L(`❓ "${w.word}": Unknown · đã thêm vào danh sách ưu tiên`, `❓ "${w.word}": Unknown · added to your priority list`));
    };
    card.replaceChildren(...[
      el('h4', { class: 'wc-title' }, el('span', {}, L('💡 Tra Cứu Từ Vựng Đông Hồ', '💡 Word Lookup')), el('button', { class: 'close-btn', type: 'button', 'aria-label': L('Đóng', 'Close'), onclick: closeWordCard }, '✕')),
      el('div', { class: 'wc-head' },
        w.img ? el('img', { class: 'wc-img', src: w.img, alt: '' }) : null,
        el('div', {},
          el('p', { class: 'wc-word', lang: 'en' }, w.word, ' ', el('button', { class: 'mini-btn', type: 'button', 'aria-label': L(`Nghe "${w.word}"`, `Listen to "${w.word}"`), onclick: () => C.speak(w.word) }, '🔊')),
          el('p', { class: 'wc-phon' }, w.phonetic, ' ', el('em', {}, w.type)),
          meaning,
          reveal)),
      el('div', { class: 'wc-ex' },
        el('p', { lang: 'en' }, w.example, ' ', el('button', { class: 'mini-btn', type: 'button', 'aria-label': L('Nghe câu ví dụ', 'Listen to the example'), onclick: () => C.speak(w.example) }, '🔊')),
        known ? null : el('p', { class: 'wc-ex-vi' }, w.example_vi)),
      el('p', { class: 'wc-meta' }, L(`Đã gặp ${rec.seen} lần · Gắn Unknown ${rec.unk} lần`, `Seen ${rec.seen}× · Tagged Unknown ${rec.unk}×`)),
      el('div', { class: 'wc-actions' },
        el('button', { class: 'btn-action tag-unknown' + (rec.status === 'unknown' ? ' active' : ''), type: 'button', onclick: () => tag('unknown') }, '❓ Unknown'),
        el('button', { class: 'btn-action tag-known' + (rec.status === 'known' ? ' active' : ''), type: 'button', onclick: () => tag('known') }, '✅ Known')),
    ].filter(Boolean));
    card.hidden = false;
    syncPause();
    if (d().soundOn) C.speak(w.word);
  }

  function pokeWord(id) {
    const firstEver = !d().words[id];
    store.pokeWord(id);
    save();
    if (firstEver) addXp(2, L('khám phá từ mới', 'new word found'));
    openWordCard(id);
  }

  /* ---------- Thu thập ---------- */

  function onCollect(item) {
    if (item.type === 'tea') {
      if (d().tea >= store.TEA_MAX) {
        if (!item.warned) toast(L('☕ Trà Đá Helper đang đầy. Dùng bớt rồi quay lại nhặt nhé.', '☕ Your Trà Đá Helper is full. Use some, then come back for this one.'));
        item.warned = true;
        return;
      }
      store.addTea(1);
      d().collected[item.id] = true;
      d().stats.teas += 1;
      if (!d().words['iced-tea']) store.seeWord('iced-tea');
      save();
      renderHud();
      toast(L('☕ Nhặt được một ly trà đá (iced tea): +1 Trà Đá Helper', '☕ You found an iced tea (trà đá): +1 Trà Đá Helper'));
      return;
    }
    d().collected[item.id] = true;
    save();
    renderHud();
    toast(L('📘 Bạn tìm thấy một Booklet ngữ pháp!', '📘 You found a grammar Booklet!'));
    openBooklet(item.id);
  }

  /* ---------- Khung thoại Đông Hồ ---------- */

  function wordButton(id, text) {
    const state = store.wordState(id);
    return el('button', {
      class: `term ${state === 'known' ? 'k' : state === 'unknown' ? 'u' : 'n'}`,
      type: 'button',
      onclick: () => pokeWord(id),
    }, text);
  }

  // Tô sáng các từ có trong từ điển; từ Known màu xanh, Unknown màu đỏ son
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

  function dialog(portrait, name, role, ...body) {
    const box = $('#dialog');
    box.replaceChildren(
      el('div', { class: 'npc-portrait' }, portrait),
      el('div', { class: 'dialogue-content' },
        el('div', { class: 'npc-header' },
          el('span', { class: 'npc-name' }, name),
          role ? el('span', { class: 'npc-role' }, role) : null,
          el('button', { class: 'close-btn', type: 'button', 'aria-label': L('Đóng khung thoại', 'Close dialogue'), onclick: closeQuest }, '✕')),
        el('div', { class: 'dlg-body' }, ...body)));
    box.hidden = false;
    box.scrollTop = 0;
    syncPause();
    if (window.matchMedia('(max-width: 720px)').matches) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function openQuest(q) {
    $('#word-card').hidden = true;
    C.stopListening();
    C.stopAudio();
    const run = d().questRun[q.id];
    quest = { q, step: -1, mistakes: 0, xp: 0, voice: 0, typed: 0, firstTry: 0, replay: isDone(q.id), resume: run && run.step > 0 ? run : null };
    renderQuest();
  }

  function closeQuest() {
    C.stopListening();
    C.stopAudio();
    $('#dialog').hidden = true;
    quest = null;
    syncPause();
  }

  function goStep(step) {
    quest.step = step;
    quest.mistakes = 0;
    if (step === quest.q.turns.length) {
      finishQuest();
      return;
    }
    // Lưu lượt đang làm: đóng khung thoại rồi quay lại vẫn làm tiếp được
    if (step > 0) {
      const { xp, voice, typed, firstTry } = quest;
      d().questRun[quest.q.id] = { step, xp, voice, typed, firstTry };
      save();
    }
    renderQuest();
  }

  function resumeQuest() {
    const run = quest.resume;
    Object.assign(quest, { xp: run.xp || 0, voice: run.voice || 0, typed: run.typed || 0, firstTry: run.firstTry || 0, resume: null });
    goStep(run.step);
  }

  function restartQuest() {
    delete d().questRun[quest.q.id];
    save();
    quest.resume = null;
    goStep(0);
  }

  // Chuyến thuyền đêm chỉ khởi hành lúc hoàng hôn: người chơi chọn chờ thì đồng hồ nhảy tới hoàng hôn
  function waitUntilSunset(q) {
    d().clock = Math.max(d().clock || 0, 3);
    save();
    closeQuest();
    checkPhase();
    engine.autoNpc = q.npc;
    openQuest(q);
  }

  function renderQuest() {
    C.stopListening();
    C.stopAudio();
    if (quest.step < 0) renderBrief();
    else renderTurn();
  }

  function renderBrief() {
    const { q } = quest;
    const npc = charOf(q.npc);
    const vocab = (q.target_vocabulary || []).filter((id) => LEX[id]);
    const todo = vocab.filter((id) => store.wordState(id) !== 'known').sort((a, b) => store.priority(b) - store.priority(a));
    const known = vocab.filter((id) => store.wordState(id) === 'known');
    const waitDusk = q.time === 'sunset' && !quest.replay && clockIndex() < 3;
    dialog(portraitOf(q.npc), tx(npc, 'name'), tx(npc, 'role'),
      el('h3', { class: 'dlg-title' }, `${q.icon} ${questTitle(q)}`, el('small', {}, ` · ${L(q.title_en, q.title)}`)),
      el('p', { class: 'dialogue-text' }, tx(q, 'mission')),
      el('ul', { class: 'objectives' }, tx(q, 'objectives').map((o) => el('li', {}, o))),
      todo.length
        ? el('div', { class: 'prep' },
          el('p', { class: 'prep-title' }, L('📌 Từ nên ôn trước (theo mức ưu tiên của bạn):', '📌 Words to review first (by your priority):')),
          el('div', { class: 'chips' }, todo.map((id) => wordButton(id, LEX[id].word))))
        : null,
      known.length ? el('p', { class: 'muted' }, `${L('✓ Bạn đã biết', '✓ You already know')}: ${known.map((id) => LEX[id].word).join(', ')}`) : null,
      quest.replay ? el('p', { class: 'notice' }, L('Bạn đã hoàn thành nhiệm vụ này. Chơi lại để luyện tập (không cộng thêm XP).', 'You have completed this mission. Play again for practice (no extra XP).')) : null,
      waitDusk ? el('p', { class: 'notice' }, L('⛵ Chuyến thuyền đêm chỉ khởi hành lúc hoàng hôn.', '⛵ The night cruise only leaves at sunset.')) : null,
      quest.resume && !waitDusk ? el('p', { class: 'notice' }, L(`📌 Bạn đang làm dở ở lượt ${quest.resume.step + 1}/${q.turns.length}.`, `📌 You stopped at turn ${quest.resume.step + 1}/${q.turns.length}.`)) : null,
      el('div', { class: 'action-bar' },
        el('button', { class: 'btn-action', type: 'button', onclick: closeQuest }, L('Để sau', 'Later')),
        waitDusk
          ? el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => waitUntilSunset(q) }, L('🌇 Chờ tới hoàng hôn ➔', '🌇 Wait until sunset ➔'))
          : quest.resume
            ? [el('button', { class: 'btn-action', type: 'button', onclick: restartQuest }, L('↺ Làm lại từ đầu', '↺ Start over')),
              el('button', { class: 'btn-action btn-primary', type: 'button', onclick: resumeQuest }, L(`Tiếp tục lượt ${quest.resume.step + 1} ➔`, `Continue from turn ${quest.resume.step + 1} ➔`))]
            : el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => goStep(0) }, L('Bắt đầu ➔', 'Start ➔'))));
  }

  function renderTurn() {
    const { q, step } = quest;
    const turn = q.turns[step];
    const ch = charOf(turn.speaker) || { name: turn.speaker, lang: 'en' };
    const isVi = (turn.lang || ch.lang) === 'vi';
    const trans = el('p', { class: 'dlg-trans', hidden: true });
    const replay = () => C.playLine(turn.audio_file, turn.text, isVi ? { langs: ['vi-VN', 'vi'] } : voiceOf(ch));
    let translateBtn = null;
    if (!isVi && turn.vi) {
      translateBtn = el('button', {
        class: 'btn-action small', type: 'button', disabled: d().tea < 1,
        title: L('Phrase Translator: dịch cả câu kèm âm thanh, tốn 1 cốc Trà Đá', 'Phrase Translator: translates the whole line with audio, costs 1 cup of Trà Đá'),
        onclick: () => {
          if (!useTea(1)) return;
          d().stats.translations += 1;
          save();
          trans.textContent = `🇻🇳 ${turn.vi}`;
          trans.hidden = false;
          translateBtn.disabled = true;
          translateBtn.textContent = L('☕ Đã dịch', '☕ Translated');
          C.speak(turn.text, { ...voiceOf(ch), rate: 0.78 });
        },
      }, d().tea < 1 ? L('☕ Hết Trà Đá', '☕ Out of Trà Đá') : L('💡 Dịch câu (−1☕)', '💡 Translate (−1☕)'));
    }
    if (!isVi) d().stats.linesSeen += 1;
    const feedback = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const ctx = { turn, ch, feedback, locked: false, body: null };
    ctx.body = buildTask(ctx);
    save();

    const type = TYPE_LABEL[turn.interaction_type] ? L(...TYPE_LABEL[turn.interaction_type]) : turn.interaction_type;
    dialog(portraitOf(turn.speaker), tx(ch, 'name'), `${L('Lượt', 'Turn')} ${step + 1}/${q.turns.length} · ${type}`,
      el('p', { class: 'dialogue-text' + (isVi ? ' vi' : ''), lang: isVi ? 'vi' : 'en' }, isVi ? `“${turn.text}”` : tokenize(turn.text)),
      trans,
      el('div', { class: 'dlg-tools' },
        translateBtn,
        el('button', { class: 'btn-action small', type: 'button', onclick: replay }, L('🔊 Nghe lại', '🔊 Replay'))),
      turn.prompt ? el('p', { class: 'dlg-prompt' }, `🗣️ ${tx(turn, 'prompt')}`) : null,
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
          el('p', { class: 'notice' }, L(`Dạng tương tác "${ctx.turn.interaction_type}" chưa được hỗ trợ.`, `Interaction type "${ctx.turn.interaction_type}" is not supported yet.`)),
          el('div', { class: 'action-bar' }, el('button', { class: 'btn-action', type: 'button', onclick: () => goStep(quest.step + 1) }, L('Bỏ qua ➔', 'Skip ➔'))));
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
    const next = el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => goStep(quest.step + 1) }, isLast ? L('Hoàn thành 🎉', 'Finish 🎉') : L('Tiếp tục ➔', 'Continue ➔'));
    showFeedback(ctx, 'good',
      el('p', { class: 'fb-title' }, firstTry ? L('✅ Chính xác! ', '✅ Correct! ') : L('✅ Hoàn thành! ', '✅ Done! '), el('b', {}, quest.replay ? L('(luyện tập)', '(practice)') : `+${gained} XP`)),
      ...extras,
      el('div', { class: 'action-bar' }, next));
    next.focus({ preventScroll: true });
  }

  function modelAnswer(label, text) {
    return el('div', { class: 'model' },
      el('div', {},
        el('p', { class: 'model-label' }, label),
        el('p', { class: 'model-text', lang: 'en' }, tokenize(text))),
      el('button', { class: 'mini-btn keep', type: 'button', 'aria-label': L('Nghe câu này', 'Listen to this sentence'), onclick: () => C.speak(text) }, '🔊'));
  }

  // Lời nhắc khi câu trả lời tự do chưa đạt, theo lý do do C.checkAnswer trả về
  function answerAdvice(r, minWords) {
    const pct = Math.round(r.similarity * 100);
    switch (r.reason) {
      case 'short': return minWords >= 12
        ? L(`Bài phát biểu hơi ngắn. Hãy nói 2–3 câu (ít nhất ${minWords} từ).`, `Your speech is a bit short. Say 2–3 sentences (at least ${minWords} words).`)
        : L(`Câu trả lời hơi ngắn. Hãy viết/nói thành câu hoàn chỉnh (ít nhất ${minWords} từ).`, `Your answer is a bit short. Make a full sentence (at least ${minWords} words).`);
      case 'repeat': return L('Câu trả lời đang lặp từ. Hãy diễn đạt tự nhiên, mỗi ý nói một lần.', 'You are repeating words. Say it naturally, each idea once.');
      case 'list': return L('Đừng chỉ liệt kê từ khoá. Hãy nối chúng thành câu có chủ ngữ, động từ và từ nối (the, and, so, because…).', "Don't just list the key words. Join them into a sentence with a subject, a verb and linking words (the, and, so, because…).");
      case 'verb': return L('Câu của bạn chưa có động từ. Thêm động từ, ví dụ: is, can, take, keep, protect…', 'Your sentence needs a verb, e.g. is, can, take, keep, protect…');
      case 'keywords': return L(`Mới dùng ${r.count}/${r.need} từ khoá cần thiết. Có thể dùng thêm: ${r.missing.join(', ')}.`, `You used ${r.count}/${r.need} of the key words. You could add: ${r.missing.join(', ')}.`);
      default: return L(`Câu trả lời chưa sát điều khách hỏi (khớp câu mẫu ${pct}%). Hãy trả lời đúng trọng tâm và dùng thêm ý trong gợi ý.`, `Your answer is not close enough to what the visitor asked (${pct}% match with the model). Stay on topic and use more ideas from the hints.`);
    }
  }

  const matchLine = (r) => el('p', { class: 'match' }, `🎯 ${L('Khớp câu mẫu', 'Match with the model')}: ${Math.round(r.similarity * 100)}%`);

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
    const slots = el('div', { class: 'slots', 'aria-label': L('Câu trả lời của bạn', 'Your answer') });
    const bankEl = el('div', { class: 'bank', 'aria-label': L('Các cụm từ', 'Phrase blocks') });
    const check = el('button', { class: 'btn-action btn-primary', type: 'button', onclick: onCheck }, L('Kiểm tra', 'Check'));

    function draw() {
      slots.replaceChildren(...(placed.length
        ? placed.map((b, i) => el('button', {
          class: 'block placed' + (i < locked ? ' locked' : ''), type: 'button', lang: 'en',
          disabled: ctx.locked || i < locked,
          onclick: () => { placed.splice(i, 1); bank.push(b); draw(); },
        }, b.text))
        : [el('span', { class: 'slots-empty' }, L('Chạm các cụm từ bên dưới theo đúng thứ tự', 'Tap the phrases below in the right order'))]));
      bankEl.replaceChildren(...bank.map((b, i) => el('button', {
        class: 'block', type: 'button', lang: 'en', disabled: ctx.locked,
        onclick: () => { bank.splice(i, 1); placed.push(b); draw(); },
      }, b.text)));
      check.disabled = ctx.locked || bank.length > 0;
    }

    function onCheck() {
      if (C.normalize(placed.map((b) => b.text).join(' ')) === target) {
        passTurn(ctx, [modelAnswer(L('Câu trả lời của bạn', 'Your answer'), answer)]);
        draw();
        return;
      }
      let k = 0;
      while (k < placed.length && placed[k].text === blocks[k]) k++;
      locked = k;
      bank = shuffled(bank.concat(placed.splice(k)));
      draw();
      markMistake(ctx, k
        ? L(`Chưa đúng thứ tự. ${k} cụm đầu đã đúng (màu xanh), hãy xếp tiếp phần còn lại.`, `Not quite. The first ${k} phrase(s) are in place (green); arrange the rest.`)
        : L('Chưa đúng thứ tự. Hãy thử lại!', 'Not in the right order. Try again!'));
    }

    draw();
    return el('div', { class: 'task' },
      el('p', { class: 'task-hint' }, L('Sắp xếp các cụm từ thành câu trả lời hoàn chỉnh.', 'Arrange the phrases into a complete answer.')),
      slots, bankEl,
      el('div', { class: 'action-bar' }, check));
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
            passTurn(ctx, [modelAnswer(L('Câu trả lời của bạn', 'Your answer'), opt.text)]);
          } else {
            btn.classList.add('wrong');
            btn.disabled = true;
            markMistake(ctx, tx(opt, 'why') || L('Câu này chưa đáp ứng điều khách cần. Chọn lại nhé!', 'This reply does not give the visitor what they need. Try again!'));
          }
        },
      }, opt.text);
      list.append(btn);
    });
    return el('div', { class: 'task' }, el('p', { class: 'task-hint' }, L('Chọn câu trả lời phù hợp nhất của Local Host.', 'Choose the best reply for a Local Host.')), list);
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
      class: 'answer', rows: 2, lang: 'en', spellcheck: 'true', autocapitalize: 'sentences',
      placeholder, 'aria-label': L('Câu trả lời của bạn', 'Your answer'),
    });
  }

  /* Viết câu trả lời */
  function buildTyping(ctx) {
    const { turn } = ctx;
    const hints = turn.typing_hints || [];
    const helper = turn.helper_prompt;
    const area = answerBox(L('Viết câu trả lời bằng tiếng Anh…', 'Write your answer in English…'));
    const chipEls = hints.map((h) => el('button', { class: 'chip add', type: 'button', lang: 'en', title: L('Chèn vào câu trả lời', 'Add to your answer'), onclick: () => insertAtCursor(area, h) }, h));
    const helperBox = el('div', { class: 'helper', hidden: true });
    const sampleBox = el('div', { hidden: true }, modelAnswer(L('Câu mẫu tham khảo', 'Sample answer'), turn.sample_correct_response));
    const check = el('button', { class: 'btn-action btn-primary', type: 'button', disabled: true, onclick: onCheck }, L('Kiểm tra', 'Check'));
    let helperBtn = null;
    if (helper) {
      const cost = helper.energy_cost ?? 1;
      helperBtn = el('button', {
        class: 'btn-action small', type: 'button', disabled: d().tea < cost,
        onclick: () => {
          if (!useTea(cost)) return;
          helperBox.replaceChildren(el('p', {}, '💡 ', el('b', { lang: 'en' }, helper.term), `: ${helper.definition}`));
          helperBox.hidden = false;
          helperBtn.remove();
        },
      }, d().tea >= cost ? L(`💡 Dùng Trà Đá Helper (−${cost}☕)`, `💡 Use Trà Đá Helper (−${cost}☕)`) : L('☕ Hết Trà Đá', '☕ Out of Trà Đá'));
    }
    area.addEventListener('input', () => {
      check.disabled = !area.value.trim();
      const { hits } = C.scoreKeywords(area.value, hints);
      chipEls.forEach((c, i) => c.classList.toggle('hit', hits[i]));
    });
    // Đạt khi: đủ dài, không lặp từ, không chỉ liệt kê, có động từ, dùng ít nhất 2 từ gợi ý và đủ khớp câu mẫu
    const need = Math.min(2, hints.length);
    function onCheck() {
      const r = C.checkAnswer(area.value, { keywords: hints, sample: turn.sample_correct_response, need, minWords: MIN_TYPED_WORDS });
      chipEls.forEach((c, i) => c.classList.toggle('hit', Boolean(r.hits[i])));
      if (r.ok) {
        sampleBox.remove();
        passTurn(ctx, [matchLine(r), modelAnswer(L('Câu mẫu tham khảo', 'Sample answer'), turn.sample_correct_response)]);
        return;
      }
      if (r.reason === 'short') {
        showFeedback(ctx, 'warn', el('p', {}, answerAdvice(r, MIN_TYPED_WORDS)));
        return;
      }
      markMistake(ctx, answerAdvice(r, MIN_TYPED_WORDS));
      if (quest.mistakes >= SHOW_MODEL_AFTER) sampleBox.hidden = false;
    }
    return el('div', { class: 'task' },
      el('p', { class: 'task-hint' }, L(`Viết thành câu hoàn chỉnh, dùng ít nhất ${need} từ gợi ý (chạm để chèn):`, `Write a full sentence using at least ${need} hint words (tap to insert):`)),
      el('div', { class: 'chips' }, chipEls),
      helperBtn ? el('div', { class: 'dlg-tools' }, helperBtn) : null,
      helperBox, area, sampleBox,
      el('div', { class: 'action-bar' }, check));
  }

  /* Nói, có phương án gõ câu trả lời thay thế */
  function buildSpeaking(ctx) {
    const { turn } = ctx;
    const keywords = turn.expected_keywords || [];
    const need = turn.need || Math.min(keywords.length, Math.max(2, Math.ceil(keywords.length * SPEAK_PASS_RATIO)));
    const minWords = turn.min_words || MIN_SPOKEN_WORDS;
    const checkOpts = { keywords, sample: turn.target_speech, need, minWords, ...(turn.min_similarity != null ? { minSimilarity: turn.min_similarity } : {}) };
    const chipEls = keywords.map((k) => el('span', { class: 'chip', lang: 'en' }, C.firstAlt(k)));
    const model = el('div', { hidden: true }, modelAnswer(L('Câu mẫu', 'Model answer'), turn.target_speech));
    const showModelBtn = el('button', { class: 'btn-action small', type: 'button', onclick: () => revealModel() }, L('👁 Xem câu mẫu', '👁 Show model answer'));
    const modeBox = el('div', { class: 'mode-box' });
    const hint = el('p', { class: 'task-hint' });
    // Người nghe là du khách (việc nhỏ của người địa phương khai báo du khách trong trường visitor)
    const listener = charOf(quest.q.visitor || quest.q.npc);

    function revealModel() {
      model.hidden = false;
      showModelBtn.remove();
    }
    const paintHits = (hits) => chipEls.forEach((c, i) => c.classList.toggle('hit', Boolean(hits[i])));

    function evaluate(text, mode) {
      const r = C.checkAnswer(text, checkOpts);
      paintHits(r.hits);
      if (r.ok) {
        quest[mode] += 1;
        d().stats[mode] += 1;
        model.remove();
        passTurn(ctx, [
          mode === 'typed' ? el('p', {}, L('⌨️ Bạn đã gõ thay vì nói ở lượt này. Lần sau hãy thử nói nhé!', '⌨️ You typed instead of speaking this turn. Try speaking next time!')) : null,
          matchLine(r),
          modelAnswer(L('Câu mẫu', 'Model answer'), turn.target_speech),
        ].filter(Boolean));
        return;
      }
      const msg = answerAdvice(r, minWords);
      const extra = [];
      if (quest.mistakes + 1 >= SHOW_MODEL_AFTER) {
        revealModel();
        if (mode === 'voice') extra.push(el('button', { class: 'link-btn', type: 'button', onclick: () => useTyping() }, L('⌨️ Khó nói? Gõ câu trả lời', '⌨️ Hard to say? Type your answer')));
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
      hint.textContent = L(`Nói với ${listener ? tx(listener, 'name') : 'khách'} bằng tiếng Anh. Câu nói cần có ít nhất ${need}/${keywords.length} từ khoá:`, `Speak to ${listener ? tx(listener, 'name') : 'the visitor'} in English. Use at least ${need}/${keywords.length} key words:`);
      const transcript = el('p', { class: 'transcript', 'aria-live': 'polite' });
      const mic = el('button', { class: 'mic', type: 'button' }, L('🎙️ Nhấn để nói', '🎙️ Tap to speak'));
      const setListening = (on) => {
        mic.classList.toggle('listening', on);
        mic.textContent = on ? L('⏹ Đang nghe… nhấn để dừng', '⏹ Listening… tap to stop') : L('🎙️ Nhấn để nói', '🎙️ Tap to speak');
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
            transcript.textContent = `${L('Bạn nói', 'You said')}: “${text}”`;
          },
          onResult: (alts) => {
            // Chọn cách nghe hiểu tốt nhất trong các phương án máy nhận dạng đưa ra
            const score = (a) => { const r = C.checkAnswer(a, checkOpts); return (r.ok ? 2 : 0) + r.similarity; };
            const best = alts.reduce((a, b) => (score(b) > score(a) ? b : a));
            transcript.className = 'transcript';
            transcript.textContent = `${L('Bạn nói', 'You said')}: “${best}”`;
            evaluate(best, 'voice');
          },
          onFail: (code) => {
            if (code === 'no-speech') {
              transcript.className = 'transcript';
              transcript.textContent = L('Chưa nghe thấy giọng nói. Nhấn 🎙️ rồi nói lại, hoặc gõ câu trả lời.', 'No speech heard. Tap 🎙️ and try again, or type your answer.');
              return;
            }
            useTyping(MIC_ERRORS[code] ? L(...MIC_ERRORS[code]) : L(`Nhận dạng giọng nói gặp lỗi (${code}). Bạn hãy gõ câu trả lời bên dưới.`, `Speech recognition error (${code}). Type your answer below.`));
          },
        });
      });
      modeBox.replaceChildren(mic, transcript,
        el('button', { class: 'link-btn', type: 'button', onclick: () => useTyping() }, L('⌨️ Không nói được? Gõ câu trả lời', "⌨️ Can't speak now? Type your answer")));
    }

    function renderText(reason) {
      C.stopListening();
      hint.textContent = L(`Gõ câu bạn muốn nói với ${listener ? tx(listener, 'name') : 'khách'}. Câu trả lời cần có ít nhất ${need}/${keywords.length} từ khoá:`, `Type what you would say to ${listener ? tx(listener, 'name') : 'the visitor'}. Use at least ${need}/${keywords.length} key words:`);
      const area = answerBox(L('Gõ câu trả lời bằng tiếng Anh…', 'Type your answer in English…'));
      const check = el('button', { class: 'btn-action btn-primary', type: 'button', disabled: true, onclick: () => evaluate(area.value, 'typed') }, L('Kiểm tra', 'Check'));
      area.addEventListener('input', () => {
        check.disabled = !area.value.trim();
        paintHits(C.scoreKeywords(area.value, keywords).hits);
      });
      modeBox.replaceChildren(...[
        reason ? el('p', { class: 'notice' }, reason) : null,
        area,
        el('div', { class: 'action-bar' }, check),
        C.canListen ? el('button', { class: 'link-btn', type: 'button', onclick: () => { preferTyping = false; renderVoice(); } }, L('🎙️ Chuyển sang nói', '🎙️ Switch to speaking')) : null,
      ].filter(Boolean));
    }

    if (!C.canListen) renderText(L(...MIC_ERRORS.unsupported));
    else if (preferTyping) renderText();
    else renderVoice();

    return el('div', { class: 'task' },
      hint,
      el('div', { class: 'chips' }, chipEls),
      el('div', { class: 'dlg-tools' },
        el('button', { class: 'btn-action small keep', type: 'button', onclick: () => C.speak(turn.target_speech, voiceOf(null)) }, L('🔊 Nghe câu mẫu', '🔊 Hear the model')),
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
    // Bước cuối: một hành động nhỏ ngay trong cảnh (cắm sạc, treo áo dài, treo đèn, thả hoa đăng)
    if (q.finale && !quest.replay && !quest.finaleDone && engine.hasFinale(q.id)) {
      renderFinale();
      return;
    }
    if (q === DATA.ceremony) {
      finishCeremony();
      return;
    }
    if (isSide(q)) {
      finishSide();
      return;
    }
    const rec = d().quests[q.id] || {};
    const first = !rec.done;
    const doneBefore = questsDone();
    const r = q.rewards || {};
    const items = [el('li', {}, quest.replay ? L('⭐ Lượt luyện tập (không cộng XP)', '⭐ Practice run (no XP)') : `${L('⭐ XP từ các lượt', '⭐ XP from turns')}: +${quest.xp}`)];
    let outfit = null;
    if (first) {
      if (r.xp) {
        d().xp += r.xp;
        items.push(el('li', {}, `${L('🎁 Thưởng hoàn thành', '🎁 Completion bonus')}: +${r.xp} XP`));
      }
      if (addTitle(r.title)) items.push(el('li', {}, `${L('🏅 Danh hiệu mới', '🏅 New title')}: ${r.title}`));
      outfit = unlockOutfit(r.outfit);
      if (outfit) items.push(el('li', {}, `${L('👘 Trang phục mới', '👘 New outfit')}: ${outfitName(outfit)}`));
      if (r.tea) {
        const got = store.addTea(r.tea);
        if (got) items.push(el('li', {}, `☕ +${got} Trà Đá Helper`));
      }
      items.push(el('li', {}, L('🧊 Quầy Trà Đá: +1 lượt đổi ly', '🧊 Iced-tea stall: +1 refill')));
    }
    recordDone(q, rec);
    if (quest.voice + quest.typed) items.push(el('li', {}, L(`🎙️ Nói: ${quest.voice} lượt · ⌨️ Gõ thay: ${quest.typed} lượt`, `🎙️ Spoken: ${quest.voice} · ⌨️ Typed: ${quest.typed}`)));
    items.push(el('li', {}, L(`🎯 Đúng ngay lần đầu: ${quest.firstTry}/${q.turns.length} lượt`, `🎯 Right on the first try: ${quest.firstTry}/${q.turns.length} turns`)));
    const nowDone = questsDone();
    DATA.bosses.forEach((b) => {
      if (doneBefore < b.unlock_quests && nowDone >= b.unlock_quests) items.push(el('li', {}, L(`⚔️ Mở khoá Boss: ${b.name}. Tới Hội An Quán để khiêu chiến!`, `⚔️ Boss unlocked: ${b.name}. Challenge it at the Hoi An Assembly Hall!`)));
    });
    sideQuests().forEach((sq) => {
      if (sq.requires === q.id && first) items.push(el('li', {}, L(`🤝 Mở việc nhỏ: ${questTitle(sq)}`, `🤝 New favour: ${questTitle(sq)}`)));
    });
    const allDone = nowDone === DATA.quests.length && doneBefore < DATA.quests.length;
    if (first) items.push(el('li', {}, L(`🏮 Thắp đèn thứ ${nowDone}/${DATA.quests.length} trên cổng Đêm hội`, `🏮 Lantern ${nowDone}/${DATA.quests.length} lit on the Heritage Night gate`)));
    if (allDone) items.push(el('li', {}, L('🌙 Đủ 4 đèn! Lên Quảng trường Hội An Quán dự lễ trao danh hiệu.', '🌙 All 4 lanterns are lit! Go to Assembly Hall Square for the award ceremony.')));
    save();
    renderHud();
    afterDone();
    const next = DATA.quests.find((x) => !isDone(x.id));
    const npc = charOf(q.npc);
    dialog(portraitOf(q.npc), tx(npc, 'name'), L('Hoàn thành nhiệm vụ 🎉', 'Mission complete 🎉'),
      el('h3', { class: 'dlg-title' }, `${q.icon} ${questTitle(q)}`),
      el('ul', { class: 'reward-list' }, items),
      next ? el('p', { class: 'muted' }, `${L('Nhiệm vụ tiếp theo', 'Next mission')}: ${next.icon} ${questTitle(next)} (${zoneLabel(next.zone)})`) : null,
      el('div', { class: 'action-bar' },
        outfit ? el('button', { class: 'btn-action', type: 'button', onclick: () => { wear(outfit.id); toast(`${L('👘 Đang mặc', '👘 Wearing')}: ${outfitName(outfit)}`); closeQuest(); } }, `${L('Mặc', 'Wear')} ${outfitName(outfit)}`) : null,
        el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeQuest(); if (allDone) guideToCeremony(); } }, allDone ? L('🌙 Lên Đêm hội ➔', '🌙 Go to the Heritage Night ➔') : L('Đóng', 'Close'))));
  }

  function guideToCeremony() {
    engine.setGuide({ npc: 'ambassador', label: tx(charOf('ambassador'), 'name') });
    toast(L('🧭 Đi theo mũi tên đỏ tới lễ trao danh hiệu', '🧭 Follow the red arrow to the award ceremony'));
  }

  // Lễ trao danh hiệu: sau lời cảm ơn của 4 du khách và bài nói tổng kết, trao danh hiệu và giấy chứng nhận
  function finishCeremony() {
    const { q } = quest;
    const rec = d().quests[q.id] || {};
    const items = [el('li', {}, `${L('⭐ XP từ các lượt', '⭐ XP from turns')}: +${quest.xp}`)];
    if (!d().ceremony) {
      d().ceremony = true;
      d().xp += (q.rewards || {}).xp || 0;
      items.push(el('li', {}, `${L('🎁 Thưởng hoàn thành hành trình', '🎁 Journey bonus')}: +${(q.rewards || {}).xp || 0} XP`));
      addTitle(DATA.final_title);
      items.push(el('li', {}, `${L('🏅 Danh hiệu', '🏅 Title')}: ${DATA.final_title}`));
    }
    recordDone(q, rec);
    save();
    renderHud();
    C.sfx('victory');
    engine.celebrate(8);
    dialog(portraitOf('ambassador'), tx(charOf('ambassador'), 'name'), L('Chúc mừng! 🎉', 'Congratulations! 🎉'),
      el('h3', { class: 'dlg-title' }, `🏅 ${DATA.final_title}`),
      el('p', { class: 'dialogue-text' + (viUI() ? ' vi' : '') }, L(`“Thay mặt Ban tổ chức Đêm hội, mình trao cho ${playerName()} danh hiệu ${DATA.final_title}. Cảm ơn bạn đã đón khách bằng tiếng Anh thật tuyệt hôm nay!”`, `“On behalf of the Heritage Night, I award ${playerName()} the title ${DATA.final_title}. Thank you for welcoming our visitors in English so well today!”`)),
      el('ul', { class: 'reward-list' }, items),
      el('div', { class: 'action-bar' },
        el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeQuest(); openCertificate(); } }, L('📜 Nhận giấy chứng nhận', '📜 Receive your certificate'))));
  }

  function recordDone(q, rec) {
    d().quests[q.id] = {
      done: true,
      voice: (rec.voice || 0) + quest.voice,
      typed: (rec.typed || 0) + quest.typed,
      firstTry: Math.max(rec.firstTry || 0, quest.firstTry),
      turns: q.turns.length,
    };
    delete d().questRun[q.id];
  }

  // Sau khi xong một nhiệm vụ: NPC đổi chỗ (Mark ra quán cà phê, Sarah dạo vườn), trời muộn hơn
  function afterDone() {
    engine.refresh();
    checkPhase();
  }

  function renderFinale() {
    const { q } = quest;
    const f = q.finale;
    const npc = charOf(q.npc);
    dialog(portraitOf(q.npc), tx(npc, 'name'), L('Bước cuối', 'Final step'),
      el('h3', { class: 'dlg-title' }, `✨ ${tx(f, 'title')}`),
      el('p', { class: 'dialogue-text' }, tx(f, 'text')),
      el('div', { class: 'action-bar' }, el('button', {
        class: 'btn-action btn-primary', type: 'button',
        onclick: () => {
          const current = quest;
          $('#dialog').hidden = true;
          syncPause();
          engine.playFinale(q.id, () => {
            if (quest !== current) return;
            current.finaleDone = true;
            finishQuest();
          });
        },
      }, tx(f, 'button'))));
  }

  // Việc nhỏ của người địa phương: chỉ thưởng XP, không tính vào 4 nhiệm vụ chính
  function finishSide() {
    const { q } = quest;
    const rec = d().quests[q.id] || {};
    const items = [el('li', {}, quest.replay ? L('⭐ Lượt luyện tập (không cộng XP)', '⭐ Practice run (no XP)') : `${L('⭐ XP từ các lượt', '⭐ XP from turns')}: +${quest.xp}`)];
    const r = q.rewards || {};
    if (!rec.done && r.xp) {
      d().xp += r.xp;
      items.push(el('li', {}, `${L('🎁 Thưởng giúp người địa phương', '🎁 Bonus for helping a local')}: +${r.xp} XP`));
    }
    recordDone(q, rec);
    items.push(el('li', {}, L(`🎯 Đúng ngay lần đầu: ${quest.firstTry}/${q.turns.length} lượt`, `🎯 Right on the first try: ${quest.firstTry}/${q.turns.length} turns`)));
    save();
    renderHud();
    afterDone();
    const npc = charOf(q.npc);
    dialog(portraitOf(q.npc), tx(npc, 'name'), L('Cảm ơn cháu nhiều! 🙏', 'Thank you so much! 🙏'),
      el('h3', { class: 'dlg-title' }, `${q.icon} ${questTitle(q)}`),
      el('ul', { class: 'reward-list' }, items),
      el('div', { class: 'action-bar' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: closeQuest }, L('Đóng', 'Close'))));
  }

  /* ---------- Bảng (sheet) ---------- */

  function openSheet(title, ...body) {
    $('#word-card').hidden = true;
    $('#sheet-title').textContent = title;
    $('#sheet-body').replaceChildren(...body.filter(Boolean));
    $('#sheet').hidden = false;
    $('#sheet-body').scrollTop = 0;
    syncPause();
    $('#sheet-close').focus({ preventScroll: true });
  }

  function closeSheet() {
    if (battle && !battle.ended && !window.confirm(L('Rút lui khỏi trận đấu Boss?', 'Retreat from the Boss battle?'))) return;
    battle = null;
    $('#sheet').hidden = true;
    syncPause();
  }

  /* Giấy chứng nhận Local Host */
  function openCertificate() {
    reopenSheet = openCertificate;
    if (!d().ceremony) {
      const all = allMainDone();
      openSheet(L('📜 Giấy chứng nhận Local Host', '📜 Local Host Certificate'),
        el('p', { class: 'notice' }, L(`Giấy chứng nhận và danh hiệu ${DATA.final_title} được trao tại Lễ trao danh hiệu ở Đêm hội di sản (Quảng trường Hội An Quán, buổi tối).`, `The certificate and the ${DATA.final_title} title are presented at the award ceremony at the Heritage Night (Assembly Hall Square, in the evening).`)),
        journeyRow(),
        el('p', { class: 'muted' }, all
          ? L('Bạn đã thắp đủ 4 đèn. Lên Đêm hội ngay thôi!', 'All 4 lanterns are lit. Head to the Heritage Night now!')
          : L(`Hoàn thành thêm ${DATA.quests.length - questsDone()} nhiệm vụ để thắp đủ đèn trên cổng Đêm hội.`, `Complete ${DATA.quests.length - questsDone()} more mission(s) to light every lantern on the gate.`)),
        el('div', { class: 'action-bar' },
          el('button', { class: 'btn-action', type: 'button', onclick: closeSheet }, L('Đóng', 'Close')),
          all ? el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeSheet(); guideToCeremony(); } }, L('🧭 Chỉ đường tới Đêm hội', '🧭 Show me the way')) : null));
      return;
    }
    const nameInput = el('input', { class: 'name-input', type: 'text', maxlength: 40, value: d().name || '', placeholder: L('Nhập tên của bạn', 'Enter your name'), 'aria-label': L('Tên Local Host', 'Local Host name') });
    const nameLine = el('p', { class: 'cert-name' }, playerName());
    nameInput.addEventListener('input', () => {
      d().name = nameInput.value.trim();
      save();
      nameLine.textContent = playerName();
    });
    const date = new Date().toLocaleDateString(L('vi-VN', 'en-GB'));
    openSheet(L('📜 Giấy chứng nhận Local Host', '📜 Local Host Certificate'),
      el('div', { class: 'certificate dongho-panel' },
        el('img', { src: 'assets/items/certificate.webp', alt: '', class: 'cert-icon' }),
        el('p', { class: 'cert-kicker' }, 'IMMERSION TOWN'),
        el('p', { class: 'cert-title' }, 'CERTIFICATE'),
        el('p', {}, L('Chứng nhận', 'This certifies that')),
        nameLine,
        el('p', {}, L(`đã hoàn thành ${questsDone()}/${DATA.quests.length} nhiệm vụ đón khách bằng tiếng Anh và được trao danh hiệu`, `has completed ${questsDone()}/${DATA.quests.length} English hosting missions and is awarded the title`)),
        el('p', { class: 'cert-award' }, `🏅 ${DATA.final_title}`),
        el('p', { class: 'muted' }, `⭐ ${d().xp} Cultural Host XP · ${date}`)),
      el('label', { class: 'name-label' }, L('Tên in trên giấy chứng nhận: ', 'Name on the certificate: '), nameInput),
      el('div', { class: 'action-bar' },
        el('button', { class: 'btn-action', type: 'button', onclick: () => window.print() }, L('🖨️ In', '🖨️ Print')),
        el('button', { class: 'btn-action btn-primary', type: 'button', onclick: closeSheet }, L('Đóng', 'Close'))));
  }

  /* Nhật ký nhiệm vụ */
  function questCard(q) {
    const rec = d().quests[q.id] || {};
    const npc = charOf(q.npc);
    const open = !isSide(q) || sideOpen(q);
    const req = !open && DATA.quests.find((x) => x.id === q.requires);
    return el('article', { class: 'quest-card dongho-panel' + (rec.done ? ' done' : '') + (open ? '' : ' locked') },
      el('img', { class: 'quest-thumb', src: q.card, alt: '' }),
      el('div', {},
        el('h3', {}, `${q.icon} ${questTitle(q)}`),
        el('p', { class: 'muted' }, `${tx(npc, 'name')} · ${zoneLabel(q.zone)}`),
        el('p', {}, tx(q, 'topic')),
        el('div', { class: 'quest-foot' },
          el('span', { class: 'status' }, !open
            ? L(`🔒 Mở sau nhiệm vụ "${questTitle(req)}"`, `🔒 Unlocks after "${questTitle(req)}"`)
            : rec.done ? L('✓ Đã hoàn thành', '✓ Completed')
              : d().questRun[q.id] ? L(`Đang làm dở: lượt ${d().questRun[q.id].step + 1}/${q.turns.length}`, `In progress: turn ${d().questRun[q.id].step + 1}/${q.turns.length}`)
                : L(`${q.turns.length} lượt hội thoại`, `${q.turns.length} dialogue turns`)),
          el('button', { class: 'btn-action small btn-primary', type: 'button', disabled: !open, onclick: () => goToQuest(q) }, rec.done ? L('Chơi lại', 'Play again') : L('Đi tới ➔', 'Go ➔')))));
  }

  function openQuestLog() {
    reopenSheet = openQuestLog;
    openSheet(L('🎯 Nhiệm vụ Local Host', '🎯 Local Host Missions'),
      el('p', { class: 'muted' }, L('Bạn là Local Host, đại sứ hiếu khách của Hội An. Gặp du khách có con dấu đỏ "!" trên đầu để giúp họ bằng tiếng Anh. Bấm "Đi tới" để hiện mũi tên đỏ chỉ đường.', 'You are a Local Host, Hoi An’s hospitality ambassador. Find visitors with a red "!" seal above their heads and help them in English. Tap "Go" to show a red arrow that points the way.')),
      journeyRow(),
      el('div', { class: 'quest-list' }, DATA.quests.map(questCard)),
      sideQuests().length ? el('h4', {}, L('🤝 Việc nhỏ giúp người địa phương', '🤝 Local favours')) : null,
      sideQuests().length ? el('p', { class: 'muted' }, L('Phiên dịch giúp cô bác người Hội An. Không bắt buộc, được thưởng XP.', 'Interpret for local people. Optional, with bonus XP.')) : null,
      el('div', { class: 'quest-list' }, sideQuests().map(questCard)),
      d().ceremony
        ? el('div', { class: 'action-bar' }, el('button', { class: 'btn-action', type: 'button', onclick: openCertificate }, L('📜 Xem giấy chứng nhận', '📜 View certificate')))
        : allMainDone() ? el('div', { class: 'action-bar' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeSheet(); guideToCeremony(); } }, L('🌙 Lên Đêm hội ➔', '🌙 Go to the Heritage Night ➔'))) : null);
  }

  // Chưa xong: hiện mũi tên đỏ dẫn đường (người chơi tự đi qua các khu). Đã xong: dịch chuyển để chơi lại cho nhanh.
  function goToQuest(q) {
    closeSheet();
    const npc = charOf(q.npc);
    if (isDone(q.id)) {
      if (!engine.travelTo(q.npc)) toast(L('Không tìm thấy nhân vật.', 'Character not found.'));
      return;
    }
    engine.setGuide({ npc: q.npc, label: tx(npc, 'name') });
    toast(L(`🧭 Đi theo mũi tên đỏ để gặp ${tx(npc, 'name')}`, `🧭 Follow the red arrow to find ${tx(npc, 'name')}`));
  }

  /* Sổ từ (danh sách ưu tiên Unknown, đã biết, đã gặp) */
  function openWordBook(tab = 'priority') {
    reopenSheet = () => openWordBook(tab);
    const all = Object.keys(d().words).filter((id) => LEX[id]);
    const lists = {
      priority: store.priorityList().filter((id) => LEX[id]),
      known: all.filter((id) => store.wordState(id) === 'known'),
      seen: all.sort((a, b) => (d().words[b].seen || 0) - (d().words[a].seen || 0)),
    };
    const tabs = [
      ['priority', `❓ ${L('Ưu tiên', 'Priority')} (${lists.priority.length})`],
      ['known', `✅ ${L('Đã biết', 'Known')} (${lists.known.length})`],
      ['seen', `👀 ${L('Đã gặp', 'Seen')} (${lists.seen.length})`],
    ];
    const rows = lists[tab].map((id, i) => {
      const w = LEX[id];
      const rec = d().words[id];
      const known = rec.status === 'known';
      return el('li', { class: 'word-row' + (known ? ' known' : rec.status === 'unknown' ? ' unknown' : '') },
        tab === 'priority' ? el('span', { class: 'rank' }, String(i + 1)) : null,
        w.img ? el('img', { class: 'word-img', src: w.img, alt: '' }) : el('button', { class: 'mini-btn', type: 'button', 'aria-label': L(`Nghe "${w.word}"`, `Listen to "${w.word}"`), onclick: () => C.speak(w.word) }, '🔊'),
        el('div', { class: 'word-main' },
          el('p', {}, el('b', { lang: 'en' }, w.word), ' ', el('span', { class: 'phon' }, w.phonetic)),
          el('p', { class: 'muted' }, known ? L('Nghĩa đã ẩn (Known)', 'Meaning hidden (Known)') : w.vi)),
        el('span', { class: 'word-meta' }, `${L('gặp', 'seen')} ${rec.seen} · ❓${rec.unk}${rec.miss ? ` · ${L('sai', 'missed')} ${rec.miss}` : ''}`),
        el('button', { class: 'btn-action small', type: 'button', onclick: () => { store.tagWord(id, known ? 'unknown' : 'known'); save(); openWordBook(tab); } }, known ? '❓' : '✅'));
    });
    openSheet(L('📒 Sổ từ của bạn', '📒 Your Word Book'),
      el('p', { class: 'muted' }, L(`Đã khám phá ${all.length}/${LEX_LIST.length} từ quanh phố Hội An. Từ gắn Unknown càng nhiều lần càng xếp cao trong danh sách ưu tiên.`, `You have discovered ${all.length}/${LEX_LIST.length} words around Hoi An. The more often you tag a word Unknown, the higher it ranks on your priority list.`)),
      el('div', { class: 'tabs' }, tabs.map(([key, label]) => el('button', { class: 'tab' + (key === tab ? ' active' : ''), type: 'button', onclick: () => openWordBook(key) }, label))),
      tab === 'priority' && lists.priority.length
        ? el('div', { class: 'action-bar start' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => startReview() }, L(`🧠 Ôn ${Math.min(5, lists.priority.length)} từ ưu tiên`, `🧠 Review ${Math.min(5, lists.priority.length)} priority words`)))
        : null,
      rows.length ? el('ul', { class: 'word-list' }, rows) : el('p', { class: 'notice' }, tab === 'priority'
        ? L('Chưa có từ Unknown. Chạm vào vật thể lấp lánh hoặc từ tô sáng, rồi chọn "❓ Unknown" cho từ bạn chưa chắc.', 'No Unknown words yet. Tap a sparkling object or a highlighted word, then choose "❓ Unknown" for words you are not sure about.')
        : L('Chưa có từ nào ở mục này.', 'No words here yet.')));
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
    reopenSheet = null;
    const step = () => {
      if (i >= ids.length) {
        save();
        openSheet(L('🧠 Kết quả ôn tập', '🧠 Review results'),
          el('p', { class: 'fb-title' }, L(`Đúng ${right}/${ids.length} từ.`, `${right}/${ids.length} correct.`)),
          learned.length
            ? el('p', { class: 'notice good' }, `${L('🎉 Đã thuộc (tự chuyển sang Known)', '🎉 Learned (moved to Known)')}: ${learned.join(', ')}`)
            : el('p', { class: 'muted' }, L('Trả lời đúng một từ 2 lần liên tiếp để nó tự chuyển sang Known.', 'Answer a word correctly twice in a row to move it to Known.')),
          el('div', { class: 'action-bar' },
            el('button', { class: 'btn-action', type: 'button', onclick: closeSheet }, L('Đóng', 'Close')),
            el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => openWordBook('priority') }, L('📒 Về Sổ từ', '📒 Back to Word Book'))));
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
          fb.replaceChildren(el('p', {}, ok ? L('✅ Đúng rồi!', '✅ Correct!') : `${L('❌ Nghĩa đúng', '❌ Correct meaning')}: ${LEX[q.id].vi}`),
            el('div', { class: 'action-bar' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { i += 1; step(); } }, L('Tiếp ➔', 'Next ➔'))));
        },
      }, text));
      const w = LEX[q.id];
      openSheet(L(`🧠 Ôn từ ưu tiên ${i + 1}/${ids.length}`, `🧠 Priority review ${i + 1}/${ids.length}`),
        el('div', { class: 'quiz-word' },
          w.img ? el('img', { class: 'word-img big', src: w.img, alt: '' }) : null,
          el('button', { class: 'mini-btn', type: 'button', onclick: () => C.speak(q.prompt) }, '🔊'),
          el('p', {}, el('b', { lang: 'en' }, q.prompt), ' ', el('span', { class: 'phon' }, q.phon))),
        el('p', { class: 'task-hint' }, L('Chọn nghĩa đúng:', 'Choose the correct meaning:')),
        el('div', { class: 'choices' }, opts),
        fb);
      if (d().soundOn) C.speak(q.prompt);
    };
    step();
  }

  /* Booklets ngữ pháp */
  function openBookletShelf() {
    reopenSheet = openBookletShelf;
    openSheet(L('📘 Booklets ngữ pháp', '📘 Grammar Booklets'),
      el('p', { class: 'muted' }, L(`Đã tìm ${bookletCount()}/${BOOKLETS.length} cuốn. Booklet giấu trên 4 khu phố: tìm cuốn sách xanh có gáy đỏ.`, `Found ${bookletCount()}/${BOOKLETS.length}. Booklets are hidden across the 4 areas: look for a green book with a red spine.`)),
      el('div', { class: 'booklet-grid' }, BOOKLETS.map((b) => {
        const has = d().collected[b.id];
        return el('button', { class: 'booklet-card dongho-panel' + (has ? '' : ' locked'), type: 'button', disabled: !has, onclick: () => openBooklet(b.id) },
          el('span', { class: 'bk-icon' }, has ? b.icon : '❔'),
          el('b', {}, has ? L(b.title, b.title_en) : L('Chưa tìm thấy', 'Not found yet')),
          el('small', {}, has ? (d().bookletChecks[b.id] ? L('✓ Đã làm bài kiểm tra', '✓ Quiz done') : L(b.title_en, b.title)) : `${L('Gợi ý', 'Hint')}: ${tx(b, 'where')}`));
      })));
  }

  function openBooklet(id) {
    const b = BOOKLETS.find((x) => x.id === id);
    if (!b) return;
    reopenSheet = () => openBooklet(id);
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
              addXp(15, L('hoàn thành Booklet', 'Booklet mastered'));
              store.addTea(1);
              save();
              renderHud();
              const allBooklets = BOOKLETS.every((x) => d().bookletChecks[x.id]);
              const outfit = allBooklets ? unlockOutfit('red') : null;
              if (outfit) save();
              done.replaceChildren(...[
                el('p', { class: 'notice good' }, L('🎉 Bạn đã nắm vững Booklet này! +1 ☕ Trà Đá Helper', '🎉 You mastered this Booklet! +1 ☕ Trà Đá Helper')),
                outfit ? el('p', { class: 'notice good' }, `${L('👘 Làm đúng cả 5 Booklet! Trang phục mới', '👘 All 5 Booklets mastered! New outfit')}: ${outfitName(outfit)}`) : null,
                outfit ? el('button', { class: 'btn-action small', type: 'button', onclick: () => { wear(outfit.id); toast(`${L('👘 Đang mặc', '👘 Wearing')}: ${outfitName(outfit)}`); } }, `${L('Mặc', 'Wear')} ${outfitName(outfit)}`) : null,
              ].filter(Boolean));
            } else if (correct < b.check.length) {
              done.replaceChildren(el('p', { class: 'notice' }, L('Còn câu sai. Đọc lại quy tắc rồi mở lại Booklet để làm lại nhé.', 'Some answers are wrong. Read the rule again, then reopen the Booklet to retry.')));
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
      el('h4', {}, L('Ví dụ ở Hội An', 'Examples in Hoi An')),
      el('ul', { class: 'bk-examples' }, b.examples.map((ex) => el('li', {},
        el('button', { class: 'mini-btn', type: 'button', 'aria-label': L('Nghe', 'Listen'), onclick: () => C.speak(ex.en) }, '🔊'),
        el('div', {}, el('p', { lang: 'en' }, ex.en), el('p', { class: 'muted' }, ex.vi))))),
      el('h4', {}, d().bookletChecks[b.id] ? L('Kiểm tra nhanh (đã hoàn thành)', 'Quick check (done)') : L('Kiểm tra nhanh (+15 XP và +1 ☕ khi đúng hết)', 'Quick check (+15 XP and +1 ☕ if all correct)')),
      ...checks,
      done);
  }

  /* ---------- Boss tại Hội An Quán ---------- */

  function openBossLobby(atHall = false) {
    reopenSheet = () => openBossLobby(atHall);
    const here = atHall || engine.nearHall();
    const doneCount = questsDone();
    openSheet(L('⚔️ Đấu trường Boss · Hội An Quán', '⚔️ Boss Arena · Hoi An Assembly Hall'),
      el('p', { class: 'muted' }, L('Các dạng bài khó trên Portal hoá thành Boss. Trả lời đúng để tấn công, sai bị mất tim. Đúng 3 câu liên tiếp ra đòn chí mạng! Thắng Boss được thưởng Trà Đá.', 'The hardest Portal exercises have turned into Bosses. Answer correctly to attack; a wrong answer costs a heart. Three in a row is a critical hit! Beating a Boss refills your Trà Đá.')),
      here ? null : el('div', { class: 'notice' },
        L('🏛️ Chỉ khiêu chiến Boss được bên trong Hội An Quán (Quảng trường Hội An Quán). ', '🏛️ Bosses can only be challenged inside the Hoi An Assembly Hall (Assembly Hall Square). '),
        el('button', {
          class: 'link-btn', type: 'button',
          onclick: () => {
            closeSheet();
            engine.setGuide({ building: 'hall', label: L('Hội An Quán', 'Assembly Hall') });
            toast(L('🧭 Đi theo mũi tên đỏ tới Hội An Quán', '🧭 Follow the red arrow to the Assembly Hall'));
          },
        }, L('🧭 Chỉ đường', '🧭 Show me the way'))),
      el('div', { class: 'boss-list' }, DATA.bosses.filter((b) => !b.advanced).map(bossCard)),
      el('h4', {}, L('🎓 Thử thách nâng cao (không bắt buộc)', '🎓 Advanced challenges (optional)')),
      el('p', { class: 'muted' }, L('Câu hỏi trích đề thi trên Portal (mức C1 và đề tốt nghiệp THPT), dành cho bạn muốn thử sức. Không ảnh hưởng tới danh hiệu cuối.', 'Questions from exam papers on the Portal (C1 and the national graduation exam) for anyone who wants a challenge. They do not affect the final title.')),
      el('div', { class: 'boss-list' }, DATA.bosses.filter((b) => b.advanced).map(bossCard)));

    function bossCard(b) {
      const open = doneCount >= b.unlock_quests;
      const rec = d().bosses[b.id] || {};
      return el('article', { class: 'boss-card dongho-panel' + (open ? '' : ' locked') + (b.advanced ? ' advanced' : '') },
        el('img', { src: b.img, alt: '', class: 'boss-thumb' }),
        el('div', {},
          el('h3', {}, b.name, b.level ? el('span', { class: 'level-tag' }, b.level) : null),
          el('p', {}, tx(b, 'description')),
          el('p', { class: 'status' }, open
            ? (rec.wins ? L(`🏆 Đã thắng ${rec.wins} lần`, `🏆 Won ${rec.wins}×`) : L('Chưa hạ', 'Not defeated yet'))
            : L(`🔒 Hoàn thành ${b.unlock_quests} nhiệm vụ để mở (${doneCount}/${b.unlock_quests})`, `🔒 Complete ${b.unlock_quests} mission(s) to unlock (${doneCount}/${b.unlock_quests})`)),
          el('button', { class: 'btn-action small btn-primary', type: 'button', disabled: !open || !here, onclick: () => startBoss(b) },
            !open ? L('Chưa mở', 'Locked') : here ? L('Khiêu chiến ⚔️', 'Challenge ⚔️') : L('🏛️ Tại Hội An Quán', '🏛️ At the Hall'))));
    }
  }

  async function startBoss(boss) {
    if (boss.source !== 'lexicon' && !(BANK && BANK[boss.source])) {
      try {
        const res = await fetch(boss.source === 'phrasal' ? 'data/phrasal-bank.json' : 'data/boss-bank.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        BANK = Object.assign(BANK || {}, await res.json());
      } catch (err) {
        toast(L(`Không tải được câu hỏi Boss (${err.message}).`, `Could not load the Boss questions (${err.message}).`));
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
      return { wordId: id, q: w.example.replace(re, '_____'), options: opts.map((o) => o.word), answer: opts.indexOf(w), explain: `${w.word}: ${w.vi}`, tag: L('Điền từ vào chỗ trống', 'Fill in the blank') };
    }
    if (kind === 'word') {
      return { wordId: id, q: L(`Từ tiếng Anh nào có nghĩa: “${w.vi}”?`, `Which English word means “${w.vi}”?`), options: opts.map((o) => o.word), answer: opts.indexOf(w), explain: `${w.word} ${w.phonetic}`, tag: L('Chọn từ', 'Choose the word') };
    }
    return { wordId: id, q: L(`“${w.word}” ${w.phonetic} nghĩa là gì?`, `What does “${w.word}” ${w.phonetic} mean?`), options: opts.map((o) => o.vi), answer: opts.indexOf(w), explain: `${w.word}: ${w.vi}`, tag: L('Chọn nghĩa', 'Choose the meaning') };
  }

  function bankQuestion() {
    const list = BANK[battle.boss.source] || [];
    let idx = Math.floor(Math.random() * list.length);
    for (let k = 0; k < 20 && battle.asked.has(idx); k++) idx = Math.floor(Math.random() * list.length);
    battle.asked.add(idx);
    const item = list[idx];
    const order = shuffled(item.options.map((text, i) => ({ text, i })));
    return { q: item.q, options: order.map((o) => o.text), answer: order.findIndex((o) => o.i === item.answer), explain: tx(item, 'explain'), tag: item.note_en != null ? tx(item, 'note') : L(item.note, String(item.note || '').replace('Chọn cụm từ phù hợp', 'Choose the best phrase')) };
  }

  function nextBossQuestion() {
    battle.current = battle.boss.source === 'lexicon' ? lexiconQuestion() : bankQuestion();
    renderBattle();
  }

  function heartsText(b) {
    return '❤️'.repeat(Math.max(0, b.hearts)) + '🖤'.repeat(Math.max(0, b.boss.hearts - b.hearts));
  }

  function renderBattle() {
    reopenSheet = null;
    const b = battle;
    const bossName = b.boss.name;
    const q = b.current;
    const arena = el('div', { class: 'arena' },
      el('img', { src: b.boss.img, alt: b.boss.name, class: 'boss-img' }),
      el('div', { class: 'arena-info' },
        el('p', { class: 'boss-name' }, bossName),
        el('div', { class: 'hp-bar', role: 'progressbar', 'aria-valuenow': String(Math.max(0, b.hp)), 'aria-valuemax': String(b.boss.hp), 'aria-label': L('Máu Boss', 'Boss HP') },
          el('span', { style: `width:${(Math.max(0, b.hp) / b.boss.hp) * 100}%` })),
        el('p', { class: 'hearts', 'aria-label': L(`Còn ${b.hearts} tim`, `${b.hearts} hearts left`) }, heartsText(b), b.combo >= 2 ? el('span', { class: 'combo' }, ` 🔥 x${b.combo}`) : null)));
    const fb = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const opts = q.options.map((text, k) => el('button', { class: 'choice', type: 'button', lang: 'en', onclick: () => answerBoss(k, opts, fb) }, text));
    openSheet(`⚔️ ${bossName}`,
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
      line = dmg > 1 ? L(`💥 Chí mạng! Boss mất ${dmg} máu.`, `💥 Critical hit! The Boss loses ${dmg} HP.`) : L('⚔️ Trúng đòn! Boss mất 1 máu.', '⚔️ Hit! The Boss loses 1 HP.');
    } else {
      opts[k].classList.add('wrong');
      b.combo = 0;
      b.hearts -= 1;
      b.wrong += 1;
      d().stats.bossWrong += 1;
      if (q.wordId) store.missWord(q.wordId);
      C.sfx('hurt');
      line = L('💔 Sai rồi! Bạn mất 1 tim.', '💔 Wrong! You lose 1 heart.');
    }
    save();
    const img = document.querySelector('.boss-img');
    if (img) {
      img.classList.remove('hit', 'attack');
      void img.offsetWidth;
      img.classList.add(ok ? 'hit' : 'attack');
    }
    document.querySelector('.hp-bar span').style.width = `${(Math.max(0, b.hp) / b.boss.hp) * 100}%`;
    document.querySelector('.hearts').firstChild.textContent = heartsText(b);
    const over = b.hp <= 0 ? 'win' : b.hearts <= 0 ? 'lose' : null;
    fb.className = `feedback ${ok ? 'good' : 'bad'}`;
    fb.replaceChildren(...[
      el('p', { class: 'fb-title' }, line),
      ok ? null : el('p', {}, L('Đáp án đúng: ', 'Correct answer: '), el('b', { lang: 'en' }, q.options[q.answer])),
      q.explain ? el('p', { class: 'muted' }, q.explain) : null,
      el('div', { class: 'action-bar' }, el('button', {
        class: 'btn-action btn-primary', type: 'button',
        onclick: () => {
          b.locked = false;
          if (over) endBoss(over === 'win');
          else nextBossQuestion();
        },
      }, over ? L('Kết thúc 🏁', 'Finish 🏁') : L('Tiếp ➔', 'Next ➔'))),
    ].filter(Boolean));
  }

  function endBoss(win) {
    const b = battle;
    b.ended = true;
    const rec = d().bosses[b.boss.id];
    const items = [el('li', {}, L(`✅ Đúng ${b.right} · ❌ Sai ${b.wrong}`, `✅ Right ${b.right} · ❌ Wrong ${b.wrong}`))];
    let outfit = null;
    if (win) {
      C.sfx('victory');
      const first = !rec.wins;
      rec.wins = (rec.wins || 0) + 1;
      const r = b.boss.rewards || {};
      if (first) {
        d().xp += r.xp || 0;
        items.push(el('li', {}, `⭐ +${r.xp || 0} Cultural Host XP`));
        if (addTitle(r.title)) items.push(el('li', {}, `${L('🏅 Danh hiệu mới', '🏅 New title')}: ${r.title}`));
        outfit = unlockOutfit(r.outfit);
        if (outfit) items.push(el('li', {}, `${L('👘 Trang phục mới', '👘 New outfit')}: ${outfitName(outfit)}`));
      } else {
        d().xp += 20;
        items.push(el('li', {}, L('⭐ +20 XP (thắng lại)', '⭐ +20 XP (rematch win)')));
      }
      // Thắng Boss (bài tập trên Portal) là cách nạp lại Trà Đá Helper
      const got = store.addTea(r.tea || 1);
      if (got) items.push(el('li', {}, `☕ +${got} Trà Đá Helper`));
    } else {
      C.sfx('defeat');
    }
    save();
    renderHud();
    const boss = b.boss;
    const bossName = boss.name;
    openSheet(win ? L('🏆 Chiến thắng!', '🏆 Victory!') : L('💀 Thua trận', '💀 Defeated'),
      el('div', { class: 'finish' },
        el('img', { src: boss.img, alt: '', class: 'boss-thumb' + (win ? ' defeated' : '') }),
        el('div', {},
          el('h3', {}, win ? L(`Bạn đã hạ ${bossName}!`, `You defeated ${bossName}!`) : L(`${bossName} vẫn còn đứng vững.`, `${bossName} is still standing.`)),
          el('ul', { class: 'reward-list' }, items))),
      win ? null : el('p', { class: 'muted' }, L('Mẹo: ôn Sổ từ hoặc đọc lại Booklet rồi quay lại khiêu chiến.', 'Tip: review your Word Book or reread a Booklet, then try again.')),
      el('div', { class: 'action-bar' },
        outfit ? el('button', { class: 'btn-action', type: 'button', onclick: () => { wear(outfit.id); toast(`${L('👘 Đang mặc', '👘 Wearing')}: ${outfitName(outfit)}`); } }, `${L('Mặc', 'Wear')} ${outfitName(outfit)}`) : null,
        el('button', { class: 'btn-action', type: 'button', onclick: () => openBossLobby(true) }, L('Về Hội An Quán', 'Back to the Hall')),
        el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => startBoss(boss) }, win ? L('Đấu lại', 'Rematch') : L('Thử lại ⚔️', 'Try again ⚔️'))));
  }

  /* ---------- Hồ sơ Local Host ---------- */

  function openProfile() {
    reopenSheet = openProfile;
    const s = d().stats;
    const a = C.analyzeStyle(d(), { booklets: BOOKLETS.length });
    const teaTotal = engine.countCollectibles('tea');
    const sheet = playerSheet();
    const defTitle = tx(DATA, 'default_title');
    const title = d().title || defTitle;
    const stat = (label, value) => el('div', { class: 'stat' }, el('b', {}, String(value)), el('span', {}, label));
    const turns = s.firstTry + s.retries;
    openSheet(L('👤 Hồ sơ Local Host', '👤 Local Host Profile'),
      el('div', { class: 'profile-head' },
        spriteCanvas(sheet.src, sheet.kind, 150, false),
        el('div', {},
          el('p', { class: 'profile-title' }, playerName()),
          el('p', {}, `🏅 ${title}`),
          el('p', {}, `⭐ ${d().xp} Cultural Host XP`),
          el('p', { class: 'muted' }, `${L('Nhiệm vụ', 'Missions')} ${questsDone()}/${DATA.quests.length} · Booklets ${bookletCount()}/${BOOKLETS.length}`),
          el('button', { class: 'btn-action small', type: 'button', onclick: openCertificate }, L('📜 Giấy chứng nhận', '📜 Certificate')),
          el('button', { class: 'btn-action small', type: 'button', onclick: openReport }, L('📄 Xuất báo cáo', '📄 Export report')))),
      d().titles.length
        ? el('div', {},
          el('h4', {}, L('Danh hiệu', 'Titles')),
          el('div', { class: 'chips' }, [defTitle, ...d().titles].map((t) => el('button', {
            class: 'chip' + (t === title ? ' hit' : ''), type: 'button',
            onclick: () => { d().title = t === defTitle ? null : t; save(); openProfile(); },
          }, t))))
        : null,
      el('h4', {}, L('Nhân vật', 'Character')),
      el('div', { class: 'wardrobe' }, Object.entries(AVATARS).map(([id, av]) => {
        const sh = playerSheet(id);
        return el('button', {
          class: 'outfit dongho-panel' + (d().avatar === id ? ' wearing' : ''), type: 'button',
          onclick: () => { d().avatar = id; wear(d().outfit); openProfile(); },
        }, spriteCanvas(sh.src, sh.kind, 110, false), el('b', {}, L(...av.name)), el('small', {}, d().avatar === id ? L('Đang chọn', 'Selected') : L(...av.note)));
      })),
      el('h4', {}, L('Tủ đồ Local Host', 'Local Host Wardrobe')),
      el('div', { class: 'wardrobe' }, DATA.outfits.map((o) => {
        const has = d().outfits.includes(o.id);
        const wearing = d().outfit === o.id;
        const sh = playerSheet(d().avatar, o.id);
        return el('button', {
          class: 'outfit dongho-panel' + (wearing ? ' wearing' : '') + (has ? '' : ' locked'), type: 'button', disabled: !has,
          onclick: () => { wear(o.id); openProfile(); },
        }, spriteCanvas(sh.src, sh.kind, 110, false), el('b', {}, outfitName(o)), el('small', {}, wearing ? L('Đang mặc', 'Wearing') : has ? L('Chạm để mặc', 'Tap to wear') : `🔒 ${tx(o, 'how')}`));
      })),
      el('h4', {}, L('📊 Thống kê học tập', '📊 Learning stats')),
      el('div', { class: 'stats' },
        stat(L('từ đã khám phá', 'words discovered'), `${a.discovered}/${LEX_LIST.length}`),
        stat(L('từ Known', 'Known words'), a.known),
        stat(L('từ Unknown', 'Unknown words'), a.unknown),
        stat(L('lần chạm khám phá', 'things poked'), s.pokes),
        stat(L('câu đã dịch (☕)', 'lines translated (☕)'), s.translations),
        stat(L('ly trà đá đã nhặt', 'iced teas found'), `${s.teas}/${teaTotal}`),
        stat(L('đúng ngay lần đầu', 'right on the first try'), turns ? `${Math.round((s.firstTry / turns) * 100)}%` : '–'),
        stat(L('lượt nói / gõ thay', 'spoken / typed turns'), `${s.voice} / ${s.typed}`),
        stat(L('câu Boss đúng / sai', 'Boss answers right / wrong'), `${s.bossRight} / ${s.bossWrong}`)),
      el('h4', {}, L('🧭 Phong cách học của bạn', '🧭 Your learning style')),
      a.traits.length ? el('ul', { class: 'traits' }, a.traits.map(([icon, name, desc]) => el('li', {}, el('b', {}, `${icon} ${name}: `), desc))) : null,
      a.tips.length ? el('ul', { class: 'tips' }, a.tips.map((t) => el('li', {}, `💡 ${t}`))) : null,
      el('div', { class: 'action-bar start' },
        el('button', {
          class: 'link-btn', type: 'button',
          onclick: () => {
            if (!window.confirm(L('Xoá toàn bộ tiến độ (XP, từ vựng, vật phẩm, trang phục) để chơi lại từ đầu?', 'Erase all progress (XP, words, items, outfits) and start over?'))) return;
            store.reset();
            closeSheet();
            engine.setPlayerSheet(playerSheet());
            engine.setGuide(null);
            engine.enter('ev');
            lastPhase = phase();
            updateChip();
            renderHud();
          },
        }, L('↺ Chơi lại từ đầu', '↺ Start over'))));
  }

  /* ---------- Màn tiêu đề ---------- */

  function showTitle() {
    const started = d().xp > 0 || Object.keys(d().words).length > 0;
    const name = el('input', { class: 'name-input', type: 'text', maxlength: 40, value: d().name || '', placeholder: L('Tên Local Host của bạn (không bắt buộc)', 'Your Local Host name (optional)'), 'aria-label': L('Tên Local Host', 'Local Host name') });
    const picks = Object.entries(AVATARS).map(([id, av]) => {
      const sh = playerSheet(id);
      return el('button', {
        class: 'avatar-pick dongho-panel' + (d().avatar === id ? ' wearing' : ''), type: 'button', 'aria-pressed': String(d().avatar === id),
        onclick: () => {
          d().avatar = id;
          wear(d().outfit);
          picks.forEach((b) => {
            const on = b === picks[Object.keys(AVATARS).indexOf(id)];
            b.classList.toggle('wearing', on);
            b.setAttribute('aria-pressed', String(on));
          });
        },
      }, spriteCanvas(sh.src, sh.kind, 104, false), el('b', {}, L(...av.name)));
    });
    const langs = [['en', 'English'], ['vi', 'Tiếng Việt']].map(([code, label]) => el('button', {
      class: 'lang-pick' + (d().lang === code ? ' active' : ''), type: 'button', lang: code, 'aria-pressed': String(d().lang === code),
      onclick: () => { d().name = name.value.trim(); setLang(code); },
    }, label));
    $('#title-screen').replaceChildren(
      el('div', { class: 'title-card dongho-panel' },
        el('h1', { class: 'title-logo dongho-ink-text' }, 'Immersion Town'),
        el('p', { class: 'title-sub' }, L('Bạn là Local Host, đại sứ hiếu khách của phố cổ. Dạo phố, chạm vào mọi thứ để khám phá từ vựng và giúp du khách bằng tiếng Anh.', 'You are a Local Host, the ancient town’s hospitality ambassador. Explore the streets, tap everything to discover new words and help visitors in English.')),
        el('div', { class: 'lang-row', role: 'group', 'aria-label': L('Ngôn ngữ chỉ dẫn', 'Instruction language') }, el('span', {}, L('🌐 Chỉ dẫn:', '🌐 Instructions:')), langs),
        el('div', { class: 'avatar-row', role: 'group', 'aria-label': L('Chọn nhân vật', 'Choose your character') }, picks),
        name,
        el('button', {
          class: 'btn-action btn-primary big', type: 'button',
          onclick: () => {
            d().name = name.value.trim();
            save();
            $('#title-screen').hidden = true;
            syncPause();
            onZone(engine.zone);
          },
        }, started ? L('Tiếp tục hành trình ➔', 'Continue your journey ➔') : L('Bắt đầu hành trình ➔', 'Start your journey ➔')),
        el('p', { class: 'title-help' }, L('Phím mũi tên / W A S D đi 4 hướng · chạm mặt đất để đi tới · chạm vật lấp lánh ✦ để tra từ · tới gần du khách để trò chuyện', 'Arrow keys / W A S D to walk in 4 directions · tap the ground to walk there · tap sparkling things ✦ to look up words · walk up to visitors to talk'))));
    $('#title-screen').hidden = false;
    syncPause();
  }

  /* ---------- Người địa phương, Đại sứ di sản và quầy Trà Đá ---------- */

  // Người địa phương nói tiếng Việt và gợi ý một câu tiếng Anh để giới thiệu với du khách
  function openLocalChat(id) {
    const ch = charOf(id);
    if (!ch || !ch.chat) return;
    const c = ch.chat;
    const locked = sideQuests().find((q) => q.npc === id && !sideOpen(q));
    const lockedBy = locked && DATA.quests.find((q) => q.id === locked.requires);
    d().met[id] = true;
    dialog(portraitOf(id), tx(ch, 'name'), tx(ch, 'role'),
      el('p', { class: 'dialogue-text vi', lang: 'vi' }, `“${c.vi}”`),
      el('p', { class: 'dlg-prompt' }, L('💬 Khi du khách hỏi, bạn có thể nói:', '💬 If a visitor asks, you can say:')),
      el('p', { class: 'dialogue-text', lang: 'en' }, tokenize(c.en)),
      el('div', { class: 'dlg-tools' },
        el('button', { class: 'btn-action small', type: 'button', onclick: () => C.speak(c.en, voiceOf(null)) }, L('🔊 Nghe câu mẫu', '🔊 Hear the model')),
        el('button', { class: 'btn-action small', type: 'button', onclick: () => C.playLine(c.audio_file, c.vi, { langs: ['vi-VN', 'vi'] }) }, L('🔊 Nghe lời cô chú', '🔊 Hear the local'))),
      locked ? el('p', { class: 'muted' }, L(`🤝 Việc nhỏ của ${tx(ch, 'name')} sẽ mở sau nhiệm vụ "${questTitle(lockedBy)}".`, `🤝 ${tx(ch, 'name')}'s favour unlocks after the "${questTitle(lockedBy)}" mission.`)) : null,
      el('div', { class: 'action-bar' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: closeQuest }, L('Cảm ơn ạ!', 'Thank you!'))));
    save();
    if (d().soundOn) C.playLine(c.audio_file, c.vi, { langs: ['vi-VN', 'vi'] });
  }

  function openAmbassador() {
    const ch = charOf('ambassador');
    const done = questsDone();
    const n = DATA.quests.length;
    if (done >= n && !d().ceremony) {
      openQuest(DATA.ceremony);
      return;
    }
    const first = !d().met.ambassador;
    d().met.ambassador = true;
    save();
    const next = DATA.quests.find((q) => !isDone(q.id));
    let text;
    if (d().ceremony) {
      text = L(`“Chúc mừng ${playerName()}, ${DATA.final_title} của Hội An! Giấy chứng nhận của bạn ở trong Hồ sơ.”`, `“Congratulations, ${playerName()}, Hoi An's ${DATA.final_title}! Your certificate is in your Profile.”`);
    } else if (first) {
      text = L(`“Chào ${playerName()}! Mình là lớp trưởng, phụ trách Đêm hội di sản tối nay. Hôm nay bạn làm Local Host: giúp 4 du khách bằng tiếng Anh. Mỗi nhiệm vụ xong sẽ thắp một chiếc đèn trên cổng Đêm hội. Đủ 4 đèn thì tối nay lên Quảng trường Hội An Quán dự lễ trao danh hiệu ${DATA.final_title} nhé!”`,
        `“Hi ${playerName()}! I'm the class monitor and I'm running tonight's Heritage Night. Today you are a Local Host: help 4 visitors in English. Each mission you complete lights one lantern on the Heritage Night gate. When all 4 are lit, come to Assembly Hall Square tonight for the ${DATA.final_title} award ceremony!”`);
    } else {
      text = L(`“Bạn đã thắp ${done}/${n} đèn. Còn ${n - done} nhiệm vụ nữa là tới lễ trao danh hiệu tối nay!”`, `“You have lit ${done}/${n} lanterns. ${n - done} more mission(s) until tonight's award ceremony!”`);
    }
    dialog(portraitOf('ambassador'), tx(ch, 'name'), first ? L('✉️ Thư mời Đêm hội di sản', '✉️ Heritage Night invitation') : tx(ch, 'role'),
      el('p', { class: 'dialogue-text' + (viUI() ? ' vi' : ''), lang: L('vi', 'en') }, text),
      journeyRow(),
      d().ceremony ? null : el('ul', { class: 'objectives' }, DATA.quests.map((q) => {
        const ok = isDone(q.id);
        return el('li', {}, `${ok ? '✓' : '○'} ${q.icon} ${questTitle(q)} · ${tx(charOf(q.npc), 'name')} (${zoneLabel(q.zone)}) `,
          ok ? null : el('button', { class: 'link-btn', type: 'button', onclick: () => { closeQuest(); goToQuest(q); } }, L('Đi tới ➔', 'Go ➔')));
      })),
      d().ceremony ? null : el('p', { class: 'muted' }, L('☕ Hết Trà Đá? Ghé quầy Trà Đá ở Quảng trường Hội An Quán. ⚔️ Cửa Hội An Quán là nơi đấu Boss ôn bài.', '☕ Out of Trà Đá? Visit the iced-tea stall at Assembly Hall Square. ⚔️ The Hoi An Assembly Hall door leads to the Boss arena.')),
      el('div', { class: 'action-bar' },
        el('button', { class: 'btn-action', type: 'button', onclick: closeQuest }, L('Đóng', 'Close')),
        d().ceremony
          ? el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeQuest(); openCertificate(); } }, L('📜 Xem giấy chứng nhận', '📜 View certificate'))
          : next ? el('button', { class: 'btn-action btn-primary', type: 'button', onclick: () => { closeQuest(); goToQuest(next); } }, L(`Đi gặp ${tx(charOf(next.npc), 'name')} ➔`, `Go to ${tx(charOf(next.npc), 'name')} ➔`)) : null));
  }

  // Quầy Trà Đá: mỗi nhiệm vụ chính hoàn thành đổi được 1 ly, bằng cách trả lời đúng một từ trong danh sách Unknown.
  // Trả lời sai phải chờ 1 phút (tránh đoán mò).
  const STALL_WAIT_MS = 60000;

  function openRefill() {
    const left = questsDone() - (d().stallUsed || 0);
    const role = L(`Đổi 1 ly cho mỗi nhiệm vụ hoàn thành · còn ${Math.max(0, left)} lượt · ☕ ${d().tea}/${store.TEA_MAX}`,
      `1 glass per completed mission · ${Math.max(0, left)} left · ☕ ${d().tea}/${store.TEA_MAX}`);
    const stall = (...body) => dialog(el('img', { src: 'assets/items/iced_tea.webp', alt: '' }), L('Quầy Trà Đá', 'Iced-Tea Stall'), role, ...body,
      el('div', { class: 'action-bar' }, el('button', { class: 'btn-action btn-primary', type: 'button', onclick: closeQuest }, L('Đóng', 'Close'))));
    if (d().tea >= store.TEA_MAX) {
      toast(L('☕ Trà Đá Helper đang đầy. Hẹn bạn lần sau nhé!', '☕ Your Trà Đá Helper is full. See you next time!'));
      return;
    }
    if (left <= 0) {
      stall(el('p', { class: 'dialogue-text' }, L('Mỗi nhiệm vụ hoàn thành, cô đổi cho cháu 1 ly trà đá. Giúp thêm du khách rồi quay lại nhé!', 'For every mission you complete, you can swap it for 1 glass of iced tea. Help more visitors, then come back!')));
      return;
    }
    const wait = Math.ceil(((d().stallWait || 0) - Date.now()) / 1000);
    if (wait > 0) {
      stall(el('p', { class: 'dialogue-text' }, L(`Cô đang pha mẻ trà mới. Quay lại sau ${wait} giây nhé!`, `A fresh batch is brewing. Come back in ${wait} seconds!`)));
      return;
    }
    const pool = store.priorityList().filter((id) => LEX[id]).slice(0, 5);
    if (!pool.length) {
      stall(el('p', { class: 'dialogue-text' }, L('Quầy chỉ ôn những từ bạn gắn ❓ Unknown. Hãy chạm vào đồ vật quanh phố, chọn "❓ Unknown" cho từ còn chưa chắc rồi quay lại.', 'The stall only quizzes words you tagged ❓ Unknown. Tap things around town, choose "❓ Unknown" for words you are unsure of, then come back.')));
      return;
    }
    const id = pick(pool);
    const q = meaningQuestion(id);
    const w = LEX[id];
    const fb = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const opts = q.options.map((text, k) => el('button', {
      class: 'choice', type: 'button',
      onclick: () => {
        opts.forEach((b) => { b.disabled = true; });
        const ok = k === q.answer;
        opts[q.answer].classList.add('right');
        if (!ok) opts[k].classList.add('wrong');
        const learned = store.reviewWord(id, ok);
        if (ok) {
          store.addTea(1);
          d().stallUsed = (d().stallUsed || 0) + 1;
        } else {
          d().stallWait = Date.now() + STALL_WAIT_MS;
        }
        save();
        renderHud();
        const more = ok && questsDone() - d().stallUsed > 0 && d().tea < store.TEA_MAX;
        fb.className = `feedback ${ok ? 'good' : 'bad'}`;
        fb.replaceChildren(...[
          el('p', {}, ok ? L('✅ Đúng rồi! Cô tặng bạn một ly trà đá: +1 ☕', '✅ Correct! Here is a glass of iced tea: +1 ☕') : L(`❌ Nghĩa đúng: ${w.vi}. Quay lại sau 1 phút nhé!`, `❌ Correct meaning: ${w.vi}. Come back in 1 minute!`)),
          learned ? el('p', {}, L(`🎉 "${w.word}" đã chuyển sang Known.`, `🎉 "${w.word}" moved to Known.`)) : null,
          el('div', { class: 'action-bar' },
            el('button', { class: 'btn-action', type: 'button', onclick: closeQuest }, L('Đóng', 'Close')),
            more ? el('button', { class: 'btn-action btn-primary', type: 'button', onclick: openRefill }, L('Câu khác ➔', 'Another one ➔')) : null),
        ].filter(Boolean));
      },
    }, text));
    dialog(el('img', { src: 'assets/items/iced_tea.webp', alt: '' }), L('Quầy Trà Đá', 'Iced-Tea Stall'), role,
      el('p', { class: 'muted' }, L('Ôn một từ bạn đã gắn ❓ Unknown:', 'Review one of your ❓ Unknown words:')),
      el('div', { class: 'quiz-word' },
        w.img ? el('img', { class: 'word-img big', src: w.img, alt: '' }) : null,
        el('button', { class: 'mini-btn', type: 'button', 'aria-label': L(`Nghe "${w.word}"`, `Listen to "${w.word}"`), onclick: () => C.speak(w.word) }, '🔊'),
        el('p', {}, el('b', { lang: 'en' }, w.word), ' ', el('span', { class: 'phon' }, w.phonetic))),
      el('p', { class: 'task-hint' }, L('Chọn nghĩa đúng:', 'Choose the correct meaning:')),
      el('div', { class: 'choices' }, opts),
      fb);
    if (d().soundOn) C.speak(w.word);
  }

  /* ---------- Báo cáo học tập cho giáo viên ---------- */

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const REPORT_CSS = `body{font-family:'Be Vietnam Pro',Arial,sans-serif;color:#1A1A1A;background:#fff;margin:24px;line-height:1.45}
.report h2{margin:.2em 0;font-size:1.5rem}.report h3{margin:1.2em 0 .4em;font-size:1.1rem;border-bottom:2px solid #1A1A1A;padding-bottom:2px}
.report .kicker{margin:0;color:#C83228;font-weight:800;letter-spacing:.08em;font-size:.8rem}
.report table{width:100%;border-collapse:collapse;font-size:.9rem}.report th,.report td{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}
.report th{background:#F5E6C8}.report .meta{margin:.2em 0}.report ul{margin:.3em 0;padding-left:1.2em}`;

  function reportBody() {
    const s = d().stats;
    const a = C.analyzeStyle(d(), { booklets: BOOKLETS.length });
    const turns = s.firstTry + s.retries;
    const date = new Date().toLocaleString(L('vi-VN', 'en-GB'));
    const row = (cells, tag = 'td') => `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
    const table = (head, rows) => `<table>${row(head, 'th')}${rows.join('') || row([L('(chưa có)', '(none yet)')])}</table>`;
    const questRow = (q) => {
      const rec = d().quests[q.id] || {};
      const run = d().questRun[q.id];
      const status = rec.done ? L('✓ Hoàn thành', '✓ Completed') : run ? L(`Đang làm (lượt ${run.step + 1}/${q.turns.length})`, `In progress (turn ${run.step + 1}/${q.turns.length})`) : L('Chưa làm', 'Not started');
      return row([esc(`${q.icon} ${questTitle(q)}`), status, rec.done ? `${rec.firstTry || 0}/${q.turns.length}` : '–', rec.done ? `${rec.voice || 0} / ${rec.typed || 0}` : '–']);
    };
    const unknown = store.priorityList().filter((id) => LEX[id]);
    const known = Object.keys(d().words).filter((id) => LEX[id] && store.wordState(id) === 'known');
    return `<div class="report">
<p class="kicker">IMMERSION TOWN</p>
<h2>${L('Báo cáo học tập', 'Learning report')}</h2>
<p class="meta"><b>${L('Học sinh', 'Student')}:</b> ${esc(playerName())} · <b>${L('Thời điểm', 'Date')}:</b> ${esc(date)}</p>
<p class="meta"><b>${L('Danh hiệu', 'Title')}:</b> ${esc(d().title || tx(DATA, 'default_title'))} · <b>XP:</b> ${d().xp} · <b>${L('Nhiệm vụ', 'Missions')}:</b> ${questsDone()}/${DATA.quests.length} · <b>Booklets:</b> ${bookletCount()}/${BOOKLETS.length} · <b>${L('Lễ trao danh hiệu', 'Award ceremony')}:</b> ${d().ceremony ? '✓' : '–'}</p>
<h3>${L('Nhiệm vụ', 'Missions')}</h3>
${table([L('Nhiệm vụ', 'Mission'), L('Trạng thái', 'Status'), L('Đúng ngay lần đầu', 'Right first try'), L('Nói / Gõ', 'Spoken / Typed')], [...DATA.quests, ...sideQuests()].map(questRow))}
<h3>Boss</h3>
${table(['Boss', L('Số lần thắng', 'Wins'), L('Số lần đấu', 'Tries')], DATA.bosses.map((b) => { const r = d().bosses[b.id] || {}; return row([esc(b.name), r.wins || 0, r.tries || 0]); }))}
<h3>Booklets</h3>
${table(['Booklet', L('Đã tìm', 'Found'), L('Kiểm tra nhanh', 'Quick check')], BOOKLETS.map((b) => row([esc(L(b.title, b.title_en)), d().collected[b.id] ? '✓' : '–', d().bookletChecks[b.id] ? L('✓ Đúng hết', '✓ All correct') : '–'])))}
<h3>${L('Từ vựng', 'Vocabulary')}</h3>
<p class="meta">${L('Đã khám phá', 'Discovered')}: ${a.discovered}/${LEX_LIST.length} · Known: ${a.known} · Unknown: ${a.unknown}</p>
<p class="meta"><b>${L('Từ cần ôn (ưu tiên cao nhất trước)', 'Words to review (highest priority first)')}:</b></p>
${table([L('Từ', 'Word'), L('Nghĩa', 'Meaning'), L('Lần gắn Unknown', 'Tagged Unknown'), L('Lần trả lời sai', 'Wrong answers')], unknown.map((id) => { const w = d().words[id]; return row([esc(LEX[id].word), esc(LEX[id].vi), w.unk || 0, w.miss || 0]); }))}
<p class="meta"><b>${L('Từ đã thuộc', 'Known words')}:</b> ${known.length ? esc(known.map((id) => LEX[id].word).join(', ')) : L('(chưa có)', '(none yet)')}</p>
<h3>${L('Thống kê', 'Statistics')}</h3>
<ul>
<li>${L('Lần chạm khám phá', 'Things poked')}: ${s.pokes}</li>
<li>${L('Câu đã dịch bằng Trà Đá', 'Lines translated with Trà Đá')}: ${s.translations}/${s.linesSeen}</li>
<li>${L('Đúng ngay lần đầu', 'Right on the first try')}: ${turns ? `${Math.round((s.firstTry / turns) * 100)}% (${s.firstTry}/${turns})` : '–'}</li>
<li>${L('Lượt nói / gõ thay', 'Spoken / typed turns')}: ${s.voice} / ${s.typed}</li>
<li>${L('Câu Boss đúng / sai', 'Boss answers right / wrong')}: ${s.bossRight} / ${s.bossWrong}</li>
<li>${L('Lượt ôn từ', 'Word reviews')}: ${s.reviews}</li>
</ul>
<h3>${L('Phong cách học', 'Learning style')}</h3>
<ul>${a.traits.map(([icon, name, desc]) => `<li><b>${icon} ${esc(name)}:</b> ${esc(desc)}</li>`).join('')}${a.tips.map((t) => `<li>💡 ${esc(t)}</li>`).join('')}</ul>
</div>`;
  }

  function downloadReport() {
    const html = `<!DOCTYPE html><html lang="${L('vi', 'en')}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Immersion Town · ${esc(playerName())}</title><style>${REPORT_CSS}</style></head><body>${reportBody()}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const slug = C.normalize(playerName()).replace(/\s+/g, '-') || 'local-host';
    const a = el('a', { href: url, download: `immersion-town-${slug}-${new Date().toISOString().slice(0, 10)}.html` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function openReport() {
    reopenSheet = openReport;
    const nameInput = el('input', { class: 'name-input', type: 'text', maxlength: 40, value: d().name || '', placeholder: L('Nhập tên của bạn', 'Enter your name'), 'aria-label': L('Tên học sinh', 'Student name') });
    const box = el('div', { class: 'report-wrap dongho-panel' });
    box.innerHTML = reportBody();
    nameInput.addEventListener('input', () => {
      d().name = nameInput.value.trim();
      save();
      box.innerHTML = reportBody();
    });
    openSheet(L('📄 Báo cáo học tập', '📄 Learning report'),
      el('p', { class: 'muted' }, L('Gửi báo cáo này cho giáo viên: in ra, hoặc tải về tệp .html rồi nộp qua lớp học trực tuyến.', 'Send this report to your teacher: print it, or download the .html file and submit it to your online class.')),
      el('label', { class: 'name-label' }, L('Tên học sinh: ', 'Student name: '), nameInput),
      el('div', { class: 'action-bar start' },
        el('button', { class: 'btn-action', type: 'button', onclick: () => window.print() }, L('🖨️ In báo cáo', '🖨️ Print')),
        el('button', { class: 'btn-action btn-primary', type: 'button', onclick: downloadReport }, L('⬇️ Tải về (.html)', '⬇️ Download (.html)'))),
      box);
  }

  /* ---------- Ngôn ngữ chỉ dẫn (EN/VI) ---------- */

  // Chữ cố định trong index.html, gắn bằng data-i18n (nội dung), data-i18n-html, data-i18n-title, data-i18n-aria
  const STATIC = {
    home: ['← Trang chủ', '← Home'],
    hud: ['Tiến độ', 'Progress'],
    teaTip: [
      'Trà Đá Helper: dùng để dịch cả câu và mở gợi ý. Nhặt ly trà đá, làm đúng Booklet, thắng Boss hoặc ghé quầy Trà Đá để nạp lại.',
      'Trà Đá Helper: spend cups to translate a whole line or open a hint. Refill by finding iced teas, mastering Booklets, beating Bosses or visiting the iced-tea stall.',
    ],
    bookletsTip: ['Booklets ngữ pháp đã tìm', 'Grammar Booklets found'],
    lanternsTip: ['Đèn lồng trên cổng Đêm hội: mỗi nhiệm vụ xong thắp một đèn', 'Heritage Night gate lanterns: each completed mission lights one'],
    soundTip: ['Bật/tắt tự đọc lời thoại', 'Turn voice-over on or off'],
    langTip: ['Đổi ngôn ngữ chỉ dẫn (EN/VI)', 'Switch instruction language (EN/VI)'],
    game: ['Trò chơi', 'Game'],
    world: [
      'Bản đồ phố cổ Hội An nhìn từ trên xuống. Dùng phím mũi tên hoặc chạm mặt đất để đi 4 hướng, chạm vật lấp lánh để tra từ.',
      'Top-down map of Hoi An ancient town. Use the arrow keys or tap the ground to walk in 4 directions; tap sparkling things to look up words.',
    ],
    wordCard: ['Tra cứu từ vựng', 'Word lookup'],
    pad: ['Điều khiển cảm ứng', 'Touch controls'],
    up: ['Đi lên', 'Walk up'],
    left: ['Đi sang trái', 'Walk left'],
    right: ['Đi sang phải', 'Walk right'],
    down: ['Đi xuống', 'Walk down'],
    talk: ['Nói chuyện hoặc tra từ gần nhất', 'Talk or look up the nearest thing'],
    loading: ['Đang tải phố cổ Hội An…', 'Loading Hoi An ancient town…'],
    dialog: ['Khung thoại', 'Dialogue'],
    tools: ['Công cụ', 'Tools'],
    quests: ['Nhiệm vụ', 'Missions'],
    words: ['Sổ từ', 'Word Book'],
    profile: ['Hồ sơ', 'Profile'],
    labels: ['Nhãn từ', 'Labels'],
    hint: [
      '<b>Đi lại:</b> phím mũi tên hoặc W A S D (4 hướng), hay chạm mặt đất · <b>Tra từ:</b> chạm vật lấp lánh ✦ · <b>Nhiệm vụ:</b> tới gần du khách có con dấu đỏ <span class="seal">!</span> · <b>Tương tác:</b> Space/Enter',
      '<b>Walk:</b> arrow keys or W A S D (4 directions), or tap the ground · <b>Look up words:</b> tap sparkling things ✦ · <b>Missions:</b> walk up to visitors with a red <span class="seal">!</span> seal · <b>Interact:</b> Space/Enter',
    ],
    close: ['Đóng', 'Close'],
  };

  function applyStatic() {
    document.documentElement.lang = L('vi', 'en');
    const text = (key) => (STATIC[key] ? L(...STATIC[key]) : null);
    const apply = (attr, set) => document.querySelectorAll(`[data-${attr}]`).forEach((n) => {
      const t = text(n.getAttribute(`data-${attr}`));
      if (t != null) set(n, t);
    });
    apply('i18n', (n, t) => { n.textContent = t; });
    apply('i18n-html', (n, t) => { n.innerHTML = t; });
    apply('i18n-title', (n, t) => { n.title = t; });
    apply('i18n-aria', (n, t) => { n.setAttribute('aria-label', t); });
  }

  // Đổi ngôn ngữ chỉ dẫn; vẽ lại màn tiêu đề, bảng đang mở và phần giới thiệu nhiệm vụ
  function setLang(code) {
    d().lang = code === 'vi' ? 'vi' : 'en';
    save();
    applyStatic();
    renderHud();
    updateChip();
    if (!$('#title-screen').hidden) showTitle();
    if (!$('#sheet').hidden && reopenSheet) reopenSheet();
    if (quest && quest.step < 0 && !$('#dialog').hidden) renderBrief();
  }

  /* ---------- Khởi động ---------- */

  const hooks = {
    ambassadorArt: () => (d().avatar === 'girl' ? 'cBoy' : 'cGirl'),
    phase: () => phase(),
    questDone: (id) => isDone(id),
    // NPC đổi chỗ sau nhiệm vụ: thuộc tính after / until của đối tượng npc trong Tiled
    npcActive: (o) => (!o.props.after || cond(o.props.after)) && (!o.props.until || !cond(o.props.until)),
    gateLanterns: () => DATA.quests.map((q) => isDone(q.id)),
    sceneName: (id) => (engine && engine.maps[id] ? zoneName(engine.maps[id].props) : id),
    isCollected: (id) => Boolean(d().collected[id]),
    onCollect,
    onPoke(spot) {
      if (!spot.word) return;
      d().poked[spot.key] = true;
      pokeWord(spot.word);
    },
    // Lời rao tiếng Việt khi tới gần cô bác (tệp trong assets/audio, thiếu thì đọc bằng giọng máy)
    onNear(npc) {
      const ch = charOf(npc.id);
      if (!ch || !ch.call || calledOut.has(npc.id) || !d().soundOn) return;
      if (!$('#dialog').hidden || !$('#word-card').hidden || !$('#sheet').hidden) return;
      calledOut.add(npc.id);
      C.playLine(ch.call.audio_file, ch.call.vi, { langs: ['vi-VN', 'vi'] });
    },
    // Lời rao của hàng quán khi đi ngang trước cửa (data/npc-dialogues-v4.json → shops), mỗi quán một lần mỗi lượt chơi
    onShopNear(id) {
      const sh = DATA && DATA.shops && DATA.shops[id];
      if (!sh || !sh.call || calledOut.has(`shop:${id}`) || !d().soundOn) return;
      if (!$('#dialog').hidden || !$('#word-card').hidden || !$('#sheet').hidden) return;
      calledOut.add(`shop:${id}`);
      C.playLine(sh.call.audio_file, sh.call.vi, { langs: ['vi-VN', 'vi'] });
    },
    onNpc(npc) {
      calledOut.add(npc.id);
      if (npc.id === 'ambassador') return openAmbassador();
      // Du khách đang tham gia một việc nhỏ (Mark ở quán trà, Sarah ở gánh hàng rong) thì mở việc nhỏ đó
      const favour = sideQuests().find((q) => sideOpen(q) && !isDone(q.id) && q.turns.some((t) => t.speaker === npc.id));
      const q = favour || questByNpc(npc.id);
      if (q) openQuest(q);
      else openLocalChat(npc.id);
    },
    // Vật phẩm chỉ tự bật thẻ từ lần đầu (chưa chạm, chưa tra từ đó ở đâu khác)
    wantsAutoPoke(spot) {
      const w = d().words[spot.word];
      return !d().poked[spot.key] && !(w && w.pokes);
    },
    // Tự bắt chuyện: du khách còn nhiệm vụ, hoặc người địa phương / Đại sứ lần gặp đầu tiên
    wantsAutoTalk(npc) {
      if (!DATA) return false;
      if (npc.id === 'ambassador') return !d().met.ambassador || (allMainDone() && !d().ceremony);
      const q = DATA.quests.find((x) => x.npc === npc.id) || sideQuests().find((x) => x.npc === npc.id && sideOpen(x));
      if (q) return !isDone(q.id);
      return !questByNpc(npc.id) && !d().met[npc.id];
    },
    onAction(action) {
      if (action === 'boss') openBossLobby(true);
      else if (action === 'refill') openRefill();
    },
    onZone,
    wordState: (id) => store.wordState(id),
    wordLabel: (id) => (LEX[id] ? LEX[id].word : null),
    isPoked: (key) => Boolean(d().poked[key]),
    labelsOn: () => d().labels,
    questMark(npc) {
      if (DATA && npc.id === 'ambassador') return d().ceremony ? '✓' : !d().met.ambassador || allMainDone() ? '!' : null;
      const q = DATA && (DATA.quests.find((x) => x.npc === npc.id) || sideQuests().find((x) => x.npc === npc.id && sideOpen(x)));
      if (!q) return null;
      return isDone(q.id) ? '✓' : '!';
    },
    greetFor(npc) {
      const q = DATA && questByNpc(npc.id);
      const ch = charOf(npc.id);
      if (q && (d().quests[q.id] || {}).done) return ch && ch.lang === 'vi' ? 'Cảm ơn cháu nhiều!' : 'Thank you so much! 😊';
      return ch && tx(ch, 'greet');
    },
  };

  function savePosition() {
    if (!engine) return;
    const p = engine.player;
    const pos = { map: engine.sceneId, x: Math.round(p.x), y: Math.round(p.y) };
    const prev = d().pos;
    if (!prev || prev.map !== pos.map || prev.x !== pos.x || prev.y !== pos.y) {
      d().pos = pos;
      save();
    }
  }

  async function loadJson(path) {
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    return res.json();
  }

  function bindControls() {
    // Chạm vào khung tranh thì đóng thẻ từ (chạy trước khi engine xử lý cú chạm)
    $('#paper-blur').addEventListener('click', () => {
      if (!$('#word-card').hidden) closeWordCard();
    });
    $('#btn-lang').addEventListener('click', () => {
      setLang(viUI() ? 'en' : 'vi');
      toast(L('🌐 Chỉ dẫn: Tiếng Việt', '🌐 Instructions: English'));
    });
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
    $('#btn-boss').addEventListener('click', () => openBossLobby(false));
    $('#btn-profile').addEventListener('click', openProfile);
    $('#sheet-close').addEventListener('click', closeSheet);
    $('#sheet').addEventListener('click', (e) => { if (e.target === $('#sheet')) closeSheet(); });
    // Nút điều hướng cảm ứng ▲ ◄ ► ▼
    document.querySelectorAll('[data-hold]').forEach((btn) => {
      const dir = btn.dataset.hold;
      const on = (e) => { e.preventDefault(); engine.hold(dir, true); };
      const off = () => engine.hold(dir, false);
      btn.addEventListener('pointerdown', on);
      btn.addEventListener('pointerup', off);
      btn.addEventListener('pointerleave', off);
      btn.addEventListener('pointercancel', off);
    });
    $('#btn-talk').addEventListener('click', () => { if (!engine.paused) engine.interact(); });
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!$('#sheet').hidden) closeSheet();
      else if (!$('#word-card').hidden) closeWordCard();
      else if (!$('#dialog').hidden) closeQuest();
    });
  }

  async function init() {
    applyStatic();
    try {
      const [lex, dlg, bk] = await Promise.all([loadJson('data/lexicon.json'), loadJson('data/npc-dialogues-v4.json'), loadJson('data/booklets.json')]);
      LEX_LIST = lex.words;
      LEX = Object.fromEntries(LEX_LIST.map((w) => [w.id, w]));
      LEX_MATCH = LEX_LIST.flatMap((w) => [w.word, ...(w.forms || [])].map((f) => ({ id: w.id, stems: C.tokensOf(f) })))
        .filter((e) => e.stems.length)
        .sort((a, b) => b.stems.length - a.stems.length);
      DATA = dlg;
      BOOKLETS = bk.booklets;
      engine = new IT.Town($('#world'), hooks);
      IT.engine = engine;
      await engine.load(playerSheet());
    } catch (err) {
      $('#loading').replaceChildren(el('p', {}, L(`Không tải được dữ liệu trò chơi (${err.message}). `, `Could not load the game data (${err.message}). `),
        location.protocol === 'file:'
          ? L('Bạn đang mở tệp trực tiếp trên máy; hãy mở qua máy chủ web (GitHub Pages hoặc localhost).', 'You opened the file directly from disk; open it through a web server (GitHub Pages or localhost).')
          : L('Hãy tải lại trang.', 'Please reload the page.')));
      return;
    }
    $('#loading').remove();
    // Hiện màn tiêu đề trước khi vào bản đồ để bưu thiếp giới thiệu khu chỉ bật sau khi bấm Bắt đầu
    showTitle();
    const pos = d().pos;
    if (pos && engine.maps[pos.map]) engine.setPosition(pos.map, pos.x, pos.y);
    else engine.enter('ev');
    lastPhase = phase();
    updateChip();
    bindControls();
    renderHud();
    setInterval(savePosition, 2000);
    window.addEventListener('pagehide', () => { savePosition(); C.stopAudio(); C.stopListening(); });
  }

  init();
})();
