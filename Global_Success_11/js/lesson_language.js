/**
 * Global Success 11 - Unit 1 Lesson 2 (Language)
 * Full Interactive Online Lesson & Presentation Engine
 * 100% English Medium of Instruction (Vietnamese only for vocabulary definitions)
 */

// Slide Deck Definition (35 Slides) - 100% English
const LESSON2_SLIDES = [
  { id: 1, title: "GLOBAL SUCCESS 11", subtitle: "UNIT 1: A LONG AND HEALTHY LIFE", desc: "Living Long and Healthy: Key Habits for a Better Life", cat: "Cover", reveal: "Lesson 2: Language" },
  { id: 2, title: "Lesson 2 Outline", subtitle: "Language Focus", desc: "• Warm-up: Cai Rang Floating Market Quiz\n• Pronunciation: Strong and Weak Forms of Auxiliary Verbs\n• Vocabulary: Health & Body (Tasks 1 & 2)\n• Grammar: Past Simple vs. Present Perfect\n• Review Minigame: Dollar Challenge (10 Questions)\n• Consolidation & Homework", cat: "Agenda" },
  { id: 3, title: "WARM - UP", subtitle: "Cai Rang Floating Market", desc: "Review key vocabulary from Lesson 1 in an exciting cultural setting in Can Tho!", cat: "Warm-up" },
  { id: 4, title: "Welcome to Can Tho!", subtitle: "Cultural Exploration", desc: "Today, we and foreign tourists visited a floating market on the river in Can Tho, and that is Cai Rang Floating Market!", cat: "Warm-up" },
  { id: 5, title: "Cai Rang Floating Market Quiz", subtitle: "6 Vocabulary Questions", desc: "Answer all 6 questions correctly to explore local fresh fruits and healthy lifestyle habits!", cat: "Warm-up" },
  { id: 6, title: "Question 1", subtitle: "Warm-up Review", desc: "I usually __________ at the gym three times a week to stay healthy.\nA. work out | B. full of", cat: "Warm-up", reveal: "👉 Correct Answer: A. work out" },
  { id: 7, title: "Question 2", subtitle: "Warm-up Review", desc: "A healthy __________ includes fruits, vegetables, and proteins.\nA. fit | B. diet", cat: "Warm-up", reveal: "👉 Correct Answer: B. diet" },
  { id: 8, title: "Question 3", subtitle: "Warm-up Review", desc: "Eating a __________ diet helps keep your body strong and healthy.\nA. balanced | B. fit", cat: "Warm-up", reveal: "👉 Correct Answer: A. balanced" },
  { id: 9, title: "Question 4", subtitle: "Warm-up Review", desc: "After exercising regularly, I feel much more __________.\nA. diet | B. fit", cat: "Warm-up", reveal: "👉 Correct Answer: B. fit" },
  { id: 10, title: "Question 5", subtitle: "Warm-up Review", desc: "To stay healthy, it’s important to ______ regularly and eat good food.\nA. work out | B. diet", cat: "Warm-up", reveal: "👉 Correct Answer: A. work out" },
  { id: 11, title: "Question 6", subtitle: "Warm-up Review", desc: "This basket is __________ apples and oranges.\nA. diet | B. full of", cat: "Warm-up", reveal: "👉 Correct Answer: B. full of" },
  { id: 12, title: "What Do Humans Need to Stay Healthy?", subtitle: "Core Discussion", desc: "• Eat a good balance of all kinds of food\n• Drink lots of water\n• Do lots of exercises\n• Keep clean and wash off germs\n• Have enough sound sleep", cat: "Lead-in" },
  { id: 13, title: "PRONUNCIATION", subtitle: "Strong and Weak Forms of Auxiliary Verbs", desc: "In spoken English, auxiliary verbs often have weak forms in questions and strong forms in short answers.", cat: "Pronunciation" },
  { id: 14, title: "Task 1: Listen and Repeat", subtitle: "Auxiliary Verb Pairs", desc: "• Do you …? /də/ vs. I do. /duː/\n• Does she …? /dəz/ vs. She does. /dʌz/\n• Can I …? /kən/ vs. You can. /kæn/\n• Could we …? /kəd/ vs. We could. /kʊd/\n• Were they …? /wə/ vs. They were. /wɜː/\n• Has he …? /həz/ vs. He has. /hæz/", cat: "Pronunciation" },
  { id: 15, title: "Task 2: Read Sentences Out Loud", subtitle: "Pronunciation Practice", desc: "1. Does /dəz/ she exercise? – Yes, she does /dʌz/.\n2. Were /wə/ you eating healthily? – Yes, I was /wɒz/.\n3. Do /də/ you eat vegetables? – Yes, I do /duː/.\n4. Can /kən/ he get up early? – Yes, he can /kæn/.", cat: "Pronunciation", reveal: "Pay attention to weak form in questions and strong form at the end of short answers." },
  { id: 16, title: "VOCABULARY", subtitle: "Health and Body", desc: "Learn essential medical and fitness vocabulary items.", cat: "Vocabulary" },
  { id: 17, title: "Task 1: Match Words with Meanings", subtitle: "Definitions", desc: "1. muscles: pieces of flesh in our body that allow movement\n2. treatment: something that helps to cure an illness or injury\n3. strength: the quality of being physically strong\n4. suffer from: to have a health problem\n5. examine: to look at someone's body carefully to find out a problem", cat: "Vocabulary" },
  { id: 18, title: "Task 2: Complete the Sentences", subtitle: "Word Forms in Context", desc: "1. The doctor examined her carefully, but could not find anything wrong.\n2. He is receiving treatment for his health problem.\n3. Regular exercise can help you improve your muscle strength.\n4. To build your muscles, you can try lifting weights.\n5. Nam can’t sleep well. He is suffering from stress.", cat: "Vocabulary", reveal: "1: examined | 2: treatment | 3: strength | 4: muscles | 5: suffering from" },
  { id: 19, title: "GRAMMAR", subtitle: "Past Simple vs. Present Perfect", desc: "Master the key differences in usage, time markers, and structures.", cat: "Grammar" },
  { id: 20, title: "Rules and Usage", subtitle: "Past Simple vs Present Perfect", desc: "Past Simple: Started and finished at a specific time in the past (yesterday, last year, ago).\nExample: You did a great job yesterday.\n\nPresent Perfect: Started in the past and continues to the present, or completed very recently (since, for, so far, just, already, yet).\nExample: You have done a great job so far.", cat: "Grammar" },
  { id: 21, title: "Grammar Task 1", subtitle: "Verb Conjugation", desc: "1. He (see) saw the doctor yesterday.\n2. She (suffer) suffered from a serious headache, but felt better after treatment.\n3. Our living conditions (improve) have improved over the last few decades.\n4. The doctor (just, examine) has just examined her.", cat: "Grammar", reveal: "1: saw | 2: suffered | 3: have improved | 4: has just examined" },
  { id: 22, title: "REVIEW GAME", subtitle: "Dollar Challenge", desc: "Answer 10 grammar questions to earn the highest cash reward!", cat: "Review Game" },
  { id: 23, title: "Dollar Question 1 ($5)", subtitle: "Grammar Check", desc: "I _____ (see) that movie before, but I _____ (watch) it again last night.\nA. have seen / watched\nB. saw / have watched\nC. have seen / have watched", cat: "Review Game", reveal: "👉 Correct Answer: A. have seen / watched ($5)" },
  { id: 24, title: "Dollar Question 2 ($7)", subtitle: "Grammar Check", desc: "She _____ (finish) her homework, then she _____ (go) out with her friends.\nA. has finished / went\nB. finished / has gone\nC. has finished / has gone", cat: "Review Game", reveal: "👉 Correct Answer: A. has finished / went ($7)" },
  { id: 25, title: "Dollar Question 3 ($4)", subtitle: "Grammar Check", desc: "They _____ (live) in this city for 10 years and they _____ (move) here last year.\nA. have lived / have moved\nB. lived / have moved\nC. have lived / moved", cat: "Review Game", reveal: "👉 Correct Answer: C. have lived / moved ($4)" },
  { id: 26, title: "Dollar Question 4 ($6)", subtitle: "Grammar Check", desc: "He _____ (break) his leg, but he _____ (just/ recover) it.\nA. has broken / just recovered\nB. broke / has just recovered\nC. broke / just recovered", cat: "Review Game", reveal: "👉 Correct Answer: B. broke / has just recovered ($6)" },
  { id: 27, title: "Dollar Question 5 ($7)", subtitle: "Grammar Check", desc: "We _____ (eat) dinner already, but we _____ (cook) it two hours ago.\nA. have eaten / cooked\nB. ate / have cooked\nC. have eaten / have cooked", cat: "Review Game", reveal: "👉 Correct Answer: A. have eaten / cooked ($7)" },
  { id: 28, title: "Dollar Question 6 ($3)", subtitle: "Grammar Check", desc: "I _____ (not finish) my report yet, but I _____ (start) it yesterday.\nA. haven’t finished / have started\nB. didn’t finish / have started\nC. haven’t finished / started", cat: "Review Game", reveal: "👉 Correct Answer: C. haven’t finished / started ($3)" },
  { id: 29, title: "Dollar Question 7 ($6)", subtitle: "Grammar Check", desc: "They _____ (buy) a new house, but they _____ (sell) their old one last month.\nA. bought / have sold\nB. have bought / sold\nC. have bought / have sold", cat: "Review Game", reveal: "👉 Correct Answer: B. have bought / sold ($6)" },
  { id: 30, title: "Dollar Question 8 ($8)", subtitle: "Grammar Check", desc: "She _____ (visit) Paris three times, but she _____ (go) there for the first time in 2018.\nA. has visited / went\nB. has visited / has gone\nC. visited / has gone", cat: "Review Game", reveal: "👉 Correct Answer: A. has visited / went ($8)" },
  { id: 31, title: "Dollar Question 9 ($4)", subtitle: "Grammar Check", desc: "We _______(know) each other since we ______(be) 8 years old.\nA. have known – have been\nB. knew – have been\nC. have known - were", cat: "Review Game", reveal: "👉 Correct Answer: C. have known - were ($4)" },
  { id: 32, title: "Dollar Question 10 ($8)", subtitle: "Grammar Check", desc: "He _____ (lose) his keys, but he _____ (find) them already.\nA. lost / has found\nB. has lost / found\nC. lost / found", cat: "Review Game", reveal: "👉 Correct Answer: A. lost / has found ($8)" },
  { id: 33, title: "Speaking Practice", subtitle: "Pair Discussion", desc: "Work in pairs. Talk about your healthy activities, using the Past Simple or the Present Perfect tenses.", cat: "Production" },
  { id: 34, title: "CONSOLIDATION & HOMEWORK", subtitle: "Lesson Wrap-up", desc: "What have we learnt in this lesson?\n• Strong and weak forms of auxiliary verbs\n• Health vocabulary: muscles, treatment, strength, suffer from, examine\n• Past Simple vs Present Perfect tenses\n\nHomework:\n- Complete workbook exercises for Lesson 2.\n- Practice pronunciation pairs out loud.", cat: "Wrap-up" },
  { id: 35, title: "THANK YOU!", subtitle: "Great Job Today!", desc: "Keep practicing English every day for fluency and confidence! 🌟", cat: "Closing" }
];

