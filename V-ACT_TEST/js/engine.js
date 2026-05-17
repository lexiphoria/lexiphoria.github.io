// ─── V-ACT Test Engine ───
(function () {
  "use strict";

  let answered = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let startTime = Date.now();
  let timerInterval = null;
  const totalQ = TEST_DATA.totalQuestions;
  const answeredSet = new Set();

  // ─── Init ───
  document.addEventListener("DOMContentLoaded", () => {
    renderTest();
    startTimer();
    updateStats();
  });

  // ─── Timer ───
  function startTimer() {
    const el = document.getElementById("timer");
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      el.textContent = m + ":" + s;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  // ─── Render ───
  function renderTest() {
    const container = document.getElementById("test-body");
    let html = "";

    TEST_DATA.parts.forEach((part) => {
      html += `<div class="part-header"><h2>${part.name}</h2><p>${part.instruction}</p></div>`;

      // Reading passage
      if (part.passage) {
        html += '<div class="reading-passage">';
        part.passage.forEach((p, i) => {
          html += `<p><strong>[${i + 1}]</strong> ${p}</p>`;
        });
        html += "</div>";
      }

      // Questions
      part.questions.forEach((q) => {
        html += `<div class="question-card" id="q-${q.id}">`;
        html += `<div class="question-number">${q.id}</div>`;
        html += `<div class="question-text">${q.text}</div>`;
        html += `<div class="options-grid">`;
        const letters = ["A", "B", "C", "D"];
        q.options.forEach((opt, i) => {
          html += `<button class="option-btn" data-qid="${q.id}" data-idx="${i}" onclick="window.__selectOption(${q.id},${i})">`;
          html += `<span class="option-letter">${letters[i]}</span>`;
          html += `<span class="option-text">${opt}</span>`;
          html += `</button>`;
        });
        html += `</div>`;
        html += `<div class="explanation" id="exp-${q.id}"><strong>💡 Giải thích:</strong> ${q.explain}</div>`;
        html += `</div>`;
      });
    });

    container.innerHTML = html;
  }

  // ─── Select Option ───
  window.__selectOption = function (qid, idx) {
    if (answeredSet.has(qid)) return;
    answeredSet.add(qid);

    // Find question data
    let qData = null;
    for (const part of TEST_DATA.parts) {
      for (const q of part.questions) {
        if (q.id === qid) { qData = q; break; }
      }
      if (qData) break;
    }
    if (!qData) return;

    const card = document.getElementById("q-" + qid);
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
    document.getElementById("exp-" + qid).classList.add("show");

    updateStats();
  };

  // ─── Stats ───
  function updateStats() {
    document.getElementById("stat-answered").textContent = answered + "/" + totalQ;
    document.getElementById("stat-correct").textContent = correctCount;
    document.getElementById("stat-wrong").textContent = wrongCount;
    const pct = totalQ > 0 ? Math.round((answered / totalQ) * 100) : 0;
    document.getElementById("progress-bar").style.width = pct + "%";
  }

  // ─── Submit ───
  window.__submitTest = function () {
    stopTimer();
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    const pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

    let emoji = "🎉";
    let msg = "Excellent!";
    if (pct < 50) { emoji = "😢"; msg = "Keep practicing!"; }
    else if (pct < 70) { emoji = "💪"; msg = "Good effort!"; }
    else if (pct < 90) { emoji = "🌟"; msg = "Great job!"; }

    document.getElementById("result-emoji").textContent = emoji;
    document.getElementById("result-msg").textContent = msg;
    document.getElementById("result-score").innerHTML = correctCount + ' <span class="total">/ ' + totalQ + "</span>";
    document.getElementById("result-correct").textContent = correctCount;
    document.getElementById("result-wrong").textContent = wrongCount;
    document.getElementById("result-pct").textContent = pct + "%";
    document.getElementById("result-time").textContent = m + "m " + s + "s";
    document.getElementById("result-overlay").classList.add("show");
    
    // Save score to local storage
    localStorage.setItem('vact_score_' + TEST_DATA.title, correctCount + "/" + totalQ);

    // Also reveal all unanswered
    TEST_DATA.parts.forEach((part) => {
      part.questions.forEach((q) => {
        if (!answeredSet.has(q.id)) {
          const card = document.getElementById("q-" + q.id);
          const btns = card.querySelectorAll(".option-btn");
          btns.forEach((btn, i) => {
            btn.classList.add("disabled");
            if (i === q.correct) btn.classList.add("correct");
          });
          document.getElementById("exp-" + q.id).classList.add("show");
        }
      });
    });
  };

  // ─── Reset ───
  window.__resetTest = function () {
    answered = 0;
    correctCount = 0;
    wrongCount = 0;
    startTime = Date.now();
    answeredSet.clear();
    document.getElementById("result-overlay").classList.remove("show");
    renderTest();
    updateStats();
    clearInterval(timerInterval);
    startTimer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.__closeResult = function () {
    document.getElementById("result-overlay").classList.remove("show");
  };
})();
