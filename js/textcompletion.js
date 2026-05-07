const ALL_EXAMS = [
  {
    id: 'biometrics',
    title: 'BIOMETRICS 2.0',
    meta: 'Adapted from a technology article',
    html: `
      <p>From iris scans to cardiac signatures, next-generation biometrics promise seamless journeys through airports.</p>
      <p>The next time you fly you may be able to simply walk through the scanning gate and continue without stopping. There’ll be no need to take out your passport or phone <span class="blank-tag">1</span>. Nothing new? Well, now it won’t be your face the system is scanning, but your heartbeat. Welcome to Biometrics 2.0.</p>
      <br>
      <p><span class="blank-tag">2</span> is continuous verification rather than one-off checks. Currently, most airports rely on fingerprints or a single facial scan at a gate. The next wave, powered by AI, verifies identity seamlessly as you move through the airport.</p>
      <br>
      <p>Biometrics 2.0 represents a shift from checkpoint-based security to background identity assurance. Instead of isolated inspection points, verification happens quietly and continuously. By reducing reliance on manual checks, <span class="blank-tag">3</span> such as immigration and security screenings.</p>
      <br>
      <p>Singapore’s Changi Airport already uses iris and facial recognition at multiple checkpoints. Airports in Jakarta and Surabaya have introduced biometric corridors that enable passengers to move through checkpoints using facial verification. Meanwhile, the Smart Path platform by SITA, the world’s leading specialist in air transport communications and information technology, is deployed in more than 40 airports worldwide, <span class="blank-tag">4</span> through a single facial enrolment.</p>
      <br>
      <p>Biometrics 2.0 is no longer theoretical. <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Sentence Structure",
        opts: [
          "passing through immigration and security",
          "to pass through immigration and security",
          "when passed through immigration and security",
          "to be passing through immigration and security"
        ],
        ans: 1, // B
        grammar: "Purpose infinitive",
        tip: "Structure indicating purpose (in order to do sth/ to do sth). 'to pass through...' means 'to go through...'. Therefore, a 'to' infinitive is required."
      },
      {
        num: 2,
        type: "Noun Clause",
        opts: [
          "What sets next-generation biometrics apart from today’s systems",
          "That next-generation biometrics set apart from today’s systems",
          "Setting next-generation biometrics apart from today’s systems",
          "It sets next-generation biometrics apart from today’s systems"
        ],
        ans: 0, // A
        grammar: "Noun clause as subject",
        tip: "A Noun Clause acts as the subject for the following verb 'is'. 'What sets next-generation biometrics apart...' = The thing that makes next-generation biometrics different..."
      },
      {
        num: 3,
        type: "Sentence Structure",
        opts: [
          "the margin for human error can lower by AI-driven systems in high-security settings",
          "high-security settings can lower the margin for human error by AI-driven systems",
          "AI-driven systems can lower the margin for human error in high-security settings",
          "human error in high-security settings can be lowered margin by AI-driven systems"
        ],
        ans: 2, // C
        grammar: "Subject alignment",
        tip: "The phrase 'By reducing...' has an implicit subject which is the entity performing the action. Here, 'AI-driven systems' is the most logical subject that can 'lower the margin for human error'. Passive voice or incorrect subjects are not suitable."
      },
      {
        num: 4,
        type: "Participle clause",
        opts: [
          "integrated biometrics across check-in, security, border control and boarding",
          "integrates biometrics across check-in, security, border control and boarding",
          "to integrate biometrics across check-in, security, border control and boarding",
          "integrating biometrics across check-in, security, border control and boarding"
        ],
        ans: 3, // D
        grammar: "Present participle clause",
        tip: "This is a reduced relative clause (or participle clause) with an active meaning, continuing the idea of the previous sentence (..., which integrates... -> ..., integrating...)."
      },
      {
        num: 5,
        type: "Sentence Cohesion",
        opts: [
          "Steadily reshaping the passenger journey, identity itself turns into the ultimate travel document.",
          "It is steadily reshaping the passenger journey and turning identity itself into the ultimate travel document.",
          "It steadily reshapes the passenger journey and to turn identity itself into the ultimate travel document.",
          "Reshaping the passenger journey steadily and identity itself is turned into the ultimate travel document."
        ],
        ans: 1, // B
        grammar: "Pronoun reference & Parallelism",
        tip: "Pronoun reference. 'It' here replaces 'Biometrics 2.0'. The verb is in the present continuous 'is steadily reshaping... and turning...' describing an ongoing process."
      }
    ]
  },
  {
    id: 'heart',
    title: 'Heart Problems in Young Adults',
    meta: 'Health & Lifestyle',
    html: `
      <p>Mounting evidence shows that more young adults are experiencing heart problems than in previous decades. Heart attacks occur when blood flow to the heart <span class="blank-tag">1</span>. One reason is the growing number of lifestyle-related health problems, <span class="blank-tag">2</span>. Other factors like tobacco, cocaine, marijuana, and alcohol use have been associated with increased risks of heart attack in younger adults, too.</p>
      <br>
      <p>The major risk factors—high blood pressure, high cholesterol, diabetes, and obesity—can damage arteries over time. While these conditions may be inherited, <span class="blank-tag">3</span> often play a larger role.</p>
      <br>
      <p><span class="blank-tag">4</span>. A recent survey found that 47% of people under 45 don’t believe they’re at risk for heart disease, and one-third of adults wouldn’t confidently recognize heart attack symptoms. Half of 3,500 younger adults with significant risk factors didn’t believe they were at risk before their heart attack occurred. Even fewer said their doctors warned them—especially women.</p>
      <br>
      <p>Experts say that getting young adults to care about heart health is a unique challenge. <span class="blank-tag">5</span>. Experts emphasize early prevention, since untreated risk factors lead to worse outcomes over time.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Verb Phrase",
        opts: [
          "has been incompletely blocked",
          "that is partially or completely blocking",
          "is getting a blockage completely",
          "is partially or completely blocked"
        ],
        ans: 3,
        grammar: "Passive Voice",
        tip: "Adverbial clause of time 'when blood flow to the heart...'. 'blood flow' needs to be in passive voice 'is blocked'."
      },
      {
        num: 2,
        type: "Relative Clause",
        opts: [
          "largely resulting from poor diet and physical inactivity",
          "which are influenced by diet and regular exercise",
          "mainly associated with poor diet and physical inactivity",
          "that are closely linked to poor diet and physical inactivity"
        ],
        ans: 0,
        grammar: "Participle phrase",
        tip: "Reduced relative clause in active form: which largely result from -> largely resulting from. Other options are incorrect in meaning or logic."
      },
      {
        num: 3,
        type: "Noun Phrase",
        opts: [
          "the unhealthy lifestyle choices kept in childhood",
          "unhealthy lifestyle choices starting in childhood",
          "people keep unhealthy lifestyle choices in childhood",
          "choosing unhealthy lifestyle in childhood"
        ],
        ans: 1,
        grammar: "Noun phrase as subject",
        tip: "This position requires a noun phrase as the subject for 'often play a larger role'. 'choices starting in childhood' is the most suitable grammatically and semantically."
      },
      {
        num: 4,
        type: "Sentence Cohesion",
        opts: [
          "Because of these risks, many young adults remain unaware",
          "Being aware of the risk, many young adults are taking risks",
          "Despite these risks, many young adults remain unaware",
          "There is unawareness among young adults due to these risks"
        ],
        ans: 2,
        grammar: "Concession",
        tip: "The passage shows a contrast: The risks are real and significant, but young people do 'not believe' (don't believe). Therefore, a concession structure is needed: Despite these risks..."
      },
      {
        num: 5,
        type: "Sentence Structure",
        opts: [
          "As they are busy with careers and families, this group often overlooks their heart health",
          "While they are busy with careers and families, they consider long-term health risks carefully",
          "When they neglect their heart health, it is often due to pressure from work and family duties",
          "Although they are busy with careers and families, they manage to take good care of their heart health"
        ],
        ans: 0,
        grammar: "Adverbial clause of reason",
        tip: "Most logical semantic connection following 'unique challenge': Because they are busy with careers and families, this group often overlooks heart care."
      }
    ]
  }
];

