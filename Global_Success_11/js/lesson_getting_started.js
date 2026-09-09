/**
 * Global Success 11 - Unit 1 Lesson 1 (Getting Started)
 * Full Interactive Online Lesson & Presentation Engine
 * 100% English Medium of Instruction (Vietnamese only for vocabulary definitions)
 */

// Slide Deck Definition (35 Slides) - 100% English
const LESSON1_SLIDES = [
  { id: 1, title: "GLOBAL SUCCESS 11", subtitle: "UNIT 1: A LONG AND HEALTHY LIFE", desc: "Living Long and Healthy: Key Habits for a Better Life", cat: "Cover", reveal: "Lesson 1: Getting Started" },
  { id: 2, title: "Lesson Outline", subtitle: "Lesson 1: Getting Started", desc: "• Warm-up: Review Game & Discussion\n• Vocabulary: 5 Core Lexical Items\n• Practice: Listen & Read Dialogue (Mark & Nam)\n• Production: Tasks 2, 3, 4\n• Minigames: A Surprised Dinner & Bake Cake\n• Consolidation: Wrap-up & Homework", cat: "Agenda" },
  { id: 3, title: "WARM - UP", subtitle: "Getting Ready for Health & Longevity", desc: "Let's explore what keeps our body and mind healthy!", cat: "Warm-up" },
  { id: 4, title: "Healthy Eating & Hydration", subtitle: "Warm-up Discussion", desc: "Look at all the foods here. Can you talk about how they taste and how they make your body feel when you eat them?\n\nTo help our bodies and minds stay healthy and well, we can eat a balance of lots of different types of foods. It is very important to keep our body hydrated with lots of water as well.", cat: "Warm-up" },
  { id: 5, title: "Active Lifestyle for Mind & Body", subtitle: "Warm-up Discussion", desc: "Look at the activities here. Talk to your partner about how your body and mind feel when you enjoy these different activities.\n\nAs well as getting a balance of different types of food, it is important that we do lots of different activities to help our bodies and minds stay healthy and well.", cat: "Warm-up" },
  { id: 6, title: "7 Ways to Keep Body & Mind Healthy", subtitle: "Key Habits for a Better Life", desc: "1. Spend time focusing on a new skill or hobby.\n2. Spend time with people you care about.\n3. Enjoy lots of physical activity.\n4. Eat a healthy balance of different foods.\n5. Drink lots of water.\n6. Make time to rest and relax.\n7. Talk about or express how you are feeling.", cat: "Warm-up" },
  { id: 7, title: "VOCABULARY", subtitle: "Core Words & Expressions", desc: "Explore the essential vocabulary needed for today's lesson.", cat: "Vocabulary" },
  { id: 8, title: "Core Vocabulary Spotlight", subtitle: "5 Key Words", desc: "1. (to) work out /ˈwɜːk aʊt/ (v): tập luyện thể thao\n2. (be) full of /fʊl əv/ (phr): tràn đầy\n3. diet /ˈdaɪ.ət/ (n): chế độ ăn uống\n4. balanced /ˈbælənst/ (adj): cân bằng, điều độ\n5. fit /fɪt/ (adj): cân đối, khỏe mạnh", cat: "Vocabulary" },
  { id: 9, title: "Vocabulary Checkpoint", subtitle: "Ready for the Review Game?", desc: "Test your understanding with an exciting interactive challenge!", cat: "Vocabulary" },
  { id: 10, title: "REVIEW VOCABULARY", subtitle: "Minigame", desc: "Game: A Surprised Dinner (October 20th) - Prepare a special dinner for Mom by matching definitions!", cat: "Game 1" },
  { id: 11, title: "A SURPRISED DINNER", subtitle: "Vietnam Women's Day (October 20th)", desc: "Dad and son are teaming up to prepare a healthy, delicious dinner for Mom!", cat: "Game 1" },
  { id: 12, title: "The Mission", subtitle: "Father & Son Dialogue", desc: "'Let’s prepare a surprised dinner for your mom on the twentieth of October.'\n'Yes, daddy!'", cat: "Game 1" },
  { id: 13, title: "Happy Vietnam Women's Day ❤", subtitle: "Special Surprise", desc: "Answer correctly to unlock each nutritious dish on the dinner table!", cat: "Game 1" },
  { id: 14, title: "Dinner Question 1", subtitle: "Definition Match", desc: "To do exercises to make your body strong and healthy:\nA. diet | B. work out | C. fit | D. full of", cat: "Game 1", reveal: "👉 Correct Answer: B. work out" },
  { id: 15, title: "Dinner Question 2", subtitle: "Definition Match", desc: "To have a lot of something inside:\nA. diet | B. work out | C. balanced | D. full of", cat: "Game 1", reveal: "👉 Correct Answer: D. full of" },
  { id: 16, title: "Dinner Question 3", subtitle: "Definition Match", desc: "The food that a person usually eats:\nA. full of | B. balanced | C. diet | D. fit", cat: "Game 1", reveal: "👉 Correct Answer: C. diet" },
  { id: 17, title: "Dinner Question 4", subtitle: "Definition Match", desc: "Having the right mix of things (not too much, not too little):\nA. balanced | B. full of | C. work out | D. fit", cat: "Game 1", reveal: "👉 Correct Answer: A. balanced" },
  { id: 18, title: "Dinner Question 5", subtitle: "Definition Match", desc: "Strong and healthy because of regular exercise:\nA. diet | B. fit | C. work out | D. full of", cat: "Game 1", reveal: "👉 Correct Answer: B. fit" },
  { id: 19, title: "READING / CONVERSATION", subtitle: "Task 1: Listen and Read", desc: "Listen and read the dialogue between Mark and Nam.", cat: "Reading" },
  { id: 20, title: "Task 1: Listen and Read", subtitle: "Dialogue: Mark & Nam", desc: "Mark: Hi, Nam!\nNam: Hi, Mark! Long time no see. How are you?\nMark: I'm fine, thanks, but you look so fit and healthy! Have you started working out again?\nNam: Yes, I have. I've also stopped eating fast food and given up bad habits, such as staying up late.\nMark: I can't believe it! I thought you can't live without burgers and chips!\nNam: I know. I ate a lot of fast food, but now I prefer fresh fruits and vegetables.\nMark: So what happened?\nNam: Well, it was my grandfather. I visited him during my last summer holiday and have learnt a lot of important life lessons from him.\nMark: Really?\nNam: Yes. He's a wonderful person. He has just had his 90th birthday, but he’s still full of energy!\nMark: Amazing! How does he stay so active?\nNam: Well, he does exercise every morning, goes to bed early, and eats a lot of vegetables. We spent a lot of time together cooking, working in his garden, and walking in the parks. I've learnt from him that taking regular exercise and eating a balanced diet are the key to a long and healthy life.", cat: "Reading" },
  { id: 21, title: "Task 2: True (T) or False (F)", subtitle: "Comprehension Check", desc: "1. Nam has always had healthy habits. (F)\n2. He has learnt the importance of exercise and healthy food. (T)\n3. Nam’s grandfather goes to sleep early, exercises everyday and eats healthily. (T)", cat: "Practice", reveal: "1: F (Nam used to eat fast food & stay up late) | 2: T | 3: T" },
  { id: 22, title: "Task 3: Make Phrases", subtitle: "Vocabulary in Context", desc: "1. full of ________: having the strength and enthusiasm\n2. bad ________: things we often do that are not good\n3. ________ exercise: physical or mental activity done frequently\n4. ________ diet: the correct types and amounts of food", cat: "Practice", reveal: "1: energy | 2: habits | 3: regular | 4: balanced" },
  { id: 23, title: "Task 4: Verb Tenses (Past Simple vs Present Perfect)", subtitle: "Grammar in Context", desc: "In the past, Nam (1. eat) _______ fast food and often stayed up late. But he (2. start) ______________ eating healthy food and (3. give) ______________ up bad habits. He has changed his lifestyle since he (4. visit) _________ his grandfather, who (5. just celebrate) _______________________ his 90th birthday.", cat: "Practice", reveal: "1: ate | 2: has started | 3: (has) given | 4: visited | 5: has just celebrated" },
  { id: 24, title: "REVIEW READING", subtitle: "Minigame", desc: "Ready to test your reading comprehension with a fun baking challenge?", cat: "Game 2" },
  { id: 25, title: "BAKE CAKE!!!", subtitle: "Minigame 2", desc: "Bake a celebration cake for Nam's 90-year-old grandfather!", cat: "Game 2" },
  { id: 26, title: "Game Rules", subtitle: "How to Play", desc: "🎉 Welcome to today's game: Let's bake together! 🍰\n👉 Join in by answering 6 questions about the dialogue.\n🔙 Each correct answer completes a stage of baking the delicious cake.\n🎂 Answer all 6 to light the birthday candles!", cat: "Game 2" },
  { id: 27, title: "Ready, Set, Bake!", subtitle: "Question 1 Coming Up", desc: "Pay close attention to details from Mark and Nam's conversation.", cat: "Game 2" },
  { id: 28, title: "Cake Question 1", subtitle: "First Layer", desc: "How does Mark feel when he sees Nam?\nA. He thinks Nam looks unhealthy.\nB. He thinks Nam looks tired.\nC. He thinks Nam looks fit and healthy.", cat: "Game 2", reveal: "👉 Correct Answer: C. He thinks Nam looks fit and healthy." },
  { id: 29, title: "Cake Question 2", subtitle: "Second Layer", desc: "What has Nam stopped doing?\nA. Working out.\nB. Eating fast food and bad habits.\nC. Visiting his grandfather.", cat: "Game 2", reveal: "👉 Correct Answer: B. Eating fast food and bad habits." },
  { id: 30, title: "Cake Question 3", subtitle: "Cream Frosting", desc: "What did Mark think about Nam’s eating habits before?\nA. He thought Nam couldn’t live without burgers and chips.\nB. He thought Nam ate only fresh fruits.\nC. He thought Nam was a vegetarian.", cat: "Game 2", reveal: "👉 Correct Answer: A. He thought Nam couldn’t live without burgers and chips." },
  { id: 31, title: "Cake Question 4", subtitle: "Strawberry Topping", desc: "Who inspired Nam to live healthily?\nA. His mother.\nB. His friend.\nC. His grandfather.", cat: "Game 2", reveal: "👉 Correct Answer: C. His grandfather." },
  { id: 32, title: "Cake Question 5", subtitle: "Candles Number 90", desc: "How old is Nam’s grandfather?\nA. 70 years old.\nB. 90 years old.\nC. 50 years old.", cat: "Game 2", reveal: "👉 Correct Answer: B. 90 years old." },
  { id: 33, title: "Cake Question 6", subtitle: "Light the Candles & Celebrate!", desc: "What habits help Nam’s grandfather stay healthy?\nA. Taking regular exercise and eating a balanced diet.\nB. Watching TV every day.\nC. Eating fast food and staying up late.", cat: "Game 2", reveal: "👉 Correct Answer: A. Taking regular exercise and eating a balanced diet." },
  { id: 34, title: "CONSOLIDATION & HOMEWORK", subtitle: "Lesson Wrap-up", desc: "What have we learnt in this lesson?\n• Lexical items about healthy lifestyle: work out, fit, balanced, diet, full of energy\n• Reading for specific information\n• Past simple & Present perfect tense\n\nHomework:\n- Do exercises in the workbook.\n- Write a short paragraph about how to keep fit and stay healthy.\n- Prepare materials for the project in Lesson 8.", cat: "Wrap-up" },
  { id: 35, title: "THANK YOU!", subtitle: "Great Job Today!", desc: "Keep practicing healthy habits for a long and vibrant life! 🌿💪", cat: "Closing" }
];

