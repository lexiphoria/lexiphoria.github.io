/**
 * Global Success 11 - Master Slide Presentation Engine
 * Handles direct slide playback for all 8 lessons with clean aesthetic
 * Shortcuts: [←] [→] Navigate | [F] Fullscreen | [A] Reveal Answers | [Esc] Close
 */

let currentSlideLesson = 1;
let currentSlideIndex = 0;
let isAnswerRevealed = false;

// Return current active deck for lessons 1 to 8
function getActiveDeck() {
  switch (currentSlideLesson) {
    case 1:
      return (typeof LESSON1_SLIDES !== 'undefined') ? LESSON1_SLIDES : [];
    case 2:
      return (typeof LESSON2_SLIDES !== 'undefined') ? LESSON2_SLIDES : [];
    case 3:
      return (typeof LESSON3_SLIDES !== 'undefined') ? LESSON3_SLIDES : [];
    case 4:
      return (typeof LESSON4_SLIDES !== 'undefined') ? LESSON4_SLIDES : [];
    case 5:
      return (typeof LESSON5_SLIDES !== 'undefined') ? LESSON5_SLIDES : [];
    case 6:
      return (typeof LESSON6_SLIDES !== 'undefined') ? LESSON6_SLIDES : [];
    case 7:
      return (typeof LESSON7_SLIDES !== 'undefined') ? LESSON7_SLIDES : [];
    case 8:
      return (typeof LESSON8_SLIDES !== 'undefined') ? LESSON8_SLIDES : [];
    default:
      return (typeof LESSON1_SLIDES !== 'undefined') ? LESSON1_SLIDES : [];
  }
}

// Get Lesson Metadata
function getLessonMetadata(num) {
  const meta = {
    1: {
      name: "Lesson 1 · Getting Started",
      sub: "Living Long and Healthy",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson1/image16.jpeg",
      interactiveTitle: "🎒 Mở Bài Tập Tương Tác Lesson 1 (Games & Dialogue)",
      interactiveId: "panel-getting-started"
    },
    2: {
      name: "Lesson 2 · Language",
      sub: "Sounds, Words, Tenses",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson2/image110.jpeg",
      interactiveTitle: "🎒 Mở Bài Tập Tương Tác Lesson 2 (Dollar Challenge & Vocab)",
      interactiveId: "panel-language"
    },
    3: {
      name: "Lesson 3 · Reading",
      sub: "How to Live a Long and Healthy Life",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson3/image1.jpeg",
      interactiveTitle: "🎒 Mở Bài Đọc & Minigame Fresh Juice Lesson 3",
      interactiveId: "panel-reading"
    },
    4: {
      name: "Lesson 4 · Speaking",
      sub: "Giving Instructions for an Exercise Routine",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson4/image16.jpeg",
      interactiveTitle: "🎒 Mở Phòng Tập Thể Dục Tương Tác Lesson 4 (Carrots & Simulator)",
      interactiveId: "panel-speaking"
    },
    5: {
      name: "Lesson 5 · Listening",
      sub: "Food and Health",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson5/image1.jpeg",
      interactiveTitle: "🎒 Mở Audio TV Show & Bộ Lập Thực Đơn Lesson 5",
      interactiveId: "panel-listening"
    },
    6: {
      name: "Lesson 6 · Writing",
      sub: "A Short Message",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson6/image1.jpeg",
      interactiveTitle: "🎒 Mở Studio Soạn Tin Nhắn Ngắn & Peer Review Lesson 6",
      interactiveId: "panel-writing"
    },
    7: {
      name: "Lesson 7 · Communication & CLIL",
      sub: "Everyday English & Bacteria vs Viruses",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson7/image1.jpeg",
      interactiveTitle: "🎒 Mở Bảng So Sánh Sinh Học CLIL & Roleplay Lesson 7",
      interactiveId: "panel-culture"
    },
    8: {
      name: "Lesson 8 · Looking Back & Project",
      sub: "Review & Healthy Habits Posters",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson8/image1.jpeg",
      interactiveTitle: "🎒 Mở Đấu Trường Sống Thọ & Studio Poster Lesson 8",
      interactiveId: "panel-lookingback"
    }
  };
  return meta[num] || meta[1];
}

