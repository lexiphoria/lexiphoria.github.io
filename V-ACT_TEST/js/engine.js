// ─── V-ACT Test Engine ───
(function () {
  "use strict";

  // Global error reporting for easier debugging
  window.onerror = function (message, source, lineno, colno, error) {
    console.error("V-ACT Engine Error:", message, source, lineno);
    try {
      let errDiv = document.getElementById("vact-error-overlay");
      if (!errDiv) {
        errDiv = document.createElement("div");
        errDiv.id = "vact-error-overlay";
        errDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; max-height: 50vh; overflow-y: auto; background: #ff4d4d; color: white; padding: 20px; z-index: 999999; font-family: monospace; white-space: pre-wrap; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.3);";
        document.body.appendChild(errDiv);
      }
      errDiv.innerHTML = `<h3>⚠️ V-ACT Test Error:</h3><p><strong>Message:</strong> ${message}</p><p><strong>Source:</strong> ${source}</p><p><strong>Line:</strong> ${lineno} | <strong>Col:</strong> ${colno}</p><p><strong>Stack:</strong> ${error && error.stack ? error.stack : 'N/A'}</p>`;
    } catch (e) {
      alert("Error: " + message + " (Line " + lineno + ")");
    }
    return false;
  };

  // Parse test number dynamically from URL
  const match = window.location.pathname.match(/test(\d+)/i) || window.location.href.match(/test(\d+)/i);
  let testNum = match ? parseInt(match[1], 10) : 1;
  if (isNaN(testNum) || testNum < 1 || testNum > 20) {
    testNum = 1;
  }
  const localStorageKey = `vact_test_${testNum}_active_data`;

  // Helper to shuffle array in-place
  function shuffle(array) {
    if (!Array.isArray(array)) return array;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Helper to shuffle options and update correct index
  function shuffleOptions(q) {
    if (!q || !Array.isArray(q.options) || typeof q.correct !== 'number') return;
    const originalCorrectIndex = q.correct;
    const indexedOptions = q.options.map((opt, index) => ({ opt, index }));
    shuffle(indexedOptions);
    
    q.options = indexedOptions.map(item => item.opt);
    q.correct = indexedOptions.findIndex(item => item.index === originalCorrectIndex);
  }

  // Helper to generate the partitioned test data
  function generateTestData() {
    if (typeof VACT_QUESTION_POOL === 'undefined') {
      console.error("VACT_QUESTION_POOL is not defined!");
      return null;
    }
    
    const startIdx = (testNum - 1) * 5;
    const endIdx = testNum * 5;
    
    const part1Qs = JSON.parse(JSON.stringify(VACT_QUESTION_POOL.part1.slice(startIdx, endIdx)));
    const part2Qs = JSON.parse(JSON.stringify(VACT_QUESTION_POOL.part2.slice(startIdx, endIdx)));
    const part3Qs = JSON.parse(JSON.stringify(VACT_QUESTION_POOL.part3.slice(startIdx, endIdx)));
    
    const passageStartIdx = (testNum - 1) * 2;
    const passageEndIdx = testNum * 2;
    const passages = JSON.parse(JSON.stringify(VACT_QUESTION_POOL.readingPassages.slice(passageStartIdx, passageEndIdx)));

    // Shuffle question order inside parts 1, 2, and 3
    shuffle(part1Qs);
    shuffle(part2Qs);
    shuffle(part3Qs);

    // Shuffle options for all multiple choice questions
    part1Qs.forEach(shuffleOptions);
    part2Qs.forEach(shuffleOptions);
    part3Qs.forEach(shuffleOptions);
    passages.forEach(p => {
      if (p && p.questions) {
        p.questions.forEach(shuffleOptions);
      }
    });

    // Re-index all questions sequentially from 1 to 30
    let qCount = 1;
    part1Qs.forEach(q => { if (q) q.id = qCount++; });
    part2Qs.forEach(q => { if (q) q.id = qCount++; });
    part3Qs.forEach(q => { if (q) q.id = qCount++; });
    passages.forEach(p => {
      if (p && p.questions) {
        p.questions.forEach(q => { if (q) q.id = qCount++; });
      }
    });

    return {
      title: "V-ACT English Test " + testNum,
      totalQuestions: 30,
      timeLimit: 45,
      parts: [
        {
          id: "part1",
          name: "Part 1: Multiple Choice",
          instruction: "Choose the best answer (A, B, C, or D) to complete each sentence.",
          type: "multiple_choice",
          questions: part1Qs
        },
        {
          id: "part2",
          name: "Part 2: Error Identification",
          instruction: "Each sentence has ONE underlined error (A, B, C, or D). Find it.",
          type: "error_id",
          questions: part2Qs
        },
        {
          id: "part3",
          name: "Part 3: Sentence Restatement",
          instruction: "Choose the sentence (A, B, C, or D) that is closest in meaning to the given sentence.",
          type: "restatement",
          questions: part3Qs
        },
        {
          id: "part4a",
          name: "Part 4: Reading Comprehension — Passage 1",
          instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
          type: "reading",
          passage: passages[0] ? passages[0].passage : [],
          questions: passages[0] ? passages[0].questions : []
        },
        {
          id: "part4b",
          name: "Part 4: Reading Comprehension — Passage 2",
          instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
          type: "reading",
          passage: passages[1] ? passages[1].passage : [],
          questions: passages[1] ? passages[1].questions : []
        }
      ]
    };
  }

  // Check if test data conforms to schema
  function isValidTestData(data) {
    if (!data || typeof data !== 'object') return false;
    if (data.title !== "V-ACT English Test " + testNum) return false;
    if (!Array.isArray(data.parts) || data.parts.length !== 5) return false;
    
    const expectedPartTypes = ['multiple_choice', 'error_id', 'restatement', 'reading', 'reading'];
    for (let i = 0; i < 5; i++) {
      const part = data.parts[i];
      if (!part || typeof part !== 'object') return false;
      if (part.type !== expectedPartTypes[i]) return false;
      if (!Array.isArray(part.questions)) return false;
      if (part.type === 'reading' && (!part.passage || !Array.isArray(part.passage))) return false;
    }
    return true;
  }

  let TEST_DATA = null;
  try {
    const cached = localStorage.getItem(localStorageKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (isValidTestData(parsed)) {
        TEST_DATA = parsed;
      } else {
        console.warn("Cached V-ACT test data is invalid or legacy, discarding.");
        localStorage.removeItem(localStorageKey);
      }
    }
  } catch (e) {
    console.error("Error reading cache from localStorage:", e);
  }

  if (!TEST_DATA) {
    TEST_DATA = generateTestData();
    if (TEST_DATA) {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(TEST_DATA));
      } catch (e) {
        console.error("Error writing cache to localStorage:", e);
      }
    }
  }

  let answered = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let startTime = Date.now();
  let timerInterval = null;
  const totalQ = TEST_DATA ? TEST_DATA.totalQuestions : 30;
  const answeredSet = new Set();

  // ─── Init ───
  function init() {
    if (TEST_DATA) {
      renderTest();
      startTimer();
      updateStats();
      injectAudioWidget();
    } else {
      const container = document.getElementById("test-body");
      if (container) {
        container.innerHTML = '<div class="error-msg" style="padding: 40px; text-align: center; color: var(--wrong);">Failed to load test data. Please try again.</div>';
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 0);
  }

  // ─── Audio Widget ───
  function injectAudioWidget() {
    const audioDiv = document.createElement("div");
    audioDiv.className = "audio-widget";
    audioDiv.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 100; background: var(--surface, #1e1e2f); padding: 8px 16px 8px 12px; border-radius: 50px; border: 1px solid var(--border, #333); box-shadow: 0 8px 24px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);";
    
    audioDiv.innerHTML = `
      <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .audio-widget audio::-webkit-media-controls-panel { background-color: transparent; }
        .audio-widget audio::-webkit-media-controls-current-time-display,
        .audio-widget audio::-webkit-media-controls-time-remaining-display { color: #fff; }
      </style>
      <span style="font-size: 1.4rem; animation: spin 4s linear infinite;">🎵</span>
      <audio controls loop style="height: 32px; outline: none; border-radius: 16px;">
        <source src="../../assets/Playlist_9.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
    document.body.appendChild(audioDiv);
  }

  // ─── Timer ───
  function startTimer() {
    const el = document.getElementById("timer");
    if (!el) return;
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      el.textContent = m + ":" + s;
    }, 1000);
  }

  // ─── Render ───
  function renderTest() {
    const container = document.getElementById("test-body");
    if (!container || !TEST_DATA) return;
    let html = "";

    TEST_DATA.parts.forEach((part) => {
      html += `<div class="part-header"><h2>${part.name}</h2><p>${part.instruction}</p></div>`;

      // Reading passage
      if (part.passage && Array.isArray(part.passage)) {
        html += '<div class="reading-passage">';
        part.passage.forEach((p, i) => {
          html += `<p><strong>[${i + 1}]</strong> ${p}</p>`;
        });
        html += "</div>";
      }

      // Questions
      if (Array.isArray(part.questions)) {
        part.questions.forEach((q) => {
          if (!q) return;
          html += `<div class="question-card" id="q-${q.id}">`;
          html += `<div class="question-number">${q.id}</div>`;
          html += `<div class="question-text">${q.text}</div>`;
          html += `<div class="options-grid">`;
          const letters = ["A", "B", "C", "D"];
          if (Array.isArray(q.options)) {
            q.options.forEach((opt, i) => {
              html += `<button class="option-btn" data-qid="${q.id}" data-idx="${i}" onclick="window.__selectOption(${q.id},${i})">`;
              html += `<span class="option-letter">${letters[i]}</span>`;
              html += `<span class="option-text">${opt}</span>`;
              html += `</button>`;
            });
          }
          html += `</div>`;
          html += `<div class="explanation" id="exp-${q.id}"><strong>💡 Giải thích:</strong> ${q.explain}</div>`;
          html += `</div>`;
        });
      }
    });

    container.innerHTML = html;
  }

  // ─── Select Option ───
  window.__selectOption = function (qid, idx) {
    if (answeredSet.has(qid) || !TEST_DATA) return;
    answeredSet.add(qid);

    // Find question data
    let qData = null;
    for (const part of TEST_DATA.parts) {
      for (const q of part.questions) {
        if (q && q.id === qid) { qData = q; break; }
      }
      if (qData) break;
    }
    if (!qData) return;

    const card = document.getElementById("q-" + qid);
    if (!card) return;
    const btns = card.querySelectorAll(".option-btn");
    const isCorrect = idx === qData.correct;

    answered++;
    if (isCorrect) correctCount++;
    else wrongCount++;

    // Style buttons
    btns.forEach((btn, i) => {
      btn.classList.add("disabled");
      if (i === qData.correct) btn.classList.add("correct");
      if (i === idx && !isCorrect) btn.classList.add("wrong");
      if (i === idx) btn.classList.add("selected");
    });

    // Card style
    card.classList.add(isCorrect ? "answered-correct" : "answered-wrong");

    // Show explanation
    const expEl = document.getElementById("exp-" + qid);
    if (expEl) expEl.classList.add("show");

    updateStats();
  };

  // ─── Stats ───
  function updateStats() {
    const elAns = document.getElementById("stat-answered");
    const elCorr = document.getElementById("stat-correct");
    const elWr = document.getElementById("stat-wrong");
    const elBar = document.getElementById("progress-bar");
    
    if (elAns) elAns.textContent = answered + "/" + totalQ;
    if (elCorr) elCorr.textContent = correctCount;
    if (elWr) elWr.textContent = wrongCount;
    const pct = totalQ > 0 ? Math.round((answered / totalQ) * 100) : 0;
    if (elBar) elBar.style.width = pct + "%";
  }

  // ─── Submit ───
  window.__submitTest = function () {
    if (!TEST_DATA) return;
    clearInterval(timerInterval);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    const pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

    let emoji = "🎉";
    let msg = "Excellent!";
    if (pct < 50) { emoji = "😢"; msg = "Keep practicing!"; }
    else if (pct < 70) { emoji = "💪"; msg = "Good effort!"; }
    else if (pct < 90) { emoji = "🌟"; msg = "Great job!"; }

    const elEmoji = document.getElementById("result-emoji");
    const elMsg = document.getElementById("result-msg");
    const elScore = document.getElementById("result-score");
    const elCorr = document.getElementById("result-correct");
    const elWr = document.getElementById("result-wrong");
    const elPct = document.getElementById("result-pct");
    const elTime = document.getElementById("result-time");
    const elOverlay = document.getElementById("result-overlay");

    if (elEmoji) elEmoji.textContent = emoji;
    if (elMsg) elMsg.textContent = msg;
    if (elScore) elScore.innerHTML = correctCount + ' <span class="total">/ ' + totalQ + "</span>";
    if (elCorr) elCorr.textContent = correctCount;
    if (elWr) elWr.textContent = wrongCount;
    if (elPct) elPct.textContent = pct + "%";
    if (elTime) elTime.textContent = m + "m " + s + "s";
    if (elOverlay) elOverlay.classList.add("show");
    
    // Save score to local storage
    try {
      localStorage.setItem('vact_score_' + TEST_DATA.title, correctCount + "/" + totalQ);
    } catch (e) {
      console.error(e);
    }

    // Also reveal all unanswered
    TEST_DATA.parts.forEach((part) => {
      if (Array.isArray(part.questions)) {
        part.questions.forEach((q) => {
          if (q && !answeredSet.has(q.id)) {
            const card = document.getElementById("q-" + q.id);
            if (card) {
              const btns = card.querySelectorAll(".option-btn");
              btns.forEach((btn, i) => {
                btn.classList.add("disabled");
                if (i === q.correct) btn.classList.add("correct");
              });
              const expEl = document.getElementById("exp-" + q.id);
              if (expEl) expEl.classList.add("show");
            }
          }
        });
      }
    });
  };

  // ─── Reset ───
  window.__resetTest = function () {
    // Clear active test cache to force a new shuffle
    try {
      localStorage.removeItem(localStorageKey);
    } catch (e) {
      console.error(e);
    }
    
    TEST_DATA = generateTestData();
    if (TEST_DATA) {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(TEST_DATA));
      } catch (e) {
        console.error(e);
      }
    }

    answered = 0;
    correctCount = 0;
    wrongCount = 0;
    startTime = Date.now();
    answeredSet.clear();
    const elOverlay = document.getElementById("result-overlay");
    if (elOverlay) elOverlay.classList.remove("show");
    renderTest();
    updateStats();
    clearInterval(timerInterval);
    startTimer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.__closeResult = function () {
    const elOverlay = document.getElementById("result-overlay");
    if (elOverlay) elOverlay.classList.remove("show");
  };
})();
