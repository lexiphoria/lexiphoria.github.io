// ── GAME DATA: ReadMind - 21 English Cloze Passages ──────────────────────────
const texts = [
  {
    title: "Workshop Announcement",
    type: "Notice",
    icon: "📋",
    passage: `TEN-DAY WOODWORKING WORKSHOP\n\nDate: July 26th to August 4th\nLocation: Birchwood's Shop Facility in Acorn, Ohio\nCost: $500.00\n\nThis practical workshop will be limited to an ___1___ of twenty and is intended to provide practical and theoretical experience in both elementary and advanced methods and techniques ___2___ to traditional joinery layout, use of modern and traditional timber carpentry tools, assembly of timber systems and hand-raising practices.\n\nThe structure to be built will be an authentic reproduction of an early timber frame house.\n\nPrevious woodworking experience would be an asset, but is not a ___3___.\n\nTo register, send the attached form along with a check for $275 to Birchwood Inc., 215 Ashly Rd., Acorn, Ohio 03560.\n\nEnrollment is ___4___ a first come, first served basis, so please don't wait!\n\nAll participants will receive a certificate ___5___ completion. The workshop aims to ___6___ traditional craftsmanship techniques to a new generation of woodworkers.`,
    questions: [
      { type: "Quantifier", blank: 1, text: "The workshop will be limited to an ___1___ of twenty.", options: ["A. organization", "B. enrollment", "C. extension", "D. objection"], answer: 1, feedback: "'Enrollment of twenty' is a standard quantifier phrase. Limited to an enrollment of = total number enrolled." },
      { type: "Part of Speech", blank: 2, text: "...techniques ___2___ to traditional joinery layout...", options: ["A. including", "B. resolving", "C. relating", "D. comparing"], answer: 2, feedback: "'Relating to' is a present participle functioning as an adjective. It means 'connected to' or 'concerning'." },
      { type: "Word Meaning", blank: 3, text: "Previous woodworking experience would be an asset, but is not a ___3___.", options: ["A. prerequisite", "B. adaption", "C. information", "D. validity"], answer: 0, feedback: "A 'prerequisite' is something required as a prior condition. The sentence contrasts helpful with NOT required." },
      { type: "Preposition", blank: 4, text: "Enrollment is ___4___ a first come, first served basis.", options: ["A. in", "B. on", "C. at", "D. by"], answer: 1, feedback: "'On a first come, first served basis' is the standard collocation in English." },
      { type: "Collocation", blank: 5, text: "All participants will receive a certificate ___5___ completion.", options: ["A. for", "B. with", "C. of", "D. about"], answer: 2, feedback: "'Certificate of completion' is a fixed collocation. 'Of' links the certificate to what it certifies." },
      { type: "Phrasal Verb", blank: 6, text: "The workshop aims to ___6___ traditional craftsmanship techniques.", options: ["A. pass on", "B. pass away", "C. pass out", "D. pass over"], answer: 0, feedback: "'Pass on' means to transmit or hand down knowledge/skills. Other meanings: pass away=die, pass out=faint, pass over=skip." }
    ]
  }
  // [Additional 20 passages would be added here - shortened for demo]
];

// ── STATE ──────────────────────────────────────────────────────────────────
let currentTextIndex = 0;
let currentQuestionIndex = 0;
let answers = [];
let scores = {}; // textIndex -> score
let currentTextId = 0;

// ── LO-FI AUDIO via Web Audio API ──────────────────────────────────────────
let audioCtx = null, masterGain = null, isPlaying = false;
let oscillators = [], lfoNodes = [], noiseNode = null;

function createLoFiTrack() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);

  // Reverb
  const convolver = audioCtx.createConvolver();
  const reverbBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuffer.getChannelData(ch);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  }
  convolver.buffer = reverbBuffer;

  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.3;

  masterGain.connect(audioCtx.destination);
  masterGain.connect(convolver);
  convolver.connect(reverbGain);
  reverbGain.connect(audioCtx.destination);

  // Chord pads: Cmaj7 — Am7 — Fmaj7 — G7
  const chords = [
    [261.63, 329.63, 392.00, 493.88],
    [220.00, 261.63, 329.63, 440.00],
    [174.61, 220.00, 261.63, 349.23],
    [196.00, 246.94, 293.66, 392.00]
  ];

  chords.forEach((chord, ci) => {
    chord.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      const lfo = audioCtx.createOscillator();
      const lfoG = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq * (0.998 + Math.random() * 0.004);

      lfo.type = 'sine';
      lfo.frequency.value = 0.3 + Math.random() * 0.2;
      lfoG.gain.value = 2;
      lfo.connect(lfoG);
      lfoG.connect(osc.frequency);

      g.gain.setValueAtTime(0, audioCtx.currentTime);
      const startT = ci * 8;
      g.gain.setValueAtTime(0, audioCtx.currentTime + startT);
      g.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + startT + 1.5);
      g.gain.setValueAtTime(0.06, audioCtx.currentTime + startT + 6);
      g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + startT + 8);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(audioCtx.currentTime + startT);
      osc.stop(audioCtx.currentTime + startT + 8.5);
      lfo.start(audioCtx.currentTime + startT);
      lfo.stop(audioCtx.currentTime + startT + 8.5);

      oscillators.push(osc);
    });
  });

  // Vinyl crackle
  const bufferSize = 4096;
  noiseNode = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.015;
  noiseNode.onaudioprocess = e => {
    const out = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      out[i] = Math.random() < 0.002 ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.04;
    }
  };
  noiseNode.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
}

