/* -------------------------------------------------------------
 * PortalStudy – theo dõi học tập dùng chung cho mọi trang bài tập
 * và Cánh đồng tri thức (cây lúa) trên trang chủ.
 * Toàn bộ dữ liệu nằm trong localStorage 'user_rice_farm_data'.
 *
 * Nước tưới lúa (10 giọt = 1 giai đoạn, giai đoạn 10 = mùa vàng):
 *   +10  mỗi ngày có học (đủ 1 phút học thực sự) – đồng thời tính chuỗi ngày học
 *   +10  khi đạt mục tiêu 30 phút học trong ngày
 *   +10  mỗi bài quiz đúng 100% (ít nhất 5 câu, tối đa 3 lần mỗi ngày)
 *   +20  hũ dưỡng chất mỗi khi chuỗi ngày học chạm mốc 7, 14, 21...
 *
 * Trang bài tập nạp file này với thuộc tính data-track-time để tính giờ học
 * (chỉ khi tab đang được xem, đang được chọn và có thao tác trong 90 giây
 * gần nhất), và gọi PortalStudy.recordQuiz(correct, total) khi chấm bài.
 * ------------------------------------------------------------- */
(function () {
  if (window.PortalStudy) return;

  const KEY = 'user_rice_farm_data';
  const RULES = {
    dropsPerStage: 10,
    stages: 10,
    studyDayDrops: 10,
    studyDayMinSeconds: 60,
    goalMinutes: 30,
    goalDrops: 10,
    perfectDrops: 10,
    perfectMinQuestions: 5,
    perfectPerDay: 3,
    streakBonusEvery: 7,
    streakBonusDrops: 20
  };
  const HARVEST_WATER = RULES.dropsPerStage * (RULES.stages - 1);   // 90 giọt: lúa chín (giai đoạn 10)
  const IDLE_MS = 90 * 1000;
  const TICK_MS = 5000;

  function dateKey(d = new Date()) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function dayGap(fromKey, toKey) {
    const [a, b] = [fromKey, toKey].map((k) => {
      const [y, m, d] = k.split('-').map(Number);
      return Date.UTC(y, m - 1, d);
    });
    return Math.round((b - a) / 86400000);
  }

  const num = (v) => (Number.isFinite(v) && v >= 0 ? v : 0);

  function blankDay(date) {
    return { date, seconds: 0, studied: false, goal: false, perfect: 0 };
  }

  // Đọc dữ liệu cũ (bản 1 chỉ có waterCount / stageIndex / totalHarvests) và dữ liệu hỏng một cách an toàn
  function normalize(raw) {
    const d = raw && typeof raw === 'object' ? raw : {};
    const today = dateKey();
    const day = d.day && d.day.date === today
      ? { date: today, seconds: num(d.day.seconds), studied: !!d.day.studied, goal: !!d.day.goal, perfect: num(d.day.perfect) }
      : blankDay(today);
    return {
      version: 2,
      waterCount: num(d.waterCount),
      cropWater: d.version === 2 ? num(d.cropWater) : Math.min(num(d.stageIndex), RULES.stages - 1) * RULES.dropsPerStage,
      totalHarvests: num(d.totalHarvests),
      streakDays: num(d.streakDays),
      bestStreak: num(d.bestStreak),
      lastStudyDate: typeof d.lastStudyDate === 'string' ? d.lastStudyDate : '',
      totalStudySeconds: num(d.totalStudySeconds),
      perfectQuizzes: num(d.perfectQuizzes),
      cropSeconds: num(d.cropSeconds),
      cropCorrect: num(d.cropCorrect),
      cropTotal: num(d.cropTotal),
      lastSeenCropWater: num(d.lastSeenCropWater),
      studentName: typeof d.studentName === 'string' ? d.studentName.slice(0, 40) : '',
      day
    };
  }

  function read() {
    try {
      return normalize(JSON.parse(localStorage.getItem(KEY)));
    } catch (e) {
      return normalize(null);
    }
  }

  const listeners = [];

  // Đọc mới -> sửa -> ghi, để nhiều tab cùng mở không ghi đè lên nhau
  function update(fn) {
    const d = read();
    fn(d);
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch (e) { /* localStorage bị chặn: vẫn chạy trong phiên này */ }
    listeners.forEach((cb) => cb(d));
    return d;
  }

  function addWater(d, drops) {
    d.waterCount += drops;
    d.cropWater += drops;
  }

  // Ghi nhận ngày học (chuỗi ngày + nước) và mục tiêu 30 phút khi đủ thời gian
  function checkDay(d) {
    if (!d.day.studied && d.day.seconds >= RULES.studyDayMinSeconds) {
      d.day.studied = true;
      const gap = d.lastStudyDate ? dayGap(d.lastStudyDate, d.day.date) : null;
      if (gap === 0) return checkDay(d);       // hôm nay đã được tính rồi
      d.streakDays = gap === 1 ? d.streakDays + 1 : 1;
      d.lastStudyDate = d.day.date;
      d.bestStreak = Math.max(d.bestStreak, d.streakDays);
      addWater(d, RULES.studyDayDrops);
      if (d.streakDays % RULES.streakBonusEvery === 0) addWater(d, RULES.streakBonusDrops);
    }
    if (!d.day.goal && d.day.seconds >= RULES.goalMinutes * 60) {
      d.day.goal = true;
      addWater(d, RULES.goalDrops);
    }
  }

  function recordQuiz(correct, total) {
    correct = Math.floor(Number(correct));
    total = Math.floor(Number(total));
    if (!(total > 0) || !(correct >= 0) || correct > total) return;
    update((d) => {
      d.cropCorrect += correct;
      d.cropTotal += total;
      if (correct === total && total >= RULES.perfectMinQuestions) {
        d.perfectQuizzes += 1;
        if (d.day.perfect < RULES.perfectPerDay) {
          d.day.perfect += 1;
          addWater(d, RULES.perfectDrops);
        }
      }
    });
  }

  // Thu hoạch: sang mùa vụ mới, phần nước dư được giữ lại (nhưng không đủ chín ngay)
  function harvest() {
    return update((d) => {
      if (d.cropWater < HARVEST_WATER) return;
      d.totalHarvests += 1;
      d.cropWater = Math.min(d.cropWater - HARVEST_WATER, HARVEST_WATER - RULES.dropsPerStage);
      d.lastSeenCropWater = d.cropWater;
      d.cropSeconds = 0;
      d.cropCorrect = 0;
      d.cropTotal = 0;
    });
  }

  function setName(name) {
    return update((d) => { d.studentName = String(name || '').trim().slice(0, 40); });
  }

  function markSeen() {
    return update((d) => { d.lastSeenCropWater = d.cropWater; });
  }

  // ---- Số liệu dẫn xuất cho trang chủ ----
  function stageIndex(d) {
    return Math.min(RULES.stages - 1, Math.floor(d.cropWater / RULES.dropsPerStage));
  }

  function currentStreak(d) {
    if (!d.lastStudyDate) return 0;
    return dayGap(d.lastStudyDate, dateKey()) <= 1 ? d.streakDays : 0;
  }

  // Số từ đã thuộc trong Vocabulary Mastery (localStorage 'vocabularyGameProgress')
  function wordsMastered() {
    try {
      const p = JSON.parse(localStorage.getItem('vocabularyGameProgress'));
      return p && p.learned ? Object.values(p.learned).filter(Boolean).length : 0;
    } catch (e) {
      return 0;
    }
  }

  function onChange(cb) {
    listeners.push(cb);
  }

  // Tab khác (trang bài tập) cập nhật dữ liệu -> báo cho trang này
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      const d = read();
      listeners.forEach((cb) => cb(d));
    }
  });

  // ---- Tính giờ học trên trang bài tập ----
  // Đồng hồ chỉ chạy khi tab đang hiện: ẩn tab thì dừng hẳn, quay lại thì đếm tiếp từ lúc đó (không cộng
  // thời gian tab bị ẩn). Mỗi nhịp chỉ cộng khi cửa sổ đang được chọn và có thao tác trong 90 giây gần nhất.
  function trackTime() {
    let lastInput = Date.now();
    const poke = () => { lastInput = Date.now(); };
    ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach((ev) =>
      window.addEventListener(ev, poke, { passive: true, capture: true }));
    let last = Date.now();
    let timer = null;
    const tick = () => {
      const now = Date.now();
      const step = Math.min(now - last, TICK_MS * 2) / 1000;
      last = now;
      if (document.hidden || !document.hasFocus() || now - lastInput >= IDLE_MS) return;
      update((d) => {
        d.day.seconds += step;
        d.totalStudySeconds += step;
        d.cropSeconds += step;
        checkDay(d);
      });
    };
    const start = () => {
      if (timer) return;            // không tạo thêm đồng hồ thứ hai
      last = Date.now();
      timer = setInterval(tick, TICK_MS);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    window.addEventListener('focus', () => { last = Date.now(); });   // chọn lại cửa sổ: không tính lúc đang ở cửa sổ khác
    if (!document.hidden) start();
  }

  window.PortalStudy = {
    RULES, HARVEST_WATER,
    read, recordQuiz, harvest, setName, markSeen,
    stageIndex, currentStreak, wordsMastered, onChange
  };

  const me = document.currentScript;
  if (me && me.hasAttribute('data-track-time')) trackTime();
})();