// Global Lesson 2 Controller State
window.Lesson2State = {
  currentSlide: 1,
  activeMode: 'interactive', // 'interactive' or 'presentation'
  activeStage: 'warmup',
  marketCurrentQ: 0,
  marketScore: 0,
  dollarTotalBank: 0,
  dollarCurrentQ: 0,
  dollarAnswered: []
};

// Warm-up Questions (Cai Rang Floating Market)
const MARKET_QUESTIONS = [
  { q: "I usually __________ at the gym three times a week to stay healthy.", options: ["A. work out", "B. full of"], correct: 0 },
  { q: "A healthy __________ includes fruits, vegetables, and proteins.", options: ["A. fit", "B. diet"], correct: 1 },
  { q: "Eating a __________ diet helps keep your body strong and healthy.", options: ["A. balanced", "B. fit"], correct: 0 },
  { q: "After exercising regularly, I feel much more __________.", options: ["A. diet", "B. fit"], correct: 1 },
  { q: "To stay healthy, it’s important to ______ regularly and eat good food.", options: ["A. work out", "B. diet"], correct: 0 },
  { q: "This basket is __________ apples and oranges.", options: ["A. diet", "B. full of"], correct: 1 }
];

// Dollar Challenge 10 Questions
const DOLLAR_QUESTIONS = [
  { q: "I _____ (see) that movie before, but I _____ (watch) it again last night.", options: ["A. have seen / watched", "B. saw / have watched", "C. have seen / have watched"], correct: 0, reward: 5 },
  { q: "She _____ (finish) her homework, then she _____ (go) out with her friends.", options: ["A. has finished / went", "B. finished / has gone", "C. has finished / has gone"], correct: 0, reward: 7 },
  { q: "They _____ (live) in this city for 10 years and they _____ (move) here last year.", options: ["A. have lived / have moved", "B. lived / have moved", "C. have lived / moved"], correct: 2, reward: 4 },
  { q: "He _____ (break) his leg, but he _____ (just/ recover) it.", options: ["A. has broken / just recovered", "B. broke / has just recovered", "C. broke / just recovered"], correct: 1, reward: 6 },
  { q: "We _____ (eat) dinner already, but we _____ (cook) it two hours ago.", options: ["A. have eaten / cooked", "B. ate / have cooked", "C. have eaten / have cooked"], correct: 0, reward: 7 },
  { q: "I _____ (not finish) my report yet, but I _____ (start) it yesterday.", options: ["A. haven’t finished / have started", "B. didn’t finish / have started", "C. haven’t finished / started"], correct: 2, reward: 3 },
  { q: "They _____ (buy) a new house, but they _____ (sell) their old one last month.", options: ["A. bought / have sold", "B. have bought / sold", "C. have bought / have sold"], correct: 1, reward: 6 },
  { q: "She _____ (visit) Paris three times, but she _____ (go) there for the first time in 2018.", options: ["A. has visited / went", "B. has visited / has gone", "C. visited / has gone"], correct: 0, reward: 8 },
  { q: "We _______(know) each other since we ______(be) 8 years old.", options: ["A. have known – have been", "B. knew – have been", "C. have known - were"], correct: 2, reward: 4 },
  { q: "He _____ (lose) his keys, but he _____ (find) them already.", options: ["A. lost / has found", "B. has lost / found", "C. lost / found"], correct: 0, reward: 8 }
];

