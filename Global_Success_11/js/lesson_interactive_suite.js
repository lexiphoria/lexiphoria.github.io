/**
 * Global Success 11 - Interactive Learning Engine for Lessons 3 to 8
 * Includes games, simulators, audio players, planners, and project studios
 */

// ==========================================
// LESSON 3: FRESH JUICE & READING STUDIO
// ==========================================
const L3_JUICE_QUESTIONS = [
  { q: "He _______ (see) the doctor yesterday because he had a headache.", opts: ["A. is seeing", "B. has seen", "C. saw"], ans: 2, exp: "Yesterday indicates Past Simple ('saw')." },
  { q: "Our fitness level _______ (improve) a lot in the last few months.", opts: ["A. has improved", "B. improves", "C. improved"], ans: 0, exp: "'In the last few months' indicates Present Perfect." },
  { q: "To stay healthy, it is important to eat a ________ diet.", opts: ["A. fit", "B. balanced", "C. work out"], ans: 1, exp: "'A balanced diet' means eating nutritious variety in proper proportions." },
  { q: "She _______ (not eat) junk food since she started her healthy lifestyle.", opts: ["A. didn't eat", "B. isn't eating", "C. hasn't eaten"], ans: 2, exp: "'Since' clause requires Present Perfect in the main clause." },
  { q: "Bananas are _______ vitamins, which is good for your heart.", opts: ["A. full of", "B. diet", "C. fit"], ans: 0, exp: "'Full of vitamins' = giàu vitamin." },
  { q: "I _______ (do) yoga for 3 years and I feel much healthier now.", opts: ["A. do", "B. have done", "C. did"], ans: 1, exp: "'For 3 years' shows an action continuing into present." },
  { q: "She works out every morning because she wants to be _______ and strong.", opts: ["A. work out", "B. balanced", "C. fit"], ans: 2, exp: "'Fit' describes good physical condition." },
  { q: "I _______ (feel) tired yesterday after the long hike.", opts: ["A. felt", "B. feel", "C. have felt"], ans: 0, exp: "Specific past time 'yesterday' takes Past Simple." },
  { q: "It is helpful to _______ regularly to improve your overall health.", opts: ["A. diet", "B. work out", "C. fit"], ans: 1, exp: "'Work out' means to exercise." },
  { q: "She _______ (have) a cold last week, but now she feels better.", opts: ["A. has", "B. is having", "C. had"], ans: 2, exp: "'Last week' requires Past Simple." }
];

let l3JuiceCurrent = 0;
let l3JuiceScore = 0;

function renderL3JuiceQ() {
  const container = document.getElementById('l3-juice-q-container');
  if (!container) return;

  if (l3JuiceCurrent >= L3_JUICE_QUESTIONS.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🍹✨</div>
        <h3 style="color: #34d399; font-size: 1.5rem; margin-bottom: 8px;">Fresh Juice Blended!</h3>
        <p style="color: #cbd5e1; font-size: 1.05rem;">Score: <strong>${l3JuiceScore} / ${L3_JUICE_QUESTIONS.length}</strong> correct answers.</p>
        <button class="suite-btn-action" onclick="resetL3Juice()" style="margin-top: 16px;">🔄 Play Again</button>
      </div>
    `;
    return;
  }

  const qData = L3_JUICE_QUESTIONS[l3JuiceCurrent];
  container.innerHTML = `
    <div class="game-hud-bar">
      <span class="game-score-badge">🍹 Fresh Juice Score: ${l3JuiceScore}</span>
      <span class="game-q-counter">Question ${l3JuiceCurrent + 1} / ${L3_JUICE_QUESTIONS.length}</span>
    </div>
    <div class="game-question-text">${qData.q}</div>
    <div class="game-options-list">
      ${qData.opts.map((opt, i) => `
        <button class="game-opt-btn" onclick="checkL3Juice(${i})">
          <span>${opt}</span>
          <span>➔</span>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback-msg" id="l3-juice-feedback"></div>
  `;
}

function checkL3Juice(idx) {
  const qData = L3_JUICE_QUESTIONS[l3JuiceCurrent];
  const fb = document.getElementById('l3-juice-feedback');
  const btns = document.querySelectorAll('#l3-juice-q-container .game-opt-btn');

  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === qData.ans) btn.classList.add('correct');
    else if (i === idx) btn.classList.add('wrong');
  });

  if (idx === qData.ans) {
    l3JuiceScore++;
    if (fb) fb.innerHTML = `<span style="color: #34d399;">✅ Correct! ${qData.exp}</span>`;
  } else {
    if (fb) fb.innerHTML = `<span style="color: #f87171;">❌ ${qData.exp}</span>`;
  }

  setTimeout(() => {
    l3JuiceCurrent++;
    renderL3JuiceQ();
  }, 1600);
}