// Dialogue Lines Data (Mark & Nam) - Immersion 100% English
const DIALOGUE_LINES = [
  { speaker: "Mark", en: "Hi, Nam!", time: 0 },
  { speaker: "Nam", en: "Hi, Mark! Long time no see. How are you?", time: 3 },
  { speaker: "Mark", en: "I'm fine, thanks, but you look so fit and healthy! Have you started working out again?", time: 8 },
  { speaker: "Nam", en: "Yes, I have. I've also stopped eating fast food and given up bad habits, such as staying up late.", time: 16 },
  { speaker: "Mark", en: "I can't believe it! I thought you can't live without burgers and chips!", time: 25 },
  { speaker: "Nam", en: "I know. I ate a lot of fast food, but now I prefer fresh fruits and vegetables.", time: 31 },
  { speaker: "Mark", en: "So what happened?", time: 38 },
  { speaker: "Nam", en: "Well, it was my grandfather. I visited him during my last summer holiday and have learnt a lot of important life lessons from him.", time: 42 },
  { speaker: "Mark", en: "Really?", time: 51 },
  { speaker: "Nam", en: "Yes. He's a wonderful person. He has just had his 90th birthday, but he’s still full of energy!", time: 54 },
  { speaker: "Mark", en: "Amazing! How does he stay so active?", time: 63 },
  { speaker: "Nam", en: "Well, he does exercise every morning, goes to bed early, and eats a lot of vegetables. We spent a lot of time together cooking, working in his garden, and walking in the parks. I've learnt from him that taking regular exercise and eating a balanced diet are the key to a long and healthy life.", time: 68 }
];

