/**
 * HSG 12 Interactive Exam & Practice Application
 */

(function() {
  'use strict';

  // State
  let testId = 1;
  let mode = 'exam'; // 'practice' or 'exam'
  let currentTest = null;
  let userAnswers = {};
  let flagged = new Set();
  let timerInterval = null;
  let timeRemaining = 3600; // 60 mins
  let isSubmitted = false;
  let passages = [];
  let activePassageIdx = -1;
  let currentQid = null;
  let navLock = false; // true while scrolling to a question picked from the palette/passage

  // Initialize
  function init() {
    setupTheme();
    parseQueryParams();
    loadTest(testId);
    bindGlobalEvents();
  }

  // Theme support
  function setupTheme() {
    const savedTheme = localStorage.getItem('hsg12_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
      themeBtn.title = savedTheme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('hsg12_theme', next);
        themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }
  }

  // Query Params
  function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const t = parseInt(params.get('test'), 10);
    if (!isNaN(t) && t >= 1 && typeof HSG_TESTS_DATA !== 'undefined' && t <= HSG_TESTS_DATA.length) {
      testId = t;
    }
    const m = params.get('mode');
    if (m === 'practice' || m === 'exam') {
      mode = m;
    }
  }

  // Load Test
  function loadTest(id) {
    if (typeof HSG_TESTS_DATA === 'undefined') {
      console.error('HSG_TESTS_DATA not loaded!');
      return;
    }
    currentTest = HSG_TESTS_DATA.find(t => t.id === id) || HSG_TESTS_DATA[0];
    userAnswers = {};
    flagged.clear();
    isSubmitted = false;
    timeRemaining = (currentTest.timeLimit || 60) * 60;

    // Load cached progress if in practice mode
    if (mode === 'practice') {
      const cached = localStorage.getItem(`hsg12_practice_t${id}`);
      if (cached) {
        try {
          userAnswers = JSON.parse(cached);
        } catch(e) {}
      }
    }

    renderQuizHeader();
    renderPassagePane();
    renderQuestions();
    renderPalette();
    updateStats();

    currentQid = null;
    navLock = false;
    detectCurrentQuestion();

    if (mode === 'exam') {
      startTimer();
    } else {
      const timerElem = document.getElementById('timerBox');
      if (timerElem) timerElem.style.display = 'none';
    }
  }

  // Header Rendering
  function renderQuizHeader() {
    const titleEl = document.getElementById('quizTitle');
    if (titleEl) {
      titleEl.textContent = currentTest.title;
    }
    const modeBadge = document.getElementById('quizModeBadge');
    if (modeBadge) {
      if (mode === 'practice') {
        modeBadge.textContent = '📖 Luyện Tập Tự Do (Xem Giải Thích Tức Thì)';
        modeBadge.className = 'tag tag-warning';
      } else {
        modeBadge.textContent = '⏱️ Thi Thử Tính Giờ (60 Phút)';
        modeBadge.className = 'tag tag-success';
      }
    }

    // Populate test switcher dropdown if exists
    const testSelect = document.getElementById('testSelect');
    if (testSelect) {
      testSelect.value = currentTest.id;
      testSelect.onchange = (e) => {
        window.location.search = `?test=${e.target.value}&mode=${mode}`;
      };
    }
  }

  // Timer
  function startTimer() {
    clearInterval(timerInterval);
    const timerElem = document.getElementById('timerBox');
    const timerVal = document.getElementById('timerValue');
    if (!timerElem || !timerVal) return;

    timerElem.style.display = 'inline-flex';

    function updateTimer() {
      const m = Math.floor(timeRemaining / 60);
      const s = timeRemaining % 60;
      timerVal.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      if (timeRemaining <= 300) {
        timerElem.classList.add('urgent');
      } else {
        timerElem.classList.remove('urgent');
      }

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert('⏰ Đã hết thời gian làm bài! Hệ thống sẽ tự động nộp bài và tổng kết kết quả của bạn.');
        submitQuiz();
      }
      timeRemaining--;
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Passage Pane Rendering
  function renderPassagePane() {
    const pane = document.getElementById('passagePane');
    if (!pane) return;

    // Find all unique passages in this test, with the question numbers they cover
    const passagesMap = new Map();
    currentTest.questions.forEach(q => {
      if (!q.passage) return;
      if (!passagesMap.has(q.passageTitle)) {
        passagesMap.set(q.passageTitle, {
          title: q.passageTitle,
          content: q.passage,
          qNums: []
        });
      }
      passagesMap.get(q.passageTitle).qNums.push(q.num);
    });

    passages = Array.from(passagesMap.values());
    activePassageIdx = -1;

    if (passages.length === 0) {
      pane.style.display = 'none';
      return;
    }

    pane.style.display = '';
    pane.innerHTML = `
      <div class="passage-pane-header">
        <h3>📄 Văn Bản / Bài Đọc Hiểu</h3>
        <span class="passage-pane-hint">Split-Screen View</span>
      </div>
      <div id="passageTabs" class="passage-tabs" role="tablist"></div>
      <div id="passageContent" class="passage-content"></div>
    `;

    const tabsContainer = document.getElementById('passageTabs');
    passages.forEach((p, idx) => {
      const first = p.qNums[0];
      const last = p.qNums[p.qNums.length - 1];
      const fullTitle = p.title.replace(` - Đề ${currentTest.id}`, '');
      // Short label from the English part, e.g. "Đoạn văn điền từ (Guided Cloze)" -> "Guided Cloze"
      const shortTitle = (fullTitle.match(/\(([^)]+)\)/) || [])[1] || fullTitle;
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = 'passage-tab';
      tabBtn.setAttribute('role', 'tab');
      tabBtn.title = fullTitle;
      tabBtn.innerHTML = '<span></span><span class="passage-tab-range"></span>';
      tabBtn.firstChild.textContent = shortTitle;
      tabBtn.lastChild.textContent = first === last ? `· Câu ${first}` : `· Câu ${first}–${last}`;
      tabBtn.onclick = () => showPassage(idx);
      tabsContainer.appendChild(tabBtn);
    });

    showPassage(0);
  }

  function showPassage(idx) {
    const p = passages[idx];
    const contentContainer = document.getElementById('passageContent');
    if (!p || !contentContainer) return;

    activePassageIdx = idx;
    document.querySelectorAll('#passageTabs .passage-tab').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
      b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    contentContainer.replaceChildren(...buildPassageBlocks(p));
    contentContainer.scrollTop = 0;
    highlightPassageGap();
  }

  // Passages come from a PDF and are hard-wrapped: rejoin wrapped lines into paragraphs
  function reflowPassage(text) {
    const blocks = [];
    let prevLine = '';
    const lines = text.split('\n').map(raw => raw.trim())
      .filter(line => line && !/^questions?:?$/i.test(line));

    lines.forEach((line, i) => {
      const isItem = /^[a-hA-H]\.\s/.test(line) || /^\(\d{1,2}\)\s*[A-Z]/.test(line);
      const last = blocks[blocks.length - 1];
      const prevEnded = !last || /[.!?:]["'”’]?$/.test(prevLine);
      // Headings: ALL CAPS, or a short standalone line followed by a new sentence ("The Video Loggers")
      const isTitle = (line.length < 100 && /[A-Z]{3}/.test(line) && line === line.toUpperCase()) ||
        (!isItem && prevEnded && line.length <= 60 && !/[.,;:?]["'”’]?$/.test(line) &&
          !/^(read|mark|choose)\b/i.test(line) && /^[A-Z“"']/.test(lines[i + 1] || ''));
      const startsNew = prevEnded || isTitle || isItem || last.type === 'title';

      if (startsNew) {
        blocks.push({ type: isTitle ? 'title' : isItem ? 'item' : 'para', text: line });
      } else {
        last.text += ' ' + line;
      }
      prevLine = line;
    });

    // The opening "Read the passage..." line is the task instruction, not part of the text
    if (blocks.length && blocks[0].type === 'para' && /^(read|mark|choose)\b/i.test(blocks[0].text)) {
      blocks[0].type = 'instruction';
    }
    return blocks;
  }

  function buildPassageBlocks(p) {
    const gapNums = new Set(p.qNums);

    return reflowPassage(p.content).map(block => {
      const el = document.createElement('p');
      el.className = `passage-${block.type}`;

      // Turn "(14)" gap markers into badges that jump to their question
      block.text.split(/(\(\s?\d{1,2}\s?\))/).forEach(part => {
        const m = part.match(/^\(\s?(\d{1,2})\s?\)$/);
        const num = m ? parseInt(m[1], 10) : NaN;
        if (gapNums.has(num)) {
          const gap = document.createElement('span');
          gap.className = 'passage-gap';
          gap.dataset.num = num;
          gap.textContent = num;
          gap.title = `Đi tới câu ${num}`;
          gap.onclick = () => {
            const q = currentTest.questions.find(item => item.num === num);
            if (q) scrollToQuestion(q.id);
          };
          el.appendChild(gap);
        } else if (part) {
          el.appendChild(document.createTextNode(part));
        }
      });
      return el;
    });
  }

  // Mark the current question's gap in the passage and bring it into view
  function highlightPassageGap() {
    const content = document.getElementById('passageContent');
    if (!content) return;

    const q = currentTest.questions.find(item => item.id === currentQid);
    let activeGap = null;
    content.querySelectorAll('.passage-gap').forEach(gap => {
      const isActive = !!q && Number(gap.dataset.num) === q.num;
      gap.classList.toggle('active', isActive);
      if (isActive) activeGap = gap;
    });

    if (activeGap) {
      const gapTop = activeGap.offsetTop;
      if (gapTop < content.scrollTop || gapTop > content.scrollTop + content.clientHeight - 40) {
        // Instant on purpose: a smooth scroll here would interrupt the questions column's scroll
        content.scrollTop = gapTop - content.clientHeight / 3;
      }
    }
  }

  // Undo PDF soft wraps in a question stem (a near-full-width line cut mid-sentence),
  // keeping intentional breaks such as a./b./c. lists and letter lines
  function unwrapStem(text) {
    const lines = text.split('\n');
    let out = lines[0];
    for (let i = 1; i < lines.length; i++) {
      const prev = lines[i - 1].trim();
      const soft = prev.length >= 80 && !/[.!?:"”’]$/.test(prev) &&
        !/^\s*([a-hA-H]\s*[.)-]|\(?\d)/.test(lines[i]);
      out += (soft ? ' ' : '\n') + lines[i];
    }
    return out;
  }

  // Speech synthesis
  function speakText(text) {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Text-to-Speech.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  // Render Questions
  function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    if (!container) return;

    container.innerHTML = '';

    currentTest.questions.forEach((q, index) => {
      const card = document.createElement('article');
      card.className = `question-card ${flagged.has(q.id) ? 'flagged' : ''}`;
      card.id = `q_card_${q.id}`;
      card.setAttribute('data-qid', q.id);

      // Section instruction if first of section
      let sectionNoticeHtml = '';
      if (index === 0 || currentTest.questions[index - 1].section !== q.section) {
        sectionNoticeHtml = `
          <div style="margin-bottom:1rem; padding:0.75rem 1rem; background:rgba(99,102,241,0.1); border-left:4px solid var(--accent-primary); border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
            <div style="font-weight:700; color:#a5b4fc; font-size:0.95rem;">${q.section}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">${q.instruction}</div>
          </div>
        `;
      }

      // Audio & QR HTML if applicable
      let audioHtml = '';
      if (q.audio) {
        if (q.audio.src) {
          // Embedded MP3 Audio Player (Replaces QR code)
          audioHtml = `
            <div class="audio-player-box" id="audio_box_${q.id}">
              <div class="audio-player-header">
                <div class="audio-player-info">
                  <div class="audio-title">🎧 ${q.audio.title}</div>
                  <div class="audio-subtitle">File âm thanh bài nghe trực tiếp (MP3)</div>
                </div>
                <div class="audio-tag">
                  <span class="audio-pulse-dot"></span>
                  <span>Audio MP3</span>
                </div>
              </div>

              <div class="audio-element-wrapper">
                <audio controls preload="metadata" class="main-audio-player" data-src="${q.audio.src}" id="audio_elem_${q.id}">
                  <source src="${q.audio.src}" type="audio/mpeg">
                  Trình duyệt không hỗ trợ phát file âm thanh.
                </audio>
              </div>

              <div class="audio-tools-bar">
                <div class="audio-playback-helpers">
                  <button type="button" class="audio-tool-btn" onclick="window.seekAudio('audio_elem_${q.id}', -5)" title="Tua lại 5 giây">⏪ -5s</button>
                  <button type="button" class="audio-tool-btn" onclick="window.seekAudio('audio_elem_${q.id}', 5)" title="Tua tới 5 giây">+5s ⏩</button>
                  <button type="button" class="audio-tool-btn" onclick="window.cycleAudioSpeed('audio_elem_${q.id}', this)" title="Tốc độ phát">1.0x</button>
                </div>
                <div class="audio-extra-actions">
                  <button type="button" class="btn btn-secondary" style="font-size:0.78rem; padding:0.35rem 0.75rem;" onclick="window.speechSynthesisSpeakQuestion('${q.id}')">
                    🔊 Đọc câu hỏi
                  </button>
                  ${q.audio.qrImage ? `
                    <button type="button" class="btn btn-secondary" style="font-size:0.78rem; padding:0.35rem 0.75rem;" onclick="window.toggleQrDrawer('${q.id}')" title="Mở mã QR nếu muốn quét nghe trên điện thoại">
                      📱 Mã QR
                    </button>
                  ` : ''}
                </div>
              </div>

              ${q.audio.qrImage ? `
                <div class="qr-drawer" id="qr_drawer_${q.id}" style="display:none;">
                  <div class="qr-drawer-inner">
                    <img class="qr-code-img" src="${q.audio.qrImage}" alt="QR Code">
                    <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">Quét mã QR để nghe bằng điện thoại</div>
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        } else {
          // Fallback to QR code box for tests without direct mp3 src
          audioHtml = `
            <div class="audio-qr-box">
              <div class="qr-code-wrapper">
                <img class="qr-code-img" src="${q.audio.qrImage}" alt="QR Code Audio" title="Quét bằng camera điện thoại để nghe âm thanh bài thi">
                <span class="qr-label">📱 Quét Mã Nghe</span>
              </div>
              <div class="audio-controls-area">
                <div class="audio-title">🎧 ${q.audio.title}</div>
                <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">
                  Quét mã QR bằng điện thoại để nghe file âm thanh gốc${q.audio.driveUrl ? ', hoặc bấm mở link Google Drive bên dưới' : ''}:
                </p>
                <div class="audio-btn-row">
                  ${q.audio.driveUrl ? `<a href="${q.audio.driveUrl}" target="_blank" class="btn btn-secondary" style="font-size:0.78rem; padding:0.35rem 0.75rem;">🔗 Mở Audio Google Drive</a>` : ''}
                  <button class="btn btn-secondary" style="font-size:0.78rem; padding:0.35rem 0.75rem;" onclick="window.speechSynthesisSpeakQuestion('${q.id}')">
                    🔊 Đọc câu hỏi (Web Speech)
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      }

      // Options HTML
      let optionsHtml = '';
      const selectedOpt = userAnswers[q.id];
      
      for (const [key, val] of Object.entries(q.options)) {
        let optClass = 'option-item';
        if (selectedOpt === key) {
          optClass += ' selected';
        }
        if (isSubmitted || mode === 'practice' && selectedOpt) {
          if (key === q.answer) {
            optClass += ' correct';
          } else if (selectedOpt === key && key !== q.answer) {
            optClass += ' incorrect';
          }
        }

        optionsHtml += `
          <div class="${optClass}" onclick="window.selectOption('${q.id}', '${key}')" data-opt="${key}">
            <div class="option-letter">${key}</div>
            <div class="option-text">${val}</div>
          </div>
        `;
      }

      // Explanation box (in practice mode or after submit)
      let explanationHtml = '';
      if ((mode === 'practice' && selectedOpt) || isSubmitted) {
        explanationHtml = `
          <div class="explanation-box">
            <div style="font-weight:700; color:var(--success); margin-bottom:0.4rem; display:flex; align-items:center; gap:0.4rem;">
              <span>💡 Lời Giải Chi Tiết</span>
              <span style="font-size:0.8rem; color:var(--text-secondary);">(Đáp án chuẩn: <strong>${q.answer}</strong>)</span>
            </div>
            <div style="color:var(--text-primary); white-space:pre-line;">${q.explanation}</div>
          </div>
        `;
      }

      card.innerHTML = `
        ${sectionNoticeHtml}
        <div class="question-header">
          <div class="question-num-badge">
            <span>Câu ${q.num}</span>
            <span style="font-size:0.75rem; opacity:0.8;">/ 50</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button class="btn-flag ${flagged.has(q.id) ? 'active' : ''}" onclick="window.toggleFlag('${q.id}')">
              🚩 ${flagged.has(q.id) ? 'Đã gắn cờ' : 'Gắn cờ'}
            </button>
          </div>
        </div>
        ${audioHtml}
        <div class="question-stem">${q.question ? unwrapStem(q.question) : `Chọn đáp án đúng cho câu ${q.num}:`}</div>
        <div class="options-list">
          ${optionsHtml}
        </div>
        ${explanationHtml}
      `;

      container.appendChild(card);
    });
  }

  // Palette Rendering
  function renderPalette() {
    const grid = document.getElementById('paletteGrid');
    if (!grid) return;

    grid.innerHTML = '';

    currentTest.questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = q.num;
      btn.id = `palette_btn_${q.id}`;

      if (userAnswers[q.id]) {
        btn.classList.add('answered');
      }
      if (flagged.has(q.id)) {
        btn.classList.add('flagged');
      }

      btn.onclick = () => {
        scrollToQuestion(q.id);
      };

      grid.appendChild(btn);
    });
  }

  function scrollToQuestion(qid) {
    const card = document.getElementById(`q_card_${qid}`);
    if (card) {
      navLock = true;
      // Sync the passage first: a second scroll started later would cancel this smooth one
      setCurrentQuestion(qid);
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 1200);
    }
  }

  function setCurrentQuestion(qid) {
    if (qid === currentQid) return;
    currentQid = qid;

    // Update current class in palette
    document.querySelectorAll('.palette-btn.current').forEach(b => b.classList.remove('current'));
    const pbtn = document.getElementById(`palette_btn_${qid}`);
    if (pbtn) pbtn.classList.add('current');

    // Keep the passage pane on the text this question belongs to
    const q = currentTest.questions.find(item => item.id === qid);
    const idx = q && q.passage ? passages.findIndex(p => p.title === q.passageTitle) : -1;
    if (idx !== -1 && idx !== activePassageIdx) {
      showPassage(idx);
    } else {
      highlightPassageGap();
    }
  }

  // Work out which question card the student is looking at
  function detectCurrentQuestion() {
    if (navLock) return;
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    const cards = container.querySelectorAll('.question-card');
    if (!cards.length) return;

    // Desktop: the questions column scrolls itself. Mobile: the page scrolls.
    const ownScroll = container.scrollHeight > container.clientHeight + 1;
    const atBottom = ownScroll
      ? container.scrollTop + container.clientHeight >= container.scrollHeight - 4
      : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) {
      setCurrentQuestion(cards[cards.length - 1].dataset.qid);
      return;
    }

    const topbar = document.querySelector('.quiz-topbar');
    const refTop = ownScroll
      ? container.getBoundingClientRect().top
      : Math.max(0, topbar ? topbar.getBoundingClientRect().bottom : 0);
    const line = refTop + 120;
    for (const card of cards) {
      if (card.getBoundingClientRect().bottom > line) {
        setCurrentQuestion(card.dataset.qid);
        return;
      }
    }
  }

  let scrollTicking = false;
  function onQuestionsScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      detectCurrentQuestion();
    });
  }

  window.scrollQuestionsTop = function() {
    navLock = false;
    const container = document.getElementById('questionsContainer');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Option selection
  window.selectOption = function(qid, optKey) {
    if (isSubmitted && mode === 'exam') return;

    userAnswers[qid] = optKey;

    if (mode === 'practice') {
      localStorage.setItem(`hsg12_practice_t${currentTest.id}`, JSON.stringify(userAnswers));
    }

    // Re-render this question card
    updateQuestionCard(qid);
    // Update palette button
    updatePaletteBtn(qid);
    updateStats();
  };

  function updateQuestionCard(qid) {
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q) return;

    const card = document.getElementById(`q_card_${qid}`);
    if (!card) return;

    const optElements = card.querySelectorAll('.option-item');
    optElements.forEach(el => {
      const key = el.getAttribute('data-opt');
      el.className = 'option-item';
      if (userAnswers[qid] === key) {
        el.classList.add('selected');
      }
      if (isSubmitted || (mode === 'practice' && userAnswers[qid])) {
        if (key === q.answer) {
          el.classList.add('correct');
        } else if (userAnswers[qid] === key && key !== q.answer) {
          el.classList.add('incorrect');
        }
      }
    });

    // Handle explanation box
    let expBox = card.querySelector('.explanation-box');
    if ((mode === 'practice' && userAnswers[qid]) || isSubmitted) {
      if (!expBox) {
        expBox = document.createElement('div');
        expBox.className = 'explanation-box';
        card.appendChild(expBox);
      }
      expBox.innerHTML = `
        <div style="font-weight:700; color:var(--success); margin-bottom:0.4rem; display:flex; align-items:center; gap:0.4rem;">
          <span>💡 Lời Giải Chi Tiết</span>
          <span style="font-size:0.8rem; color:var(--text-secondary);">(Đáp án chuẩn: <strong>${q.answer}</strong>)</span>
        </div>
        <div style="color:var(--text-primary); white-space:pre-line;">${q.explanation}</div>
      `;
    }
  }

  function updatePaletteBtn(qid) {
    const btn = document.getElementById(`palette_btn_${qid}`);
    if (!btn) return;
    if (userAnswers[qid]) {
      btn.classList.add('answered');
    } else {
      btn.classList.remove('answered');
    }
  }

  // Toggle Flag
  window.toggleFlag = function(qid) {
    if (flagged.has(qid)) {
      flagged.delete(qid);
    } else {
      flagged.add(qid);
    }

    const card = document.getElementById(`q_card_${qid}`);
    if (card) {
      card.classList.toggle('flagged', flagged.has(qid));
      const flagBtn = card.querySelector('.btn-flag');
      if (flagBtn) {
        flagBtn.classList.toggle('active', flagged.has(qid));
        flagBtn.innerHTML = flagged.has(qid) ? '🚩 Đã gắn cờ' : '🚩 Gắn cờ';
      }
    }

    const pbtn = document.getElementById(`palette_btn_${qid}`);
    if (pbtn) {
      pbtn.classList.toggle('flagged', flagged.has(qid));
    }
  };

  // Speech TTS question
  window.speechSynthesisSpeakQuestion = function(qid) {
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q) return;
    const text = `${q.question}. Option A: ${q.options.A || ''}. Option B: ${q.options.B || ''}. Option C: ${q.options.C || ''}. Option D: ${q.options.D || ''}`;
    speakText(text);
  };

  // Update Header Stats
  function updateStats() {
    const answeredCount = Object.keys(userAnswers).length;
    const answeredEl = document.getElementById('answeredStat');
    if (answeredEl) {
      answeredEl.textContent = `${answeredCount} / 50 đã trả lời`;
    }
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      const pct = (answeredCount / 50) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  // Submit Quiz
  window.confirmSubmit = function() {
    if (isSubmitted) return;
    const answeredCount = Object.keys(userAnswers).length;
    const remainingCount = 50 - answeredCount;

    let msg = `Bạn đã hoàn thành ${answeredCount}/50 câu.`;
    if (remainingCount > 0) {
      msg += ` Còn ${remainingCount} câu chưa trả lời.`;
    }
    msg += ` Bạn có chắc chắn muốn nộp bài không?`;

    if (confirm(msg)) {
      submitQuiz();
    }
  };

  function submitQuiz() {
    isSubmitted = true;
    clearInterval(timerInterval);

    // Calculate score
    let correctCount = 0;
    const sectionStats = {};

    currentTest.questions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.answer;
      if (isCorrect) correctCount++;

      const cat = q.category || 'Khác';
      if (!sectionStats[cat]) {
        sectionStats[cat] = { total: 0, correct: 0 };
      }
      sectionStats[cat].total++;
      if (isCorrect) sectionStats[cat].correct++;
    });

    const scoreOutOf10 = ((correctCount / 50) * 10).toFixed(2);

    // Save result to localStorage
    const record = {
      testId: currentTest.id,
      testTitle: currentTest.title,
      score: scoreOutOf10,
      correctCount,
      total: 50,
      date: new Date().toLocaleDateString('vi-VN')
    };
    const history = JSON.parse(localStorage.getItem('hsg12_exam_history') || '[]');
    history.push(record);
    localStorage.setItem('hsg12_exam_history', JSON.stringify(history));

    // Show result modal
    showResultModal(scoreOutOf10, correctCount, sectionStats);

    // Update UI to show correct answers & explanations
    currentTest.questions.forEach(q => {
      updateQuestionCard(q.id);
    });
  }

  function showResultModal(score, correct, stats) {
    const modal = document.getElementById('resultModal');
    if (!modal) return;

    document.getElementById('modalScoreText').textContent = score;
    document.getElementById('modalCorrectCount').textContent = `${correct} / 50`;
    document.getElementById('modalAccuracy').textContent = `${Math.round((correct / 50) * 100)}%`;

    const statsContainer = document.getElementById('modalSectionBreakdown');
    if (statsContainer) {
      statsContainer.innerHTML = '';
      for (const [secName, data] of Object.entries(stats)) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '0.4rem 0';
        row.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
        row.style.fontSize = '0.88rem';

        const pct = Math.round((data.correct / data.total) * 100);
        row.innerHTML = `
          <span>${secName}</span>
          <span style="font-weight:700; color:${pct >= 70 ? 'var(--success)' : 'var(--warning)'};">
            ${data.correct}/${data.total} (${pct}%)
          </span>
        `;
        statsContainer.appendChild(row);
      }
    }

    modal.classList.add('open');
  }

  window.closeModal = function() {
    const modal = document.getElementById('resultModal');
    if (modal) modal.classList.remove('open');
  };

  window.restartTest = function() {
    if (confirm('Bạn có muốn làm lại đề thi này từ đầu không?')) {
      userAnswers = {};
      flagged.clear();
      isSubmitted = false;
      loadTest(currentTest.id);
      window.closeModal();
    }
  };

  // Audio Helper Functions
  let activeAudioElement = null;
  const audioLastTimes = {};

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateStickyBar(audio) {
    const controller = document.getElementById('stickyAudioController');
    if (!controller) return;
    if (!audio || audio.paused) {
      if (controller && audio && audio.paused) {
        const playBtn = document.getElementById('stickyPlayPauseBtn');
        if (playBtn) playBtn.textContent = '▶️';
      }
      return;
    }
    controller.style.display = 'block';
    const titleEl = document.getElementById('stickyAudioTitle');
    const playBtn = document.getElementById('stickyPlayPauseBtn');
    const timerEl = document.getElementById('stickyAudioTimer');

    if (titleEl) {
      const parentBox = audio.closest('.audio-player-box');
      const title = parentBox ? parentBox.querySelector('.audio-title')?.textContent : '🎧 Bài nghe đang phát';
      titleEl.textContent = title || '🎧 Bài nghe đang phát';
    }
    if (playBtn) playBtn.textContent = '⏸️';
    if (timerEl) {
      timerEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
    }
  }

  window.seekAudio = function(audioId, delta) {
    const audio = document.getElementById(audioId);
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
    updateStickyBar(audio);
  };

  window.cycleAudioSpeed = function(audioId, btn) {
    const audio = document.getElementById(audioId);
    if (!audio) return;
    const speeds = [1.0, 1.25, 1.5, 0.8];
    const cur = audio.playbackRate || 1.0;
    const nextIdx = (speeds.indexOf(cur) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx >= 0 ? nextIdx : 0];
    audio.playbackRate = nextSpeed;
    if (btn) btn.textContent = nextSpeed + 'x';
  };

  window.toggleQrDrawer = function(qid) {
    const drawer = document.getElementById(`qr_drawer_${qid}`);
    if (drawer) {
      drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.stickySeek = function(delta) {
    if (activeAudioElement) {
      activeAudioElement.currentTime = Math.max(0, Math.min(activeAudioElement.duration || 0, activeAudioElement.currentTime + delta));
      updateStickyBar(activeAudioElement);
    }
  };

  window.stickyTogglePlay = function() {
    if (!activeAudioElement) return;
    if (activeAudioElement.paused) {
      activeAudioElement.play();
    } else {
      activeAudioElement.pause();
      const playBtn = document.getElementById('stickyPlayPauseBtn');
      if (playBtn) playBtn.textContent = '▶️';
    }
  };

  window.speechSynthesisSpeakQuestion = function(qid) {
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q) return;
    let opts = '';
    if (q.options) {
      opts = Object.entries(q.options).map(([k, v]) => `Option ${k}: ${v}`).join('. ');
    }
    speakText(`${q.question}. ${opts}`);
  };

  // Global Audio Event Listeners for seamless multi-question audio synchronization
  document.addEventListener('play', function(e) {
    if (e.target.tagName === 'AUDIO') {
      const current = e.target;
      activeAudioElement = current;
      const src = current.getAttribute('data-src');

      // If switching or resuming same src and current is at 0, resume from stored position
      if (src && audioLastTimes[src] && current.currentTime < 1 && audioLastTimes[src] > 1) {
        current.currentTime = audioLastTimes[src];
      }

      // Pause all other audio elements on the page
      document.querySelectorAll('audio').forEach(a => {
        if (a !== current && !a.paused) {
          a.pause();
        }
      });

      updateStickyBar(current);
    }
  }, true);

  document.addEventListener('pause', function(e) {
    if (e.target.tagName === 'AUDIO' && e.target === activeAudioElement) {
      const playBtn = document.getElementById('stickyPlayPauseBtn');
      if (playBtn) playBtn.textContent = '▶️';
    }
  }, true);

  document.addEventListener('timeupdate', function(e) {
    if (e.target.tagName === 'AUDIO') {
      const src = e.target.getAttribute('data-src');
      if (src && !e.target.paused) {
        audioLastTimes[src] = e.target.currentTime;
      }
      if (e.target === activeAudioElement) {
        updateStickyBar(e.target);
      }
    }
  }, true);

  document.addEventListener('ended', function(e) {
    if (e.target.tagName === 'AUDIO') {
      const controller = document.getElementById('stickyAudioController');
      if (controller) controller.style.display = 'none';
    }
  }, true);

  function bindGlobalEvents() {
    const submitBtn = document.getElementById('submitTestBtn');
    if (submitBtn) {
      submitBtn.onclick = window.confirmSubmit;
    }

    // Track the question in view to sync the palette and passage pane
    const container = document.getElementById('questionsContainer');
    if (container) container.addEventListener('scroll', onQuestionsScroll, { passive: true });
    window.addEventListener('scroll', onQuestionsScroll, { passive: true });
    window.addEventListener('resize', onQuestionsScroll);

    // Any user-driven scroll ends the lock set by palette/passage navigation
    ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach(evt => {
      window.addEventListener(evt, () => { navLock = false; }, { passive: true });
    });
  }

  // Expose init
  window.addEventListener('DOMContentLoaded', init);
})();