let loopInterval = null;

function toggleAudio() {
  if (!isPlaying) {
    if (!audioCtx) createLoFiTrack();
    else if (audioCtx.state === 'suspended') audioCtx.resume();
    isPlaying = true;
    document.getElementById('play-btn').textContent = '⏸';
    document.getElementById('vinyl').classList.add('playing');
    loopInterval = setInterval(() => {
      oscillators = [];
      audioCtx.close().then(() => { audioCtx = null; createLoFiTrack(); });
    }, 32000);
  } else {
    audioCtx.suspend();
    isPlaying = false;
    document.getElementById('play-btn').textContent = '▶';
    document.getElementById('vinyl').classList.remove('playing');
    if (loopInterval) clearInterval(loopInterval);
  }
}

// ── SCREEN MANAGEMENT ─────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'select-screen') renderTextGrid();
  if (id === 'home') updateHomeStats();
}

function updateHomeStats() {
  const completed = Object.keys(scores).length;
  document.getElementById('stat-texts').textContent = texts.length;
  document.getElementById('stat-qs').textContent = texts.length * 6;
  const allScores = Object.values(scores);
  if (allScores.length > 0) {
    const best = Math.max(...allScores);
    document.getElementById('stat-score').textContent = `${best}/6`;
  }
}

// ── TEXT GRID ──────────────────────────────────────────────────────────────
function renderTextGrid() {
  const grid = document.getElementById('texts-grid');
  grid.innerHTML = texts.map((t, i) => {
    const completed = scores[i] !== undefined;
    const sc = scores[i];
    return `
    <div class="text-card ${completed ? 'completed' : ''}" onclick="startText(${i})">
      <div class="card-num">TEXT ${String(i+1).padStart(2,'0')}</div>
      <div class="card-title">${t.icon} ${t.title}</div>
      <div class="card-type"><span class="card-dot"></span>${t.type}</div>
      ${completed ? `<div class="card-score">Score: ${sc}/6 · ${Math.round(sc/6*100)}%</div>` : ''}
    </div>`;
  }).join('');
}

// ── START TEXT ─────────────────────────────────────────────────────────────
function startText(idx) {
  currentTextIndex = idx;
  currentTextId = idx;
  currentQuestionIndex = 0;
  answers = new Array(6).fill(null);
  renderGame();
  showScreen('game');
}

function renderGame() {
  const text = texts[currentTextIndex];
  document.getElementById('hdr-label').textContent = `TEXT ${String(currentTextIndex+1).padStart(2,'0')}`;
  document.getElementById('hdr-title').textContent = text.title;
  renderPassage();
  renderQuestions();
  updateProgress();
}

// ── PASSAGE RENDERING ──────────────────────────────────────────────────────
function renderPassage() {
  const text = texts[currentTextIndex];
  let html = text.passage;

  // Convert newlines
  html = html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

  // Convert blanks
  for (let i = 1; i <= 6; i++) {
    const ans = answers[i-1];
    let cls = 'blank';
    let display = `(${i})`;
    if (ans !== null) {
      const correct = ans === text.questions[i-1].answer;
      cls += correct ? ' answered-correct' : ' answered-incorrect';
      const chosen = text.questions[i-1].options[ans].substring(3);
      display = chosen;
    }
    html = html.replace(`___${i}___`, `<span class="${cls}" id="blank-${i}">${display}</span>`);
  }

  document.getElementById('text-panel').innerHTML = `
    <div class="passage-type">${text.icon} ${text.type}</div>
    <div class="passage-title">${text.title}</div>
    <div class="passage-body"><p>${html}</p></div>
  `;
}