// Sound Synthesizer Fallback
function playSound(type) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
      osc.frequency.setValueAtTime(180, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.1 + 0.25);
        o.start(audioCtx.currentTime + idx * 0.1);
        o.stop(audioCtx.currentTime + idx * 0.1 + 0.25);
      });
    }
  } catch (e) {
    console.log("Audio not supported", e);
  }
}

// Text-to-speech for english voice
function speakEnglish(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

// Global Controller State
window.Lesson1State = {
  currentSlide: 1,
  activeMode: 'interactive', // 'interactive' or 'presentation'
  activeStage: 'warmup',
  dinnerScore: 0,
  dinnerCurrentQ: 0,
  dinnerUnlocked: [false, false, false, false, false],
  cakeScore: 0,
  cakeCurrentQ: 0,
  cakeUnlocked: [false, false, false, false, false, false],
  rolePlayFilter: 'all'
};

// Initialize Lesson 1
function initLesson1() {
  renderSlide(1);
  renderDinnerGame();
  renderDialogue();
  renderCakeGame();
}

// Switch between Presentation & Interactive modes
function switchLesson1Mode(mode) {
  window.Lesson1State.activeMode = mode;
  const btnPres = document.getElementById('btn-mode-presentation');
  const btnInter = document.getElementById('btn-mode-interactive');
  const panelPres = document.getElementById('lesson1-presentation-view');
  const panelInter = document.getElementById('lesson1-interactive-view');

  if (btnPres) btnPres.classList.toggle('active', mode === 'presentation');
  if (btnInter) btnInter.classList.toggle('active', mode === 'interactive');
  if (panelPres) panelPres.style.display = (mode === 'presentation') ? 'block' : 'none';
  if (panelInter) panelInter.style.display = (mode === 'interactive') ? 'block' : 'none';
}

// Switch Stage in Interactive Mode
function switchLesson1Stage(stageId) {
  window.Lesson1State.activeStage = stageId;
  document.querySelectorAll('.stage-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-stage') === stageId);
  });
  document.querySelectorAll('.interactive-stage-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `stage-${stageId}`);
  });
}