function resetL3Juice() {
  l3JuiceCurrent = 0;
  l3JuiceScore = 0;
  renderL3JuiceQ();
}

// ==========================================
// LESSON 4: HARVEST CARROTS & EXERCISE SIMULATOR
// ==========================================
const L4_CARROT_QUESTIONS = [
  { q: "What should you look at when choosing healthy food in the supermarket?", opts: ["A. the cooking time", "B. the food labels", "C. the package color"], ans: 1, exp: "Food labels detail calories, sugar, salt, and nutritional facts." },
  { q: "Avoid having food with too much salt or _______ to prevent arterial strain.", opts: ["A. fresh fruit", "B. sugar", "C. green vegetables"], ans: 1, exp: "Too much sodium and refined sugar increase cardiovascular risk." },
  { q: "You should eat a big breakfast and a small dinner.", opts: ["A. True", "B. False"], ans: 0, exp: "True: A nutritious breakfast powers the day; light dinners support sound sleep." },
  { q: "How should a person begin exercising if they haven't been active for months?", opts: ["A. start slowly and regularly", "B. exercise hard everyday", "C. lift maximal weights"], ans: 0, exp: "Gradual progression prevents muscle tearing and joint injury." },
  { q: "When your body is ready and stronger, you can exercise _______.", opts: ["A. slower", "B. longer and with more intensity", "C. shorter"], ans: 1, exp: "Progressive overload enhances muscular and cardiovascular capacity." },
  { q: "Vigorous cardio exercise right before bed helps you fall asleep faster.", opts: ["A. True", "B. False"], ans: 1, exp: "False: High-intensity workouts raise body heat and adrenaline, delaying sleep." },
  { q: "What helps you sleep better at night?", opts: ["A. turning off electronic screens early", "B. scrolling social feeds in bed", "C. drinking coffee at 9 PM"], ans: 0, exp: "Blue light suppresses melatonin synthesis." }
];

let l4CarrotCurrent = 0;
let l4CarrotCount = 0;

function renderL4CarrotsQ() {
  const container = document.getElementById('l4-carrots-q-container');
  if (!container) return;

  if (l4CarrotCurrent >= L4_CARROT_QUESTIONS.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🥕🧺🎉</div>
        <h3 style="color: #fbbf24; font-size: 1.5rem; margin-bottom: 8px;">Basket Full of Carrots!</h3>
        <p style="color: #cbd5e1; font-size: 1.05rem;">You harvested <strong>${l4CarrotCount} / ${L4_CARROT_QUESTIONS.length}</strong> fresh carrots!</p>
        <button class="suite-btn-action" onclick="resetL4Carrots()" style="margin-top: 16px;">🔄 Harvest Again</button>
      </div>
    `;
    return;
  }

  const qData = L4_CARROT_QUESTIONS[l4CarrotCurrent];
  container.innerHTML = `
    <div class="game-hud-bar">
      <span class="game-score-badge" style="border-color: #f59e0b; color: #fbbf24; background: rgba(245,158,11,0.15);">🥕 Harvested: ${l4CarrotCount}</span>
      <span class="game-q-counter">Question ${l4CarrotCurrent + 1} / ${L4_CARROT_QUESTIONS.length}</span>
    </div>
    <div class="game-question-text">${qData.q}</div>
    <div class="game-options-list">
      ${qData.opts.map((opt, i) => `
        <button class="game-opt-btn" onclick="checkL4Carrot(${i})">
          <span>${opt}</span>
          <span>🥕</span>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback-msg" id="l4-carrot-feedback"></div>
  `;
}

function checkL4Carrot(idx) {
  const qData = L4_CARROT_QUESTIONS[l4CarrotCurrent];
  const fb = document.getElementById('l4-carrot-feedback');
  const btns = document.querySelectorAll('#l4-carrots-q-container .game-opt-btn');

  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === qData.ans) btn.classList.add('correct');
    else if (i === idx) btn.classList.add('wrong');
  });

  if (idx === qData.ans) {
    l4CarrotCount++;
    if (fb) fb.innerHTML = `<span style="color: #34d399;">✅ Carrot harvested! ${qData.exp}</span>`;
  } else {
    if (fb) fb.innerHTML = `<span style="color: #f87171;">❌ Missed! ${qData.exp}</span>`;
  }

  setTimeout(() => {
    l4CarrotCurrent++;
    renderL4CarrotsQ();
  }, 1600);
}