// Initialize or Open Lesson Presentation directly
function openLessonPresentation(lessonNum = 1, slideIdx = 0, autoFullscreen = true) {
  currentSlideLesson = lessonNum;
  currentSlideIndex = slideIdx;
  isAnswerRevealed = false;

  // Highlight Sách Mềm Menu Item
  document.querySelectorAll('.sachmem-lesson-item').forEach(item => {
    item.classList.remove('active');
  });
  const menuItem = document.getElementById(`menu-lesson-${lessonNum}`);
  if (menuItem) menuItem.classList.add('active');

  // Activate Presentation Tab
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-content-panel');
  tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === 'presentation'));
  panels.forEach(p => p.classList.toggle('active', p.id === 'panel-presentation'));

  // Render Slide
  renderMasterSlide();

  // Expand to Fullscreen if requested
  const card = document.getElementById('slide-presentation-card');
  if (card) {
    if (autoFullscreen) {
      card.classList.add('fullscreen');
      document.body.style.overflow = 'hidden';
      const btn = document.getElementById('slide-btn-fullscreen');
      if (btn) btn.textContent = "🗗";
    } else {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Render the active slide
function renderMasterSlide() {
  const deck = getActiveDeck();
  if (!deck || deck.length === 0) return;

  if (currentSlideIndex < 0) currentSlideIndex = 0;
  if (currentSlideIndex >= deck.length) currentSlideIndex = deck.length - 1;

  const slide = deck[currentSlideIndex];
  const meta = getLessonMetadata(currentSlideLesson);

  // Update Header
  const elBackBtn = document.getElementById('slide-header-unit-btn');
  if (elBackBtn) elBackBtn.textContent = `← ${meta.unit}`;
  const elTitle = document.getElementById('slide-header-lesson-title');
  if (elTitle) elTitle.textContent = meta.name;

  // Update Breadcrumb & Title
  const elCat = document.getElementById('slide-cat-badge');
  if (elCat) elCat.textContent = `${meta.unit.toUpperCase()} · ${slide.cat ? slide.cat.toUpperCase() : 'SLIDE'}`;

  const elMainTitle = document.getElementById('slide-main-title');
  if (elMainTitle) elMainTitle.textContent = slide.title || meta.name;

  const elSubtitle = document.getElementById('slide-main-subtitle');
  if (elSubtitle) elSubtitle.textContent = slide.subtitle || "";

  const elDesc = document.getElementById('slide-main-desc');
  if (elDesc) elDesc.textContent = slide.desc || "";

  // Answer Box
  const elAnswer = document.getElementById('slide-answer-box');
  if (elAnswer) {
    if (slide.reveal) {
      elAnswer.innerHTML = `<strong>💡 Answers / Teacher Notes:</strong><br>${slide.reveal.replace(/\\n/g, '<br>')}`;
      elAnswer.classList.toggle('visible', isAnswerRevealed);
    } else {
      elAnswer.classList.remove('visible');
    }
  }

  // Media / Art Frame
  const elMediaBox = document.getElementById('slide-art-container');
  if (elMediaBox) {
    // Select image: use slide.img if defined, else fallback to category or defaultCoverImage
    let imgSrc = slide.img || meta.defaultCoverImage;
    if (!slide.img) {
      if (currentSlideLesson === 2) {
        if (slide.cat === 'Warm-up') imgSrc = "assets/lesson2/image16.jpeg";
        else if (slide.cat === 'Pronunciation') imgSrc = "assets/lesson2/image30.png";
        else if (slide.cat === 'Vocabulary') imgSrc = "assets/lesson2/image46.png";
        else if (slide.cat === 'Grammar') imgSrc = "assets/lesson2/image60.png";
        else if (slide.cat === 'Review Game') imgSrc = "assets/lesson2/image72.png";
      } else if (currentSlideLesson === 1) {
        if (slide.cat === 'Warm-up') imgSrc = "assets/lesson1/image16.jpeg";
        else if (slide.cat === 'Game 1') imgSrc = "assets/lesson1/image101.png";
        else if (slide.cat === 'Reading') imgSrc = "assets/lesson1/image104.png";
        else if (slide.cat === 'Game 2') imgSrc = "assets/lesson1/image110.GIF";
      }
    }

    elMediaBox.innerHTML = `
      <div class="slide-art-frame">
        <img src="${imgSrc}" alt="${slide.title}" onerror="this.src='${meta.defaultCoverImage}'">
      </div>
    `;
  }

  // Footer Counters
  const elCounter = document.getElementById('slide-page-counter');
  if (elCounter) elCounter.textContent = `${currentSlideIndex + 1} / ${deck.length}`;

  const elPrevBtn = document.getElementById('slide-btn-prev');
  if (elPrevBtn) elPrevBtn.disabled = currentSlideIndex === 0;

  const elNextBtn = document.getElementById('slide-btn-next');
  if (elNextBtn) elNextBtn.disabled = currentSlideIndex === deck.length - 1;

  // Dots Rail
  const elDots = document.getElementById('slide-dots-rail');
  if (elDots) {
    elDots.innerHTML = deck.map((_, i) => `
      <span class="slide-dot-item ${i === currentSlideIndex ? 'active' : ''}" 
            title="Slide ${i + 1}" 
            onclick="presentationJumpToSlide(${i})"></span>
    `).join('');

    const activeDot = elDots.children[currentSlideIndex];
    if (activeDot && typeof activeDot.scrollIntoView === 'function') {
      activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Update interactive drawer toggle label
  const elInteractiveBtn = document.getElementById('btn-slide-interactive-toggle');
  if (elInteractiveBtn) {
    elInteractiveBtn.textContent = meta.interactiveTitle;
  }
}

// Navigation Functions
function presentationPrevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    isAnswerRevealed = false;
    renderMasterSlide();
  }
}

function presentationNextSlide() {
  const deck = getActiveDeck();
  if (currentSlideIndex < deck.length - 1) {
    currentSlideIndex++;
    isAnswerRevealed = false;
    renderMasterSlide();
  }
}

function presentationJumpToSlide(idx) {
  const deck = getActiveDeck();
  if (idx >= 0 && idx < deck.length) {
    currentSlideIndex = idx;
    isAnswerRevealed = false;
    renderMasterSlide();
  }
}

// Toggle Answer Box (Key 'A')
function togglePresentationAnswer() {
  const deck = getActiveDeck();
  const slide = deck[currentSlideIndex];
  if (!slide || !slide.reveal) return;

  isAnswerRevealed = !isAnswerRevealed;
  const elAnswer = document.getElementById('slide-answer-box');
  if (elAnswer) {
    elAnswer.classList.toggle('visible', isAnswerRevealed);
  }
}

// Toggle Fullscreen (Key 'F')
function togglePresentationFullscreen() {
  const card = document.getElementById('slide-presentation-card');
  if (!card) return;

  card.classList.toggle('fullscreen');
  const btn = document.getElementById('slide-btn-fullscreen');
  if (btn) {
    btn.textContent = card.classList.contains('fullscreen') ? "🗗" : "⛶";
  }
  document.body.style.overflow = card.classList.contains('fullscreen') ? 'hidden' : '';
}

// Return / Scroll to Unit Overview
function returnToUnitOverview() {
  const card = document.getElementById('slide-presentation-card');
  if (card && card.classList.contains('fullscreen')) {
    card.classList.remove('fullscreen');
    document.body.style.overflow = '';
    const btn = document.getElementById('slide-btn-fullscreen');
    if (btn) btn.textContent = "⛶";
  }
  const topSec = document.getElementById('sachmem-unit-container');
  if (topSec) {
    topSec.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Toggle Interactive Practice Panel
function toggleSlideInteractiveDrawer() {
  const meta = getLessonMetadata(currentSlideLesson);
  const targetPanelId = meta.interactiveId;

  // If fullscreen, exit fullscreen first
  const card = document.getElementById('slide-presentation-card');
  if (card && card.classList.contains('fullscreen')) {
    card.classList.remove('fullscreen');
    document.body.style.overflow = '';
    const btn = document.getElementById('slide-btn-fullscreen');
    if (btn) btn.textContent = "⛶";
  }

  // Switch to corresponding interactive panel if exists
  const targetPanel = document.getElementById(targetPanelId);
  if (targetPanel) {
    document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));
    targetPanel.classList.add('active');
    targetPanel.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Scroll down to lesson interactive view if present
    const interSec = document.getElementById(`lesson${currentSlideLesson}-interactive-view`);
    if (interSec) {
      interSec.style.display = 'block';
      interSec.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Global Keyboard Handler for Slide Viewer
document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  const presPanel = document.getElementById('panel-presentation');
  if (!presPanel || !presPanel.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    presentationPrevSlide();
  } else if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    presentationNextSlide();
  } else if (e.key === 'f' || e.key === 'F') {
    e.preventDefault();
    togglePresentationFullscreen();
  } else if (e.key === 'a' || e.key === 'A') {
    e.preventDefault();
    togglePresentationAnswer();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    returnToUnitOverview();
  }
});

// Auto-initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  openLessonPresentation(1, 0, false);
});