// Render Slide in Presentation Mode
function renderSlide(slideNum) {
  if (slideNum < 1) slideNum = 1;
  if (slideNum > LESSON1_SLIDES.length) slideNum = LESSON1_SLIDES.length;
  window.Lesson1State.currentSlide = slideNum;

  const slide = LESSON1_SLIDES[slideNum - 1];
  const catEl = document.getElementById('slide-cat-text');
  const titleEl = document.getElementById('slide-title-text');
  const subtitleEl = document.getElementById('slide-subtitle-text');
  const bodyEl = document.getElementById('slide-body-content');
  const revealEl = document.getElementById('slide-reveal-answer');
  const counterEl = document.getElementById('slide-counter-num');
  const btnPrev = document.getElementById('btn-slide-prev');
  const btnNext = document.getElementById('btn-slide-next');

  if (catEl) catEl.textContent = slide.cat;
  if (titleEl) titleEl.textContent = slide.title;
  if (subtitleEl) subtitleEl.textContent = slide.subtitle;
  if (bodyEl) bodyEl.innerHTML = slide.desc.replace(/\n/g, '<br>');

  if (revealEl) {
    if (slide.reveal) {
      revealEl.innerHTML = slide.reveal;
      revealEl.classList.remove('show');
      revealEl.style.display = 'none';
    } else {
      revealEl.style.display = 'none';
      revealEl.classList.remove('show');
    }
  }

  if (counterEl) counterEl.textContent = `${slideNum} / ${LESSON1_SLIDES.length}`;
  if (btnPrev) btnPrev.disabled = (slideNum === 1);
  if (btnNext) btnNext.disabled = (slideNum === LESSON1_SLIDES.length);
}

