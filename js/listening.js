/* -------------------------------------------------------------
 * Listening Lab – luyện nghe theo dạng IELTS, chia level A2 / B1 / B2.
 * Video nhúng từ YouTube (BBC Learning English, Vietnam Today) qua
 * YouTube IFrame API; nếu API không tải được thì dùng iframe thường.
 * Dữ liệu bài: js/listening_data.js. Kết quả báo về cánh đồng lúa
 * qua PortalStudy.recordQuiz (js/study-tracker.js).
 * ------------------------------------------------------------- */
(function () {
  const LESSONS = window.LISTENING_LESSONS || [];
  const LEVELS = [
    { code: 'A2', name: 'Elementary' },
    { code: 'B1', name: 'Intermediate' },
    { code: 'B2', name: 'Upper-intermediate' }
  ];
  const SOURCES = {
    bbc: { name: 'BBC Learning English', channel: 'https://www.youtube.com/@bbclearningenglish' },
    vtv: { name: 'Vietnam Today', channel: 'https://www.youtube.com/@vietnamtodayinternational' }
  };
  const SCORE_KEY = 'listening_lab_scores';
  const LEVEL_KEY = 'listening_lab_level';
  const LETTERS = 'ABCDEFG';

  const $ = (sel, root = document) => root.querySelector(sel);

  // localStorage có thể bị chặn (chế độ ẩn danh...) nên luôn bọc try/catch
  function load(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function clock(sec) {
    sec = Math.max(0, Math.round(sec));
    return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }

  function lessonLength(l) {
    return (l.end || 0) - (l.start || 0);
  }

  function questionCount(l) {
    return l.parts.reduce((n, p) => n + p.items.length, 0);
  }

  // Chuẩn hoá câu trả lời điền từ: không phân biệt hoa thường, dấu câu, dấu gạch nối, mạo từ đứng đầu
  function norm(s) {
    return String(s)
      .toLowerCase()
      .normalize('NFC')
      .replace(/[‘’`´]/g, "'")
      .replace(/(\d)[,.](?=\d{3}\b)/g, '$1')
      .replace(/[-–—_/]/g, ' ')
      .replace(/[^\p{L}\p{N}' ]+/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^(a|an|the) /, '');
  }

  /* ---------------- Trạng thái ---------------- */
  let level = load(LEVEL_KEY, 'A2');
  if (!LEVELS.some((x) => x.code === level)) level = 'A2';
  let current = null;      // bài đang mở
  let player = null;       // YT.Player
  let playerReady = false;
  let checked = false;

  const views = {
    list: $('#view-list'),
    lesson: $('#view-lesson')
  };

  /* ---------------- Danh sách bài ---------------- */
  function renderLevels() {
    const bar = $('#level-tabs');
    bar.innerHTML = LEVELS.map((lv) => {
      const n = LESSONS.filter((l) => l.level === lv.code).length;
      return `<button type="button" role="tab" class="level-tab level-${lv.code.toLowerCase()}"
        aria-selected="${lv.code === level}" data-level="${lv.code}">
        <span class="level-code">${lv.code}</span>
        <span class="level-name">${lv.name}</span>
        <span class="level-count">${n} lessons</span>
      </button>`;
    }).join('');
    bar.querySelectorAll('.level-tab').forEach((b) => {
      b.addEventListener('click', () => {
        level = b.dataset.level;
        save(LEVEL_KEY, level);
        renderLevels();
        renderList();
      });
    });
  }

  function renderList() {
    const scores = load(SCORE_KEY, {});
    const items = LESSONS.filter((l) => l.level === level);
    $('#lesson-grid').innerHTML = items.map((l) => {
      const best = scores[l.id];
      const total = questionCount(l);
      const src = SOURCES[l.source] || { name: l.source };
      return `<article class="lesson-card stamp stamp--${l.source}">
        <div class="stamp-inner">
          <div class="lesson-thumb">
            <img src="https://i.ytimg.com/vi/${esc(l.videoId)}/mqdefault.jpg" alt="" loading="lazy">
            <span class="lesson-time">${clock(lessonLength(l))}</span>
          </div>
          <div class="lesson-tags">
            <span class="tag">${esc(src.name)}</span>
            ${best ? `<span class="tag tag-best" title="Best score">★ ${best.correct}/${best.total}</span>` : ''}
          </div>
          <h3>${esc(l.title)}</h3>
          <p class="lesson-meta">${esc(l.series)} · ${total} questions</p>
          <a class="btn" href="#${esc(l.id)}">${best ? 'Try again' : 'Start'}</a>
        </div>
      </article>`;
    }).join('');
  }

  /* ---------------- YouTube player ---------------- */
  let ytPromise = null;
  function loadYouTube() {
    if (ytPromise) return ytPromise;
    ytPromise = new Promise((resolve, reject) => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        resolve(window.YT);
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.onerror = reject;
      document.head.appendChild(s);
      setTimeout(() => reject(new Error('timeout')), 10000);
    });
    return ytPromise;
  }

  function embedUrl(l, from, autoplay) {
    const p = new URLSearchParams({
      start: Math.floor(from), rel: 0, playsinline: 1, iv_load_policy: 3, cc_load_policy: 0
    });
    if (l.end) p.set('end', l.end);
    if (autoplay) p.set('autoplay', 1);
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(l.videoId)}?${p}`;
  }

  function watchUrl(l, from) {
    return `https://www.youtube.com/watch?v=${encodeURIComponent(l.videoId)}&t=${Math.floor(from || l.start || 0)}s`;
  }

  function mountPlayer(l) {
    destroyPlayer();
    const box = $('#player-box');
    box.innerHTML = '<div id="yt-player"></div>';
    loadYouTube().then((YT) => {
      if (current !== l) return;
      player = new YT.Player('yt-player', {
        host: 'https://www.youtube-nocookie.com',
        videoId: l.videoId,
        playerVars: {
          start: l.start || 0,
          end: l.end || undefined,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          cc_load_policy: 0
        },
        events: {
          onReady: () => { playerReady = true; }
        }
      });
    }).catch(() => {
      if (current !== l) return;
      box.innerHTML = `<iframe src="${embedUrl(l, l.start || 0, false)}" title="${esc(l.title)}"
        allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  function destroyPlayer() {
    if (player && player.destroy) {
      try { player.destroy(); } catch (e) { /* bỏ qua */ }
    }
    player = null;
    playerReady = false;
  }

  // Nghe lại đoạn có đáp án (lùi 3 giây cho dễ bắt câu)
  function replay(at) {
    const l = current;
    const from = Math.max(l.start || 0, at - 3);
    if (player && playerReady) {
      player.seekTo(from, true);
      player.playVideo();
    } else {
      const frame = $('#player-box iframe');
      if (frame) frame.src = embedUrl(l, from, true);
    }
    if (window.matchMedia('(max-width: 900px)').matches) {
      $('#player-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ---------------- Bài làm ---------------- */
  function renderLesson(l) {
    const src = SOURCES[l.source] || { name: l.source, channel: '#' };
    $('#lesson-level').textContent = l.level;
    $('#lesson-level').className = 'level-chip level-' + l.level.toLowerCase();
    $('#lesson-title').textContent = l.title;
    $('#lesson-source').innerHTML =
      `<span>Video: <a href="${src.channel}" target="_blank" rel="noopener">${esc(src.name)}</a> · ${esc(l.series)}</span>
       <span>${clock(l.start || 0)}–${clock(l.end || 0)}</span>
       <a class="yt-link" href="${watchUrl(l)}" target="_blank" rel="noopener">Open on YouTube ↗</a>`;

    let n = 0;
    $('#question-sheet').innerHTML = l.parts.map((part, pi) => {
      const first = n + 1;
      const last = n + part.items.length;
      const instr = part.type === 'mcq'
        ? 'Choose the correct letter, <b>A</b>, <b>B</b> or <b>C</b>.'
        : `Write <b>${esc(part.limit || 'ONE WORD ONLY')}</b> for each answer.`;
      const items = part.items.map((it, ii) => {
        n += 1;
        const key = `${pi}-${ii}`;
        if (part.type === 'mcq') {
          const opts = it.options.map((o, oi) => `<label class="q-option">
              <input type="radio" name="q${key}" value="${oi}">
              <span class="q-letter">${LETTERS[oi]}</span>
              <span>${esc(o)}</span>
            </label>`).join('');
          return `<li class="q-item" data-key="${key}">
            <p class="q-text"><span class="q-num">${n}</span>${esc(it.q)}</p>
            <div class="q-options" role="radiogroup">${opts}</div>
            <div class="q-feedback" aria-live="polite"></div>
          </li>`;
        }
        const [before, after = ''] = it.q.split('___');
        return `<li class="q-item q-gap" data-key="${key}">
          <p class="q-text"><span class="q-num">${n}</span>${esc(before)}<input type="text" class="gap-input"
            aria-label="Answer ${n}" autocomplete="off" autocapitalize="off" spellcheck="false">${esc(after)}</p>
          <div class="q-feedback" aria-live="polite"></div>
        </li>`;
      }).join('');
      return `<section class="q-part">
        <h3>Questions ${first}${last > first ? '–' + last : ''}</h3>
        <p class="q-instr">${instr}</p>
        ${part.heading ? `<p class="q-heading">${esc(part.heading)}</p>` : ''}
        <ol class="q-list">${items}</ol>
      </section>`;
    }).join('');

    checked = false;
    $('#score-box').hidden = true;
    $('#check-btn').hidden = false;
    $('#retry-btn').hidden = true;
  }

  function itemOf(key) {
    const [pi, ii] = key.split('-').map(Number);
    const part = current.parts[pi];
    return { part, it: part.items[ii] };
  }

  function check() {
    if (!current || checked) return;
    let correct = 0;
    let total = 0;
    document.querySelectorAll('#question-sheet .q-item').forEach((li) => {
      const { part, it } = itemOf(li.dataset.key);
      total += 1;
      let ok = false;
      let rightText;
      if (part.type === 'mcq') {
        const picked = li.querySelector('input:checked');
        ok = !!picked && Number(picked.value) === it.answer;
        rightText = `${LETTERS[it.answer]} – ${it.options[it.answer]}`;
        li.querySelectorAll('.q-option').forEach((lab, oi) => {
          lab.classList.toggle('is-answer', oi === it.answer);
        });
      } else {
        const val = norm(li.querySelector('.gap-input').value);
        ok = val !== '' && it.answer.some((a) => norm(a) === val);
        rightText = it.answer[0];
      }
      if (ok) correct += 1;
      li.classList.toggle('is-right', ok);
      li.classList.toggle('is-wrong', !ok);
      li.querySelectorAll('input').forEach((inp) => { inp.disabled = true; });
      const fb = li.querySelector('.q-feedback');
      fb.innerHTML = `<span class="fb-mark">${ok ? '✓' : '✗'}</span>
        ${ok ? '' : `<span class="fb-answer">Answer: <b>${esc(rightText)}</b></span>`}
        ${typeof it.at === 'number' ? `<button type="button" class="replay-btn" data-at="${it.at}">▶ ${clock(it.at)}</button>` : ''}`;
    });
    checked = true;

    const scores = load(SCORE_KEY, {});
    const prev = scores[current.id];
    if (!prev || correct > prev.correct) {
      scores[current.id] = { correct, total };
      save(SCORE_KEY, scores);
    }
    if (window.PortalStudy) window.PortalStudy.recordQuiz(correct, total);

    const box = $('#score-box');
    box.hidden = false;
    box.className = 'score-box' + (correct === total ? ' is-perfect' : '');
    box.innerHTML = `<span class="score-num">${correct}<small>/${total}</small></span>
      <span class="score-note">${correct === total ? 'Perfect! 🎉' : 'Press ▶ to hear each answer again.'}</span>`;
    $('#check-btn').hidden = true;
    $('#retry-btn').hidden = false;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function openLesson(id) {
    const l = LESSONS.find((x) => x.id === id);
    if (!l) { showList(); return; }
    current = l;
    if (l.level !== level) {
      level = l.level;
      save(LEVEL_KEY, level);
    }
    renderLesson(l);
    views.list.hidden = true;
    views.lesson.hidden = false;
    document.title = l.title + ' – Listening Lab';
    window.scrollTo(0, 0);
    mountPlayer(l);
  }

  function showList() {
    current = null;
    destroyPlayer();
    $('#player-box').innerHTML = '';
    views.lesson.hidden = true;
    views.list.hidden = false;
    document.title = 'Listening Lab';
    renderLevels();
    renderList();
  }

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) openLesson(id); else showList();
  }

  /* ---------------- Sự kiện ---------------- */
  $('#check-btn').addEventListener('click', check);
  $('#retry-btn').addEventListener('click', () => {
    if (current) renderLesson(current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('#back-btn').addEventListener('click', () => {
    if (location.hash) history.pushState('', '', location.pathname + location.search);
    showList();
  });
  $('#question-sheet').addEventListener('click', (e) => {
    const b = e.target.closest('.replay-btn');
    if (b) replay(Number(b.dataset.at));
  });
  // Enter trong ô điền từ chuyển sang ô kế tiếp
  $('#question-sheet').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !e.target.classList.contains('gap-input')) return;
    e.preventDefault();
    const inputs = [...document.querySelectorAll('#question-sheet .gap-input')];
    const next = inputs[inputs.indexOf(e.target) + 1];
    if (next) next.focus(); else $('#check-btn').focus();
  });
  window.addEventListener('hashchange', route);

  route();
})();