function resetL4Carrots() {
  l4CarrotCurrent = 0;
  l4CarrotCount = 0;
  renderL4CarrotsQ();
}

// Exercise Simulator
const EXERCISE_ROUTINES = {
  squats: {
    name: "Squats Routine",
    target: "Lower Body (Quadriceps, Hamstrings, Glutes)",
    img: "assets/lesson4/image31.GIF",
    steps: [
      { marker: "First", instruction: "Stand with your feet shoulder-width apart and arms extended forward.", cue: "Keep chest tall and core engaged." },
      { marker: "Next", instruction: "Slowly bend your knees and push hips back as if sitting down on a chair.", cue: "Do not let knees collapse inward." },
      { marker: "Then", instruction: "Lower until your thighs are parallel to the floor; hold for one breath.", cue: "Keep weight firmly on heels." },
      { marker: "Finally", instruction: "Push firmly through your heels to return to the standing starting position.", cue: "Exhale smoothly as you rise up." }
    ]
  },
  starjumps: {
    name: "Star Jumps (Jumping Jacks)",
    target: "Cardiovascular Stamina, Agility & Shoulder Mobility",
    img: "assets/lesson4/image32.GIF",
    steps: [
      { marker: "First", instruction: "Stand straight with your feet together and arms resting comfortably at your sides.", cue: "Look straight ahead." },
      { marker: "Next", instruction: "Bend your knees slightly and push off the balls of your feet to jump upward.", cue: "Jump with light, springy energy." },
      { marker: "At the same time", instruction: "Spread your legs wide while swinging both arms outward and above your head.", cue: "Form a wide star shape in mid-air." },
      { marker: "Finally", instruction: "Jump back to the starting stance and land softly with knees slightly bent.", cue: "Soft landings protect your knees." }
    ]
  },
  pushups: {
    name: "Push-ups Routine",
    target: "Upper Body (Chest, Shoulders, Triceps & Core)",
    img: "assets/lesson4/image33.GIF",
    steps: [
      { marker: "First", instruction: "Place your hands on the floor slightly wider than shoulder-width, body in a rigid plank.", cue: "Engage glutes and abdomen." },
      { marker: "Next", instruction: "Slowly bend your elbows at a 45-degree angle to lower your chest toward the floor.", cue: "Keep neck in neutral alignment." },
      { marker: "Then", instruction: "Pause when your chest is just an inch above the floor.", cue: "Do not allow hips to sag downward." },
      { marker: "Finally", instruction: "Push forcefully through your palms to return to the plank position.", cue: "Exhale forcefully as you press upward." }
    ]
  }
};

let currentSimKey = 'squats';
let currentSimStep = 0;

function switchSimRoutine(key) {
  currentSimKey = key;
  currentSimStep = 0;
  document.querySelectorAll('.routine-selector-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-routine') === key);
  });
  renderSimUI();
}