function initLesson2() {
  renderLesson2Slide(1);
  renderMarketQuiz();
  renderDollarGame();
}

function switchLesson2Mode(mode) {
  window.Lesson2State.activeMode = mode;
  const btnPres = document.getElementById('btn-l2-presentation');
  const btnInter = document.getElementById('btn-l2-interactive');
  const viewPres = document.getElementById('lesson2-presentation-view');
  const viewInter = document.getElementById('lesson2-interactive-view');

  if (btnPres) btnPres.classList.toggle('active', mode === 'presentation');
  if (btnInter) btnInter.classList.toggle('active', mode === 'interactive');
  if (viewPres) viewPres.style.display = (mode === 'presentation') ? 'block' : 'none';
  if (viewInter) viewInter.style.display = (mode === 'interactive') ? 'block' : 'none';
}

function switchLesson2Stage(stageId) {
  window.Lesson2State.activeStage = stageId;
  document.querySelectorAll('.stage-pill-l2').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-stage') === stageId);
  });
  document.querySelectorAll('.stage-sec-l2').forEach(sec => {
    sec.classList.toggle('active', sec.id === `stage-l2-${stageId}`);
  });
}

function renderLesson2Slide(num) {
  if (num < 1) num = 1;
  if (num > LESSON2_SLIDES.length) num = LESSON2_SLIDES.length;
  window.Lesson2State.currentSlide = num;

  const slide = LESSON2_SLIDES[num - 1];
  const catEl = document.getElementById('slide-l2-cat');
  const titleEl = document.getElementById('slide-l2-title');
  const subtitleEl = document.getElementById('slide-l2-subtitle');
  const bodyEl = document.getElementById('slide-l2-body');
  const revealEl = document.getElementById('slide-l2-reveal');
  const counterEl = document.getElementById('slide-l2-counter');
  const btnPrev = document.getElementById('btn-l2-slide-prev');
  const btnNext = document.getElementById('btn-l2-slide-next');

  if (catEl) catEl.textContent = slide.cat;
  if (titleEl) titleEl.textContent = slide.title;
  if (subtitleEl) subtitleEl.textContent = slide.subtitle;
  if (bodyEl) bodyEl.innerHTML = slide.desc.replace(/\n/g, '<br>');

  if (revealEl) {
    if (slide.reveal) {
      revealEl.innerHTML = slide.reveal;
      revealEl.style.display = 'none';
      revealEl.classList.remove('show');
    } else {
      revealEl.style.display = 'none';
    }
  }

  if (counterEl) counterEl.textContent = `${num} / ${LESSON2_SLIDES.length}`;
  if (btnPrev) btnPrev.disabled = (num === 1);
  if (btnNext) btnNext.disabled = (num === LESSON2_SLIDES.length);
}

