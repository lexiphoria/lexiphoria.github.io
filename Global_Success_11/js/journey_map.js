/**
 * Heritage Journey Map — Controller (3840x4640 Architecture)
 * 16 Pins, Single Shared Popup, State Management & Calibration Tool
 */

const JOURNEY_MAP_DATA = [
  // SEMESTER 1 (Part 1: North -> Central, Top band to River seam)
  {
    id: "start-gate",
    type: "start",
    badge: "START",
    icon: "⛩️",
    name: "Cổng Làng Cổ Kính",
    enTitle: "Traditional Village Gate",
    desc: "Khởi đầu hành trình tại cổng làng gạch rêu phong, cây đa cổ thụ rợp bóng mát và biển gỗ mộc mạc.",
    x: 12.5,
    y: 12.1,
    semester: 1
  },
  {
    id: "unit-1",
    unitIndex: 0,
    unitNumber: 1,
    type: "unit",
    badge: "U1",
    icon: "🥗",
    name: "Hồ Gươm & Tháp Rùa",
    enTitle: "A Long and Healthy Life",
    desc: "Cụ già tập dưỡng sinh sớm bên cầu Thê Húc, khuyến khích lối sống lành mạnh, dinh dưỡng cân đối và trường thọ.",
    x: 31.0,
    y: 12.1,
    semester: 1
  },
  {
    id: "unit-2",
    unitIndex: 1,
    unitNumber: 2,
    type: "unit",
    badge: "U2",
    icon: "👨‍👩‍👧‍👦",
    name: "Nhà Ống Ba Thế Hệ",
    enTitle: "The Generation Gap",
    desc: "Mặt cắt ngôi nhà ống phố cổ: Bà thưởng trà tầng trệt, bố mẹ nấu ăn ấm cúng, con trẻ nghe nhạc trên ban công.",
    x: 54.2,
    y: 12.1,
    semester: 1
  },
  {
    id: "unit-3",
    unitIndex: 2,
    unitNumber: 3,
    type: "unit",
    badge: "U3",
    icon: "🏙️",
    name: "Đô Thị Sinh Thái Tương Lai",
    enTitle: "Cities of the Future",
    desc: "Tàu điện metro trên cao lướt qua các tòa nhà phủ vườn thẳng đứng, tua-bin gió và pin năng lượng mặt trời.",
    x: 78.4,
    y: 12.5,
    semester: 1
  },
  {
    id: "review-1",
    type: "review",
    badge: "R1",
    icon: "🍵",
    name: "Quán Trà Đá Vỉa Hè",
    enTitle: "Review 1 — Sidewalk Iced Tea",
    desc: "Dừng chân dưới bóng cây bàng mát rượi, ngồi ghế nhựa xanh nhâm nhi cốc trà đá và ôn lại kiến thức Unit 1–3.",
    x: 88.0,
    y: 24.8,
    semester: 1
  },
  {
    id: "unit-4",
    unitIndex: 3,
    unitNumber: 4,
    type: "unit",
    badge: "U4",
    icon: "🏮",
    name: "Sân Đình Lễ Hội Mùa Xuân",
    enTitle: "ASEAN and Viet Nam",
    desc: "Điệu múa rồng rực rỡ, tiếng trống đồng rộn vang, cờ đuôi nheo ngũ sắc thắm đượm tinh thần đoàn kết ASEAN.",
    x: 62.5,
    y: 29.7,
    semester: 1
  },
  {
    id: "unit-5",
    unitIndex: 4,
    unitNumber: 5,
    type: "unit",
    badge: "U5",
    icon: "🌱",
    name: "Bờ Biển Sinh Thái Đối Lập",
    enTitle: "Global Warming",
    desc: "Bức tranh đối lập cảnh tỉnh biến đổi khí hậu và hi vọng với người dân đội nón lá trồng rừng ngập mặn chắn sóng.",
    x: 32.0,
    y: 30.4,
    semester: 1
  },
  {
    id: "review-2",
    type: "review",
    badge: "R2",
    icon: "🛶",
    name: "Bến Phà Quê Hương",
    enTitle: "Review 2 — River Ferry Pier",
    desc: "Bến sông quê yên bình chuẩn bị lên phà vượt sông, ôn tập toàn diện kiến thức Học kỳ 1.",
    x: 74.0,
    y: 42.0,
    semester: 1
  },

  // SEMESTER 2 (Part 2: Central -> South/Mekong to Ca Mau)
  {
    id: "seam-ferry",
    type: "start",
    badge: "SEAM",
    icon: "⚓",
    name: "Bến Cập Phà Miền Nam",
    enTitle: "Wooden Ferry Arrival Pier",
    desc: "Hành khách và xe máy rời phà cập bến miền Nam, đón chào chặng đường mới hướng về Mũi Cà Mau.",
    x: 86.5,
    y: 54.3,
    semester: 2
  },
  {
    id: "unit-6",
    unitIndex: 5,
    unitNumber: 6,
    type: "unit",
    badge: "U6",
    icon: "🏮",
    isHero: true,
    name: "Phố Cổ Hội An Lung Linh",
    enTitle: "Preserving Our Heritage",
    desc: "Chùa Cầu cổ kính, tường vàng rêu phong và hàng trăm hoa đăng ngũ sắc thắp sáng dòng kênh Hoài thơ mộng.",
    x: 64.8,
    y: 55.4,
    semester: 2
  },
  {
    id: "unit-7",
    unitIndex: 6,
    unitNumber: 7,
    type: "unit",
    badge: "U7",
    icon: "🎓",
    name: "Khuê Văn Các & Bia Tiến Sĩ",
    enTitle: "Education Options",
    desc: "Nắng vàng mùa thu rọi bóng Khuê Văn Các và bia đá lưng rùa, mở ra các ngã rẽ học vấn cho học sinh tốt nghiệp.",
    x: 41.9,
    y: 55.0,
    semester: 2
  },
  {
    id: "unit-8",
    unitIndex: 7,
    unitNumber: 8,
    type: "unit",
    badge: "U8",
    icon: "🏺",
    name: "Làng Gốm Bát Tràng",
    enTitle: "Becoming Independent",
    desc: "Bàn xoay gốm thoăn thoắt, kệ gốm lam trắng tinh xảo và lò gạch tỏa khói êm đềm — biểu tượng của sự tự lập.",
    x: 19.5,
    y: 55.2,
    semester: 2
  },
  {
    id: "review-3",
    type: "review",
    badge: "R3",
    icon: "🍍",
    name: "Chợ Nổi Miền Tây",
    enTitle: "Review 3 — Floating Market",
    desc: "Thuyền ghe tấp nập sớm mai chở đầy dứa, thanh long, cây bẹo trĩu quả cùng bà con đội nón lá thân thương.",
    x: 21.9,
    y: 71.0,
    semester: 2
  },
  {
    id: "unit-9",
    unitIndex: 8,
    unitNumber: 9,
    type: "unit",
    badge: "U9",
    icon: "🤝",
    name: "Sân Cộng Đồng Tình Nguyện",
    enTitle: "Social Issues",
    desc: "Thanh niên áo xanh phân loại rác tái chế, góc đọc sách người cao tuổi ấm áp tình làng nghĩa xóm.",
    x: 47.9,
    y: 71.3,
    semester: 2
  },
  {
    id: "unit-10",
    unitIndex: 9,
    unitNumber: 10,
    type: "unit",
    badge: "U10",
    icon: "🌿",
    name: "Rừng Ngập Mặn Sinh Thái",
    enTitle: "Ecosystems",
    desc: "Cầu gỗ xuyên rừng đước, cánh cò trắng chao lượn, chim bói cá lấp lánh bên cạnh cán bộ kiểm lâm và học sinh quan sát.",
    x: 76.6,
    y: 71.8,
    semester: 2
  },
  {
    id: "review-4",
    type: "review",
    badge: "R4",
    icon: "⛺",
    name: "Trạm Hải Đăng & Cắm Trại",
    enTitle: "Review 4 — Coastal Lighthouse",
    desc: "Ngọn hải đăng trắng soi rọi bờ cát, bếp lửa hồng và võng đu đưa sẵn sàng cho chặng bứt phá cuối cùng.",
    x: 85.0,
    y: 84.5,
    semester: 2
  },
  {
    id: "finish-camau",
    type: "finish",
    badge: "FINISH",
    icon: "🚩",
    name: "Mũi Cà Mau — Cột Mốc Vinh Quang",
    enTitle: "FINISH — Journey Complete!",
    desc: "Cột mốc tọa độ Mũi Cà Mau kiêu hãnh với cờ đỏ sao vàng giữa biển trời hoàng hôn, hoàn thành trọn vẹn chương trình!",
    x: 61.5,
    y: 88.1,
    semester: 2
  }
];