function nextSlide() {
  renderSlide(window.Lesson1State.currentSlide + 1);
}

function prevSlide() {
  renderSlide(window.Lesson1State.currentSlide - 1);
}

function toggleSlideReveal() {
  const revealEl = document.getElementById('slide-reveal-answer');
  const slide = LESSON1_SLIDES[window.Lesson1State.currentSlide - 1];
  if (revealEl && slide.reveal) {
    if (revealEl.style.display === 'block') {
      revealEl.style.display = 'none';
      revealEl.classList.remove('show');
    } else {
      revealEl.style.display = 'block';
      revealEl.classList.add('show');
      playSound('correct');
    }
  }
}

// ===================================================================
// MINIGAME 1: "A SURPRISED DINNER" (OCTOBER 20TH) LOGIC - 100% ENGLISH
// ===================================================================
const DINNER_QUESTIONS = [
  {
    q: "To do exercises to make your body strong and healthy",
    options: ["A. diet", "B. work out", "C. fit", "D. full of"],
    correct: 1,
    dish: "🥗 Fresh Garden Salad",
    dishIcon: "🥗"
  },
  {
    q: "To have a lot of something inside / having strength & enthusiasm",
    options: ["A. diet", "B. work out", "C. balanced", "D. full of"],
    correct: 3,
    dish: "🍲 Chicken Mushroom Soup",
    dishIcon: "🍲"
  },
  {
    q: "The food that a person usually eats",
    options: ["A. full of", "B. balanced", "C. diet", "D. fit"],
    correct: 2,
    dish: "🐟 Grilled Salmon with Herbs",
    dishIcon: "🐟"
  },
  {
    q: "Having the right mix of things (not too much, not too little)",
    options: ["A. balanced", "B. full of", "C. work out", "D. fit"],
    correct: 0,
    dish: "🍱 Steamed Brown Rice Bowl",
    dishIcon: "🍱"
  },
  {
    q: "Strong and healthy because of regular exercise",
    options: ["A. diet", "B. fit", "C. work out", "D. full of"],
    correct: 1,
    dish: "🎂 Rose Celebration Cake",
    dishIcon: "🎂"
  }
];

function renderDinnerGame() {
  const qIndex = window.Lesson1State.dinnerCurrentQ;
  const qText = document.getElementById('dinner-q-text');
  const optsContainer = document.getElementById('dinner-opts-grid');
  const spreadContainer = document.getElementById('dinner-table-dishes');
  const resultMsg = document.getElementById('dinner-result-msg');

  if (spreadContainer) {
    spreadContainer.innerHTML = DINNER_QUESTIONS.map((item, idx) => `
      <div class="dish-slot ${window.Lesson1State.dinnerUnlocked[idx] ? 'unlocked' : ''}" title="${item.dish}">
        ${window.Lesson1State.dinnerUnlocked[idx] ? item.dishIcon : '🍽️'}
      </div>
    `).join('');
  }

  if (qIndex >= DINNER_QUESTIONS.length) {
    if (qText) qText.textContent = "🎉 Congratulations! You have prepared a wonderful dinner for Mom!";
    if (optsContainer) optsContainer.innerHTML = `
      <button class="dinner-opt-btn correct" onclick="resetDinnerGame()" style="grid-column: 1 / -1; text-align: center;">
        🔄 Play Again: A Surprised Dinner
      </button>
    `;
    if (resultMsg) resultMsg.innerHTML = "❤️ Mom will be truly touched and delighted by this healthy and thoughtful gift!";
    playSound('win');
    return;
  }

  const curQ = DINNER_QUESTIONS[qIndex];
  if (qText) qText.textContent = `Question ${qIndex + 1} of ${DINNER_QUESTIONS.length}: ${curQ.q}`;
  if (resultMsg) resultMsg.textContent = "";

  if (optsContainer) {
    optsContainer.innerHTML = curQ.options.map((opt, i) => `
      <button class="dinner-opt-btn" onclick="checkDinnerAnswer(${i}, this)">
        ${opt}
      </button>
    `).join('');
  }
}

