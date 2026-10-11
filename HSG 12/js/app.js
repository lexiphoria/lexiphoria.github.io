/**
 * HSG 12 Interactive Exam & Practice Application
 */

(function() {
  'use strict';

  // State
  let testId = 1;
  let mode = 'exam'; // 'practice' or 'exam'
  let currentSection = 'listening'; // 'listening' (1-10) or 'reading' (11-50)
  let passageSyncEnabled = true;
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
    const s = params.get('section');
    if (s === 'listening' || s === 'reading') {
      currentSection = s;
    }
  }

  // Switch between Listening and Reading & Language sections
  function switchSection(section, shouldScroll = true) {
    currentSection = section;

    // Update section tabs in header
    const tabListening = document.getElementById('tabListening');
    const tabReading = document.getElementById('tabReading');
    if (tabListening) tabListening.classList.toggle('active', section === 'listening');
    if (tabReading) tabReading.classList.toggle('active', section === 'reading');

    // Update main container layout classes
    const mainContainer = document.getElementById('quizMainContainer');
    if (mainContainer) {
      mainContainer.classList.toggle('section-mode-listening', section === 'listening');
      mainContainer.classList.toggle('section-mode-reading', section === 'reading');
    }

    // Toggle question stream wrappers
    const listeningWrapper = document.getElementById('listeningQuestionsWrapper');
    const readingWrapper = document.getElementById('readingQuestionsWrapper');
    if (listeningWrapper) listeningWrapper.style.display = section === 'listening' ? 'flex' : 'none';
    if (readingWrapper) readingWrapper.style.display = section === 'reading' ? 'flex' : 'none';

    // Toggle reading passage pane
    const passagePane = document.getElementById('passagePane');
    if (passagePane) {
      passagePane.style.display = section === 'listening' ? 'none' : 'flex';
    }

    // Update palette group highlighting
    const palListening = document.getElementById('palGroupListening');
    const palReading = document.getElementById('palGroupReading');
    if (palListening) palListening.classList.toggle('active', section === 'listening');
    if (palReading) palReading.classList.toggle('active', section === 'reading');

    // Set active question for the new section
    if (section === 'listening') {
      const curQ = currentTest.questions.find(q => q.id === currentQid);
      if (!curQ || curQ.num > 10) {
        const firstL = currentTest.questions.find(q => q.num <= 10);
        if (firstL) setCurrentQuestion(firstL.id);
      }
    } else {
      const curQ = currentTest.questions.find(q => q.id === currentQid);
      if (!curQ || curQ.num <= 10) {
        const firstR = currentTest.questions.find(q => q.num > 10);
        if (firstR) setCurrentQuestion(firstR.id);
      } else {
        syncPassageToQuestion(curQ.id);
      }
    }

    if (shouldScroll) {
      window.scrollQuestionsTop();
    }
  }
  window.switchSection = switchSection;

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
    currentSection = 'listening';

    // Load cached progress if in practice mode
    if (mode === 'practice') {
      const cached = localStorage.getItem(`hsg12_practice_t${id}`);
      if (cached) {
        try {
          userAnswers = JSON.parse(cached);
        } catch(e) {}
      }
    } else {
      // Thi thử: mở lại bài đang làm dở (đáp án, câu gắn cờ, thời gian còn lại)
      const draft = loadExamDraft(id);
      if (draft) {
        userAnswers = draft.answers || {};
        (draft.flagged || []).forEach(qid => flagged.add(qid));
        if (draft.timeRemaining > 0) timeRemaining = draft.timeRemaining;
      }
    }

    renderQuizHeader();
    renderPassagePane();
    renderQuestions();
    renderPalette();
    updateStats();
    switchSection(currentSection, false);

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

  // ---- Lưu bài thi thử đang làm: tải lại trang hay thoát ra vẫn làm tiếp được ----
  function examDraftKey(id) {
    return `hsg12_exam_t${id}`;
  }

  function loadExamDraft(id) {
    try {
      return JSON.parse(localStorage.getItem(examDraftKey(id)));
    } catch (e) {
      return null;
    }
  }

  function saveExamDraft() {
    if (mode !== 'exam' || isSubmitted || !currentTest || !Object.keys(userAnswers).length) return;
    try {
      localStorage.setItem(examDraftKey(currentTest.id), JSON.stringify({
        answers: userAnswers,
        flagged: Array.from(flagged),
        timeRemaining
      }));
    } catch (e) {}
  }

  function clearSavedProgress(id) {
    try {
      localStorage.removeItem(examDraftKey(id));
      if (mode === 'practice') localStorage.removeItem(`hsg12_practice_t${id}`);
    } catch (e) {}
  }

  window.addEventListener('pagehide', saveExamDraft);

  // Chữ trong data.js: **đậm**, *nghiêng*, [u]gạch chân[/u], [b]đậm[/b] → thẻ b / i / u cho Sổ câu sai
  function markup(text) {
    return String(text || '')
      .replace(/\[u\]([\s\S]*?)\[\/u\]/g, '<u>$1</u>')
      .replace(/\[b\]([\s\S]*?)\[\/b\]/g, '<b>$1</b>')
      .replace(/\*\*([\s\S]+?)\*\*/g, '<b>$1</b>')
      .replace(/\*([^*\n]+)\*/g, '<i>$1</i>')
      .trim();
  }

  // Ghi câu đã trả lời vào Sổ câu sai (js/review-log.js) để xem lại / làm lại ở review.html
  function logAnswer(qid) {
    if (!window.PortalReview) return;
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q || !userAnswers[qid]) return;
    const keys = Object.keys(q.options);
    const passage = q.passage
      ? reflowPassage(q.passage).filter(b => b.type !== 'instruction').map(b => markup(b.text)).join('\n\n')
      : '';
    let question = markup(q.question);
    if (!question && passage) {
      // Câu điền vào chỗ trống (n) trong đoạn văn: lấy câu chứa chỗ trống làm đề
      const gap = new RegExp('\\(\\s?' + q.num + '\\s?\\)\\s*_*');
      question = PortalReview.around(passage, gap).replace(gap, `<b>(${q.num}) _____</b>`);
    }
    PortalReview.record('examprep', {
      id: q.id,
      src: `${currentTest.title} · Question ${q.num}`,
      tag: q.category,
      question: question || `Question ${q.num}`,
      options: keys.map(k => markup(q.options[k])),
      answer: keys.indexOf(q.answer),
      explain: markup(q.explanation),
      context: passage ? { title: q.passageTitle || q.section, text: passage } : null
    }, keys.indexOf(userAnswers[qid]));
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
        window.location.search = `?test=${e.target.value}&mode=${mode}&section=${currentSection}`;
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

      if (timeRemaining % 15 === 0) saveExamDraft();

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

  // Passage Pane Rendering (Văn bản đọc hiểu cuộn theo câu hỏi)
  function renderPassagePane() {
    const pane = document.getElementById('passagePane');
    if (!pane) return;

    // Find all unique passages in this test (from questions 11-50)
    const passagesMap = new Map();
    currentTest.questions.forEach(q => {
      if (!q.passage || q.num <= 10) return;
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

    pane.innerHTML = `
      <div class="passage-pane-header">
        <div class="passage-pane-header-top">
          <div class="passage-live-badge" id="passageLiveBadge">
            <span class="live-dot"></span>
            <span id="passageLiveBadgeText">Đang làm: Câu 11</span>
          </div>
          <button type="button" id="passageSyncToggleBtn" class="btn-sync-toggle active" onclick="window.togglePassageSync()" title="Bật/Tắt tự động cuộn đoạn văn theo câu hỏi">
            <span class="sync-icon">🔄</span>
            <span class="sync-text">Cuộn theo câu</span>
          </button>
        </div>
        <div class="passage-title-row">
          <h3 id="passageMainTitle">Đoạn văn bài đọc</h3>
          <span class="passage-range-tag" id="passageRangeTag">Câu 11 – 16</span>
        </div>
      </div>
      <div id="passageTabs" class="passage-tabs" role="tablist"></div>
      <div id="passageContent" class="passage-content"></div>
    `;

    const tabsContainer = document.getElementById('passageTabs');
    passages.forEach((p, idx) => {
      const first = p.qNums[0];
      const last = p.qNums[p.qNums.length - 1];
      const fullTitle = p.title.replace(` - Đề ${currentTest.id}`, '');
      // Short label from English name in brackets
      const shortTitle = (fullTitle.match(/\(([^)]+)\)/) || [])[1] || fullTitle;
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = 'passage-tab';
      tabBtn.setAttribute('role', 'tab');
      tabBtn.title = fullTitle;
      tabBtn.innerHTML = '<span></span><span class="passage-tab-range"></span>';
      tabBtn.firstChild.textContent = shortTitle;
      tabBtn.lastChild.textContent = first === last ? `· Câu ${first}` : `· Câu ${first}–${last}`;
      tabBtn.onclick = () => {
        showPassage(idx);
        const firstQ = currentTest.questions.find(item => item.num === first);
        if (firstQ) scrollToQuestion(firstQ.id);
      };
      tabsContainer.appendChild(tabBtn);
    });

    showPassage(0);
  }

  // Toggle Auto-Scroll Passage with Question
  window.togglePassageSync = function() {
    passageSyncEnabled = !passageSyncEnabled;
    const btn = document.getElementById('passageSyncToggleBtn');
    if (btn) {
      btn.classList.toggle('active', passageSyncEnabled);
      const textSpan = btn.querySelector('.sync-text');
      if (textSpan) textSpan.textContent = passageSyncEnabled ? 'Cuộn theo câu' : 'Cuộn tự do';
    }
    if (passageSyncEnabled && currentQid) {
      syncPassageToQuestion(currentQid, true);
    }
  };

  function showPassage(idx) {
    const p = passages[idx];
    const contentContainer = document.getElementById('passageContent');
    if (!p || !contentContainer) return;

    activePassageIdx = idx;
    document.querySelectorAll('#passageTabs .passage-tab').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
      b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    const fullTitle = p.title.replace(` - Đề ${currentTest.id}`, '');
    const mainTitleEl = document.getElementById('passageMainTitle');
    if (mainTitleEl) mainTitleEl.textContent = fullTitle;

    const rangeEl = document.getElementById('passageRangeTag');
    if (rangeEl && p.qNums.length) {
      const first = p.qNums[0];
      const last = p.qNums[p.qNums.length - 1];
      rangeEl.textContent = first === last ? `Câu ${first}` : `Câu ${first} – ${last}`;
    }

    contentContainer.replaceChildren(...buildPassageBlocks(p));
    contentContainer.scrollTop = 0;
    highlightPassageGap();
  }

  function showEmptyPassage(q) {
    const contentContainer = document.getElementById('passageContent');
    if (!contentContainer) return;
    activePassageIdx = -1;
    document.querySelectorAll('#passageTabs .passage-tab').forEach(b => b.classList.remove('active'));

    const mainTitleEl = document.getElementById('passageMainTitle');
    if (mainTitleEl) mainTitleEl.textContent = 'Phần Câu Hỏi Độc Lập';

    const rangeEl = document.getElementById('passageRangeTag');
    if (rangeEl) rangeEl.textContent = `Câu ${q ? q.num : '22 – 26'}`;

    contentContainer.innerHTML = `
      <div class="passage-empty-card">
        <div class="empty-icon">🧩</div>
        <h4>Câu Hỏi Sắp Xếp Trật Tự &amp; Hội Thoại</h4>
        <div class="empty-badge">Câu 22 – 26 • Trắc nghiệm độc lập</div>
        <p>Các câu hỏi phần này không sử dụng bài đọc dài. Mỗi câu có tập hợp các câu văn riêng biệt (a, b, c, d...) cần được sắp xếp theo logic chuẩn.</p>
        <div class="empty-tip">💡 Gợi ý: Hãy đọc kỹ liên từ nối (for example, however, therefore) và đại từ chỉ định để tìm câu mở đầu phù hợp!</div>
      </div>
    `;
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
      // Ignore inline markup ([/u], [/b], a trailing [IV]) when checking how the previous line ended
      const prevPlain = prevLine.replace(/\[\/?[ub]\]/g, '').replace(/\s*\[(?:I|II|III|IV)\]$/, '');
      const prevEnded = !last || /[.!?:]["'”’]?$/.test(prevPlain);
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
    const isReadingComp = (p.title || '').toLowerCase().includes('reading') || (p.title || '').toLowerCase().includes('đọc hiểu');
    let paraIndex = 0;

    return reflowPassage(p.content).map(block => {
      const el = document.createElement('p');
      el.className = `passage-${block.type}`;

      if (block.type === 'para' && isReadingComp) {
        paraIndex++;
        el.setAttribute('data-para', `¶ ${paraIndex}`);
      }

      // Inline markup: "(14)" gap markers become badges that jump to their question;
      // [u]...[/u] underlines and [b]...[/b] bolds text that questions refer to;
      // [I]–[IV] mark sentence-insertion positions
      block.text.split(/(\(\s?\d{1,2}\s?\)|\[u\][\s\S]*?\[\/u\]|\[b\][\s\S]*?\[\/b\]|\[(?:I|II|III|IV)\])/).forEach(part => {
        const m = part.match(/^\(\s?(\d{1,2})\s?\)$/);
        const num = m ? parseInt(m[1], 10) : NaN;
        const styled = part.match(/^\[(u|b)\]([\s\S]*)\[\/\1\]$/);
        if (styled) {
          const tag = document.createElement(styled[1] === 'u' ? 'u' : 'strong');
          tag.textContent = styled[2];
          el.appendChild(tag);
        } else if (/^\[(I|II|III|IV)\]$/.test(part)) {
          const marker = document.createElement('span');
          marker.className = 'passage-marker';
          marker.textContent = part;
          el.appendChild(marker);
        } else if (gapNums.has(num)) {
          const gap = document.createElement('span');
          gap.className = 'passage-gap';
          gap.dataset.num = num;
          gap.textContent = num;
          gap.title = `Đi tới câu ${num}`;
          gap.onclick = () => {
            const q = currentTest.questions.find(item => item.num === num);
            if (q) {
              if (currentSection !== 'reading') switchSection('reading', false);
              scrollToQuestion(q.id);
            }
          };
          el.appendChild(gap);
        } else if (part) {
          el.appendChild(document.createTextNode(part));
        }
      });
      return el;
    });
  }

  // Synchronize passage view to the active question (cuộn theo câu hỏi, tới câu nào hiện bài đọc đó)
  function syncPassageToQuestion(qid, forceScroll = false) {
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q || q.num <= 10) return;

    // Update live badge in header
    const liveBadge = document.getElementById('passageLiveBadgeText');
    if (liveBadge) {
      liveBadge.textContent = `Đang làm: Câu ${q.num}`;
    }

    // If question has no passage (e.g. Q22-26 Sentence Arrangement)
    if (!q.passage) {
      showEmptyPassage(q);
      return;
    }

    // Question belongs to a passage
    const passageIdx = passages.findIndex(p => p.title === q.passageTitle);
    if (passageIdx !== -1) {
      if (passageIdx !== activePassageIdx) {
        showPassage(passageIdx);
      }
    }

    const content = document.getElementById('passageContent');
    if (!content) return;

    // Highlight gap badge if cloze test
    let activeGap = null;
    content.querySelectorAll('.passage-gap').forEach(gap => {
      const isActive = Number(gap.dataset.num) === q.num;
      gap.classList.toggle('active', isActive);
      gap.classList.toggle('active-focus', isActive);
      if (isActive) activeGap = gap;
    });

    // Remove previous paragraph highlights
    content.querySelectorAll('.passage-para.highlight-focus').forEach(el => el.classList.remove('highlight-focus'));

    if (!passageSyncEnabled && !forceScroll) return;

    if (activeGap) {
      const gapTop = activeGap.offsetTop;
      content.scrollTo({
        top: Math.max(0, gapTop - 110),
        behavior: 'smooth'
      });
    } else {
      // Reading comprehension: check if question stem mentions specific paragraph
      const qText = (q.question || '').toLowerCase();
      const paraMatch = qText.match(/(?:paragraph|đoạn)\s*(\d+)/i) || qText.match(/(\d+)(?:st|nd|rd|th)\s+paragraph/i);
      const paras = content.querySelectorAll('.passage-para');
      if (paraMatch && paras.length) {
        const pNum = parseInt(paraMatch[1], 10);
        if (pNum >= 1 && pNum <= paras.length) {
          const targetPara = paras[pNum - 1];
          targetPara.classList.add('highlight-focus');
          content.scrollTo({
            top: Math.max(0, targetPara.offsetTop - 70),
            behavior: 'smooth'
          });
          return;
        }
      }

      // Proportional smooth scroll based on question index within this passage
      const currentPassage = passages[activePassageIdx];
      if (currentPassage && currentPassage.qNums.length > 1) {
        const qIdx = currentPassage.qNums.indexOf(q.num);
        if (qIdx !== -1) {
          const ratio = qIdx / (currentPassage.qNums.length - 1);
          const targetScroll = ratio * Math.max(0, content.scrollHeight - content.clientHeight);
          content.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }
    }
  }

  function highlightPassageGap() {
    if (currentQid) {
      syncPassageToQuestion(currentQid, false);
    }
  }

  // Undo PDF soft wraps in a question stem
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

  // Render Questions (Chia riêng phần Listening và phần Reading & Language)
  function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    if (!container) return;

    container.innerHTML = '';

    // Create Listening Section Wrapper (Questions 1 - 10)
    const listeningWrapper = document.createElement('div');
    listeningWrapper.id = 'listeningQuestionsWrapper';
    listeningWrapper.className = 'section-questions-wrapper';
    listeningWrapper.style.display = currentSection === 'listening' ? 'flex' : 'none';
    listeningWrapper.style.flexDirection = 'column';
    listeningWrapper.style.gap = '1.25rem';

    // Create Reading & Language Section Wrapper (Questions 11 - 50)
    const readingWrapper = document.createElement('div');
    readingWrapper.id = 'readingQuestionsWrapper';
    readingWrapper.className = 'section-questions-wrapper';
    readingWrapper.style.display = currentSection === 'reading' ? 'flex' : 'none';
    readingWrapper.style.flexDirection = 'column';
    readingWrapper.style.gap = '1.25rem';

    // Intro Banner for Reading & Language Section
    const readingIntro = document.createElement('div');
    readingIntro.className = 'section-intro-card';
    readingIntro.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span class="tag tag-primary">Phần 2: Reading &amp; Language</span>
          <h3 style="margin-top:0.35rem; font-size:1.1rem; font-weight:700;">Đọc Hiểu, Điền Khuyết &amp; Sắp Xếp Câu (Câu 11 – 50)</h3>
        </div>
        <button type="button" class="btn btn-secondary" style="font-size:0.8rem; padding:0.35rem 0.75rem;" onclick="window.switchSection('listening')">
          🎧 Quay lại Phần Nghe (1 – 10)
        </button>
      </div>
    `;
    readingWrapper.appendChild(readingIntro);

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

      if (q.num <= 10) {
        listeningWrapper.appendChild(card);
      } else {
        readingWrapper.appendChild(card);
      }
    });

    // Switch section prompt card at bottom of Listening
    const switchCard = document.createElement('div');
    switchCard.className = 'section-switch-card';
    switchCard.innerHTML = `
      <div class="switch-card-icon">🎧 ➔ 📖</div>
      <div class="switch-card-body">
        <h4>Đã hoàn thành 10 câu phần Nghe?</h4>
        <p>Chuyển sang làm phần Đọc hiểu &amp; Ngôn ngữ (Câu 11 – 50). Bạn vẫn có thể quay lại nghe lại bất cứ lúc nào!</p>
      </div>
      <button type="button" class="btn btn-primary" style="padding:0.6rem 1.25rem;" onclick="window.switchSection('reading')">
        Chuyển Sang Phần 2: Reading &amp; Language (11 – 50) ➔
      </button>
    `;
    listeningWrapper.appendChild(switchCard);

    container.appendChild(listeningWrapper);
    container.appendChild(readingWrapper);
  }

  // Palette Rendering (Tách riêng nhóm Listening và nhóm Reading)
  function renderPalette() {
    const listGrid = document.getElementById('paletteListeningGrid');
    const readGrid = document.getElementById('paletteReadingGrid');
    if (!listGrid || !readGrid) return;

    listGrid.innerHTML = '';
    readGrid.innerHTML = '';

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

      if (q.num <= 10) {
        listGrid.appendChild(btn);
      } else {
        readGrid.appendChild(btn);
      }
    });
  }

  function scrollToQuestion(qid) {
    const q = currentTest.questions.find(item => item.id === qid);
    if (!q) return;

    // Switch section if necessary
    const targetSection = q.num <= 10 ? 'listening' : 'reading';
    if (targetSection !== currentSection) {
      switchSection(targetSection, false);
    }

    const card = document.getElementById(`q_card_${qid}`);
    if (card) {
      navLock = true;
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

    const q = currentTest.questions.find(item => item.id === qid);
    if (!q) return;

    // If question is in reading section, synchronize passage!
    if (q.num > 10) {
      syncPassageToQuestion(qid);
    }
  }

  // Work out which question card the student is looking at
  function detectCurrentQuestion() {
    if (navLock) return;
    const container = document.getElementById('questionsContainer');
    if (!container) return;

    const wrapper = currentSection === 'listening'
      ? document.getElementById('listeningQuestionsWrapper')
      : document.getElementById('readingQuestionsWrapper');
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.question-card');
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

    const firstAnswer = !userAnswers[qid];
    userAnswers[qid] = optKey;

    if (mode === 'practice') {
      localStorage.setItem(`hsg12_practice_t${currentTest.id}`, JSON.stringify(userAnswers));
      // Luyện tập hiện đáp án ngay: ghi lần chọn đầu tiên vào Sổ câu sai
      if (firstAnswer) logAnswer(qid);
    } else {
      saveExamDraft();
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
    saveExamDraft();
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

    // Calculate section progress
    let lCount = 0;
    let rCount = 0;
    Object.keys(userAnswers).forEach(qid => {
      const q = currentTest.questions.find(item => item.id === qid);
      if (q) {
        if (q.num <= 10) lCount++;
        else rCount++;
      }
    });

    const tabL = document.getElementById('tabListeningStat');
    if (tabL) tabL.textContent = `Câu 1 – 10 • ${lCount}/10 đã làm`;
    const tabR = document.getElementById('tabReadingStat');
    if (tabR) tabR.textContent = `Câu 11 – 50 • ${rCount}/40 đã làm`;

    const palL = document.getElementById('palListeningCount');
    if (palL) palL.textContent = `${lCount}/10`;
    const palR = document.getElementById('palReadingCount');
    if (palR) palR.textContent = `${rCount}/40`;
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
    const alreadySubmitted = isSubmitted;
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

    // Thi thử chỉ chấm khi nộp bài: lúc này mới ghi các câu đã làm vào Sổ câu sai, và bỏ bản lưu dở
    if (!alreadySubmitted && mode === 'exam') {
      currentTest.questions.forEach(q => { if (userAnswers[q.id]) logAnswer(q.id); });
      try { localStorage.removeItem(examDraftKey(currentTest.id)); } catch (e) {}
    }
    if (window.PortalReview) PortalReview.refreshLinks();

    // Báo kết quả cho cánh đồng lúa trên trang chủ (js/study-tracker.js)
    if (!alreadySubmitted && window.PortalStudy) {
      PortalStudy.recordQuiz(correctCount, currentTest.questions.length);
    }

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
      clearSavedProgress(currentTest.id);
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