function renderSimUI() {
  const container = document.getElementById('exercise-sim-content');
  if (!container) return;

  const data = EXERCISE_ROUTINES[currentSimKey];
  const step = data.steps[currentSimStep];

  container.innerHTML = `
    <div class="exercise-sim-box">
      <span class="exercise-step-tag">${step.marker} • Step ${currentSimStep + 1} of ${data.steps.length}</span>
      <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">${data.name}</h3>
      <div style="font-size: 0.85rem; color: #38bdf8; margin-bottom: 16px;">Target: ${data.target}</div>

      <div class="exercise-visual-frame">
        <img src="${data.img}" alt="${data.name}">
      </div>

      <p style="font-size: 1.15rem; color: #f8fafc; font-weight: 700; margin-bottom: 10px; max-width: 600px;">
        "${step.marker}, ${step.instruction}"
      </p>

      <div style="background: rgba(59, 130, 246, 0.12); border: 1px solid #3b82f6; border-radius: 10px; padding: 10px 18px; margin-bottom: 20px; font-size: 0.9rem; color: #93c5fd;">
        💡 Form Tip: ${step.cue}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <button class="suite-btn-action" onclick="prevSimStep()" ${currentSimStep === 0 ? 'disabled' : ''} style="background: #475569;">
          ← Previous Step
        </button>
        <button class="suite-btn-action" onclick="speakEnglish('${step.marker}, ${step.instruction}')" style="background: #3b82f6;">
          🔊 Listen Cue
        </button>
        <button class="suite-btn-action" onclick="nextSimStep()" ${currentSimStep === data.steps.length - 1 ? 'disabled' : ''}>
          Next Step →
        </button>
      </div>
    </div>
  `;
}

function nextSimStep() {
  const data = EXERCISE_ROUTINES[currentSimKey];
  if (currentSimStep < data.steps.length - 1) {
    currentSimStep++;
    renderSimUI();
  }
}

function prevSimStep() {
  if (currentSimStep > 0) {
    currentSimStep--;
    renderSimUI();
  }
}

// ==========================================
// LESSON 5: FOOD CLASSIFIER & 1-DAY MEAL PLANNER
// ==========================================
const L5_FOOD_ITEMS = [
  { name: "Fresh Salmon & Avocado", isHealthy: true, reason: "Rich in Omega-3 fatty acids and heart-healthy unsaturated fats." },
  { name: "Sugary Carbonated Cola", isHealthy: false, reason: "High refined sugar spikes blood glucose and causes energy crashes." },
  { name: "Steamed Broccoli & Carrots", isHealthy: true, reason: "Loaded with vitamin C, vitamin A, and dietary fiber." },
  { name: "Deep-Fried French Fries", isHealthy: false, reason: "Packed with trans-fats and high sodium." },
  { name: "Whole Grain Rolled Oats", isHealthy: true, reason: "Slow-digesting complex carbs sustain steady focus and stamina." },
  { name: "Frosted Glazed Donuts", isHealthy: false, reason: "Ultra-processed with high saturated fat and sugar." },
  { name: "Raw Almonds & Walnuts", isHealthy: true, reason: "Provides protein, magnesium, and healthy brain nutrients." },
  { name: "Instant Noodles with Sodium Packet", isHealthy: false, reason: "Contains excessive sodium and zero dietary fiber." }
];

let l5FoodIndex = 0;
let l5FoodScore = 0;

