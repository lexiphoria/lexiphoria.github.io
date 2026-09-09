/**
 * Global Success 11 - Master Slide Presentation Engine
 * Handles direct slide playback for all lessons with clean aesthetic
 * Shortcuts: [←] [→] Navigate | [F] Fullscreen | [A] Reveal Answers | [Esc] Close
 */

let currentSlideLesson = 1;
let currentSlideIndex = 0;
let isAnswerRevealed = false;

// Return current active deck
function getActiveDeck() {
  if (currentSlideLesson === 2 && typeof LESSON2_SLIDES !== 'undefined') {
    return LESSON2_SLIDES;
  }
  if (typeof LESSON1_SLIDES !== 'undefined') {
    return LESSON1_SLIDES;
  }
  return [];
}

// Get Lesson Name
function getLessonMetadata(num) {
  if (num === 2) {
    return {
      name: "Lesson 2 · Language",
      sub: "Sounds, words, tenses",
      unit: "Unit 1",
      unitTitle: "A Long and Healthy Life",
      defaultCoverImage: "assets/lesson2/image110.jpeg"
    };
  }
  return {
    name: "Lesson 1 · Getting Started",
    sub: "Living Long and Healthy",
    unit: "Unit 1",
    unitTitle: "A Long and Healthy Life",
    defaultCoverImage: "assets/lesson1/image16.jpeg"
  };
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
      elAnswer.innerHTML = `<strong>💡 Answers / Notes:</strong><br>${slide.reveal.replace(/\n/g, '<br>')}`;
      elAnswer.classList.toggle('visible', isAnswerRevealed);
    } else {
      elAnswer.classList.remove('visible');
    }
  }

  // Media / Art Frame
  const elMediaBox = document.getElementById('slide-art-container');
  if (elMediaBox) {
    // Select illustration based on lesson & category
    let imgSrc = meta.defaultCoverImage;
    if (currentSlideLesson === 2) {
      if (slide.cat === 'Warm-up') imgSrc = "assets/lesson2/image16.jpeg";
      else if (slide.cat === 'Pronunciation') imgSrc = "assets/lesson2/image30.png";
      else if (slide.cat === 'Vocabulary') imgSrc = "assets/lesson2/image46.png";
      else if (slide.cat === 'Grammar') imgSrc = "assets/lesson2/image60.png";
      else if (slide.cat === 'Review Game') imgSrc = "assets/lesson2/image72.png";
    } else {
      if (slide.cat === 'Warm-up') imgSrc = "assets/lesson1/image16.jpeg";
      else if (slide.cat === 'Game 1') imgSrc = "assets/lesson1/image101.png";
      else if (slide.cat === 'Reading') imgSrc = "assets/lesson1/image104.png";
      else if (slide.cat === 'Game 2') imgSrc = "assets/lesson1/image110.GIF";
    }

    elMediaBox.innerHTML = `
      <div class="slide-art-frame">
        <img src="${imgSrc}" alt="${slide.title}" onerror="this.src='../assets/images/unit1.jpg'">
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

    // Ensure active dot is scrolled into view
    const activeDot = elDots.children[currentSlideIndex];
    if (activeDot && typeof activeDot.scrollIntoView === 'function') {
      activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Update interactive drawer toggle label
  const elInteractiveBtn = document.getElementById('btn-slide-interactive-toggle');
  if (elInteractiveBtn) {
    elInteractiveBtn.textContent = currentSlideLesson === 1 
      ? "🎒 Mở Bài Tập Tương Tác Lesson 1 (Games & Dialogue)" 
      : "🎒 Mở Bài Tập Tương Tác Lesson 2 (Dollar Challenge & Vocab)";
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
  // If lesson 1, switch to interactive mode or scroll down
  if (currentSlideLesson === 1) {
    if (typeof switchLesson1Mode === 'function') switchLesson1Mode('interactive');
    const interSec = document.getElementById('lesson1-interactive-view');
    if (interSec) {
      interSec.style.display = 'block';
      interSec.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    const interSec = document.getElementById('lesson2-interactive-view');
    if (interSec) {
      interSec.style.display = 'block';
      interSec.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Global Keyboard Handler for Slide Viewer
document.addEventListener('keydown', (e) => {
  // Ignore if user is typing in an input or textarea
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

// Auto-initialize when DOM ready (false for fullscreen on initial load)
document.addEventListener('DOMContentLoaded', () => {
  openLessonPresentation(1, 0, false);
});