function checkDinnerAnswer(chosenIdx, btnEl) {
  const qIndex = window.Lesson1State.dinnerCurrentQ;
  const curQ = DINNER_QUESTIONS[qIndex];
  const allBtns = document.querySelectorAll('.dinner-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosenIdx === curQ.correct) {
    btnEl.classList.add('correct');
    playSound('correct');
    window.Lesson1State.dinnerUnlocked[qIndex] = true;
    window.Lesson1State.dinnerScore++;
    document.getElementById('dinner-result-msg').innerHTML = `✨ Correct! Unlocked: <strong>${curQ.dish}</strong> ${curQ.dishIcon}`;
    setTimeout(() => {
      window.Lesson1State.dinnerCurrentQ++;
      renderDinnerGame();
    }, 1200);
  } else {
    btnEl.classList.add('wrong');
    allBtns[curQ.correct].classList.add('correct');
    playSound('wrong');
    document.getElementById('dinner-result-msg').innerHTML = `❌ Incorrect! The correct answer is: <strong>${curQ.options[curQ.correct]}</strong>`;
    setTimeout(() => {
      window.Lesson1State.dinnerCurrentQ++;
      renderDinnerGame();
    }, 1800);
  }
}

function resetDinnerGame() {
  window.Lesson1State.dinnerCurrentQ = 0;
  window.Lesson1State.dinnerScore = 0;
  window.Lesson1State.dinnerUnlocked = [false, false, false, false, false];
  renderDinnerGame();
}

// ===================================================================
// STAGE 4: DIALOGUE (MARK & NAM) - 100% ENGLISH
// ===================================================================
function renderDialogue() {
  const container = document.getElementById('chat-dialogue-list');
  if (!container) return;

  const filter = window.Lesson1State.rolePlayFilter;
  container.innerHTML = DIALOGUE_LINES.map((line) => {
    const isMark = (line.speaker === "Mark");
    const isDimmed = (filter !== 'all' && filter !== line.speaker.toLowerCase());
    return `
      <div class="chat-bubble ${isMark ? 'mark' : 'nam'}" style="${isDimmed ? 'opacity: 0.35;' : ''}">
        <div class="chat-avatar">${isMark ? '👦 M' : '🧑 N'}</div>
        <div class="chat-content">
          <div class="chat-speaker-name">
            ${line.speaker}
            <button class="btn-speak-line" onclick="speakEnglish('${line.en.replace(/'/g, "\\'")}')" title="Listen to this line">🔊</button>
          </div>
          <div class="chat-english">${line.en}</div>
        </div>
      </div>
    `;
  }).join('');
}

function filterRolePlay(role) {
  window.Lesson1State.rolePlayFilter = role;
  document.querySelectorAll('.btn-role-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });
  renderDialogue();
}

// ===================================================================
// STAGE 5: PRACTICE TASKS (2, 3, 4) - 100% ENGLISH
// ===================================================================
function checkTask2(btn, isCorrect, explanationId) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.btn-tf').forEach(b => b.classList.remove('active', 'wrong'));
  
  if (isCorrect) {
    btn.classList.add('active');
    playSound('correct');
  } else {
    btn.classList.add('wrong');
    playSound('wrong');
  }
  const exp = document.getElementById(explanationId);
  if (exp) exp.style.display = 'block';
}