// Audio chime synthesizer
class MapSoundPlayer {
  constructor() { this.ctx = null; }
  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
  }
  playChime(freq = 523.25) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch (e) {}
  }
}
const mapAudio = new MapSoundPlayer();

let activePinId = null;

// Initialize Map
function initHeritageJourneyMap() {
  renderPins();
  initCalibrationTool();
  initBackpackModal();
  renderMobileListView();
  updateProgressStates();
}

// Render the 16 Pins
function renderPins() {
  const viewport = document.querySelector('.map-viewport');
  if (!viewport) return;

  // Remove old pins if any
  viewport.querySelectorAll('.pin').forEach(p => p.remove());

  const currentUnitIdx = typeof currentUnitIndex === 'number' ? currentUnitIndex : 0;
  const exploredUnits = getExploredUnits();

  JOURNEY_MAP_DATA.forEach((item) => {
    const pin = document.createElement('div');
    pin.className = `pin ${item.isHero ? 'hero-pin' : ''}`;
    pin.style.left = `${item.x}%`;
    pin.style.top = `${item.y}%`;
    pin.setAttribute('data-pin-id', item.id);

    // Set pin state (completed, current, locked)
    if (item.type === 'unit') {
      if (exploredUnits.includes(item.unitIndex) && item.unitIndex !== currentUnitIdx) {
        pin.classList.add('completed');
      } else if (item.unitIndex === currentUnitIdx) {
        pin.classList.add('current');
      } else if (item.unitIndex > Math.max(...exploredUnits) + 1) {
        pin.classList.add('locked');
      }
    } else if (item.type === 'start') {
      pin.classList.add('completed');
    }

    pin.innerHTML = `
      <div class="pin-marker">
        <div class="pin-bubble" title="${item.name}">
          <span>${item.icon}</span>
          <span class="badge">${item.badge}</span>
        </div>
        <div class="pin-pointer"></div>
      </div>
    `;

    // Click handler -> moves the SINGLE shared popup
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      mapAudio.playChime(item.type === 'unit' ? 659.25 : 587.33);
      openPinPopup(item, pin);
    });

    viewport.appendChild(pin);
  });
}