function nextLesson2Slide() {
  renderLesson2Slide(window.Lesson2State.currentSlide + 1);
}

function prevLesson2Slide() {
  renderLesson2Slide(window.Lesson2State.currentSlide - 1);
}

function toggleLesson2SlideReveal() {
  const revealEl = document.getElementById('slide-l2-reveal');
  const slide = LESSON2_SLIDES[window.Lesson2State.currentSlide - 1];
  if (revealEl && slide.reveal) {
    if (revealEl.style.display === 'block') {
      revealEl.style.display = 'none';
      revealEl.classList.remove('show');
    } else {
      revealEl.style.display = 'block';
      revealEl.classList.add('show');
      if (typeof playSound === 'function') playSound('correct');
    }
  }
}

// Warm-up Floating Market Quiz
function renderMarketQuiz() {
  const qIndex = window.Lesson2State.marketCurrentQ;
  const qText = document.getElementById('market-q-text');
  const optsContainer = document.getElementById('market-opts-grid');
  const resultMsg = document.getElementById('market-result-msg');

  if (qIndex >= MARKET_QUESTIONS.length) {
    if (qText) qText.textContent = "🎉 Excellent! You have reviewed all 6 core words from Lesson 1!";
    if (optsContainer) optsContainer.innerHTML = `
      <button class="dinner-opt-btn correct" onclick="resetMarketQuiz()" style="grid-column: 1 / -1; text-align: center;">
        🔄 Restart Floating Market Quiz
      </button>
    `;
    if (resultMsg) resultMsg.innerHTML = "You are fully prepared for today's Language lesson!";
    if (typeof playSound === 'function') playSound('win');
    return;
  }

  const curQ = MARKET_QUESTIONS[qIndex];
  if (qText) qText.textContent = `Question ${qIndex + 1} of ${MARKET_QUESTIONS.length}: ${curQ.q}`;
  if (resultMsg) resultMsg.textContent = "";

  if (optsContainer) {
    optsContainer.innerHTML = curQ.options.map((opt, i) => `
      <button class="dinner-opt-btn" onclick="checkMarketAnswer(${i}, this)">${opt}</button>
    `).join('');
  }
}