function checkTask3() {
  const p1 = document.getElementById('t3-input-1').value.trim().toLowerCase();
  const p2 = document.getElementById('t3-input-2').value.trim().toLowerCase();
  const p3 = document.getElementById('t3-input-3').value.trim().toLowerCase();
  const p4 = document.getElementById('t3-input-4').value.trim().toLowerCase();

  const c1 = (p1 === 'energy');
  const c2 = (p2 === 'habits');
  const c3 = (p3 === 'regular');
  const c4 = (p4 === 'balanced');

  document.getElementById('t3-input-1').style.borderColor = c1 ? '#10b981' : '#ef4444';
  document.getElementById('t3-input-2').style.borderColor = c2 ? '#10b981' : '#ef4444';
  document.getElementById('t3-input-3').style.borderColor = c3 ? '#10b981' : '#ef4444';
  document.getElementById('t3-input-4').style.borderColor = c4 ? '#10b981' : '#ef4444';

  const result = document.getElementById('t3-result');
  if (c1 && c2 && c3 && c4) {
    playSound('win');
    result.innerHTML = "🎉 Excellent! You have completed all 4 phrases correctly!";
    result.style.color = "#34d399";
  } else {
    playSound('wrong');
    result.innerHTML = "Not quite right yet. Please check the highlighted red fields!";
    result.style.color = "#fbbf24";
  }
}

function checkTask4() {
  const v1 = document.getElementById('t4-input-1').value.trim().toLowerCase();
  const v2 = document.getElementById('t4-input-2').value.trim().toLowerCase();
  const v3 = document.getElementById('t4-input-3').value.trim().toLowerCase();
  const v4 = document.getElementById('t4-input-4').value.trim().toLowerCase();
  const v5 = document.getElementById('t4-input-5').value.trim().toLowerCase();

  const ok1 = (v1 === 'ate');
  const ok2 = (v2 === 'has started');
  const ok3 = (v3 === 'given' || v3 === 'has given');
  const ok4 = (v4 === 'visited');
  const ok5 = (v5 === 'has just celebrated');

  document.getElementById('t4-input-1').style.borderColor = ok1 ? '#10b981' : '#ef4444';
  document.getElementById('t4-input-2').style.borderColor = ok2 ? '#10b981' : '#ef4444';
  document.getElementById('t4-input-3').style.borderColor = ok3 ? '#10b981' : '#ef4444';
  document.getElementById('t4-input-4').style.borderColor = ok4 ? '#10b981' : '#ef4444';
  document.getElementById('t4-input-5').style.borderColor = ok5 ? '#10b981' : '#ef4444';

  const feedback = document.getElementById('t4-feedback');
  if (ok1 && ok2 && ok3 && ok4 && ok5) {
    playSound('win');
    feedback.innerHTML = "🎉 Outstanding! You have mastered Past Simple and Present Perfect tenses!";
    feedback.style.color = "#34d399";
  } else {
    playSound('wrong');
    feedback.innerHTML = "💡 Hint: (1) In the past -> ate; (2) Result until now -> has started; (3) -> (has) given; (4) since + Past Simple -> visited; (5) just -> has just celebrated.";
    feedback.style.color = "#fbbf24";
  }
}

// ===================================================================
// MINIGAME 2: "BAKE CAKE" LOGIC (6 QUESTIONS) - 100% ENGLISH
// ===================================================================
const CAKE_QUESTIONS = [
  {
    q: "How does Mark feel when he sees Nam?",
    options: [
      "A. He thinks Nam looks unhealthy.",
      "B. He thinks Nam looks tired.",
      "C. He thinks Nam looks fit and healthy."
    ],
    correct: 2,
    stepName: "🎂 Step 1: Bake delicious sponge cake base"
  },
  {
    q: "What has Nam stopped doing?",
    options: [
      "A. Working out.",
      "B. Eating fast food and bad habits.",
      "C. Visiting his grandfather."
    ],
    correct: 1,
    stepName: "🥛 Step 2: Spread smooth vanilla cream frosting"
  },
  {
    q: "What did Mark think about Nam’s eating habits before?",
    options: [
      "A. He thought Nam couldn’t live without burgers and chips.",
      "B. He thought Nam ate only fresh fruits.",
      "C. He thought Nam was a vegetarian."
    ],
    correct: 0,
    stepName: "🍓 Step 3: Top with fresh berries and strawberries"
  },
  {
    q: "Who inspired Nam to live healthily?",
    options: [
      "A. His mother.",
      "B. His friend.",
      "C. His grandfather."
    ],
    correct: 2,
    stepName: "🍫 Step 4: Write chocolate birthday greetings"
  },
  {
    q: "How old is Nam’s grandfather?",
    options: [
      "A. 70 years old.",
      "B. 90 years old.",
      "C. 50 years old."
    ],
    correct: 1,
    stepName: "🕯️ Step 5: Place number 90 golden candles"
  },
  {
    q: "What habits help Nam’s grandfather stay healthy?",
    options: [
      "A. Taking regular exercise and eating a balanced diet.",
      "B. Watching TV every day.",
      "C. Eating fast food and staying up late."
    ],
    correct: 0,
    stepName: "✨ Step 6: Light the candles and celebrate!"
  }
];

