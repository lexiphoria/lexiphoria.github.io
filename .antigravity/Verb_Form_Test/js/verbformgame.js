const quizzes = [
  {
    id: "verb-form-1",
    title: "Verb & Word Forms Mastery",
    description: "17 questions testing tense, verb patterns, and word formation.",
    questions: [
      {
        text: "My sister usually (play) <span class='blank'>___</span> sports in the morning.",
        options: ["play", "plays", "is playing", "played"],
        answer: 1,
        explanation: "<b>plays:</b> 'usually' là dấu hiệu của thì hiện tại đơn. Chủ ngữ 'My sister' là ngôi thứ 3 số ít nên động từ 'play' thêm 's'."
      },
      {
        text: "There (be) <span class='blank'>___</span> a big change in the roles of men and women at home in Viet Nam for the past few decades.",
        options: ["is", "was", "has been", "have been"],
        answer: 2,
        explanation: "<b>has been:</b> 'for the past few decades' là dấu hiệu của thì hiện tại hoàn thành. 'a big change' là số ít nên dùng 'has been'."
      },
      {
        text: "I suggest (recycle) <span class='blank'>___</span> things such as bags, cans, and bottles.",
        options: ["recycle", "to recycle", "recycled", "recycling"],
        answer: 3,
        explanation: "<b>recycling:</b> Cấu trúc: suggest + V-ing (đề nghị làm gì)."
      },
      {
        text: "She tried hard (cooperate) <span class='blank'>___</span> with the others in the team to finish the work.",
        options: ["cooperate", "to cooperate", "cooperating", "cooperated"],
        answer: 1,
        explanation: "<b>to cooperate:</b> Cấu trúc: try + to V (cố gắng làm gì)."
      },
      {
        text: "In a big city, school children in their uniforms can (see) <span class='blank'>___</span> on the pavement, walking or waiting for buses.",
        options: ["see", "saw", "be seen", "being seen"],
        answer: 2,
        explanation: "<b>be seen:</b> Bị động với động từ khuyết thiếu 'can': can + be + V(P2). Trẻ em 'được nhìn thấy' chứ không tự nhìn."
      },
      {
        text: "You will have to train your voice harder if you want to become a (profession) <span class='blank'>___</span> singer.",
        options: ["profession", "professional", "professionally", "professor"],
        answer: 1,
        explanation: "<b>professional:</b> Trước danh từ 'singer' cần một tính từ để bổ nghĩa. Tính từ của 'profession' là 'professional'."
      },
      {
        text: "The factory was (beauty) <span class='blank'>___</span> decorated to welcome the prime minister's visit.",
        options: ["beauty", "beautiful", "beautifully", "beautify"],
        answer: 2,
        explanation: "<b>beautifully:</b> Bổ nghĩa cho động từ phân từ hai 'decorated' cần một trạng từ. Trạng từ của 'beauty' là 'beautifully'."
      },
      {
        text: "Astronauts experience (weigh) <span class='blank'>___</span> when they are in space.",
        options: ["weigh", "weight", "weightless", "weightlessness"],
        answer: 3,
        explanation: "<b>weightlessness:</b> Sau động từ 'experience' cần một danh từ. Danh từ của 'weigh' mang nghĩa không trọng lượng là 'weightlessness'."
      },
      {
        text: "He (wait) <span class='blank'>___</span> for his girlfriend at the airport since 2 p.m.",
        options: ["is waiting", "was waiting", "has been waiting", "waits"],
        answer: 2,
        explanation: "<b>has been waiting:</b> 'since 2 p.m.' là dấu hiệu của thì hiện tại hoàn thành hoặc HTHT tiếp diễn (nhấn mạnh tính liên tục)."
      },
      {
        text: "In 2002, I (work) <span class='blank'>___</span> at T&T company.",
        options: ["work", "worked", "has worked", "was working"],
        answer: 1,
        explanation: "<b>worked:</b> 'In 2002' là mốc thời gian trong quá khứ, nên dùng thì quá khứ đơn."
      },
      {
        text: "He suggested (watch) <span class='blank'>___</span> a movie instead of going to the party.",
        options: ["watch", "to watch", "watching", "watched"],
        answer: 2,
        explanation: "<b>watching:</b> Cấu trúc: suggest + V-ing (đề nghị cùng làm gì)."
      },
      {
        text: "Why did you decide (look) <span class='blank'>___</span> for a new job?",
        options: ["look", "looking", "to look", "looked"],
        answer: 2,
        explanation: "<b>to look:</b> Cấu trúc: decide + to V (quyết định làm gì)."
      },
      {
        text: "Tim suggested (run) <span class='blank'>___</span> in the park every morning.",
        options: ["run", "to run", "running", "ran"],
        answer: 2,
        explanation: "<b>running:</b> Cấu trúc: suggest + V-ing (đề nghị làm gì)."
      },
      {
        text: "She said that she (know) <span class='blank'>___</span> three languages.",
        options: ["knows", "knew", "has known", "was knowing"],
        answer: 1,
        explanation: "<b>knew:</b> Câu gián tiếp, động từ ở mệnh đề chính là 'said' (quá khứ) nên động từ mệnh đề sau phải lùi thì về quá khứ đơn 'knew'."
      },
      {
        text: "It (not rain) <span class='blank'>___</span> much in our country in winter.",
        options: ["doesn't rain", "didn't rain", "isn't raining", "hasn't rained"],
        answer: 0,
        explanation: "<b>doesn't rain:</b> 'in winter' chỉ một sự thật hiển nhiên hoặc thói quen ở hiện tại, nên dùng thì hiện tại đơn."
      },
      {
        text: "When we came, the children (do) <span class='blank'>___</span> their homework.",
        options: ["did", "have done", "were doing", "are doing"],
        answer: 2,
        explanation: "<b>were doing:</b> Hành động đang xảy ra trong quá khứ ('were doing') thì có hành động khác xen vào ('came')."
      },
      {
        text: "The house (complete) <span class='blank'>___</span> in 1856 was famous for its huge marble staircase.",
        options: ["completes", "completed", "was completed", "completing"],
        answer: 1,
        explanation: "<b>completed:</b> Rút gọn mệnh đề quan hệ dạng bị động (which was completed -> completed)."
      }
    ]
  }
];

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// DOM Elements
const screens = document.querySelectorAll('.screen');
const quizListEl = document.getElementById('quiz-list');
const qNumEl = document.getElementById('q-num');
const qTextEl = document.getElementById('q-text');
const optionsGridEl = document.getElementById('options-grid');
const progressBarEl = document.getElementById('progress-bar');
const scoreDisplayEl = document.getElementById('score-display');
const feedbackPanelEl = document.getElementById('feedback-panel');
const feedbackTitleEl = document.getElementById('feedback-title');
const feedbackExplainEl = document.getElementById('feedback-explain');
const finalScoreEl = document.getElementById('final-score');
const finalMessageEl = document.getElementById('final-message');