let QS = [];
const L = ['A','B','C','D'];
let done = Array(5).fill(false);
let corr = Array(5).fill(false);
let cntC = 0, cntW = 0;

function initApp() {
  const selectScreen = document.getElementById('select-screen');
  selectScreen.innerHTML = '';
  
  ALL_EXAMS.forEach((exam, idx) => {
    const div = document.createElement('div');
    div.className = 'exam-option';
    div.innerHTML = `
      <div>
        <div class="eo-title">Test ${idx + 1}: ${exam.title}</div>
        <div class="eo-meta">${exam.meta}</div>
      </div>
      <button class="eo-btn">Start Test</button>
    `;
    div.onclick = () => startExam(exam.id);
    selectScreen.appendChild(div);
  });
}

function showSelectScreen() {
  document.getElementById('exam-container').style.display = 'none';
  document.getElementById('select-screen').style.display = 'flex';
  document.getElementById('main-subtitle').textContent = 'Text Completion · Reading Comprehension';
}

function startExam(id) {
  const exam = ALL_EXAMS.find(e => e.id === id);
  if (!exam) return;
  
  document.getElementById('select-screen').style.display = 'none';
  document.getElementById('exam-container').style.display = 'block';
  document.getElementById('main-subtitle').textContent = `Text Completion · ${exam.title}`;
  
  document.getElementById('p-title').innerHTML = `${exam.title} <span class="passage-tag">Source text</span>`;
  document.getElementById('p-meta').textContent = exam.meta;
  document.getElementById('p-content').innerHTML = exam.html;
  
  QS = exam.questions;
  resetAll();
}