// Single Shared Popup Controller
function openPinPopup(item, pinEl) {
  const popup = document.getElementById('map-single-popup');
  if (!popup) return;

  activePinId = item.id;

  // Populate popup content
  document.getElementById('popup-badge').textContent = item.badge;
  document.getElementById('popup-semester-tag').textContent = `Học kỳ ${item.semester}`;
  document.getElementById('popup-title').textContent = item.enTitle;
  document.getElementById('popup-vntitle').textContent = item.name;
  document.getElementById('popup-desc').textContent = item.desc;

  const actionBtn = document.getElementById('popup-action-btn');
  if (actionBtn) {
    if (item.type === 'unit') {
      actionBtn.textContent = 'Vào bài học ngay ➜';
      actionBtn.style.background = 'linear-gradient(135deg, #b45309 0%, #d97706 100%)';
      actionBtn.onclick = () => {
        closeMapPopup();
        jumpToUnitFromMap(item.unitIndex);
      };
    } else if (item.type === 'finish') {
      actionBtn.textContent = 'Mở Hộ Chiếu Học Tập 🎒';
      actionBtn.style.background = 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
      actionBtn.onclick = () => {
        closeMapPopup();
        openBackpackModal();
      };
    } else {
      actionBtn.textContent = 'Đóng lại';
      actionBtn.style.background = '#475569';
      actionBtn.onclick = closeMapPopup;
    }
  }

  // Move single popup to pin coordinate
  popup.style.left = `${item.x}%`;
  popup.style.top = `${item.y}%`;

  // Flip down if too close to the top
  if (item.y < 22) {
    popup.classList.add('flip-down');
  } else {
    popup.classList.remove('flip-down');
  }

  popup.classList.add('open');
}

function closeMapPopup(e) {
  if (e) e.stopPropagation();
  const popup = document.getElementById('map-single-popup');
  if (popup) popup.classList.remove('open');
  activePinId = null;
}

// Built-in Calibration Tool
function initCalibrationTool() {
  const viewport = document.querySelector('.map-viewport');
  if (!viewport) return;

  viewport.addEventListener('click', (e) => {
    // Ignore clicks on popup or FAB
    if (e.target.closest('.map-popup') || e.target.closest('.map-fab-backpack') || e.target.closest('.pin')) {
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);

    const coordStr = `{ x: ${x}, y: ${y} }`;
    console.log(coordStr);

    // Update on-screen HUD chip
    const hud = document.getElementById('calib-coords');
    if (hud) {
      hud.textContent = coordStr;
      hud.style.color = '#4ade80';
      setTimeout(() => { hud.style.color = '#38bdf8'; }, 600);
    }

    // Close popup if clicking on blank map area
    closeMapPopup();
  });
}

function copyCalibCoords() {
  const hud = document.getElementById('calib-coords');
  if (!hud) return;
  navigator.clipboard.writeText(hud.textContent).then(() => {
    const original = hud.textContent;
    hud.textContent = "✓ Đã copy tọa độ!";
    setTimeout(() => { hud.textContent = original; }, 1200);
  });
}