function showScreen(screenId) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if(screenId === 'start-screen') {
    renderQuizList();
  }
}

function getSavedProgress(quizId) {
  const saved = localStorage.getItem('verbform_scores');
  if (saved) {
    const scores = JSON.parse(saved);
    return scores[quizId];
  }
  return null;
}

function saveProgress(quizId, userScore) {
  let scores = {};
  const saved = localStorage.getItem('verbform_scores');
  if (saved) {
    scores = JSON.parse(saved);
  }
  
  if (!scores[quizId] || scores[quizId] < userScore) {
    scores[quizId] = userScore;
    localStorage.setItem('verbform_scores', JSON.stringify(scores));
  }
}

function renderQuizList() {
  quizListEl.innerHTML = '';
  quizzes.forEach(q => {
    const bestScore = getSavedProgress(q.id);
    const scoreText = bestScore !== null ? `Best Score: ${bestScore}/${q.questions.length}` : 'Not Started';
    
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.onclick = () => startQuiz(q);
    card.innerHTML = `
      <h3>${q.title}</h3>
      <p style="color:var(--text-muted);font-size:0.95rem">${q.description}</p>
      <div class="quiz-meta">
        <span class="quiz-status">${scoreText}</span>
        <span>${q.questions.length} Qs</span>
      </div>
    `;
    quizListEl.appendChild(card);
  });
}

function startQuiz(quiz) {
  currentQuiz = quiz;
  currentQuestionIndex = 0;
  score = 0;
  showScreen('game-screen');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  feedbackPanelEl.style.display = 'none';
  
  const q = currentQuiz.questions[currentQuestionIndex];
  qNumEl.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  qTextEl.innerHTML = q.text;
  
  const progressPercent = ((currentQuestionIndex) / currentQuiz.questions.length) * 100;
  progressBarEl.style.width = `${progressPercent}%`;
  scoreDisplayEl.textContent = `Score: ${score}`;

  optionsGridEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.onclick = () => selectOption(idx, btn);
    btn.innerHTML = `
      <div class="option-letter">${letters[idx]}</div>
      <div class="option-text">${opt}</div>
    `;
    optionsGridEl.appendChild(btn);
  });
}

function selectOption(selectedIndex, btnElement) {
  if (answered) return;
  answered = true;

  const q = currentQuiz.questions[currentQuestionIndex];
  const buttons = optionsGridEl.querySelectorAll('.option-btn');
  
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === q.answer;
  
  if (isCorrect) {
    btnElement.classList.add('correct');
    score++;
    scoreDisplayEl.textContent = `Score: ${score}`;
    
    feedbackTitleEl.textContent = 'Correct!';
    feedbackTitleEl.className = 'feedback-title correct-text';
    
    qTextEl.innerHTML = q.text.replace("<span class='blank'>___</span>", `<span style="color:var(--correct);border-bottom:3px solid var(--correct);padding:0 5px">${q.options[q.answer]}</span>`);
  } else {
    btnElement.classList.add('wrong');
    buttons[q.answer].classList.add('correct');
    
    feedbackTitleEl.textContent = 'Incorrect';
    feedbackTitleEl.className = 'feedback-title wrong-text';
    
    qTextEl.innerHTML = q.text.replace("<span class='blank'>___</span>", `<span style="color:var(--incorrect);border-bottom:3px solid var(--incorrect);text-decoration:line-through;padding:0 5px">${q.options[selectedIndex]}</span> <span style="color:var(--correct);border-bottom:3px solid var(--correct);padding:0 5px">${q.options[q.answer]}</span>`);
  }

  feedbackExplainEl.innerHTML = q.explanation;
  feedbackPanelEl.style.display = 'block';
  
  const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  progressBarEl.style.width = `${progressPercent}%`;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  saveProgress(currentQuiz.id, score);
  showScreen('result-screen');
  
  finalScoreEl.textContent = `${score} / ${currentQuiz.questions.length}`;
  
  const percentage = score / currentQuiz.questions.length;
  if (percentage === 1) {
    finalMessageEl.textContent = "Perfect! You have mastered these verb forms!";
  } else if (percentage >= 0.7) {
    finalMessageEl.textContent = "Great job! Keep practicing to reach perfection.";
  } else {
    finalMessageEl.textContent = "Good effort! Review the rules and try again.";
  }
}

// Init
window.onload = () => {
  renderQuizList();
};