function build() {
  const wrap = document.getElementById('qlist');
  wrap.innerHTML = '';
  QS.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'q-card';
    card.innerHTML = `
      <div class="q-header">
        <div class="q-num">${q.num}</div>
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--text)">Question ${q.num}</div>
          <div class="q-type">${q.type}</div>
        </div>
      </div>
      <div class="q-body">
        <div class="options" id="opts-${qi}">
          ${q.opts.map((o, oi) => `
            <div class="opt" id="op${qi}_${oi}" onclick="pick(${qi},${oi})">
              <div class="opt-letter">${L[oi]}</div>
              <span>${o}</span>
            </div>`).join('')}
        </div>
        <div class="feedback" id="fb-${qi}"></div>
      </div>
    `;
    wrap.appendChild(card);
  });
  updateBar();
}

function pick(qi, oi) {
  if (done[qi]) return;
  done[qi] = true;
  const q = QS[qi];
  const ok = oi === q.ans;
  corr[qi] = ok;
  if (ok) cntC++; else cntW++;

  for (let i = 0; i < 4; i++) {
    const el = document.getElementById(`op${qi}_${i}`);
    el.classList.add('locked');
    if (i === q.ans) el.classList.add('correct');
    else if (i === oi) el.classList.add('wrong');
    else el.classList.add('dimmed');
  }

  const fb = document.getElementById(`fb-${qi}`);
  fb.className = `feedback show ${ok ? 'ok' : 'err'}`;
  fb.innerHTML = `
    <div class="fb-row">
      <span class="fb-icon">${ok ? '&#10003;' : '&#10007;'}</span>
      <div>
        <div class="fb-title">${ok ? 'Correct!' : 'Incorrect — Correct Answer: ' + L[q.ans]}</div>
      </div>
    </div>
    <div class="fb-explain">
      <span class="fb-grammar">${q.grammar}</span>&nbsp;&nbsp;${q.tip}
    </div>
  `;

  updateBar();
  if (done.every(Boolean)) showResult();
}

function revealAll() {
  QS.forEach((q, qi) => {
    if (done[qi]) return;
    done[qi] = true;
    for (let i = 0; i < 4; i++) {
      const el = document.getElementById(`op${qi}_${i}`);
      el.classList.add('locked');
      if (i === q.ans) el.classList.add('correct');
      else el.classList.add('dimmed');
    }
    const fb = document.getElementById(`fb-${qi}`);
    fb.className = 'feedback show ok';
    fb.innerHTML = `
      <div class="fb-row">
        <span class="fb-icon">&#8594;</span>
        <div><div class="fb-title">Answer: ${L[q.ans]} &mdash; ${q.opts[q.ans]}</div></div>
      </div>
      <div class="fb-explain">
        <span class="fb-grammar">${q.grammar}</span>&nbsp;&nbsp;${q.tip}
      </div>
    `;
  });
  updateBar();
  showResult();
}

function resetAll() {
  done = Array(5).fill(false);
  corr = Array(5).fill(false);
  cntC = 0; cntW = 0;
  document.getElementById('result-panel').style.display = 'none';
  build();
}

function updateBar() {
  const answered = done.filter(Boolean).length;
  const pct = (answered / 5) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-lbl').textContent = answered + ' / 5 questions';
  document.getElementById('val-correct').textContent = cntC;
  document.getElementById('val-wrong').textContent = cntW;
}

function showResult() {
  const n = corr.filter(Boolean).length;
  const panel = document.getElementById('result-panel');
  panel.style.display = 'block';
  document.getElementById('result-grade').textContent = n + '/5';
  const msgs = ['Need more practice!', 'Good job — keep going!', 'Well done!', 'Excellent!', 'Perfect!'];
  document.getElementById('result-msg').textContent = msgs[n] || 'Completed!';
  document.getElementById('result-stats').innerHTML =
    '<div>Correct <span>' + n + ' questions</span></div><div>Incorrect <span>' + (5 - n) + ' questions</span></div><div>Score <span>' + (n * 2) + '/10</span></div>';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Khởi tạo app
initApp();
