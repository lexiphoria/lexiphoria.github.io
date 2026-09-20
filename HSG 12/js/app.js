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
  let currentPassageId = null;

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
    if (!isNaN(t) && t >= 1 && t <= 5) {
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

    // Find all unique passages in this test
    const passagesMap = new Map();
    currentTest.questions.forEach(q => {
      if (q.passage && !passagesMap.has(q.passageTitle)) {
        passagesMap.set(q.passageTitle, {
          title: q.passageTitle,
          content: q.passage,
          firstQNum: q.num
        });
      }
    });

    if (passagesMap.size === 0) {
      pane.style.display = 'none';
      return;
    }

    pane.style.display = 'block';
    pane.innerHTML = `
      <h3>
        <span>📄 Văn Bản / Bài Đọc Hiểu</span>
        <span style="font-size:0.75rem; font-weight:400; color:var(--text-secondary);">Split-Screen View</span>
      </h3>
      <div id="passageTabs" style="display:flex; gap:0.4rem; overflow-x:auto; padding-bottom:0.5rem; margin-bottom:0.75rem; border-bottom:1px solid var(--border-color);">
      </div>
      <div id="passageContent" class="passage-content"></div>
    `;

    const tabsContainer = document.getElementById('passageTabs');
    const contentContainer = document.getElementById('passageContent');
    const passages = Array.from(passagesMap.values());

    passages.forEach((p, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `btn btn-secondary ${idx === 0 ? 'active' : ''}`;
      tabBtn.style.padding = '0.35rem 0.75rem';
      tabBtn.style.fontSize = '0.78rem';
      tabBtn.style.whiteSpace = 'nowrap';
      tabBtn.textContent = p.title.replace(` - Đề ${currentTest.id}`, '');
      tabBtn.onclick = () => {
        tabsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
        contentContainer.textContent = p.content;
      };
      tabsContainer.appendChild(tabBtn);
    });

    // Default select first
    contentContainer.textContent = passages[0].content;
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
        <div class="question-stem">${q.question || `Chọn đáp án đúng cho câu ${q.num}:`}</div>
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
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 1200);

      // Update current class in palette
      document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('current'));
      const pbtn = document.getElementById(`palette_btn_${qid}`);
      if (pbtn) pbtn.classList.add('current');
    }
  }

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

  function bindGlobalEvents() {
    const submitBtn = document.getElementById('submitTestBtn');
    if (submitBtn) {
      submitBtn.onclick = window.confirmSubmit;
    }
  }

  // Expose init
  window.addEventListener('DOMContentLoaded', init);
})();