function checkMarketAnswer(chosenIdx, btnEl) {
  const qIndex = window.Lesson2State.marketCurrentQ;
  const curQ = MARKET_QUESTIONS[qIndex];
  const allBtns = document.querySelectorAll('#market-opts-grid .dinner-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosenIdx === curQ.correct) {
    btnEl.classList.add('correct');
    if (typeof playSound === 'function') playSound('correct');
    window.Lesson2State.marketScore++;
    setTimeout(() => {
      window.Lesson2State.marketCurrentQ++;
      renderMarketQuiz();
    }, 1000);
  } else {
    btnEl.classList.add('wrong');
    allBtns[curQ.correct].classList.add('correct');
    if (typeof playSound === 'function') playSound('wrong');
    setTimeout(() => {
      window.Lesson2State.marketCurrentQ++;
      renderMarketQuiz();
    }, 1500);
  }
}

function resetMarketQuiz() {
  window.Lesson2State.marketCurrentQ = 0;
  window.Lesson2State.marketScore = 0;
  renderMarketQuiz();
}

// Vocabulary Task 2 Sentence Completion
function checkVocabTask2() {
  const v1 = document.getElementById('v2-input-1').value.trim().toLowerCase();
  const v2 = document.getElementById('v2-input-2').value.trim().toLowerCase();
  const v3 = document.getElementById('v2-input-3').value.trim().toLowerCase();
  const v4 = document.getElementById('v2-input-4').value.trim().toLowerCase();
  const v5 = document.getElementById('v2-input-5').value.trim().toLowerCase();

  const ok1 = (v1 === 'examined');
  const ok2 = (v2 === 'treatment');
  const ok3 = (v3 === 'strength');
  const ok4 = (v4 === 'muscles');
  const ok5 = (v5 === 'suffering from');

  document.getElementById('v2-input-1').style.borderColor = ok1 ? '#10b981' : '#ef4444';
  document.getElementById('v2-input-2').style.borderColor = ok2 ? '#10b981' : '#ef4444';
  document.getElementById('v2-input-3').style.borderColor = ok3 ? '#10b981' : '#ef4444';
  document.getElementById('v2-input-4').style.borderColor = ok4 ? '#10b981' : '#ef4444';
  document.getElementById('v2-input-5').style.borderColor = ok5 ? '#10b981' : '#ef4444';

  const res = document.getElementById('v2-result-msg');
  if (ok1 && ok2 && ok3 && ok4 && ok5) {
    if (typeof playSound === 'function') playSound('win');
    res.innerHTML = "🎉 Excellent! All 5 vocabulary sentences are completed accurately!";
    res.style.color = "#34d399";
  } else {
    if (typeof playSound === 'function') playSound('wrong');
    res.innerHTML = "Please check the red fields. Hint: (1) examined, (2) treatment, (3) strength, (4) muscles, (5) suffering from.";
    res.style.color = "#fbbf24";
  }
}

