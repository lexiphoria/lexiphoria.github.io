/* Immersion Town – lưu tiến độ, học tập thích ứng, chấm câu trả lời, âm thanh và nhận dạng giọng nói. */
(() => {
  'use strict';

  const IT = (window.IT = window.IT || {});
  const STORE_KEY = 'immersionTown.v3';
  const BATTERY_MAX = 5;
  const BATTERY_START = 3;

  /* ---------- Tiến độ ---------- */

  function defaults() {
    return {
      xp: 0,
      battery: BATTERY_START,
      map: 'day',
      pos: null,
      soundOn: true,
      labels: true,
      words: {},       // id → { seen, pokes, unk, miss, streak, status: 'unknown' | 'known' | undefined }
      poked: {},       // khoá điểm chạm đã khám phá
      collected: {},   // Battery Pack và Booklet đã nhặt
      bookletChecks: {},
      quests: {},      // id → { done, voice, typed, firstTry, turns }
      bosses: {},      // id → { wins, tries }
      outfits: ['host'],
      outfit: 'host',
      titles: [],
      title: null,
      solarAt: 0,
      stats: { pokes: 0, translations: 0, linesSeen: 0, firstTry: 0, retries: 0, voice: 0, typed: 0, bossRight: 0, bossWrong: 0, reviews: 0, packs: 0 },
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
    BATTERY_MAX,
    data: load(),
    save() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) { /* bỏ qua */ }
    },
    reset() {
      const keep = { soundOn: this.data.soundOn, labels: this.data.labels };
      this.data = Object.assign(defaults(), keep);
      this.save();
    },
    addBattery(n) {
      const before = this.data.battery;
      this.data.battery = Math.min(BATTERY_MAX, before + n);
      return this.data.battery - before;
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
    if (s.pokes >= 12 && s.pokes >= turns * 2) traits.push(['🧭', 'Nhà thám hiểm', 'Bạn thích chạm và khám phá mọi thứ quanh phố.']);
    if (turns >= 5 && s.pokes < turns) traits.push(['🤝', 'Người kết nối', 'Bạn tập trung trò chuyện và làm nhiệm vụ.']);
    if (s.linesSeen >= 4 && s.translations / s.linesSeen >= 0.5) {
      traits.push(['🔋', 'Hay dùng máy dịch', 'Bạn dịch hơn một nửa số câu thoại.']);
      tips.push('Thử chạm vào từng từ được tô sáng thay vì dịch cả câu: vừa tiết kiệm pin, vừa nhớ từ lâu hơn.');
    } else if (s.linesSeen >= 6 && s.translations / s.linesSeen < 0.15) {
      traits.push(['💪', 'Tự lực', 'Bạn hiếm khi cần dịch cả câu.']);
    }
    if (s.voice >= 2 && s.voice >= s.typed) traits.push(['🎙️', 'Diễn giả', 'Bạn chọn nói thay vì gõ ở phần lớn lượt nói.']);
    if (s.typed >= 2 && s.typed > s.voice) tips.push('Bạn hay gõ thay vì nói. Hãy thử nói ở lượt tiếp theo (Chrome/Edge có micro).');
    if (turns >= 4) {
      const ratio = s.firstTry / turns;
      if (ratio >= 0.75) traits.push(['🎯', 'Chính xác', `Đúng ngay lần đầu ${Math.round(ratio * 100)}% số lượt.`]);
      else if (ratio < 0.5) tips.push('Bạn hay phải làm lại. Đọc Booklet ngữ pháp liên quan trước khi nhận nhiệm vụ.');
    }
    if (unknown >= 5) tips.push(`Bạn có ${unknown} từ Unknown. Mở Sổ từ → "Ôn 5 từ ưu tiên" hoặc đấu Bóng Ma Quên Từ.`);
    const booklets = Object.keys(d.collected).filter((k) => k.startsWith('bk_')).length;
    if (booklets < totals.booklets) tips.push(`Còn ${totals.booklets - booklets} Booklet ngữ pháp giấu quanh phố. Đi dạo và tìm biểu tượng sách màu xanh.`);
    if (!traits.length && !tips.length) tips.push('Hãy chơi thêm một lúc để hệ thống phân tích phong cách học của bạn.');
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
