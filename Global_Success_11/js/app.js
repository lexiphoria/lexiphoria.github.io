// Global Success 11 Interactive App Controller

// Default Password configuration
const VALID_PASSWORDS = ['hoilamchi1111'];

let currentUnitIndex = 0;
let currentTabIndex = 'overview';
let currentFlashcardIndex = 0;
let quizUserAnswers = {};
let quizSubmitted = false;

document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate();
  renderSidebar();
  loadUnit(0);
  initEventListeners();
});

// Render sidebar unit navigation items
function renderSidebar() {
  const navList = document.getElementById('unit-nav-list');
  if (!navList || !GLOBAL_SUCCESS_11_DATA.units) return;

  navList.innerHTML = '';
  GLOBAL_SUCCESS_11_DATA.units.forEach((unit, idx) => {
    const li = document.createElement('li');
    li.className = 'unit-nav-item';
    li.innerHTML = `
      <button class="unit-nav-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <span class="unit-pill-num">${unit.number}</span>
        <div class="unit-nav-text">
          <div style="font-weight: 700; color: #fff; font-size: 0.85rem;">Unit ${unit.number}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${unit.title}</div>
        </div>
      </button>
    `;
    navList.appendChild(li);
  });

  // Attach click events to unit navigation buttons
  document.querySelectorAll('.unit-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      switchUnit(idx);
      // Close mobile sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    });
  });
}

