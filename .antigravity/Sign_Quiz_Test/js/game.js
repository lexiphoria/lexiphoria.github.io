// ─── Audio Engine (Web Audio API — no external files needed) ────────────────
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playCorrect() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(523, ac.currentTime);       // C5
  osc.frequency.setValueAtTime(659, ac.currentTime + 0.12); // E5
  osc.frequency.setValueAtTime(784, ac.currentTime + 0.24); // G5
  gain.gain.setValueAtTime(0.18, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.55);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.55);
}

function playWrong() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ac.currentTime);
  osc.frequency.setValueAtTime(220, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0.12, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.4);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.4);
}

// ─── Sign Renderer ──────────────────────────────────────────────────────────
function renderSign(sign) {
  const nl = s => (s || '').replace(/\n/g, '<br>');

  switch (sign.type) {
    case 'sanitize':
      return `
        <div class="sign-sanitize">
          <div class="sign-title">${sign.title}</div>
          <div class="sign-steps">
            ${sign.steps.map(s => `<span class="step">${s}</span>`).join('')}
          </div>
        </div>`;

    case 'notice':
      return `
        <div class="sign-notice">
          <div class="sign-header-bar">${sign.header}</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'danger':
      return `
        <div class="sign-danger">
          <div class="sign-header-bar">${sign.header}</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'prohibition':
      return `
        <div class="sign-prohibition">
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'info':
      return `
        <div class="sign-info">
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'caution':
      return `
        <div class="sign-caution">
          <div class="caution-label">${sign.caution || 'Caution:'}</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'gold':
      return `
        <div class="sign-gold">
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'parking':
      return `
        <div class="sign-parking">
          <div class="parking-letter">P</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'diamond':
      return `
        <div class="sign-diamond">
          <span class="sign-icon">${sign.icon || '🍔'}</span>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'wet-paint':
      return `
        <div class="sign-wet-paint">
          <div class="sign-title">${sign.title}</div>
          <div class="sign-body">${nl(sign.body)}</div>
          <div class="sign-icon">${sign.icon || '🖐️'}</div>
        </div>`;

    case 'floor-stand':
      return `
        <div class="sign-floor-stand">
          <div class="stand-body">
            <div class="sign-header-bar">${sign.header}</div>
            <div class="sign-body">${nl(sign.body)}</div>
          </div>
        </div>`;

    case 'caution-teal':
      return `
        <div class="sign-caution-teal">
          <div class="caution-bar">${sign.header || 'CAUTION'}</div>
          <div class="sign-body-wrap">
            <span class="sign-icon">${sign.icon || '🧴'}</span>
            <span class="sign-body">${nl(sign.body)}</span>
          </div>
        </div>`;

    case 'club':
      return `
        <div class="sign-club">
          <div class="sign-title">${sign.title}</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    case 'yellow-square':
      return `
        <div class="sign-yellow-square">
          <div class="sign-icon">${sign.icon || '💡'}</div>
          <div class="sign-label">${sign.label || 'PLEASE'}</div>
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;

    default:
      return `
        <div class="sign-generic">
          <div class="sign-body">${nl(sign.body)}</div>
        </div>`;
  }
}

// ─── State ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'signquiz_scores';
let current = 0;
let score = 0;
let answered = false;

// ─── DOM refs ────────────────────────────────────────────────────────────────
const startScreen  = document.getElementById('start-screen');
const gameScreen   = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const progressFill  = document.getElementById('progress-fill');
const progressChip  = document.getElementById('progress-chip');
const questionLabel = document.getElementById('question-label');
const questionPrompt= document.getElementById('question-prompt');
const signContainer = document.getElementById('sign-container');
const optionsGrid   = document.getElementById('options-grid');
const explanation   = document.getElementById('explanation');
const nextBtn       = document.getElementById('next-btn');