function renderL5FoodSorter() {
  const container = document.getElementById('l5-food-sorter-container');
  if (!container) return;

  if (l5FoodIndex >= L5_FOOD_ITEMS.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🥗🏆</div>
        <h3 style="color: #34d399; font-size: 1.5rem; margin-bottom: 8px;">Nutrition Sorting Mastered!</h3>
        <p style="color: #cbd5e1; font-size: 1.05rem;">Score: <strong>${l5FoodScore} / ${L5_FOOD_ITEMS.length}</strong> correct classifications.</p>
        <button class="suite-btn-action" onclick="resetL5FoodSorter()" style="margin-top: 16px;">🔄 Sort Again</button>
      </div>
    `;
    return;
  }

  const food = L5_FOOD_ITEMS[l5FoodIndex];
  container.innerHTML = `
    <div class="game-hud-bar">
      <span class="game-score-badge">🥗 Nutrition Score: ${l5FoodScore}</span>
      <span class="game-q-counter">Food ${l5FoodIndex + 1} / ${L5_FOOD_ITEMS.length}</span>
    </div>
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 18px;">
        "${food.name}"
      </div>
      <p style="color: #94a3b8; margin-bottom: 24px;">Is this food wholesome or processed?</p>
      <div style="display: flex; gap: 16px; justify-content: center;">
        <button class="suite-btn-action" onclick="classifyL5Food(true)" style="background: linear-gradient(135deg, #10b981, #059669); padding: 14px 28px; font-size: 1.05rem;">
          🥗 Healthy / Wholesome
        </button>
        <button class="suite-btn-action" onclick="classifyL5Food(false)" style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 14px 28px; font-size: 1.05rem;">
          🍟 Processed / Junk
        </button>
      </div>
      <div class="game-feedback-msg" id="l5-food-feedback" style="margin-top: 20px;"></div>
    </div>
  `;
}

function classifyL5Food(userPick) {
  const food = L5_FOOD_ITEMS[l5FoodIndex];
  const fb = document.getElementById('l5-food-feedback');
  const isCorrect = (userPick === food.isHealthy);

  if (isCorrect) {
    l5FoodScore++;
    if (fb) fb.innerHTML = `<span style="color: #34d399;">✅ Correct! ${food.reason}</span>`;
  } else {
    if (fb) fb.innerHTML = `<span style="color: #f87171;">❌ Incorrect: ${food.reason}</span>`;
  }

  setTimeout(() => {
    l5FoodIndex++;
    renderL5FoodSorter();
  }, 1800);
}

function resetL5FoodSorter() {
  l5FoodIndex = 0;
  l5FoodScore = 0;
  renderL5FoodSorter();
}

function calculateMealPlanScore() {
  const b = document.getElementById('plan-breakfast')?.value.trim();
  const l = document.getElementById('plan-lunch')?.value.trim();
  const s = document.getElementById('plan-snack')?.value.trim();
  const d = document.getElementById('plan-dinner')?.value.trim();
  const res = document.getElementById('meal-plan-result');

  if (!b || !l || !s || !d) {
    if (res) res.innerHTML = `<span style="color: #f59e0b;">⚠️ Please fill in all 4 meals to calculate nutritional balance!</span>`;
    return;
  }

  if (res) {
    res.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 12px; padding: 16px; margin-top: 14px; text-align: left;">
        <div style="color: #34d399; font-weight: 800; font-size: 1.1rem; margin-bottom: 6px;">🌟 Outstanding 1-Day Teen Meal Plan!</div>
        <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0;">
          Your plan balances sustained morning carbohydrates (Breakfast), lean protein and leafy micronutrients (Lunch & Dinner), and brain-boosting snacks. This meal structure supports hormonal equilibrium, clearer skin, and endurance for afternoon study sessions!
        </p>
      </div>
    `;
  }
}

// ==========================================
// LESSON 6: SHORT MESSAGE STUDIO
// ==========================================
function updateMessageComposer() {
  const friend = document.getElementById('msg-friend-name')?.value.trim() || "Linda";
  const myName = document.getElementById('msg-my-name')?.value.trim() || "Nam";
  const mode = document.querySelector('input[name="msg-mode"]:checked')?.value || "accept";
  const activity = document.getElementById('msg-activity')?.value.trim() || "cycling club";
  const time = document.getElementById('msg-time')?.value.trim() || "6:30 a.m. this Saturday";
  const place = document.getElementById('msg-place')?.value.trim() || "the city park entrance";
  const reason = document.getElementById('msg-reason')?.value.trim() || "have an early doctor's appointment";

  const preview = document.getElementById('msg-live-preview');
  if (!preview) return;

  if (mode === "accept") {
    preview.innerHTML = `
      <div class="msg-greeting">Hi ${friend},</div>
      <div class="msg-body">
        Thank you so much for the invitation! I would love to join your ${activity}. Meeting at ${time} at ${place} sounds wonderful. I will make sure to bring my water bottle and sports shoes!
      </div>
      <div class="msg-signoff">
        Hope to see you soon,<br>
        <strong>${myName}</strong>
      </div>
    `;
  } else {
    preview.innerHTML = `
      <div class="msg-greeting">Hi ${friend},</div>
      <div class="msg-body">
        Thank you so much for inviting me to join your ${activity}! I would really love to come, but unfortunately I ${reason}, so I won't be able to make it this time. Have a fantastic session!
      </div>
      <div class="msg-signoff">
        Best wishes,<br>
        <strong>${myName}</strong>
      </div>
    `;
  }
}

function copyMessageDraft() {
  const preview = document.getElementById('msg-live-preview');
  if (!preview) return;

  const text = preview.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("📋 Short message copied to clipboard!");
  }).catch(() => {
    alert("Selected message: \n" + text);
  });
}