// Switch current unit
function switchUnit(idx) {
  if (idx < 0 || idx >= GLOBAL_SUCCESS_11_DATA.units.length) return;
  currentUnitIndex = idx;
  currentFlashcardIndex = 0;
  quizUserAnswers = {};
  quizSubmitted = false;

  if (typeof showUnitView === 'function') {
    showUnitView();
  }

  // Update sidebar active class
  document.querySelectorAll('.unit-nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  loadUnit(idx);
}

// Load unit content into UI
function loadUnit(idx) {
  const unit = GLOBAL_SUCCESS_11_DATA.units[idx];
  if (!unit) return;

  // Update Sách Mềm Official Header Bar
  const smNum = document.getElementById('sachmem-unit-num');
  const smTitle = document.getElementById('sachmem-unit-title');
  const smVn = document.getElementById('sachmem-unit-vntitle');
  if (smNum) smNum.textContent = unit.number;
  if (smTitle) smTitle.textContent = unit.title;
  if (smVn) smVn.textContent = unit.vietnameseTitle;

  // Update Unit Hero Banner elements if present
  const elTag = document.getElementById('hero-unit-tag');
  if (elTag) elTag.textContent = `Unit ${unit.number}`;
  const elTheme = document.getElementById('hero-theme-tag');
  if (elTheme) elTheme.textContent = `${unit.icon} ${unit.theme}`;
  const elTitle = document.getElementById('unit-hero-title');
  if (elTitle) elTitle.textContent = `Unit ${unit.number}: ${unit.title}`;
  const elVn = document.getElementById('unit-hero-vn-title');
  if (elVn) elVn.textContent = unit.vietnameseTitle;
  const elDesc = document.getElementById('unit-hero-desc');
  if (elDesc) elDesc.textContent = unit.overview.summary;

  // Initialize Lesson 1 if Unit 1
  if (idx === 0 && typeof initLesson1 === 'function') {
    initLesson1();
  }

  // Render Objectives (Overview Tab)
  renderOverview(unit);

  // Render Vocabulary
  renderVocabulary(unit);

  // Render Grammar
  renderGrammar(unit);

  // Render Reading & Speaking
  renderReadingSpeaking(unit);

  // Render Flashcards
  renderFlashcard(unit);

  // Render Quiz
  renderQuiz(unit);

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Overview Tab
function renderOverview(unit) {
  const container = document.getElementById('objectives-grid');
  if (!container) return;

  container.innerHTML = unit.overview.objectives.map(obj => `
    <div class="obj-card">
      <div class="obj-icon">🎯</div>
      <div class="obj-text">${obj}</div>
    </div>
  `).join('');
}

// Render Vocabulary Tab
function renderVocabulary(unit) {
  const grid = document.getElementById('vocab-grid');
  if (!grid) return;

  grid.innerHTML = unit.vocabulary.map((v, i) => `
    <div class="vocab-card">
      <div class="vocab-top">
        <div class="vocab-word-group">
          <span class="vocab-word">${v.word}</span>
          <span class="vocab-pos">${v.pos}</span>
        </div>
        <button class="btn-speak" title="Listen to pronunciation" onclick="speakText('${v.word.replace(/'/g, "\\'")}')">🔊</button>
      </div>
      <div class="vocab-phonetic">${v.phonetic}</div>
      <div class="vocab-meaning">${v.meaning}</div>
      ${v.collocation ? `<div class="vocab-collocation"><span>Cụm từ: </span>${v.collocation}</div>` : ''}
      <div class="vocab-example-box">"${v.example}"</div>
    </div>
  `).join('');
}

// Render Grammar Tab
function renderGrammar(unit) {
  const container = document.getElementById('grammar-container');
  if (!container) return;

  container.innerHTML = unit.grammar.map(g => `
    <div class="grammar-card">
      <h3 class="grammar-card-title">📌 ${g.title}</h3>
      <p class="grammar-desc">${g.description}</p>
      
      <div class="grammar-box-structure">
        <div class="structure-title">Công thức / Cấu trúc trọng tâm:</div>
        ${g.structures.map(s => `<div class="structure-item">• ${s}</div>`).join('')}
      </div>

      <div class="grammar-examples">
        <div class="structure-title" style="color: #10b981; margin-bottom: 8px;">Ví dụ minh họa:</div>
        ${g.examples.map(ex => `
          <div class="example-item">
            <span class="example-bullet">✔</span>
            <span>${ex}</span>
          </div>
        `).join('')}
      </div>

      ${g.tips ? `<div class="grammar-tip"><strong>💡 Lưu ý quan trọng:</strong> ${g.tips}</div>` : ''}
    </div>
  `).join('');
}

// Render Reading & Speaking Tab
function renderReadingSpeaking(unit) {
  const topicEl = document.getElementById('reading-topic-title');
  const takeawayEl = document.getElementById('reading-takeaway-text');
  const speakingList = document.getElementById('speaking-phrase-list');

  if (topicEl) topicEl.textContent = unit.readingSpeaking.readingTopic;
  if (takeawayEl) takeawayEl.textContent = unit.readingSpeaking.keyTakeaway;

  if (speakingList) {
    speakingList.innerHTML = unit.readingSpeaking.speakingPhrases.map(p => `
      <div class="speaking-card">
        <div class="speaking-phrase">"${p.phrase}"</div>
        <div class="speaking-usage">💡 Mục đích: ${p.usage}</div>
      </div>
    `).join('');
  }
}

// Render Flashcard
function renderFlashcard(unit) {
  const vocab = unit.vocabulary;
  if (!vocab || vocab.length === 0) return;

  if (currentFlashcardIndex >= vocab.length) currentFlashcardIndex = 0;
  if (currentFlashcardIndex < 0) currentFlashcardIndex = vocab.length - 1;

  const card = vocab[currentFlashcardIndex];
  const wrapper = document.getElementById('flashcard-wrapper');
  if (wrapper) wrapper.classList.remove('flipped');

  document.getElementById('fc-word').textContent = card.word;
  document.getElementById('fc-phonetic').textContent = `${card.pos} • ${card.phonetic}`;
  document.getElementById('fc-meaning').textContent = card.meaning;
  document.getElementById('fc-example').textContent = `"${card.example}"`;
  document.getElementById('fc-counter').textContent = `${currentFlashcardIndex + 1} / ${vocab.length}`;
}

// Render Quiz
function renderQuiz(unit) {
  const container = document.getElementById('quiz-questions-list');
  if (!container) return;

  quizUserAnswers = {};
  quizSubmitted = false;
  document.getElementById('quiz-submit-btn').style.display = 'inline-block';
  document.getElementById('quiz-retry-btn').style.display = 'none';

  container.innerHTML = unit.quiz.map((qItem, qIdx) => `
    <div class="quiz-card" id="quiz-card-${qIdx}">
      <div class="quiz-header">
        <span class="quiz-q-num">Question ${qIdx + 1} of ${unit.quiz.length}</span>
      </div>
      <div class="quiz-q-text">${qItem.q}</div>
      <div class="quiz-options">
        ${qItem.options.map((opt, optIdx) => {
          const letter = String.fromCharCode(65 + optIdx);
          return `
            <button class="option-btn" onclick="selectQuizOption(${qIdx}, ${optIdx})" id="q${qIdx}-opt${optIdx}">
              <span class="option-prefix">${letter}</span>
              <span>${opt}</span>
            </button>
          `;
        }).join('')}
      </div>
      <div class="quiz-explanation" id="quiz-exp-${qIdx}">
        <strong>Giải thích: </strong>${qItem.explanation}
      </div>
    </div>
  `).join('');
}

// Quiz Option Selection
function selectQuizOption(qIdx, optIdx) {
  if (quizSubmitted) return;
  quizUserAnswers[qIdx] = optIdx;

  const unit = GLOBAL_SUCCESS_11_DATA.units[currentUnitIndex];
  unit.quiz[qIdx].options.forEach((_, i) => {
    const btn = document.getElementById(`q${qIdx}-opt${i}`);
    if (btn) {
      if (i === optIdx) {
        btn.style.borderColor = '#6366f1';
        btn.style.background = 'rgba(99, 102, 241, 0.2)';
      } else {
        btn.style.borderColor = 'var(--border-glass)';
        btn.style.background = 'rgba(255, 255, 255, 0.04)';
      }
    }
  });
}

// Submit Quiz
function submitQuiz() {
  const unit = GLOBAL_SUCCESS_11_DATA.units[currentUnitIndex];
  if (!unit) return;

  let score = 0;
  quizSubmitted = true;

  unit.quiz.forEach((qItem, qIdx) => {
    const userSelected = quizUserAnswers[qIdx];
    const isCorrect = userSelected === qItem.answer;
    if (isCorrect) score++;

    // Reveal correct / wrong styling
    qItem.options.forEach((_, optIdx) => {
      const btn = document.getElementById(`q${qIdx}-opt${optIdx}`);
      if (!btn) return;

      btn.disabled = true;
      if (optIdx === qItem.answer) {
        btn.classList.add('correct');
      } else if (optIdx === userSelected) {
        btn.classList.add('wrong');
      }
    });

    // Reveal explanation
    const exp = document.getElementById(`quiz-exp-${qIdx}`);
    if (exp) exp.style.display = 'block';
  });

  document.getElementById('quiz-submit-btn').style.display = 'none';
  document.getElementById('quiz-retry-btn').style.display = 'inline-block';
}

// Retry Quiz
function retryQuiz() {
  loadUnit(currentUnitIndex);
}

// Flashcard Actions
function flipFlashcard() {
  const wrapper = document.getElementById('flashcard-wrapper');
  if (wrapper) wrapper.classList.toggle('flipped');
}

function prevFlashcard() {
  currentFlashcardIndex--;
  const unit = GLOBAL_SUCCESS_11_DATA.units[currentUnitIndex];
  renderFlashcard(unit);
}

function nextFlashcard() {
  currentFlashcardIndex++;
  const unit = GLOBAL_SUCCESS_11_DATA.units[currentUnitIndex];
  renderFlashcard(unit);
}

// Web Speech API Voice synthesis
function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// Search across all Units
function performSearch(query) {
  const overlay = document.getElementById('search-results-overlay');
  const resultsList = document.getElementById('search-results-list');
  const queryClean = query.trim().toLowerCase();

  if (!queryClean || queryClean.length < 2) {
    if (overlay) overlay.style.display = 'none';
    return;
  }

  const results = [];
  GLOBAL_SUCCESS_11_DATA.units.forEach((unit, uIdx) => {
    // Search unit title/theme
    if (unit.title.toLowerCase().includes(queryClean) || unit.vietnameseTitle.toLowerCase().includes(queryClean)) {
      results.push({
        unitIdx: uIdx,
        unitTitle: `Unit ${unit.number}: ${unit.title}`,
        type: 'Unit Topic',
        snippet: unit.overview.summary
      });
    }
    // Search vocabulary
    unit.vocabulary.forEach(v => {
      if (v.word.toLowerCase().includes(queryClean) || v.meaning.toLowerCase().includes(queryClean)) {
        results.push({
          unitIdx: uIdx,
          unitTitle: `Unit ${unit.number}: ${unit.title}`,
          type: `Từ vựng: ${v.word} (${v.pos})`,
          snippet: `${v.meaning} - "${v.example}"`
        });
      }
    });
    // Search grammar
    unit.grammar.forEach(g => {
      if (g.title.toLowerCase().includes(queryClean) || g.description.toLowerCase().includes(queryClean)) {
        results.push({
          unitIdx: uIdx,
          unitTitle: `Unit ${unit.number}: ${unit.title}`,
          type: `Ngữ pháp: ${g.title}`,
          snippet: g.description
        });
      }
    });
  });

  if (resultsList && overlay) {
    if (results.length === 0) {
      resultsList.innerHTML = `<div style="color: var(--text-muted); padding: 20px; text-align: center;">Không tìm thấy kết quả phù hợp cho "${query}".</div>`;
    } else {
      resultsList.innerHTML = results.slice(0, 10).map(r => `
        <div class="search-result-item" onclick="goToSearchResult(${r.unitIdx})">
          <div style="font-size: 0.78rem; color: #818cf8; font-weight: 700;">${r.unitTitle} • ${r.type}</div>
          <div style="color: #f1f5f9; font-size: 0.92rem; margin-top: 4px;">${r.snippet}</div>
        </div>
      `).join('');
    }
    overlay.style.display = 'block';
  }
}

function goToSearchResult(unitIdx) {
  const overlay = document.getElementById('search-results-overlay');
  if (overlay) overlay.style.display = 'none';
  switchUnit(unitIdx);
}

function closeSearchModal() {
  const overlay = document.getElementById('search-results-overlay');
  if (overlay) overlay.style.display = 'none';
}

// Password Gate Authentication
function initPasswordGate() {
  const gate = document.getElementById('password-gate');
  if (!gate) return;

  const isAuth = sessionStorage.getItem('gs11_authenticated');
  if (isAuth === 'true') {
    gate.classList.add('hidden');
  } else {
    gate.classList.remove('hidden');
    setTimeout(() => {
      const input = document.getElementById('pass-input');
      if (input) input.focus();
    }, 100);
  }
}

function verifyPassword() {
  const input = document.getElementById('pass-input');
  const errorMsg = document.getElementById('pass-error');
  const gateCard = document.querySelector('.password-gate-card');
  const gate = document.getElementById('password-gate');

  if (!input || !gate) return;
  const enteredPass = input.value.trim();

  if (VALID_PASSWORDS.includes(enteredPass)) {
    // Password is correct
    sessionStorage.setItem('gs11_authenticated', 'true');
    if (errorMsg) errorMsg.textContent = '';
    gate.classList.add('hidden');
  } else {
    // Incorrect password
    if (errorMsg) {
      errorMsg.textContent = 'Mật khẩu không chính xác. Vui lòng thử lại!';
    }
    if (gateCard) {
      gateCard.classList.remove('shake');
      void gateCard.offsetWidth; // trigger reflow
      gateCard.classList.add('shake');
    }
    input.select();
    input.focus();
  }
}

function togglePassVisibility() {
  const input = document.getElementById('pass-input');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function lockPortal() {
  sessionStorage.removeItem('gs11_authenticated');
  const gate = document.getElementById('password-gate');
  const input = document.getElementById('pass-input');
  const errorMsg = document.getElementById('pass-error');
  if (input) input.value = '';
  if (errorMsg) errorMsg.textContent = '';
  if (gate) {
    gate.classList.remove('hidden');
    if (input) input.focus();
  }
}

// Event Listeners initialization
function initEventListeners() {
  // Tab Navigation Switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`panel-${tabKey}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Search input listener
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }
}

// Sách Mềm 8-Lessons Navigation Helper
function switchSachMemLesson(lessonKey) {
  document.querySelectorAll('.sachmem-lesson-item').forEach(item => {
    item.classList.remove('active');
  });

  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-content-panel');

  if (lessonKey === 'getting-started') {
    const m1 = document.getElementById('menu-lesson-1');
    if (m1) m1.classList.add('active');
    tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === 'getting-started'));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-getting-started'));
  } else if (lessonKey === 'vocabulary') {
    const m2 = document.getElementById('menu-lesson-2');
    if (m2) m2.classList.add('active');
    tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === 'vocabulary'));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-vocabulary'));
  } else if (lessonKey === 'reading') {
    const m3 = document.getElementById('menu-lesson-3');
    if (m3) m3.classList.add('active');
    tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === 'reading'));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-reading'));
  } else {
    alert(`Lesson ${lessonKey.toUpperCase()} is being prepared in the curriculum!`);
  }
}

// Extra Resources quick actions
function openExtraResource(resType) {
  if (resType === 'games') {
    switchSachMemLesson('getting-started');
    switchLesson1Mode('interactive');
    switchLesson1Stage('dinner');
    const el = document.getElementById('stage-dinner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (resType === 'videos') {
    switchSachMemLesson('getting-started');
    switchLesson1Mode('interactive');
    switchLesson1Stage('dialogue');
    const el = document.getElementById('stage-dialogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (resType === 'glossary') {
    switchSachMemLesson('vocabulary');
    const el = document.getElementById('panel-vocabulary');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