const resultEmoji  = document.getElementById('result-emoji');
const resultTitle  = document.getElementById('result-title');
const resultMsg    = document.getElementById('result-msg');
const scoreBig     = document.getElementById('score-big');
const bestTag      = document.getElementById('best-tag');

// ─── LocalStorage helpers ────────────────────────────────────────────────────
function getBest() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveBest(s) {
  const data = getBest();
  data.best = Math.max(data.best || 0, s);
  data.lastScore = s;
  data.lastDate = new Date().toLocaleDateString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── Start screen ────────────────────────────────────────────────────────────
function showStartScreen() {
  const data = getBest();
  if (data.best !== undefined) {
    bestTag.innerHTML = `Best score: <strong>${data.best} / ${questions.length}</strong> · Last played: ${data.lastDate}`;
  }
  startScreen.classList.remove('hidden');
  gameScreen.classList.remove('active');
  resultScreen.classList.remove('active');
  document.querySelector('.progress-bar-fill').style.width = '0%';
  progressChip.textContent = `0 / ${questions.length}`;
}

// ─── Start game ──────────────────────────────────────────────────────────────
function startGame() {
  current = 0; score = 0; answered = false;
  startScreen.classList.add('hidden');
  gameScreen.classList.add('active');
  resultScreen.classList.remove('active');
  renderQuestion();
}

// ─── Render question ─────────────────────────────────────────────────────────
function renderQuestion() {
  answered = false;
  const q = questions[current];
  const total = questions.length;

  // Progress
  const pct = (current / total) * 100;
  document.querySelector('.progress-bar-fill').style.width = pct + '%';
  progressChip.textContent = `${current + 1} / ${total}`;

  // Labels
  questionLabel.textContent = `Question ${q.id}`;
  questionPrompt.textContent = q.prompt;

  // Sign
  signContainer.innerHTML = `<div class="sign-visual">${renderSign(q.sign)}</div>`;

  // Options
  const letters = ['A', 'B', 'C', 'D'];
  optionsGrid.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn" data-index="${i}" id="opt-${i}">
      <span class="opt-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
  });

  // Reset explanation & next
  explanation.classList.remove('show');
  explanation.innerHTML = '';
  nextBtn.classList.remove('show');
}

// ─── Handle answer ───────────────────────────────────────────────────────────
function handleAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = questions[current];

  // Disable all
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

  const chosen = document.getElementById(`opt-${idx}`);
  const correct = document.getElementById(`opt-${q.answer}`);

  if (idx === q.answer) {
    chosen.classList.add('correct');
    score++;
    playCorrect();
  } else {
    chosen.classList.add('wrong');
    correct.classList.add('correct');
    playWrong();
  }

  // Explanation
  explanation.innerHTML = q.explanation;
  explanation.classList.add('show');
  nextBtn.classList.add('show');
}

// ─── Next question ───────────────────────────────────────────────────────────
nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

// ─── Result ──────────────────────────────────────────────────────────────────
function showResult() {
  gameScreen.classList.remove('active');
  resultScreen.classList.add('active');
  document.querySelector('.progress-bar-fill').style.width = '100%';

  saveBest(score);
  const pct = Math.round((score / questions.length) * 100);

  let emoji = '🌟', title = 'Excellent!', msg = 'You read signs like a pro!';
  if (pct < 50) { emoji = '📖'; title = 'Keep Practising!'; msg = 'Review the signs and try again.'; }
  else if (pct < 75) { emoji = '👍'; title = 'Good Job!'; msg = 'You\'re getting better at reading signs.'; }
  else if (pct < 100) { emoji = '🎉'; title = 'Great Work!'; msg = 'Almost perfect — keep it up!'; }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultMsg.textContent = msg;
  scoreBig.innerHTML = `${score} <span>/ ${questions.length}</span>`;

  const data = getBest();
  bestTag.innerHTML = `Best score: <strong>${data.best} / ${questions.length}</strong>`;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
showStartScreen();