// ── QUESTIONS RENDERING ────────────────────────────────────────────────────
function renderQuestions() {
  const text = texts[currentTextIndex];
  const keys = ['A', 'B', 'C', 'D'];

  // Tracker
  const trackerHTML = text.questions.map((q, i) => {
    let cls = 'q-dot';
    if (i === currentQuestionIndex) cls += ' current';
    else if (answers[i] !== null) {
      cls += answers[i] === q.answer ? ' correct' : ' incorrect';
    }
    return `<div class="${cls}" onclick="goToQuestion(${i})">${i+1}</div>`;
  }).join('');

  // Question cards
  const cardsHTML = text.questions.map((q, i) => {
    const isActive = i === currentQuestionIndex;
    const isAnswered = answers[i] !== null;

    const optionsHTML = q.options.map((opt, oi) => {
      let cls = 'option-btn';
      let disabled = '';
      if (isAnswered) {
        disabled = 'disabled';
        if (oi === q.answer) cls += ' correct';
        else if (oi === answers[i] && answers[i] !== q.answer) cls += ' incorrect';
      }
      return `<button class="${cls}" ${disabled} onclick="selectAnswer(${i}, ${oi})">
        <span class="option-key">${keys[oi]}</span>${opt.substring(3)}
      </button>`;
    }).join('');

    let feedbackHTML = '';
    if (isAnswered) {
      const correct = answers[i] === q.answer;
      feedbackHTML = `<div class="feedback-box ${correct ? 'correct' : 'incorrect'} show">
        <span class="feedback-icon">${correct ? '✓' : '✗'}</span>${q.feedback}
      </div>`;
    }

    const navHTML = `<div class="nav-btns">
      <button class="btn-nav" onclick="goToQuestion(${i-1})" ${i === 0 ? 'disabled' : ''}>← Prev</button>
      ${i < 5 ? `<button class="btn-nav primary" onclick="goToQuestion(${i+1})">Next →</button>` 
               : `<button class="btn-nav primary" onclick="finishText()">Finish ✓</button>`}
    </div>`;

    return `<div class="question-card ${isActive ? 'active' : ''}" id="q-card-${i}">
      <div class="q-type-tag">${q.type}</div>
      <div class="q-num">Question ${i+1} of 6 · Blank (${q.blank})</div>
      <div class="q-text">${q.text.replace(`___${q.blank}___`, `<span class="q-blank-ref">(${q.blank})</span>`)}</div>
      <div class="options-grid">${optionsHTML}</div>
      ${feedbackHTML}
      ${navHTML}
    </div>`;
  }).join('');

  document.getElementById('questions-panel').innerHTML = `
    <div class="q-tracker">${trackerHTML}</div>
    ${cardsHTML}
  `;
}

function goToQuestion(idx) {
  if (idx < 0 || idx > 5) return;
  currentQuestionIndex = idx;
  renderQuestions();
}

function selectAnswer(qIdx, optIdx) {
  if (answers[qIdx] !== null) return;
  answers[qIdx] = optIdx;
  renderPassage();
  renderQuestions();
  updateProgress();
}

function updateProgress() {
  const answered = answers.filter(a => a !== null).length;
  const correct = answers.filter((a, i) => a === texts[currentTextIndex].questions[i].answer).length;
  const pct = Math.round(answered / 6 * 100);
  const circumference = 113;
  const offset = circumference - (pct / 100) * circumference;

  document.getElementById('score-chip').textContent = `${correct} / ${answered}`;
  document.getElementById('ring-fg').style.strokeDashoffset = offset;
  document.getElementById('ring-label').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function confirmBack() {
  if (answers.some(a => a !== null)) {
    if (confirm('Leave this text? Your progress will be saved.')) {
      saveProgress();
      showScreen('select-screen');
    }
  } else {
    showScreen('select-screen');
  }
}

function saveProgress() {
  const correct = answers.filter((a, i) => a !== null && a === texts[currentTextIndex].questions[i].answer).length;
  scores[currentTextIndex] = correct;
}

function finishText() {
  const text = texts[currentTextIndex];
  const correct = answers.filter((a, i) => a === text.questions[i].answer).length;
  const wrong = answers.filter(a => a !== null).length - correct;
  const pct = Math.round(correct / 6 * 100);
  scores[currentTextIndex] = correct;

  const emojis = ['😔', '😐', '🙂', '😊', '😄', '🌟', '🏆'];
  const emojiIdx = Math.floor(correct / 6 * 6);
  const titles = ['Keep Practicing!', 'Getting There!', 'Good Effort!', 'Well Done!', 'Excellent!', 'Outstanding!', 'Perfect Score!'];

  document.getElementById('result-emoji').textContent = emojis[Math.min(emojiIdx, 6)];
  document.getElementById('result-title').textContent = titles[Math.min(correct, 6)];
  document.getElementById('result-score').textContent = `${correct} / 6 correct · ${pct}% accuracy`;
  document.getElementById('r-correct').textContent = correct;
  document.getElementById('r-wrong').textContent = 6 - correct;
  document.getElementById('r-pct').textContent = pct + '%';

  showScreen('results');
}

function nextText() {
  const next = (currentTextIndex + 1) % texts.length;
  startText(next);
}
