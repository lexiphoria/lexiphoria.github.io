/* Immersion Town – lưu tiến độ, học tập thích ứng, chấm câu trả lời, âm thanh và nhận dạng giọng nói. */
(() => {
  'use strict';

  const IT = (window.IT = window.IT || {});
  const STORE_KEY = 'immersionTown.v5';
  const TEA_MAX = 5;      // Trà Đá Helper: số cốc tối đa
  const TEA_START = 3;

  /* ---------- Tiến độ ---------- */

  function defaults() {
    return {
      xp: 0,
      tea: TEA_START,
      pos: null,       // { map, x, y }: vị trí trên bản đồ Tiled
      name: '',
      avatar: 'boy',   // Local Host nam (đồng phục) hoặc nữ (áo dài)
      lang: 'en',      // ngôn ngữ chỉ dẫn: 'en' (mặc định) hoặc 'vi'
      zonesSeen: {},
      soundOn: true,
      labels: true,
      words: {},       // id → { seen, pokes, unk, miss, streak, status: 'unknown' | 'known' | undefined }
      poked: {},       // khoá điểm chạm đã khám phá
      met: {},         // người địa phương / Đại sứ đã trò chuyện
      collected: {},   // cốc Trà Đá và Booklet đã nhặt
      bookletChecks: {},
      quests: {},      // id → { done, voice, typed, firstTry, turns }
      bosses: {},      // id → { wins, tries }
      outfits: ['white'],
      outfit: 'white', // màu trang phục: white, indigo, gold, red
      titles: [],
      title: null,
      questRun: {},    // lượt đang làm dở của từng nhiệm vụ: id → { step, xp, voice, typed, firstTry }
      clock: 0,        // giờ trong ngày (0 sáng … 4 tối); tự tăng theo số nhiệm vụ đã xong
      stallUsed: 0,    // số ly đã đổi ở quầy Trà Đá (mỗi nhiệm vụ chính xong được 1 ly)
      stallWait: 0,    // trả lời sai ở quầy thì chờ tới thời điểm này
      stats: { pokes: 0, translations: 0, linesSeen: 0, firstTry: 0, retries: 0, voice: 0, typed: 0, bossRight: 0, bossWrong: 0, reviews: 0, teas: 0 },
    };
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        const base = defaults();
        return Object.assign(base, saved, { stats: Object.assign(base.stats, saved.stats || {}) });
      }
    } catch (e) { /* bộ nhớ trình duyệt bị chặn: vẫn chơi được, chỉ không lưu */ }
    return defaults();
  }

  const store = {
    TEA_MAX,
    data: load(),
    save() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) { /* bỏ qua */ }
    },
    reset() {
      const keep = { soundOn: this.data.soundOn, labels: this.data.labels, name: this.data.name, avatar: this.data.avatar, lang: this.data.lang };
      this.data = Object.assign(defaults(), keep);
      this.save();
    },
    addTea(n) {
      const before = this.data.tea;
      this.data.tea = Math.min(TEA_MAX, before + n);
      return this.data.tea - before;
    },

    /* --- Học tập thích ứng: theo dõi từ vựng --- */
    word(id) {
      if (!this.data.words[id]) this.data.words[id] = { seen: 0, pokes: 0, unk: 0, miss: 0, streak: 0 };
      return this.data.words[id];
    },
    seeWord(id) {
      const w = this.word(id);
      w.seen += 1;
      w.last = Date.now();
    },
    pokeWord(id) {
      const w = this.word(id);
      w.pokes += 1;
      w.seen += 1;
      w.last = Date.now();
      this.data.stats.pokes += 1;
    },
    tagWord(id, status) {
      const w = this.word(id);
      w.status = status;
      if (status === 'unknown') {
        w.unk += 1;
        w.streak = 0;
      }
    },
    missWord(id) {
      const w = this.word(id);
      w.miss += 1;
      w.streak = 0;
    },
    // Trả lời đúng 2 lần liên tiếp khi ôn → tự chuyển sang Known
    reviewWord(id, correct) {
      const w = this.word(id);
      this.data.stats.reviews += 1;
      if (!correct) {
        this.missWord(id);
        return false;
      }
      w.streak += 1;
      if (w.streak >= 2 && w.status !== 'known') {
        w.status = 'known';
        return true;
      }
      return false;
    },
    wordState(id) {
      const w = this.data.words[id];
      if (!w) return null;
      return w.status || 'seen';
    },
    priority(id) {
      const w = this.data.words[id];
      if (!w || w.status === 'known') return -1;
      return w.unk * 3 + w.miss * 2 + Math.min(w.seen, 10) * 0.3 + (w.status === 'unknown' ? 5 : 0);
    },
    // Danh sách ưu tiên: từ gắn Unknown nhiều lần nhất (và hay sai nhất) lên đầu
    priorityList() {
      return Object.keys(this.data.words)
        .filter((id) => this.data.words[id].status === 'unknown')
        .sort((a, b) => this.priority(b) - this.priority(a));
    },
  };

  /* ---------- Phân tích phong cách chơi ---------- */

  function analyzeStyle(d, totals) {
    const s = d.stats;
    const turns = s.firstTry + s.retries;
    const words = Object.values(d.words);
    const known = words.filter((w) => w.status === 'known').length;
    const unknown = words.filter((w) => w.status === 'unknown').length;
    const traits = [];
    const tips = [];
    // Chỉ dẫn theo ngôn ngữ người chơi chọn (EN/VI)
    const L = (vi, en) => (d.lang === 'vi' ? vi : en);
    if (s.pokes >= 12 && s.pokes >= turns * 2) traits.push(['🧭', L('Nhà thám hiểm', 'Explorer'), L('Bạn thích chạm và khám phá mọi thứ quanh phố.', 'You love tapping and exploring everything around town.')]);
    if (turns >= 5 && s.pokes < turns) traits.push(['🤝', L('Người kết nối', 'Connector'), L('Bạn tập trung trò chuyện và làm nhiệm vụ.', 'You focus on talking to people and completing missions.')]);
    if (s.linesSeen >= 4 && s.translations / s.linesSeen >= 0.5) {
      traits.push(['☕', L('Hay dùng máy dịch', 'Translator fan'), L('Bạn dịch hơn một nửa số câu thoại.', 'You translate more than half of the lines.')]);
      tips.push(L('Thử chạm vào từng từ được tô sáng thay vì dịch cả câu: vừa tiết kiệm Trà Đá, vừa nhớ từ lâu hơn.', 'Try tapping single highlighted words instead of translating whole lines: it saves Trà Đá and helps you remember words longer.'));
    } else if (s.linesSeen >= 6 && s.translations / s.linesSeen < 0.15) {
      traits.push(['💪', L('Tự lực', 'Independent'), L('Bạn hiếm khi cần dịch cả câu.', 'You rarely need to translate whole lines.')]);
    }
    if (s.voice >= 2 && s.voice >= s.typed) traits.push(['🎙️', L('Diễn giả', 'Speaker'), L('Bạn chọn nói thay vì gõ ở phần lớn lượt nói.', 'You choose to speak rather than type in most speaking turns.')]);
    if (s.typed >= 2 && s.typed > s.voice) tips.push(L('Bạn hay gõ thay vì nói. Hãy thử nói ở lượt tiếp theo (Chrome/Edge có micro).', 'You often type instead of speaking. Try speaking next time (Chrome/Edge with a microphone).'));
    if (turns >= 4) {
      const ratio = s.firstTry / turns;
      if (ratio >= 0.75) traits.push(['🎯', L('Chính xác', 'Accurate'), L(`Đúng ngay lần đầu ${Math.round(ratio * 100)}% số lượt.`, `Right on the first try in ${Math.round(ratio * 100)}% of turns.`)]);
      else if (ratio < 0.5) tips.push(L('Bạn hay phải làm lại. Đọc Booklet ngữ pháp liên quan trước khi nhận nhiệm vụ.', 'You often need a second try. Read the related grammar Booklet before starting a mission.'));
    }
    if (unknown >= 5) tips.push(L(`Bạn có ${unknown} từ Unknown. Mở Sổ từ → "Ôn 5 từ ưu tiên" hoặc đấu Bóng Ma Quên Từ.`, `You have ${unknown} Unknown words. Open the Word Book → "Review 5 priority words", or fight the Forgetful Phantom.`));
    const booklets = Object.keys(d.collected).filter((k) => k.startsWith('bk_')).length;
    if (booklets < totals.booklets) tips.push(L(`Còn ${totals.booklets - booklets} Booklet ngữ pháp giấu trên các khu phố. Đi dạo và tìm cuốn sách xanh có gáy đỏ.`, `${totals.booklets - booklets} grammar Booklet(s) are still hidden around town. Look for a green book with a red spine.`));
    if (!traits.length && !tips.length) tips.push(L('Hãy chơi thêm một lúc để hệ thống phân tích phong cách học của bạn.', 'Play a little longer so the game can analyse your learning style.'));
    return { traits, tips, known, unknown, discovered: words.length, turns };
  }

  /* ---------- So khớp câu trả lời ---------- */

  function normalize(s) {
    return String(s || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase()
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

  const tokensOf = (text) => {
    const n = normalize(text);
    return n ? n.split(' ').map(stem) : [];
  };

  // Khớp một cách nói của từ khoá: theo từ, bỏ đuôi -s/-ed/-ing, chấp nhận tách/gộp ("Viet QR" = "VietQR").
  function phraseHit(tokens, phrase) {
    const k = tokensOf(phrase);
    if (!k.length) return false;
    const joined = k.join('');
    for (let i = 0; i < tokens.length; i++) {
      if (k.every((t, j) => tokens[i + j] === t)) return true;
      let acc = '';
      for (let j = i; j < Math.min(tokens.length, i + 3); j++) {
        acc += tokens[j];
        if (acc === joined) return true;
      }
    }
    return false;
  }

  // Từ khoá có nhiều cách nói ngăn bằng "|": "Ba Le|Bale|Bali"
  function scoreKeywords(text, keywords) {
    const tokens = tokensOf(text);
    const hits = keywords.map((k) => k.split('|').some((alt) => phraseHit(tokens, alt)));
    return { hits, count: hits.filter(Boolean).length, words: tokens.length };
  }

  const firstAlt = (k) => k.split('|')[0];

  /* ---------- Chấm câu viết / câu nói ---------- */

  // Từ chức năng: không tính khi xét lặp từ và độ khớp câu mẫu, nhưng một câu thật phải có vài từ này
  const STOP = new Set(('a an the and or but so to of in on at for from with by as is am are be been was were it its this that these those '
    + 'there here i you he she we they me him her us them my your our their his do does did can will would should could may might must '
    + 'not no yes very too also just then than if because about into over up down out off some any all each every one').split(' ').map(stem));
  const VERB_BASES = ('be have do can could will would shall should may might must need want like love go come take make get give put keep help '
    + 'protect walk ride drive park charge pay scan open close use try buy sell cost see look watch show find follow turn cross stop wait stay '
    + 'leave arrive visit enjoy recommend suggest choose pick fit measure sew alter fix change wear dress feel think know believe hope wish '
    + 'release float light collect clean pollute break decompose dissolve burn carry fold pack glue stick stretch cut bend tie paint decorate '
    + 'build hang place set add start begin finish end let ask tell say speak talk call explain guide lead bring send book reserve rent cycle '
    + 'sail row swim travel explore learn teach practise practice check plan meet join celebrate remember forget save reduce recycle preserve '
    + 'last grow plant serve eat drink taste cook order smell sound seem become allow ban run move sit stand return mean happen include '
    + 'contain offer provide prepare film record share post smile thank welcome hold pull push lift drop shine glow drift flow live work '
    + 'cover dry mix wrap stitch design shape attach sign promise').split(' ');
  const IRREGULAR = ('is am are was were been being has had does did done went gone came took taken made got gotten gave given kept saw seen '
    + 'found thought knew known brought bought sold told said spoke spoken wore worn felt left met paid set let cut built sent spent stood '
    + 'sat ran broke broken chose chosen rode ridden drove driven ate eaten drank drunk began begun hung lit taught caught held lost grew '
    + 'grown swam flew flown became fell fallen wrote written read').split(' ');
  // Dạng rút gọn (đã bỏ dấu nháy khi chuẩn hoá): it's → its, don't → dont, you'll → youll …
  const CONTRACTIONS = new Set(('im youre theyre its thats theres heres whats lets dont doesnt didnt cant wont isnt arent wasnt werent '
    + 'ill youll itll theyll shell ive youve weve theyve id youd hed shed itd couldnt wouldnt shouldnt mustnt').split(' '));
  const VERBS = new Set();
  VERB_BASES.forEach((v) => {
    const ing = v.endsWith('e') && !v.endsWith('ee') ? `${v.slice(0, -1)}ing` : `${v}ing`;
    const ed = v.endsWith('e') ? `${v}d` : /[^aeiou]y$/.test(v) ? `${v.slice(0, -1)}ied` : `${v}ed`;
    [v, `${v}s`, `${v}es`, ing, ed, `${v}${v.slice(-1)}ing`, `${v}${v.slice(-1)}ed`].forEach((f) => VERBS.add(stem(f)));
  });
  IRREGULAR.forEach((f) => VERBS.add(stem(f)));

  // Độ khớp với câu mẫu (0–1): một nửa là tỉ lệ từ khoá dùng được, một nửa là độ trùng từ nội dung (F1) với câu mẫu
  function similarity(tokens, sample, coverage) {
    const content = (arr) => new Set(arr.filter((t) => t.length > 1 && !STOP.has(t)));
    const a = content(tokens);
    const b = content(tokensOf(sample));
    if (!a.size || !b.size) return coverage;
    let inter = 0;
    a.forEach((t) => { if (b.has(t)) inter += 1; });
    const f1 = inter ? (2 * inter) / (a.size + b.size) : 0;
    return 0.5 * coverage + 0.5 * f1;
  }

  const SIM_PASS = 0.45;

  /* Chấm một câu trả lời tự do (viết hoặc nói). Trả về { ok, reason, hits, count, need, similarity, missing }.
     reason: 'short' (quá ngắn) · 'repeat' (lặp từ) · 'list' (chỉ liệt kê từ khoá) · 'verb' (thiếu động từ)
             · 'keywords' (thiếu từ khoá) · 'similar' (chưa sát câu mẫu) */
  function checkAnswer(text, { keywords = [], sample = '', need = 2, minWords = 5, minSimilarity = SIM_PASS } = {}) {
    const words = normalize(text).split(' ').filter(Boolean);
    const tokens = words.map(stem);
    const kw = scoreKeywords(text, keywords);
    const sim = similarity(tokens, sample, keywords.length ? kw.count / keywords.length : 0);
    const missing = keywords.filter((k, i) => !kw.hits[i]).map(firstAlt);
    const base = { hits: kw.hits, count: kw.count, need, similarity: sim, missing, words: tokens.length };
    const fail = (reason) => ({ ...base, ok: false, reason });
    if (tokens.length < minWords) return fail('short');
    // Lặp từ: hai từ nội dung giống nhau liền nhau, một từ nội dung dùng từ 3 lần, một từ bất kỳ chiếm ≥ 30% câu
    // (kiểu "the quiet the clean the …"), hoặc quá ít từ khác nhau
    const counts = {};
    tokens.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
    if (tokens.some((t, i) => i && t === tokens[i - 1] && !STOP.has(t))
      || Object.entries(counts).some(([t, c]) => (!STOP.has(t) && c >= 3) || (c >= 3 && c / tokens.length >= 0.3))
      || new Set(tokens).size / tokens.length < 0.5) return fail('repeat');
    // Chỉ liệt kê từ khoá: hầu hết là từ khoá, hoặc không có từ chức năng nào để nối thành câu
    const kwTokens = new Set(keywords.flatMap((k) => k.split('|').flatMap(tokensOf)));
    if (tokens.filter((t) => kwTokens.has(t)).length / tokens.length >= 0.75 || !tokens.some((t) => STOP.has(t))) return fail('list');
    if (!words.some((w) => CONTRACTIONS.has(w)) && !tokens.some((t) => VERBS.has(t))) return fail('verb');
    if (kw.count < need) return fail('keywords');
    if (sim < minSimilarity) return fail('similar');
    return { ...base, ok: true };
  }

  /* ---------- Âm thanh ---------- */

  const canSpeak = 'speechSynthesis' in window;
  let voices = [];
  let currentAudio = null;
  const missingFiles = new Set();
  const sfxCache = {};

  function refreshVoices() {
    voices = canSpeak ? speechSynthesis.getVoices() : [];
  }
  if (canSpeak) {
    refreshVoices();
    speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function pickVoice(langs) {
    for (const lang of langs) {
      const matches = voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(lang.toLowerCase()));
      if (matches.length) return matches.find((v) => /natural|google|premium|enhanced/i.test(v.name)) || matches[0];
    }
    return null;
  }

  function speak(text, opts = {}) {
    if (!canSpeak || !text) return;
    const langs = opts.langs || ['en-US', 'en-GB'];
    const voice = pickVoice(langs) || (langs[0].startsWith('en') ? voices.find((v) => /^en/i.test(v.lang)) : null);
    if (!voice && !langs[0].startsWith('en')) return; // không có giọng tiếng Việt thì im lặng
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : langs[0];
    u.rate = opts.rate || 0.92;
    u.pitch = opts.pitch || 1;
    speechSynthesis.speak(u);
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (canSpeak) speechSynthesis.cancel();
  }

  // Phát tệp ghi âm nếu có; chưa có tệp (hoặc lỗi) thì đọc bằng giọng máy.
  function playLine(src, text, opts) {
    stopAudio();
    if (!src || missingFiles.has(src)) {
      speak(text, opts);
      return;
    }
    const audio = new Audio(src);
    currentAudio = audio;
    let handled = false;
    const fallback = () => {
      if (handled) return;
      handled = true;
      missingFiles.add(src);
      if (currentAudio === audio) speak(text, opts);
    };
    audio.addEventListener('error', fallback);
    audio.play().catch((err) => {
      if (err && (err.name === 'NotAllowedError' || err.name === 'AbortError')) return;
      fallback();
    });
  }

  function sfx(name) {
    if (!store.data.soundOn) return;
    try {
      if (!sfxCache[name]) sfxCache[name] = new Audio(`../assets/boss/sfx/${name}.wav`);
      const a = sfxCache[name];
      a.currentTime = 0;
      a.volume = 0.6;
      a.play().catch(() => { /* trình duyệt chặn tự phát: bỏ qua */ });
    } catch (e) { /* bỏ qua */ }
  }

  /* ---------- Nhận dạng giọng nói ---------- */

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canListen = Boolean(SpeechRec) && window.isSecureContext;
  let recognizer = null;

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
    recognizer = { rec, stop: () => rec.stop(), abort: () => { aborted = true; rec.abort(); } };
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

  IT.core = {
    store,
    analyzeStyle,
    normalize,
    stem,
    tokensOf,
    scoreKeywords,
    checkAnswer,
    firstAlt,
    speak,
    playLine,
    stopAudio,
    sfx,
    canSpeak,
    canListen,
    startListening,
    stopListening,
    isListening: () => Boolean(recognizer),
    stopRecognizer: () => recognizer && recognizer.stop(),
  };
})();