// Grammar Task 1 Verb Conjugation
function checkGrammarTask1() {
  const g1 = document.getElementById('g1-input-1').value.trim().toLowerCase();
  const g2 = document.getElementById('g1-input-2').value.trim().toLowerCase();
  const g3 = document.getElementById('g1-input-3').value.trim().toLowerCase();
  const g4 = document.getElementById('g1-input-4').value.trim().toLowerCase();

  const c1 = (g1 === 'saw');
  const c2 = (g2 === 'suffered');
  const c3 = (g3 === 'have improved' || g3 === 'have been improved');
  const c4 = (g4 === 'has just examined');

  document.getElementById('g1-input-1').style.borderColor = c1 ? '#10b981' : '#ef4444';
  document.getElementById('g1-input-2').style.borderColor = c2 ? '#10b981' : '#ef4444';
  document.getElementById('g1-input-3').style.borderColor = c3 ? '#10b981' : '#ef4444';
  document.getElementById('g1-input-4').style.borderColor = c4 ? '#10b981' : '#ef4444';

  const feedback = document.getElementById('g1-result-msg');
  if (c1 && c2 && c3 && c4) {
    if (typeof playSound === 'function') playSound('win');
    feedback.innerHTML = "🎉 Outstanding! You mastered Past Simple and Present Perfect in Task 1!";
    feedback.style.color = "#34d399";
  } else {
    if (typeof playSound === 'function') playSound('wrong');
    feedback.innerHTML = "Please check the red fields. Hint: (1) saw, (2) suffered, (3) have improved, (4) has just examined.";
    feedback.style.color = "#fbbf24";
  }
}