// ==========================================
// LESSON 7: CLIL BACTERIA VS VIRUSES LAB
// ==========================================
function filterCLILTable(category) {
  document.querySelectorAll('.clil-filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === category);
  });

  const rows = document.querySelectorAll('#clil-comparison-table tbody tr');
  rows.forEach(r => {
    if (category === 'all' || r.getAttribute('data-cat') === category) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

function verifyPrescription(scenarioId, isAntibioticAppropriate) {
  const resEl = document.getElementById(`rx-result-${scenarioId}`);
  if (!resEl) return;

  if (scenarioId === 1) { // Common Cold
    if (isAntibioticAppropriate === false) {
      resEl.innerHTML = `<span style="color: #34d399;">✅ Correct! Common colds are viral infections caused by Rhinoviruses. Antibiotics have ZERO effect on viruses and will only harm beneficial gut flora.</span>`;
    } else {
      resEl.innerHTML = `<span style="color: #ef4444;">❌ Dangerous! Prescribing antibiotics for viral colds causes antibiotic resistance without treating the infection.</span>`;
    }
  } else if (scenarioId === 2) { // Strep Throat
    if (isAntibioticAppropriate === true) {
      resEl.innerHTML = `<span style="color: #34d399;">✅ Correct! Strep throat is caused by Streptococcus pyogenes bacteria. Targeted antibiotics are essential to eliminate the infection and prevent rheumatic complications.</span>`;
    } else {
      resEl.innerHTML = `<span style="color: #ef4444;">❌ Incorrect: Strep throat is a verified bacterial infection requiring antibiotic treatment under doctor supervision.</span>`;
    }
  }
}

// ==========================================
// LESSON 8: LONGEVITY ARENA & POSTER STUDIO
// ==========================================
const L8_LONGEVITY_QUESTIONS = [
  { q: "Which factor is most strongly linked with human longevity in the 85-year Harvard Adult Development Study?", opts: ["A. Close social connections and supportive relationships", "B. Heavy weightlifting", "C. Extreme low-calorie fasting"], ans: 0, exp: "Social connection and community ties are the single greatest predictor of healthspan." },
  { q: "Which region of the world is recognized as a 'Blue Zone' famous for active centenarians?", opts: ["A. Sardinia & Okinawa", "B. Arctic Circle", "C. Manhattan"], ans: 0, exp: "Blue Zones feature plant-slant diets, natural movement, and low chronic stress." },
  { q: "What cellular structure shortens under chronic emotional stress, accelerating biological aging?", opts: ["A. Ribosomes", "B. Telomeres", "C. Mitochondria wall"], ans: 1, exp: "Telomeres protect chromosome ends; their premature erosion accelerates cell senescence." },
  { q: "Which daily physical habit adds approximately 3 to 5 healthy years to average life expectancy?", opts: ["A. Brisk walking for 30 minutes daily", "B. Sitting for 8 hours without breaks", "C. Skipping evening meals"], ans: 0, exp: "Moderate aerobic movement lowers all-cause mortality significantly." }
];

let l8LongevityIndex = 0;
let l8LongevityScore = 0;

function renderL8LongevityArena() {
  const container = document.getElementById('l8-longevity-container');
  if (!container) return;

  if (l8LongevityIndex >= L8_LONGEVITY_QUESTIONS.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🌟🔬💯</div>
        <h3 style="color: #34d399; font-size: 1.5rem; margin-bottom: 8px;">Longevity Science Mastered!</h3>
        <p style="color: #cbd5e1; font-size: 1.05rem;">Score: <strong>${l8LongevityScore} / ${L8_LONGEVITY_QUESTIONS.length}</strong> correct.</p>
        <button class="suite-btn-action" onclick="resetL8Longevity()" style="margin-top: 16px;">🔄 Replay Arena</button>
      </div>
    `;
    return;
  }

  const q = L8_LONGEVITY_QUESTIONS[l8LongevityIndex];
  container.innerHTML = `
    <div class="game-hud-bar">
      <span class="game-score-badge">🧬 Longevity Score: ${l8LongevityScore}</span>
      <span class="game-q-counter">Question ${l8LongevityIndex + 1} / ${L8_LONGEVITY_QUESTIONS.length}</span>
    </div>
    <div class="game-question-text">${q.q}</div>
    <div class="game-options-list">
      ${q.opts.map((opt, i) => `
        <button class="game-opt-btn" onclick="checkL8Longevity(${i})">
          <span>${opt}</span>
          <span>🧬</span>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback-msg" id="l8-longevity-feedback"></div>
  `;
}

function checkL8Longevity(idx) {
  const q = L8_LONGEVITY_QUESTIONS[l8LongevityIndex];
  const fb = document.getElementById('l8-longevity-feedback');
  const btns = document.querySelectorAll('#l8-longevity-container .game-opt-btn');

  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    else if (i === idx) b.classList.add('wrong');
  });

  if (idx === q.ans) {
    l8LongevityScore++;
    if (fb) fb.innerHTML = `<span style="color: #34d399;">✅ Correct! ${q.exp}</span>`;
  } else {
    if (fb) fb.innerHTML = `<span style="color: #f87171;">❌ ${q.exp}</span>`;
  }

  setTimeout(() => {
    l8LongevityIndex++;
    renderL8LongevityArena();
  }, 1800);
}

function resetL8Longevity() {
  l8LongevityIndex = 0;
  l8LongevityScore = 0;
  renderL8LongevityArena();
}

// Poster Studio
const POSTER_THEMES = {
  hydration: {
    title: "💧 SMART HYDRATION CHALLENGE",
    slogan: "Drink 2 Liters Daily — Power Your Brain & Vital Organs!",
    tips: [
      "Carry a reusable stainless steel water bottle to class.",
      "Drink a full glass immediately upon waking up.",
      "Replace sugary sodas with fruit-infused water."
    ],
    accent: "#38bdf8"
  },
  sleep: {
    title: "🌙 DIGITAL SUNSET: RESTFUL SLEEP",
    slogan: "Screens Off at 10 PM — Awaken with Limitless Energy!",
    tips: [
      "Power down laptops and smartphones 45 minutes before bedtime.",
      "Keep bedroom pitch dark and ventilated at 22°C.",
      "Aim for 7.5 to 8.5 hours of uninterrupted REM sleep."
    ],
    accent: "#a78bfa"
  },
  plate: {
    title: "🥗 THE RAINBOW PLATE CHALLENGE",
    slogan: "Eat 5 Vibrant Colors Daily for Lifelong Immunity!",
    tips: [
      "Fill half your plate with colorful leafy vegetables.",
      "Choose whole grains (oats, brown rice) over refined flour.",
      "Include lean protein and healthy unsaturated fats daily."
    ],
    accent: "#34d399"
  },
  movement: {
    title: "🏃 30-MINUTE DAILY MOVEMENT",
    slogan: "Move More, Sit Less — Build Muscles and Joy!",
    tips: [
      "Take brisk walking breaks every 50 minutes of sitting.",
      "Do 3 sets of squats and star jumps before afternoon study.",
      "Join school sports clubs with friends for joyful movement."
    ],
    accent: "#f59e0b"
  }
};

function selectPosterTheme(themeKey) {
  document.querySelectorAll('.poster-theme-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme') === themeKey);
  });

  const theme = POSTER_THEMES[themeKey] || POSTER_THEMES.hydration;
  const canvas = document.getElementById('poster-preview-canvas');
  if (!canvas) return;

  canvas.style.borderColor = theme.accent;
  canvas.innerHTML = `
    <div style="background: linear-gradient(135deg, ${theme.accent}22, rgba(15, 23, 42, 0.9)); padding: 26px; border-radius: 14px; text-align: center;">
      <h2 style="color: ${theme.accent}; font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;">${theme.title}</h2>
      <p style="color: #fff; font-size: 1.05rem; font-weight: 700; margin-bottom: 20px;">"${theme.slogan}"</p>
      
      <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 18px; border-radius: 10px; margin-bottom: 20px;">
        <div style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; font-weight: 800; margin-bottom: 8px;">Actionable Habit Steps:</div>
        <ul style="color: #cbd5e1; line-height: 1.8; padding-left: 20px; font-size: 0.95rem; margin: 0;">
          ${theme.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
        <span>Grade 11 • Unit 1 Project</span>
        <span style="color: ${theme.accent}; font-weight: 700;">NLS 3.1a Digital Poster</span>
      </div>
    </div>
  `;
}

// DOM Initializer for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  renderL3JuiceQ();
  renderL4CarrotsQ();
  renderSimUI();
  renderL5FoodSorter();
  updateMessageComposer();
  renderL8LongevityArena();
  selectPosterTheme('hydration');
});