const CAKE_ICONS = ["🥣", "🥞", "🍰", "🍓🍰", "🎂", "🎉🎂✨"];

function renderCakeGame() {
  const qIndex = window.Lesson1State.cakeCurrentQ;
  const qText = document.getElementById('cake-q-text');
  const optsContainer = document.getElementById('cake-opts-grid');
  const iconEl = document.getElementById('cake-display-icon');
  const stepTitle = document.getElementById('cake-step-title');
  const dotsContainer = document.getElementById('cake-dots-container');

  if (dotsContainer) {
    dotsContainer.innerHTML = CAKE_QUESTIONS.map((_, i) => `
      <div class="cake-dot ${i < window.Lesson1State.cakeScore ? 'done' : ''}"></div>
    `).join('');
  }

  if (iconEl) {
    const iconIdx = Math.min(window.Lesson1State.cakeScore, CAKE_ICONS.length - 1);
    iconEl.textContent = CAKE_ICONS[iconIdx];
  }

  if (qIndex >= CAKE_QUESTIONS.length) {
    if (stepTitle) stepTitle.textContent = "🎉 Congratulations! You have finished baking the 90th birthday cake!";
    if (qText) qText.textContent = "You answered all reading comprehension questions accurately!";
    if (optsContainer) optsContainer.innerHTML = `
      <button class="dinner-opt-btn correct" onclick="resetCakeGame()" style="grid-column: 1 / -1; text-align: center;">
        🔄 Bake Another Birthday Cake
      </button>
    `;
    playSound('win');
    return;
  }

  const curQ = CAKE_QUESTIONS[qIndex];
  if (stepTitle) stepTitle.textContent = curQ.stepName;
  if (qText) qText.textContent = `Question ${qIndex + 1} of ${CAKE_QUESTIONS.length}: ${curQ.q}`;

  if (optsContainer) {
    optsContainer.innerHTML = curQ.options.map((opt, i) => `
      <button class="dinner-opt-btn" onclick="checkCakeAnswer(${i}, this)">
        ${opt}
      </button>
    `).join('');
  }
}

function checkCakeAnswer(chosenIdx, btnEl) {
  const qIndex = window.Lesson1State.cakeCurrentQ;
  const curQ = CAKE_QUESTIONS[qIndex];
  const allBtns = document.querySelectorAll('#cake-opts-grid .dinner-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosenIdx === curQ.correct) {
    btnEl.classList.add('correct');
    playSound('correct');
    window.Lesson1State.cakeScore++;
    setTimeout(() => {
      window.Lesson1State.cakeCurrentQ++;
      renderCakeGame();
    }, 1200);
  } else {
    btnEl.classList.add('wrong');
    allBtns[curQ.correct].classList.add('correct');
    playSound('wrong');
    setTimeout(() => {
      window.Lesson1State.cakeCurrentQ++;
      renderCakeGame();
    }, 1800);
  }
}

function resetCakeGame() {
  window.Lesson1State.cakeCurrentQ = 0;
  window.Lesson1State.cakeScore = 0;
  renderCakeGame();
}

// Keyboard shortcuts for presentation mode
document.addEventListener('keydown', (e) => {
  if (window.Lesson1State && window.Lesson1State.activeMode === 'presentation') {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevSlide();
    } else if (e.key === ' ') {
      e.preventDefault();
      toggleSlideReveal();
    }
  }
});