// Dollar Challenge Minigame Logic
function renderDollarGame() {
  const qIndex = window.Lesson2State.dollarCurrentQ;
  const qText = document.getElementById('dollar-q-text');
  const optsContainer = document.getElementById('dollar-opts-grid');
  const bankAmount = document.getElementById('dollar-bank-num');
  const badgeEl = document.getElementById('dollar-prize-badge');
  const resultMsg = document.getElementById('dollar-result-msg');

  if (bankAmount) bankAmount.textContent = `$${window.Lesson2State.dollarTotalBank}`;

  if (qIndex >= DOLLAR_QUESTIONS.length) {
    if (qText) qText.textContent = `🎉 Congratulations! You have completed the Dollar Challenge!`;
    if (badgeEl) badgeEl.textContent = "🏆 Final Cash Prize";
    if (optsContainer) optsContainer.innerHTML = `
      <button class="dinner-opt-btn correct" onclick="resetDollarGame()" style="grid-column: 1 / -1; text-align: center;">
        🔄 Play Dollar Challenge Again
      </button>
    `;
    if (resultMsg) resultMsg.innerHTML = `💰 Total Rewards Earned: <strong>$${window.Lesson2State.dollarTotalBank}</strong>! Outstanding mastery of Past Simple vs Present Perfect!`;
    if (typeof playSound === 'function') playSound('win');
    return;
  }

  const curQ = DOLLAR_QUESTIONS[qIndex];
  if (badgeEl) badgeEl.textContent = `+$${curQ.reward} Reward`;
  if (qText) qText.textContent = `Question ${qIndex + 1} of ${DOLLAR_QUESTIONS.length}: ${curQ.q}`;
  if (resultMsg) resultMsg.textContent = "";

  if (optsContainer) {
    optsContainer.innerHTML = curQ.options.map((opt, i) => `
      <button class="dinner-opt-btn" onclick="checkDollarAnswer(${i}, this)">${opt}</button>
    `).join('');
  }
}

function checkDollarAnswer(chosenIdx, btnEl) {
  const qIndex = window.Lesson2State.dollarCurrentQ;
  const curQ = DOLLAR_QUESTIONS[qIndex];
  const allBtns = document.querySelectorAll('#dollar-opts-grid .dinner-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosenIdx === curQ.correct) {
    btnEl.classList.add('correct');
    if (typeof playSound === 'function') playSound('correct');
    window.Lesson2State.dollarTotalBank += curQ.reward;
    document.getElementById('dollar-bank-num').textContent = `$${window.Lesson2State.dollarTotalBank}`;
    document.getElementById('dollar-result-msg').innerHTML = `✨ Correct! Earned <strong>+$${curQ.reward}</strong>!`;
    setTimeout(() => {
      window.Lesson2State.dollarCurrentQ++;
      renderDollarGame();
    }, 1100);
  } else {
    btnEl.classList.add('wrong');
    allBtns[curQ.correct].classList.add('correct');
    if (typeof playSound === 'function') playSound('wrong');
    document.getElementById('dollar-result-msg').innerHTML = `❌ Incorrect! The correct answer is: <strong>${curQ.options[curQ.correct]}</strong>`;
    setTimeout(() => {
      window.Lesson2State.dollarCurrentQ++;
      renderDollarGame();
    }, 1600);
  }
}

function resetDollarGame() {
  window.Lesson2State.dollarCurrentQ = 0;
  window.Lesson2State.dollarTotalBank = 0;
  renderDollarGame();
}