// Mobile List View (Renders equivalent interactive list of the units)
function renderMobileListView() {
  const container = document.getElementById('mobile-list-container');
  if (!container || !window.GLOBAL_SUCCESS_11_DATA) return;

  const units = window.GLOBAL_SUCCESS_11_DATA.units;
  const explored = getExploredUnits();

  container.innerHTML = units.map((u, idx) => {
    const isDone = explored.includes(idx);
    const isCurrent = (typeof currentUnitIndex === 'number' && currentUnitIndex === idx);
    const badgeText = isDone ? '✓ Hoàn thành' : (isCurrent ? 'Đang học' : 'Chưa học');
    const badgeColor = isDone ? '#10b981' : (isCurrent ? '#f59e0b' : '#64748b');

    return `
      <div class="mobile-unit-card" onclick="jumpToUnitFromMap(${idx})" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; margin-bottom: 10px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.5rem;">${u.icon}</span>
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 0.88rem;">Unit ${u.number}: ${u.title}</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">${u.vietnameseTitle}</div>
          </div>
        </div>
        <span style="background: ${badgeColor}; color: #fff; font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 8px;">
          ${badgeText}
        </span>
      </div>
    `;
  }).join('');
}

// View switcher for mobile (Map vs List)
function toggleMapOrListView(mode) {
  const container = document.querySelector('.map-viewport-container');
  const btnMap = document.getElementById('btn-view-mode-map');
  const btnList = document.getElementById('btn-view-mode-list');

  if (!container) return;

  if (mode === 'list') {
    container.classList.add('show-list');
    if (btnList) btnList.classList.add('active');
    if (btnMap) btnMap.classList.remove('active');
  } else {
    container.classList.remove('show-list');
    if (btnMap) btnMap.classList.add('active');
    if (btnList) btnList.classList.remove('active');
  }
}

// Jump from Map Landmark to full Unit Detail view
function jumpToUnitFromMap(unitIndex) {
  if (typeof switchUnit === 'function') {
    showUnitView();
    switchUnit(unitIndex);
    recordUnitExplored(unitIndex);
    updateProgressStates();
  }
}

// View panel switches
function showJourneyMapView() {
  const mapView = document.getElementById('view-journey-map');
  const unitView = document.getElementById('view-unit-lessons');
  const journeyBtn = document.getElementById('btn-nav-journey-map');

  if (mapView && unitView) {
    mapView.classList.add('active-view');
    unitView.classList.remove('active-view');
  }

  if (journeyBtn) journeyBtn.classList.add('active');
  document.querySelectorAll('.unit-nav-btn').forEach(b => b.classList.remove('active'));

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPins();
}

function showUnitView() {
  const mapView = document.getElementById('view-journey-map');
  const unitView = document.getElementById('view-unit-lessons');
  const journeyBtn = document.getElementById('btn-nav-journey-map');

  if (mapView && unitView) {
    mapView.classList.remove('active-view');
    unitView.classList.add('active-view');
  }

  if (journeyBtn) journeyBtn.classList.remove('active');
}

// Student Backpack / Learning Passport
function initBackpackModal() {
  const fab = document.getElementById('backpack-fab');
  const modal = document.getElementById('backpack-modal');
  const closeBtn = document.getElementById('btn-close-backpack');

  if (fab && modal) {
    fab.addEventListener('click', (e) => {
      e.stopPropagation();
      openBackpackModal();
      mapAudio.playChime(783.99);
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

function openBackpackModal() {
  const modal = document.getElementById('backpack-modal');
  if (!modal) return;

  const exploredUnits = getExploredUnits();
  const countEl = document.getElementById('stat-explored-count');
  if (countEl) countEl.textContent = `${exploredUnits.length} / 10`;

  if (exploredUnits.length >= 1) {
    const b1 = document.getElementById('badge-first-step');
    if (b1) b1.classList.add('unlocked');
  }
  if (exploredUnits.length >= 5) {
    const b2 = document.getElementById('badge-sem1');
    if (b2) b2.classList.add('unlocked');
  }
  if (exploredUnits.length >= 10) {
    const b3 = document.getElementById('badge-camau');
    if (b3) b3.classList.add('unlocked');
  }

  modal.classList.add('open');
}

function recordUnitExplored(idx) {
  let explored = getExploredUnits();
  if (!explored.includes(idx)) {
    explored.push(idx);
    localStorage.setItem('gs11_explored_units', JSON.stringify(explored));
  }
}

function getExploredUnits() {
  try {
    const saved = localStorage.getItem('gs11_explored_units');
    return saved ? JSON.parse(saved) : [0];
  } catch (e) {
    return [0];
  }
}

function updateProgressStates() {
  const badgeEl = document.getElementById('backpack-badge');
  const explored = getExploredUnits();
  if (badgeEl) badgeEl.textContent = `${explored.length}`;
}

// Auto-boot
document.addEventListener('DOMContentLoaded', () => {
  initHeritageJourneyMap();
});
