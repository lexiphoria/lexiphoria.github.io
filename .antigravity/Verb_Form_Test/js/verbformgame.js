const quizzes = [
  {
    id: "verb-form-1",
    title: "Verb & Word Forms Mastery",
    description: "57 questions testing tense, verb patterns, and word formation.",
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
      },
      {
        text: "Summer (really/ not begin) <span class='blank'>___</span> in Rio de Janeiro until late November.",
        options: ["doesn't really begin", "hasn't really begun", "isn't really beginning", "didn't really begin"],
        answer: 0,
        explanation: "<b>doesn't really begin:</b> Thì hiện tại đơn diễn tả sự thật hiển nhiên hoặc một thói quen cố định."
      },
      {
        text: "What tends (happen) <span class='blank'>___</span> is that the poorest families end up in the worst housing.",
        options: ["happen", "to happen", "happening", "happened"],
        answer: 1,
        explanation: "<b>to happen:</b> Cấu trúc: tend + to V (có xu hướng làm gì)."
      },
      {
        text: "They hope that they (go) <span class='blank'>___</span> on a trip to Pattaya next summer.",
        options: ["go", "will go", "are going", "went"],
        answer: 1,
        explanation: "<b>will go:</b> 'hope' thường đi với mệnh đề ở thì tương lai đơn (will + V)."
      },
      {
        text: "The Statue of Liberty (originally/ design) <span class='blank'>___</span> for the Suez Canal in Egypt.",
        options: ["originally designed", "was originally designing", "was originally designed", "has originally designed"],
        answer: 2,
        explanation: "<b>was originally designed:</b> Câu bị động ở quá khứ đơn vì sự kiện đã diễn ra và kết thúc trong quá khứ."
      },
      {
        text: "Many scientists (still/ search) <span class='blank'>___</span> for life in other parts of the universe.",
        options: ["still search", "are still searching", "have still searched", "were still searching"],
        answer: 1,
        explanation: "<b>are still searching:</b> Hành động đang diễn ra tại thời điểm hiện tại, dùng thì hiện tại tiếp diễn."
      },
      {
        text: "Peter, you're riding too fast. You (hit) <span class='blank'>___</span> the lamp post.",
        options: ["hit", "will hit", "are going to hit", "are hitting"],
        answer: 2,
        explanation: "<b>are going to hit:</b> Tương lai gần (be going to + V) diễn tả một dự đoán có căn cứ ở hiện tại ('riding too fast')."
      },
      {
        text: "The kids (play) <span class='blank'>___</span> in the garden when it suddenly began to rain.",
        options: ["played", "were playing", "have played", "are playing"],
        answer: 1,
        explanation: "<b>were playing:</b> Hành động đang xảy ra trong quá khứ (quá khứ tiếp diễn) thì một hành động khác xen vào (quá khứ đơn)."
      },
      {
        text: "As soon as Daddy and Jonathan finish (get) <span class='blank'>___</span> dressed, we'll go to the amusement park.",
        options: ["get", "to get", "getting", "got"],
        answer: 2,
        explanation: "<b>getting:</b> Cấu trúc: finish + V-ing (hoàn thành việc gì đó)."
      },
      {
        text: "We (choose) <span class='blank'>___</span> to travel by MRT when we visited Singapore.",
        options: ["choose", "chose", "have chosen", "were choosing"],
        answer: 1,
        explanation: "<b>chose:</b> Hành động đã xảy ra và kết thúc trong quá khứ ('when we visited'), dùng quá khứ đơn."
      },
      {
        text: "If you ride in the cycle lane during rush hour, you (avoid) <span class='blank'>___</span> traffic congestion.",
        options: ["avoid", "avoided", "will avoid", "would avoid"],
        answer: 2,
        explanation: "<b>will avoid:</b> Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai (If + HTĐ, Tương lai đơn)."
      },
      {
        text: "Jennifer (work) <span class='blank'>___</span> professionally on the problem of missing children since graduating in 2000.",
        options: ["works", "worked", "has been working", "is working"],
        answer: 2,
        explanation: "<b>has been working:</b> 'since 2000' là dấu hiệu của hiện tại hoàn thành tiếp diễn (nhấn mạnh tính liên tục)."
      },
      {
        text: "While I (talk) <span class='blank'>___</span> to my friend on the phone, my manager entered the room without knocking.",
        options: ["talked", "was talking", "have talked", "am talking"],
        answer: 1,
        explanation: "<b>was talking:</b> Hành động đang xảy ra trong quá khứ ('was talking') thì hành động khác xen vào ('entered')."
      },
      {
        text: "A projected 58 million students (enrol) <span class='blank'>___</span> in U.S. public schools by the year 2022.",
        options: ["will enrol", "will have enrolled", "are enrolling", "enrol"],
        answer: 1,
        explanation: "<b>will have enrolled:</b> 'by the year 2022' dùng thì tương lai hoàn thành (will have + Vp2) chỉ sự việc hoàn tất trước một thời điểm ở tương lai."
      },
      {
        text: "If I (pass) <span class='blank'>___</span> my exams successfully, I will start an apprenticeship in September.",
        options: ["pass", "passed", "will pass", "have passed"],
        answer: 0,
        explanation: "<b>pass:</b> Mệnh đề If của câu điều kiện loại 1 dùng thì hiện tại đơn."
      },
      {
        text: "Customers usually (call) <span class='blank'>___</span> the hotline when they're not happy with the products.",
        options: ["call", "called", "are calling", "have called"],
        answer: 0,
        explanation: "<b>call:</b> 'usually' là dấu hiệu của thì hiện tại đơn."
      },
      {
        text: "You can't enter the room. The surgeons (perform) <span class='blank'>___</span> an operation inside.",
        options: ["perform", "performed", "are performing", "have performed"],
        answer: 2,
        explanation: "<b>are performing:</b> 'You can't enter' cho thấy sự việc đang diễn ra ngay lúc nói -> thì hiện tại tiếp diễn."
      },
      {
        text: "The policy (change) <span class='blank'>___</span> several times in the last few months.",
        options: ["changed", "has changed", "is changing", "will change"],
        answer: 1,
        explanation: "<b>has changed:</b> 'in the last few months' là dấu hiệu của thì hiện tại hoàn thành (nhấn mạnh kết quả đã thay đổi nhiều lần)."
      },
      {
        text: "The school won't let you (do) <span class='blank'>___</span> Physics unless you have at least a B in Maths.",
        options: ["do", "to do", "doing", "done"],
        answer: 0,
        explanation: "<b>do:</b> Cấu trúc: let sb + do sth (cho phép ai làm gì)."
      },
      {
        text: "As a graduate she decided (not pursue) <span class='blank'>___</span> a career based on her degree of engineering.",
        options: ["not pursue", "not to pursue", "not pursuing", "didn't pursue"],
        answer: 1,
        explanation: "<b>not to pursue:</b> Cấu trúc: decide + to V -> phủ định là decide + not to V."
      },
      {
        text: "Did I really tell you I was unhappy? I don't remember (say) <span class='blank'>___</span> that.",
        options: ["say", "to say", "saying", "said"],
        answer: 2,
        explanation: "<b>saying:</b> Cấu trúc: remember + V-ing (nhớ đã làm gì trong quá khứ)."
      },
      {
        text: "Millions of people (download) <span class='blank'>___</span> the app since it was released.",
        options: ["downloaded", "have downloaded", "download", "are downloading"],
        answer: 1,
        explanation: "<b>have downloaded:</b> 'since it was released' là dấu hiệu của thì hiện tại hoàn thành."
      },
      {
        text: "Robots, drones and AI (carry out) <span class='blank'>___</span> 90 per cent of household chores by 2040.",
        options: ["will carry out", "will be carrying out", "will have carried out", "carry out"],
        answer: 2,
        explanation: "<b>will have carried out:</b> 'by 2040' là dấu hiệu của thì tương lai hoàn thành (will have + Vp2)."
      },
      {
        text: "I (run) <span class='blank'>___</span> out of storage space on my phone, so I needed to delete some old photos.",
        options: ["ran", "was running", "had run", "have run"],
        answer: 2,
        explanation: "<b>had run:</b> Hành động hết dung lượng xảy ra trước hành động 'needed to delete' trong quá khứ -> Quá khứ hoàn thành."
      },
      {
        text: "Can I borrow your e-reader? ~ Sorry. It (charge) <span class='blank'>___</span> on the desk now.",
        options: ["charges", "charged", "is charging", "has charged"],
        answer: 2,
        explanation: "<b>is charging:</b> 'now' chỉ hiện tại tiếp diễn, thiết bị đang được sạc."
      },
      {
        text: "Neither his children nor his wife (go) <span class='blank'>___</span> to Bali with him next week.",
        options: ["go", "is going", "are going", "went"],
        answer: 1,
        explanation: "<b>is going:</b> Cấu trúc 'Neither A nor B' động từ chia theo B ('his wife' là số ít) -> 'is going' (tương lai có dự định)."
      },
      {
        text: "Despite the popularity of online programs, online-only students tend (struggle) <span class='blank'>___</span> more than those in face-to-face courses.",
        options: ["struggle", "to struggle", "struggling", "struggled"],
        answer: 1,
        explanation: "<b>to struggle:</b> Cấu trúc: tend + to V (có xu hướng làm gì)."
      },
      {
        text: "As a director, my mother (check) <span class='blank'>___</span> her email multiple times a day.",
        options: ["check", "checks", "is checking", "checked"],
        answer: 1,
        explanation: "<b>checks:</b> 'multiple times a day' chỉ thói quen hiện tại -> Hiện tại đơn."
      },
      {
        text: "My laptop suddenly (freeze) <span class='blank'>___</span> while I was browsing the web.",
        options: ["freeze", "froze", "was freezing", "has frozen"],
        answer: 1,
        explanation: "<b>froze:</b> Hành động đột ngột xen vào ('froze') một hành động đang xảy ra ('was browsing')."
      },
      {
        text: "He said that he often (lose) <span class='blank'>___</span> his earbuds while running.",
        options: ["lose", "loses", "lost", "was losing"],
        answer: 2,
        explanation: "<b>lost:</b> Câu gián tiếp, lùi thì từ hiện tại đơn ('often loses') sang quá khứ đơn ('lost')."
      },
      {
        text: "The organiser advised (not leave) <span class='blank'>___</span> early in order to take part in the grand prize drawing.",
        options: ["not leave", "not to leave", "not leaving", "no leave"],
        answer: 2,
        explanation: "<b>not leaving:</b> Cấu trúc: advise + V-ing (khi không có tân ngữ chỉ người)."
      },
      {
        text: "Jenny expected her new phone (have) <span class='blank'>___</span> a better camera than her old one.",
        options: ["have", "to have", "having", "had"],
        answer: 1,
        explanation: "<b>to have:</b> expect + to V (mong đợi điều gì)."
      },
      {
        text: "She avoids (charge) <span class='blank'>___</span> her devices overnight so as not to damage the battery.",
        options: ["charge", "to charge", "charging", "charged"],
        answer: 2,
        explanation: "<b>charging:</b> avoid + V-ing (tránh làm gì)."
      },
      {
        text: "Do you mind (pass) <span class='blank'>___</span> me the remote control for the TV over there?",
        options: ["pass", "to pass", "passing", "passed"],
        answer: 2,
        explanation: "<b>passing:</b> mind + V-ing (phiền làm gì)."
      },
      {
        text: "She wants (try) <span class='blank'>___</span> different photo editing apps for her Instagram posts.",
        options: ["try", "to try", "trying", "tried"],
        answer: 1,
        explanation: "<b>to try:</b> want + to V (muốn làm gì)."
      },
      {
        text: "We recommend (use) <span class='blank'>___</span> electric scooters as an eco-friendly option.",
        options: ["use", "to use", "using", "used"],
        answer: 2,
        explanation: "<b>using:</b> recommend + V-ing (khi không có tân ngữ)."
      },
      {
        text: "The new laptop seems (be) <span class='blank'>___</span> faster than the previous model.",
        options: ["be", "to be", "being", "been"],
        answer: 1,
        explanation: "<b>to be:</b> seem + to V (dường như)."
      },
      {
        text: "Is it worth (spend) <span class='blank'>___</span> money on a high-quality antivirus software?",
        options: ["spend", "to spend", "spending", "spent"],
        answer: 2,
        explanation: "<b>spending:</b> be worth + V-ing (đáng để làm gì)."
      },
      {
        text: "The parental controls allow parents (monitor) <span class='blank'>___</span> their children's screen time.",
        options: ["monitor", "to monitor", "monitoring", "monitored"],
        answer: 1,
        explanation: "<b>to monitor:</b> allow sb + to V (cho phép ai làm gì)."
      },
      {
        text: "I suggested (update) <span class='blank'>___</span> the phone software regularly for better security.",
        options: ["update", "to update", "updating", "updated"],
        answer: 2,
        explanation: "<b>updating:</b> suggest + V-ing (đề xuất làm gì)."
      },
      {
        text: "He needs (stop) <span class='blank'>___</span> downloading so many unnecessary apps that take up his phone's storage.",
        options: ["stop", "to stop", "stopping", "stopped"],
        answer: 1,
        explanation: "<b>to stop:</b> need + to V (cần làm gì - mang nghĩa chủ động)."
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
