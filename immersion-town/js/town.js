/* Immersion Town – RPG góc nghiêng 3/4 (top-down 3/4) phong cách tranh Đông Hồ.
   Bản đồ đọc từ tệp Tiled (data/maps/*.tmx): lớp ô "Ground" + lớp đối tượng "Objects".
   Nhân vật đi tự do 4 hướng; nhà, cây, đồ vật đứng trên mặt đất và được sắp theo chiều sâu (Y-sort):
   đi sau nhà thì bị mái che khuất, đi trước nhà thì đè lên. */
(() => {
  'use strict';

  const IT = (window.IT = window.IT || {});
  const T = 64;
  const VIEW_H = 720;
  const SPEED = 235;     // px/giây
  const NEAR = 80;       // tới gần NPC/vật phẩm dưới 80px thì tự bật khung thoại
  const INK = '#1A1A1A';
  const PAPER = '#F5E6C8';
  const MAPS = ['ev', 'street', 'river', 'festival'];
  const HB_W = 26;       // hộp va chạm ở chân nhân vật
  const HB_H = 14;
  const CHAR_H = 124;    // chiều cao vẽ nhân vật chính

  const IMAGES = {
    tiles: 'assets/tiles/hoian_dongho_grid_tileset_64x64.png?v=20261008b',
    fTailor: 'assets/facades/tailor.webp',
    fWorkshop: 'assets/facades/workshop.webp',
    fHall: 'assets/facades/hoi_an_quan.webp',
    workbench: 'assets/facades/workbench.webp',
    fabric: 'assets/facades/fabric.webp',
    evCharger: 'assets/items/ev_charger.webp',
    scooter: 'assets/items/scooter.webp',
    pedSign: 'assets/items/pedestrian_sign.webp',
    ocopTea: 'assets/items/ocop_tea.webp',
    solarOutlet: 'assets/items/solar_outlet.webp',
    silkRoll: 'assets/items/silk_roll.webp',
    tape: 'assets/items/measuring_tape.webp',
    lotus: 'assets/items/lotus_lantern.webp',
    icedTea: 'assets/items/iced_tea.webp',
    mark: 'assets/npc/mark.webp',
    emma: 'assets/npc/emma.webp',
    sarah: 'assets/npc/sarah.webp',
    david: 'assets/npc/david.webp',
    cTailor: 'assets/chars/tailor.webp',
    cOcop: 'assets/chars/ocop_lady.webp',
    cLantern: 'assets/chars/lantern_man.webp',
    cVendor: 'assets/chars/pole_vendor.webp',
    cBoy: 'assets/chars/classmate_boy.webp',
    cGirl: 'assets/chars/classmate_girl.webp',
    wGuide: 'assets/chars/walk_guide.webp',
    wTakashi: 'assets/chars/walk_takashi.webp',
    wSophia: 'assets/chars/walk_sophia.webp',
    wJohn: 'assets/chars/walk_john.webp',
    wAnna: 'assets/chars/walk_anna.webp',
    wLiwei: 'assets/chars/walk_liwei.webp',
    wCyclo: 'assets/chars/walk_cyclo.webp',
  };

  // Khách tham quan đi lại (đối tượng 'walker' trong bản đồ): dải khung tools/cut_frontal.py tạo ra,
  // ô 0 nhìn thẳng, rồi nl ô đi sang trái, rồi nr ô đi sang phải; h = chiều cao vẽ (px)
  const WALKERS = {
    guide: { img: 'wGuide', nl: 4, nr: 4, h: 122 },
    takashi: { img: 'wTakashi', nl: 1, nr: 1, h: 116 },
    sophia: { img: 'wSophia', nl: 2, nr: 2, h: 118 },
    john: { img: 'wJohn', nl: 1, nr: 1, h: 116 },
    anna: { img: 'wAnna', nl: 1, nr: 1, h: 110 },
    liwei: { img: 'wLiwei', nl: 2, nr: 2, h: 114 },
    cyclo: { img: 'wCyclo', nl: 1, nr: 1, h: 120, wheel: true },
  };

  // Ảnh và chiều cao vẽ của từng NPC (theo id nhân vật trong data/npc-dialogues-v4.json)
  const NPC_ART = {
    mark: ['mark', 128], sarah: ['sarah', 128], emma: ['emma', 128], david: ['david', 130],
    minh: ['cTailor', 128], tu: ['cLantern', 128], hoa: ['cOcop', 128], vendor: ['cVendor', 128],
  };

  // Điểm chạm trên mặt tiền nhà (toạ độ trong ảnh gốc)
  const SIGN = {
    fTailor: [195, 315, 115, 42], fWorkshop: [165, 248, 135, 52],
    // Hàng quán và nhà cổ vẽ nhìn thẳng (assets/deco, tools/cut_frontal.py)
    shop_banhmi: [165, 112, 160, 40], shop_caolau: [190, 106, 170, 40], shop_comga: [160, 90, 160, 36],
    shop_cafe: [130, 150, 170, 34], house_ancient2: [440, 104, 320, 96],
  };
  const PRESETS = {
    tailor: [['tailor-shop', SIGN.fTailor], ['yin-yang-roof-tiles', [95, 0, 350, 115]], ['bougainvillea', [20, 40, 100, 300]], ['silk-lantern', [110, 140, 295, 72]], ['wooden-shutters', [105, 365, 95, 100]], ['wooden-shutters', [310, 365, 95, 100]]],
    tanky: [['ancient-house', SIGN.fTailor], ['moss', [95, 0, 350, 115]], ['bougainvillea', [20, 40, 100, 300]], ['silk-lantern', [110, 140, 295, 72]], ['wooden-shutters', [105, 365, 95, 100]]],
    workshop: [['workshop', SIGN.fWorkshop], ['craftsmanship', [140, 360, 185, 130]], ['yin-yang-roof-tiles', [80, 0, 320, 160]], ['bougainvillea', [10, 160, 120, 160]], ['silk-lantern', [70, 270, 110, 120]], ['tassel', [285, 265, 120, 130]]],
    ocop: [['souvenir', SIGN.fWorkshop], ['folding-lantern', [140, 300, 185, 75]], ['yin-yang-roof-tiles', [80, 0, 320, 160]], ['bougainvillea', [330, 160, 125, 160]]],
    hall: [['@boss', [560, 520, 130, 185]], ['assembly-hall', [540, 385, 175, 95]], ['yin-yang-roof-tiles', [270, 30, 530, 250]], ['silk-lantern', [0, 410, 170, 160]], ['wooden-shutters', [120, 210, 120, 130]]],
    shop_banhmi: [['banh-mi', [150, 250, 180, 110]], ['silk-lantern', [140, 165, 60, 75]], ['bougainvillea', [230, 10, 220, 140]], ['yin-yang-roof-tiles', [40, 40, 190, 70]]],
    shop_caolau: [['cao-lau', [210, 250, 100, 50]], ['noodle-shop', SIGN.shop_caolau], ['silk-lantern', [300, 160, 130, 60]], ['yin-yang-roof-tiles', [90, 10, 330, 90]]],
    shop_comga: [['chicken-rice', [165, 250, 170, 60]], ['silk-lantern', [140, 130, 180, 60]], ['bamboo-basket', [330, 305, 50, 55]], ['yin-yang-roof-tiles', [80, 10, 290, 80]]],
    shop_cafe: [['coffee-shop', SIGN.shop_cafe], ['bougainvillea', [30, 0, 320, 140]], ['silk-lantern', [160, 195, 150, 60]], ['potted-plant', [80, 260, 60, 110]]],
    ancient2: [['ancient-house', SIGN.house_ancient2], ['balcony', [410, 490, 380, 100]], ['silk-lantern', [280, 300, 500, 170]], ['wooden-shutters', [785, 815, 240, 190]], ['bougainvillea', [0, 430, 430, 320]], ['potted-plant', [300, 880, 180, 270]], ['yin-yang-roof-tiles', [400, 600, 400, 90]]],
    banhmi_front: [['banh-mi', [222, 168, 365, 110]], ['silk-lantern', [40, 325, 730, 140]], ['yin-yang-roof-tiles', [20, 20, 770, 150]]],
    comga_front: [['chicken-rice', [300, 240, 275, 80]], ['silk-lantern', [75, 265, 730, 170]], ['yin-yang-roof-tiles', [20, 10, 840, 200]]],
    cafe_hoian: [['coffee-shop', [250, 460, 220, 80]], ['balcony', [90, 430, 530, 130]], ['silk-lantern', [100, 320, 520, 120]], ['yin-yang-roof-tiles', [30, 10, 680, 260]]],
  };
  const SPRITE_OF = { tailor: 'fTailor', workshop: 'fWorkshop', hall: 'fHall' };
  const TREE_WORD = { banyan: 'banyan-tree', bougainvillea: 'bougainvillea', areca: 'areca-palm', bamboo: 'bamboo' };
  const LANTERN_COLORS = ['#C83228', '#2F6FA3', '#3E8E41', '#E6B422', '#D9632B'];

  /* ---------- Đọc tệp Tiled .tmx ---------- */

  function readProps(el) {
    const out = {};
    const p = [...el.children].find((c) => c.tagName === 'properties');
    if (!p) return out;
    for (const q of p.children) {
      const type = q.getAttribute('type');
      const raw = q.hasAttribute('value') ? q.getAttribute('value') : q.textContent;
      out[q.getAttribute('name')] = type === 'bool' ? raw === 'true' : type === 'float' || type === 'int' ? Number(raw) : raw;
    }
    return out;
  }

  function readCollides(tilesetEl, into) {
    tilesetEl.querySelectorAll('tile').forEach((t) => { if (readProps(t).collides) into.add(Number(t.getAttribute('id'))); });
  }

  function parseTmx(text) {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    const m = doc.documentElement;
    if (m.tagName !== 'map') throw new Error('invalid .tmx file');
    const ts = m.querySelector('tileset');
    const collides = new Set();
    readCollides(ts, collides);
    return {
      w: Number(m.getAttribute('width')),
      h: Number(m.getAttribute('height')),
      props: readProps(m),
      firstgid: Number(ts.getAttribute('firstgid')),
      tilesetSource: ts.getAttribute('source'), // Tiled có thể lưu tileset ra tệp .tsx riêng
      collides,
      // Bỏ 3 bit cờ lật ô của Tiled ở đầu mỗi gid
      layers: [...m.querySelectorAll('layer')].map((l) => l.querySelector('data').textContent.split(',').map((s) => (Number(s.trim()) & 0x1fffffff) >>> 0)),
      objects: [...m.querySelectorAll('objectgroup > object')].map((o) => {
        const props = readProps(o);
        return {
          name: o.getAttribute('name') || '',
          kind: props.kind || o.getAttribute('type') || o.getAttribute('class') || '',
          x: Number(o.getAttribute('x')),
          y: Number(o.getAttribute('y')),
          w: Number(o.getAttribute('width') || 0),
          h: Number(o.getAttribute('height') || 0),
          props,
        };
      }),
    };
  }

  /* ---------- Vẽ thủ công kiểu khắc gỗ ---------- */

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function inked(ctx, fill, lw = 3) {
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.lineWidth = lw;
    ctx.strokeStyle = INK;
    ctx.stroke();
  }

  function blob(ctx, cx, cy, r, fill) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    inked(ctx, fill, 2.5);
  }

  function shadow(ctx, cx, cy, rx, ry = rx * 0.32) {
    ctx.fillStyle = 'rgba(26,26,26,.22)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTree(ctx, variant, cx, base) {
    shadow(ctx, cx, base, 34);
    if (variant === 'areca') {
      ctx.fillStyle = '#8D6E63';
      rr(ctx, cx - 5, base - 150, 10, 150, 5);
      inked(ctx, '#A1887F', 2.5);
      for (let k = 0; k < 7; k++) {
        const a = -Math.PI / 2 + (k - 3) * 0.42;
        ctx.save();
        ctx.translate(cx, base - 150);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, -30, 10, 34, 0, 0, Math.PI * 2);
        inked(ctx, k % 2 ? '#3E8E41' : '#4E7A3A', 2.5);
        ctx.restore();
      }
      return;
    }
    if (variant === 'bamboo') {
      for (let k = -2; k <= 2; k++) {
        const x = cx + k * 9;
        const h = 150 + (k % 2) * 22;
        rr(ctx, x - 4, base - h, 8, h, 4);
        inked(ctx, '#7FA24A', 2);
        for (let y = base - h + 22; y < base - 6; y += 24) {
          ctx.beginPath();
          ctx.moveTo(x - 5, y);
          ctx.lineTo(x + 5, y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.ellipse(x + 10, base - h + 8, 16, 6, -0.4, 0, Math.PI * 2);
        inked(ctx, '#6E8B3D', 2);
      }
      return;
    }
    if (variant === 'bougainvillea') {
      [[-26, -30, 26], [22, -34, 28], [0, -56, 30], [-10, -18, 24], [16, -14, 22]].forEach(([dx, dy, r]) => blob(ctx, cx + dx, base + dy, r, '#4E7A3A'));
      for (let k = 0; k < 26; k++) {
        const a = k * 2.39;
        const rr2 = 8 + ((k * 13) % 34);
        ctx.fillStyle = k % 3 ? '#E91E63' : '#F48FB1';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * rr2, base - 34 + Math.sin(a) * rr2 * 0.8, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }
    // Cây đa: thân to, rễ phụ, tán rộng
    rr(ctx, cx - 14, base - 96, 28, 96, 8);
    inked(ctx, '#6D4C41', 3);
    [-30, -18, 20, 32].forEach((dx) => {
      ctx.beginPath();
      ctx.moveTo(cx + dx, base - 92);
      ctx.lineTo(cx + dx * 0.9, base - 8);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#3E2723';
      ctx.stroke();
    });
    [[-48, -112, 42], [46, -110, 44], [0, -150, 52], [-24, -86, 34], [28, -82, 34]].forEach(([dx, dy, r]) => blob(ctx, cx + dx, base + dy, r, '#3E6B35'));
    [[-20, -150, 18], [30, -128, 16], [-48, -112, 14]].forEach(([dx, dy, r]) => {
      ctx.fillStyle = '#5E8C46';
      ctx.beginPath();
      ctx.arc(cx + dx, base + dy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function lantern(ctx, x, y, color, s = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 13, 10, 13, 0, 0, Math.PI * 2);
    inked(ctx, color, 2);
    ctx.fillStyle = '#E6B422';
    ctx.fillRect(-6, -1, 12, 4);
    ctx.fillRect(-6, 25, 12, 4);
    ctx.strokeStyle = '#C83228';
    ctx.beginPath();
    ctx.moveTo(0, 29);
    ctx.lineTo(0, 38);
    ctx.stroke();
    ctx.restore();
  }

  // Mỗi hàm vẽ nhận tâm đáy (cx, base) và kích thước vẽ (w, h)
  const DRAW = {
    bollard(ctx, cx, base) {
      rr(ctx, cx - 6, base - 34, 12, 34, 5);
      inked(ctx, '#9A948A', 2);
      ctx.fillStyle = '#C83228';
      ctx.fillRect(cx - 5, base - 26, 10, 5);
    },
    parkingSign(ctx, cx, base) {
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(cx - 3, base - 60, 6, 60);
      rr(ctx, cx - 22, base - 96, 44, 40, 6);
      inked(ctx, '#2F6FA3');
      ctx.fillStyle = PAPER;
      ctx.font = '900 28px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('P', cx, base - 75);
    },
    shuttleStop(ctx, cx, base) {
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(cx - 3, base - 80, 6, 80);
      rr(ctx, cx - 46, base - 126, 92, 50, 6);
      inked(ctx, '#1B4D3E');
      ctx.fillStyle = PAPER;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '800 12px "Be Vietnam Pro", sans-serif';
      ctx.fillText('⚡ XE ĐIỆN', cx, base - 110);
      ctx.font = '700 10px "Be Vietnam Pro", sans-serif';
      ctx.fillText('Electric shuttle', cx, base - 92);
    },
    bench(ctx, cx, base, w) {
      const x = cx - w / 2;
      rr(ctx, x, base - 30, w, 12, 3);
      inked(ctx, '#8D6E63', 2);
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(x + 6, base - 18, 6, 18);
      ctx.fillRect(x + w - 12, base - 18, 6, 18);
    },
    table(ctx, cx, base, w) {
      const x = cx - w / 2;
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(x + 6, base - 24, 5, 24);
      ctx.fillRect(x + w - 11, base - 24, 5, 24);
      rr(ctx, x, base - 34, w, 14, 3);
      inked(ctx, '#A1887F', 2);
    },
    bambooFrame(ctx, cx, base, w, h) {
      ctx.strokeStyle = '#B8894A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, base - h / 2, w / 2 - 3, h / 2 - 2, 0, 0, Math.PI * 2);
      for (let k = -2; k <= 2; k++) {
        ctx.moveTo(cx + k * 6, base - h + 3);
        ctx.quadraticCurveTo(cx + k * 10, base - h / 2, cx + k * 6, base - 3);
      }
      ctx.stroke();
    },
    cruiseSign(ctx, cx, base) {
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(cx - 30, base - 70, 7, 70);
      ctx.fillRect(cx + 23, base - 70, 7, 70);
      rr(ctx, cx - 56, base - 118, 112, 52, 6);
      inked(ctx, '#1B4D3E');
      ctx.fillStyle = PAPER;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '800 13px "Be Vietnam Pro", sans-serif';
      ctx.fillText('NIGHT CRUISE', cx, base - 100);
      ctx.font = '600 11px "Be Vietnam Pro", sans-serif';
      ctx.fillText('Thuyền điện · 19:00', cx, base - 82);
    },
    eboat(ctx, cx, base, w, h) {
      const x = cx - w / 2;
      ctx.beginPath();
      ctx.moveTo(x, base - 34);
      ctx.quadraticCurveTo(cx, base + 6, x + w, base - 34);
      ctx.lineTo(x + w - 12, base - 44);
      ctx.lineTo(x + 12, base - 44);
      ctx.closePath();
      inked(ctx, '#6D4C41');
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(x + 30, base - h, 5, h - 40);
      ctx.fillRect(x + w - 35, base - h, 5, h - 40);
      rr(ctx, x + 18, base - h - 6, w - 36, 16, 3);
      inked(ctx, '#2F6FA3', 2);
      for (let k = 1; k < 5; k++) {
        ctx.beginPath();
        ctx.moveTo(x + 18 + ((w - 36) * k) / 5, base - h - 6);
        ctx.lineTo(x + 18 + ((w - 36) * k) / 5, base - h + 10);
        ctx.stroke();
      }
      for (let k = 0; k < 4; k++) lantern(ctx, x + 50 + k * ((w - 100) / 3), base - h + 18, LANTERN_COLORS[k], 0.7);
      ctx.fillStyle = PAPER;
      ctx.font = '800 11px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ ECO', cx, base - 18);
    },
  };

  // Lớp phía trên đầu nhân vật
  const ABOVE = {
    lanternStrings(ctx, r, t) {
      for (let x0 = r.x; x0 < r.x + r.w; x0 += 240) {
        const x1 = Math.min(r.x + r.w, x0 + 240);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x0, r.y);
        ctx.quadraticCurveTo((x0 + x1) / 2, r.y + r.h * 0.25, x1, r.y);
        ctx.stroke();
        for (let k = 1; k < 5; k++) {
          const tt = k / 5;
          const lx = (1 - tt) * (1 - tt) * x0 + 2 * (1 - tt) * tt * ((x0 + x1) / 2) + tt * tt * x1;
          const ly = (1 - tt) * (1 - tt) * r.y + 2 * (1 - tt) * tt * (r.y + r.h * 0.25) + tt * tt * r.y;
          lantern(ctx, lx + Math.sin(t / 900 + lx) * 1.5, ly + 8, LANTERN_COLORS[(k + Math.round(x0 / 240)) % 5], 0.9);
        }
      }
    },
  };

  function star(ctx, cx, cy, a) {
    ctx.fillStyle = `rgba(230, 180, 34, ${a})`;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 11);
    ctx.lineTo(cx + 3, cy - 3);
    ctx.lineTo(cx + 11, cy);
    ctx.lineTo(cx + 3, cy + 3);
    ctx.lineTo(cx, cy + 11);
    ctx.lineTo(cx - 3, cy + 3);
    ctx.lineTo(cx - 11, cy);
    ctx.lineTo(cx - 3, cy - 3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = `rgba(26,26,26,${a * 0.8})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawBook(ctx, x, y) {
    rr(ctx, x - 16, y - 22, 32, 40, 4);
    inked(ctx, '#1B4D3E', 2.5);
    ctx.fillStyle = '#E6B422';
    ctx.fillRect(x - 10, y - 14, 20, 4);
    ctx.fillRect(x - 10, y - 6, 14, 3);
    ctx.fillStyle = '#C83228';
    ctx.fillRect(x + 8, y - 22, 5, 16);
  }

  // Ánh sáng theo giờ trong ngày (giờ chạy theo tiến độ nhiệm vụ, do game.js quyết định)
  const LIGHTS = {
    morning: { tint: 'rgba(255, 226, 170, .10)', glow: 0 },
    noon: { tint: null, glow: 0 },
    afternoon: { tint: 'rgba(255, 160, 60, .13)', glow: 0 },
    sunset: { tint: 'rgba(110, 45, 80, .30)', glow: 0.32 },
    night: { tint: 'rgba(12, 18, 56, .52)', glow: 0.45 },
  };
  const OLD_LIGHT = { day: 'noon', dusk: 'sunset', night: 'night' };

  const ease = (k) => 1 - (1 - k) * (1 - k);

  // Hành động cuối nhiệm vụ, vẽ theo tiến trình k (0 → 1); k = 1 là trạng thái cố định sau khi xong
  const FINALE = {
    // Cắm sạc xe của Mark: dây sạc kéo từ trụ sang xe, pin đầy dần
    charge(ctx, f, k) {
      const [x0, y0, x1, y1] = [f.x, f.y, f.x + f.w, f.y + f.h];
      const mx = (x0 + x1) / 2;
      const my = Math.max(y0, y1) + 26;
      const n = Math.max(1, Math.round(24 * Math.min(1, k / 0.35)));
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      for (let i = 1; i <= n; i++) {
        const u = i / 24;
        ctx.lineTo((1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1);
      }
      ctx.lineWidth = 6;
      ctx.strokeStyle = INK;
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#3E8E41';
      ctx.stroke();
      const level = k < 0.35 ? 0 : Math.min(1, (k - 0.35) / 0.55);
      const bx = x1 - 26;
      const by = y1 - 92;
      rr(ctx, bx, by, 48, 20, 4);
      inked(ctx, PAPER, 2.5);
      ctx.fillStyle = level >= 1 ? '#3E8E41' : '#E6B422';
      ctx.fillRect(bx + 4, by + 4, 40 * level, 12);
      ctx.fillStyle = INK;
      ctx.fillRect(bx + 48, by + 6, 4, 8);
      ctx.font = '800 13px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`⚡ ${Math.round(level * 100)}%`, bx + 24, by - 12);
    },
    // Treo chiếc áo dài vừa may lên giá trước tiệm
    aodai(ctx, f, k, t) {
      const cx = f.x + f.w / 2;
      const base = f.y + f.h;
      const top = base - 126;
      shadow(ctx, cx, base, 34);
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(cx - 34, top, 6, 126);
      ctx.fillRect(cx + 28, top, 6, 126);
      rr(ctx, cx - 38, top - 6, 76, 9, 4);
      inked(ctx, '#8D6E63', 2);
      if (k <= 0) return;
      const drop = (1 - ease(Math.min(1, k / 0.6))) * -70;
      ctx.save();
      ctx.globalAlpha = Math.min(1, k * 3);
      ctx.translate(0, drop);
      const ty = top + 6;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, top - 2);
      ctx.lineTo(cx, ty);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 6, ty);
      ctx.lineTo(cx - 24, ty + 10);
      ctx.lineTo(cx - 31, ty + 50);
      ctx.lineTo(cx - 22, ty + 52);
      ctx.lineTo(cx - 16, ty + 30);
      ctx.lineTo(cx - 15, ty + 104);
      ctx.lineTo(cx + 15, ty + 104);
      ctx.lineTo(cx + 16, ty + 30);
      ctx.lineTo(cx + 22, ty + 52);
      ctx.lineTo(cx + 31, ty + 50);
      ctx.lineTo(cx + 24, ty + 10);
      ctx.lineTo(cx + 6, ty);
      ctx.closePath();
      inked(ctx, '#E6B422', 2.5);
      ctx.beginPath();
      ctx.moveTo(cx, ty + 30);
      ctx.lineTo(cx, ty + 104);
      ctx.stroke();
      rr(ctx, cx - 7, ty - 2, 14, 8, 3);
      inked(ctx, '#C83228', 2);
      [[-8, 44], [7, 62], [-6, 82], [8, 94]].forEach(([dx, dy]) => {
        ctx.fillStyle = '#C83228';
        ctx.beginPath();
        ctx.arc(cx + dx, ty + dy, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      if (k < 1) for (let i = 0; i < 5; i++) star(ctx, cx + Math.cos(i * 1.3 + t / 300) * 46, top + 40 + Math.sin(i * 2.1 + t / 260) * 40, Math.sin(k * Math.PI));
    },
    // Treo chiếc đèn Emma vừa làm lên dây đèn trước xưởng
    hang(ctx, f, k, t) {
      const ax = f.x;
      const ay = f.y;
      const endY = f.y + f.h;
      const kk = ease(Math.min(1, k / 0.7));
      const ly = endY + 90 * (1 - kk);
      const swing = Math.sin(t / 260) * 0.25 * (1 - Math.min(1, k)) + Math.sin(t / 900) * 0.04;
      if (k >= 0.7) {
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax, ly - 8);
        ctx.stroke();
      }
      ctx.save();
      ctx.translate(ax, ly);
      ctx.rotate(swing);
      lantern(ctx, 0, 0, '#C83228', 1.5);
      ctx.restore();
      if (k >= 1) {
        rr(ctx, ax + 14, ly + 18, 42, 16, 3);
        inked(ctx, PAPER, 1.5);
        ctx.fillStyle = '#C83228';
        ctx.font = '800 10px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Emma ♥', ax + 35, ly + 26);
      }
    },
    // Thả hoa đăng: đèn trôi từ đầu cầu tàu ra giữa sông
    release(ctx, f, k, t, img) {
      const kk = ease(k);
      const drift = k >= 1 ? Math.sin(t / 1600) * 18 : 0;
      const x = f.x + f.w * kk + drift;
      const y = f.y + f.h * kk + Math.sin(t / 600) * 3;
      const s = Math.min(1, k * 4);
      const g = ctx.createRadialGradient(x, y - 18, 0, x, y - 18, 70);
      g.addColorStop(0, 'rgba(255, 200, 110, .55)');
      g.addColorStop(1, 'rgba(255, 200, 110, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - 70, y - 88, 140, 140);
      if (img) {
        const h = 56 * s;
        const w = (img.width / img.height) * h;
        ctx.drawImage(img, x - w / 2, y - h, w, h);
      }
      if (k > 0.25 && k < 1) {
        ctx.globalAlpha = Math.sin(((k - 0.25) / 0.75) * Math.PI);
        ctx.font = '800 22px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨🙏✨', x, y - 70 - 40 * k);
        ctx.globalAlpha = 1;
      }
    },
  };
  const GATE_COLORS = ['#3E8E41', '#E6B422', '#C83228', '#2F6FA3'];

  function drawGate(ctx, g, lamps, t) {
    const x0 = g.x;
    const x1 = g.x + g.w;
    const base = g.base;
    const top = base - 210;
    shadow(ctx, x0 + 12, base, 22);
    shadow(ctx, x1 - 12, base, 22);
    [x0, x1 - 24].forEach((px) => {
      rr(ctx, px, top + 30, 24, 180, 5);
      inked(ctx, '#B5452F', 3);
      ctx.fillStyle = '#E6B422';
      ctx.fillRect(px + 4, top + 60, 16, 4);
      ctx.fillRect(px + 4, base - 30, 16, 4);
    });
    // mái ngói cong
    ctx.beginPath();
    ctx.moveTo(x0 - 30, top + 38);
    ctx.quadraticCurveTo(x0 - 4, top + 18, x0 + 18, top);
    ctx.lineTo(x1 - 18, top);
    ctx.quadraticCurveTo(x1 + 4, top + 18, x1 + 30, top + 38);
    ctx.closePath();
    inked(ctx, '#A64B2A', 3);
    ctx.strokeStyle = 'rgba(26,26,26,.5)';
    ctx.lineWidth = 2;
    for (let k = 1; k < 10; k++) {
      const x = x0 + 10 + ((x1 - x0 - 20) * k) / 10;
      ctx.beginPath();
      ctx.moveTo(x, top + 3);
      ctx.lineTo(x + (k - 5) * 3, top + 34);
      ctx.stroke();
    }
    // biển hiệu
    const sw = Math.min(g.w - 50, 230);
    rr(ctx, (x0 + x1) / 2 - sw / 2, top + 42, sw, 30, 4);
    inked(ctx, '#C83228', 3);
    ctx.fillStyle = '#FFE082';
    ctx.font = '800 14px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ĐÊM HỘI · HERITAGE NIGHT', (x0 + x1) / 2, top + 58, sw - 10);
    // 4 đèn lồng: mỗi nhiệm vụ hoàn thành thắp một đèn
    lamps.forEach((lit, i) => {
      const lx = x0 + 40 + ((x1 - x0 - 80) * i) / Math.max(1, lamps.length - 1);
      const ly = top + 84;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lx, top + 72);
      ctx.lineTo(lx, ly);
      ctx.stroke();
      if (lit) {
        lantern(ctx, lx + Math.sin(t / 700 + i) * 1.5, ly + 4, GATE_COLORS[i % GATE_COLORS.length], 1.5);
      } else {
        ctx.save();
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.ellipse(lx, ly + 24, 15, 19, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 220, 192, .75)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(26,26,26,.55)';
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  const FINALE_LAYER = { charge: 'sorted', aodai: 'sorted', hang: 'above', release: 'water' };

  /* ---------- Engine ---------- */

  class Town {
    constructor(canvas, hooks) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.hooks = hooks;
      this.img = {};
      this.maps = {};
      this.paused = true;
      this.keys = new Set();
      this.fade = 0;
      this.cam = { x: 0, y: 0 };
      this.player = { x: 0, y: 0, dir: 'down', phase: 0, moving: false, path: [], onArrive: null, stuck: 0 };
      this.autoNpc = null;
      this.autoSpot = null;
      this.last = performance.now();
      this.bindInput();
    }

    async load(playerSrc) {
      const loadImg = (key, src) => new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => { this.img[key] = im; resolve(); };
        im.onerror = () => reject(new Error(src));
        im.src = src;
      });
      await Promise.all(Object.entries(IMAGES).map(([k, s]) => loadImg(k, s)));
      await this.setPlayerSheet(playerSrc);
      const texts = await Promise.all(MAPS.map((id) => fetch(`data/maps/${id}.tmx`, { cache: 'no-cache' }).then((r) => {
        if (!r.ok) throw new Error(`data/maps/${id}.tmx: HTTP ${r.status}`);
        return r.text();
      })));
      MAPS.forEach((id, i) => { this.maps[id] = parseTmx(texts[i]); });
      // Ảnh trang trí (assets/deco) được nạp theo tên ghi trong bản đồ, không cần khai báo trước
      const deco = new Set();
      Object.values(this.maps).forEach((m) => m.objects.forEach((o) => {
        if (o.props.img && !this.img[o.props.img]) deco.add(o.props.img);
        if (o.props.sprite && !SPRITE_OF[o.props.sprite] && !this.img[o.props.sprite]) deco.add(o.props.sprite);
        try { (o.props.on ? JSON.parse(o.props.on) : []).forEach((it) => { if (it.img && !this.img[it.img]) deco.add(it.img); }); } catch (e) { /* bỏ qua */ }
      }));
      await Promise.all([...deco].map((k) => loadImg(k, `assets/deco/${k}.webp`)));
      await Promise.all(Object.values(this.maps).filter((m) => m.tilesetSource).map(async (m) => {
        const res = await fetch(`data/maps/${m.tilesetSource}`, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`data/maps/${m.tilesetSource}: HTTP ${res.status}`);
        readCollides(new DOMParser().parseFromString(await res.text(), 'application/xml').documentElement, m.collides);
      }));
      this.resize();
      window.addEventListener('resize', () => this.resize());
      requestAnimationFrame((t) => this.frame(t));
    }

    setPlayerSheet(sheet) {
      return new Promise((resolve) => {
        const im = new Image();
        im.onload = () => { this.playerImg = im; this.playerKind = sheet.kind; resolve(); };
        im.onerror = () => resolve();
        im.src = sheet.src;
      });
    }

    resize() {
      const cw = (this.canvas.parentElement && this.canvas.parentElement.clientWidth) || 960;
      const ch = window.innerHeight || 720;
      // Màn hình hẹp (điện thoại): khung dọc, nhìn gần hơn để nhân vật đủ lớn
      const aspect = cw < 640 ? 0.78 : Math.min(16 / 9, Math.max(1.3, cw / (ch * 0.7)));
      const w = Math.round(VIEW_H * aspect);
      if (this.canvas.width !== w) {
        this.canvas.width = w;
        this.canvas.height = VIEW_H;
      }
      this.viewW = w;
    }

    /* --- Vào một cảnh --- */

    // Giờ hiện tại: morning, noon, afternoon, sunset, night
    phase() {
      return (this.hooks.phase && this.hooks.phase()) || OLD_LIGHT[this.map.props.light] || 'noon';
    }

    isEvening() {
      return this.phase() === 'sunset' || this.phase() === 'night';
    }

    npcActive(o) {
      return !this.hooks.npcActive || this.hooks.npcActive(o);
    }

    // Dựng đối tượng của một cảnh từ tệp Tiled; trả về điểm xuất phát mặc định
    buildScene(id) {
      const map = this.maps[id];
      this.sceneId = id;
      this.map = map;
      const W = map.w;
      const H = map.h;
      // Lớp nền vẽ sẵn
      const g = document.createElement('canvas');
      g.width = W * T;
      g.height = H * T;
      const gx = g.getContext('2d');
      const solidTile = new Uint8Array(W * H);
      this.waterTiles = [];
      map.layers.forEach((data) => {
        data.forEach((gid, i) => {
          if (!gid) return;
          const tid = gid - map.firstgid;
          const tx = i % W;
          const ty = Math.floor(i / W);
          gx.drawImage(this.img.tiles, (tid % 8) * T, Math.floor(tid / 8) * T, T, T, tx * T, ty * T, T, T);
          if (map.collides.has(tid)) solidTile[i] = 1;
          if (tid >= 16 && tid < 24) this.waterTiles.push([tx, ty, tid]);
        });
      });
      this.ground = g;
      this.solidTile = solidTile;

      this.buildings = [];
      this.trees = [];
      this.props = [];
      this.npcs = [];
      this.walkers = [];
      this.nearShop = null;
      this.items = [];
      this.spots = [];
      this.exits = [];
      this.above = [];
      this.solids = [];
      this.finales = [];
      this.gate = null;
      let start = null;
      const addSpot = (value, rect, extra = {}) => {
        if (!value) return;
        const spot = { key: `${id}:${this.spots.length}`, rect, ...extra };
        if (value.startsWith('@')) spot.action = value.slice(1);
        else spot.word = value;
        this.spots.push(spot);
        return spot;
      };

      map.objects.forEach((o) => {
        const p = o.props;
        if ((p.after || p.until) && !this.npcActive(o)) return;
        const cx = o.x + o.w / 2;
        const base = o.y + o.h;
        switch (o.kind) {
          case 'building': {
            const key = SPRITE_OF[p.sprite] || p.sprite;
            const im = this.img[key];
            const s = o.w / im.width;
            const dh = im.height * s;
            const b = { key, x: o.x, y: base - dh, w: o.w, h: dh, base, scale: s, flip: Boolean(p.flip), sign: p.sign ? String(p.sign).split('|') : null,
              shop: p.shop || null, steam: p.steam ? String(p.steam).split(';').map((g) => g.split(',').map(Number)) : null };
            this.buildings.push(b);
            this.solids.push([o.x, o.y, o.w, o.h]);
            (PRESETS[p.preset || p.sprite] || []).forEach(([value, [sx, sy, sw, sh]]) => {
              const lx = b.flip ? im.width - sx - sw : sx;
              addSpot(value, [b.x + lx * s, b.y + sy * s, sw * s, sh * s], { layerBase: base });
            });
            if (p.word) addSpot(p.word, [b.x + b.w * 0.25, b.y + b.h * 0.35, b.w * 0.5, b.h * 0.4], { layerBase: base });
            break;
          }
          case 'tree':
            this.trees.push({ variant: p.variant || 'banyan', cx, base });
            this.solids.push([o.x, o.y, o.w, o.h]);
            addSpot(TREE_WORD[p.variant] || 'banyan-tree', [cx - 50, base - 190, 100, 150], { tree: true });
            break;
          case 'prop': {
            if (p.floating && !this.isEvening()) break; // hoa đăng chỉ thả buổi tối
            const im = p.img ? this.img[p.img] : null;
            const dh = p.ph || 64;
            const dw = im ? (im.width / im.height) * dh : Math.max(o.w, 40);
            const pr = { img: p.img, draw: p.draw, cx, base, w: dw, h: dh, box: [cx - dw / 2, base - dh, dw, dh], floating: Boolean(p.floating), flip: Boolean(p.flip), glow: p.glow, label: p.label, labelAt: p.labelAt, word: p.word, on: [] };
            let on = [];
            try { on = p.on ? JSON.parse(p.on) : []; } catch (e) { on = []; }
            on.forEach((it) => {
              const oi = it.img ? this.img[it.img] : null;
              const oh = it.h || 40;
              const ow = oi ? (oi.width / oi.height) * oh : it.w || oh;
              const ocx = cx + (it.dx || 0);
              const ob = pr.box[1] + 14;
              const item = { img: it.img, draw: it.draw, cx: ocx, base: ob, w: ow, h: oh, box: [ocx - ow / 2, ob - oh, ow, oh] };
              pr.on.push(item);
              (it.spots || []).forEach(([value, [sx, sy, sw, sh]]) => {
                const sc = oh / (oi ? oi.height : oh);
                addSpot(value, [item.box[0] + sx * sc, item.box[1] + sy * sc, sw * sc, sh * sc]);
              });
              addSpot(it.word, item.box);
            });
            this.props.push(pr);
            if (p.solid) this.solids.push([o.x, o.y, o.w, o.h]);
            addSpot(p.action ? `@${p.action}` : p.word, pr.box, { main: !pr.floating && !p.quiet, word2: p.word });
            if (p.action && p.word) addSpot(p.word, [pr.box[0], pr.box[1], pr.box[2], pr.box[3] * 0.35]);
            break;
          }
          case 'walker': {
            // Khách tham quan đi qua đi lại trên đoạn [x, x + w] ở chân y + h, dừng ngắm cảnh ở hai đầu
            const art = WALKERS[p.who];
            if (!art || !this.img[art.img]) break;
            const speed = p.speed || 38;
            this.walkers.push({ art, x0: o.x, x1: o.x + o.w, x: o.x + o.w * (p.start ?? 0.5), y: base, dir: p.dir === 'left' ? -1 : 1,
              speed, pause: 0, rest: p.rest || 2.5, dist: 0 });
            break;
          }
          case 'npc':
            // NPC có thể đổi chỗ sau một nhiệm vụ (thuộc tính after / until trong Tiled)
            if (this.npcActive(o)) this.npcs.push({ id: o.name, x: cx, y: base, dir: p.facing || 'down', flip: false });
            break;
          case 'finale':
            this.finales.push({ id: o.name, act: p.act, x: o.x, y: o.y, w: o.w, h: o.h });
            break;
          case 'gate':
            this.gate = { x: o.x, w: o.w, base };
            this.solids.push([o.x, base - 16, 24, 16], [o.x + o.w - 24, base - 16, 24, 16]);
            addSpot(p.word, [o.x + 30, base - 140, o.w - 60, 80]);
            break;
          case 'collectible':
            this.items.push({ id: o.name, type: p.type || 'tea', x: cx, y: o.y + o.h / 2 + 18 });
            break;
          case 'spot':
            addSpot(p.word, [o.x, o.y, o.w, o.h], { ground: true });
            break;
          case 'exit':
            this.exits.push({ rect: [o.x, o.y, o.w, o.h], to: p.to, sx: Number(p.sx) * T, sy: Number(p.sy) * T, dir: p.facing || 'down' });
            break;
          case 'spawn':
            if (!start || o.name === 'default') start = { x: cx, y: base, dir: p.facing || 'down' };
            break;
          case 'strings':
            this.above.push({ draw: p.draw, rect: { x: o.x, y: o.y, w: o.w, h: o.h } });
            if (p.word) addSpot(p.word, [o.x, o.y, o.w, o.h * 0.9]);
            break;
          default:
            break;
        }
      });
      // Điểm chạm nhỏ được ưu tiên trước điểm chạm lớn
      this.spots.sort((a, b) => a.rect[2] * a.rect[3] - b.rect[2] * b.rect[3]);
      this.buildGrid();
      this.lights = this.collectLights();
      return start;
    }

    enter(id, spawn) {
      const start = this.buildScene(id);
      const map = this.map;
      this.anim = null;
      const s = spawn || start || { x: T * 1.5, y: T * 2, dir: 'down' };
      Object.assign(this.player, { x: s.x, y: s.y, dir: s.dir || 'down', path: [], onArrive: null, moving: false });
      if (this.blocked(this.player.x, this.player.y)) {
        const free = this.nearestFree(Math.floor(this.player.x / T), Math.floor(this.player.y / T));
        if (free) Object.assign(this.player, { x: free[0] * T + T / 2, y: free[1] * T + T / 2 });
      }
      this.autoNpc = null;
      this.autoSpot = null;
      this.fade = 1;
      this.camTo(true);
      const mp = map.props;
      this.zone = { ...mp, id: mp.zone || id, scene: id };
      this.hooks.onZone(this.zone);
    }

    // Dựng lại cảnh đang đứng (đổi giờ, NPC đổi chỗ) mà giữ nguyên vị trí người chơi
    refresh(fade) {
      if (!this.map) return;
      const { x, y, dir } = this.player;
      this.buildScene(this.sceneId);
      Object.assign(this.player, { x, y, dir, path: [], onArrive: null });
      if (this.blocked(x, y)) {
        const free = this.nearestFree(Math.floor(x / T), Math.floor(y / T));
        if (free) Object.assign(this.player, { x: free[0] * T + T / 2, y: free[1] * T + T / 2 });
      }
      if (fade) this.fade = 1;
    }

    /* --- Mũi tên chỉ đường (thay cho dịch chuyển tức thời) --- */

    setGuide(guide) {
      this.guide = guide || null;
    }

    findTarget(g) {
      for (const id of MAPS) {
        const objs = this.maps[id].objects;
        if (g.npc) {
          const o = objs.find((x) => x.kind === 'npc' && x.name === g.npc && this.npcActive(x));
          if (o) return { scene: id, x: o.x + o.w / 2, y: o.y + o.h };
        }
        if (g.building) {
          const o = objs.find((x) => x.kind === 'building' && x.props.sprite === g.building);
          if (o) return { scene: id, x: o.x + o.w * 0.71, y: o.y + o.h + 24 };
        }
      }
      return null;
    }

    // Bản đồ kế tiếp trên đường ngắn nhất từ cảnh này tới cảnh đích (theo các lối ra)
    route(from, to) {
      const prev = { [from]: null };
      const q = [from];
      while (q.length) {
        const cur = q.shift();
        if (cur === to) break;
        this.maps[cur].objects.filter((o) => o.kind === 'exit').forEach((o) => {
          const nx = o.props.to;
          if (this.maps[nx] && !(nx in prev)) {
            prev[nx] = cur;
            q.push(nx);
          }
        });
      }
      if (!(to in prev)) return null;
      let step = to;
      while (prev[step] !== from && prev[step] !== null) step = prev[step];
      return step;
    }

    guidePoint() {
      const g = this.guide;
      if (!g || !this.map) return null;
      const target = this.findTarget(g);
      if (!target) return null;
      if (target.scene === this.sceneId) {
        const n = g.npc && this.npcs.find((x) => x.id === g.npc);
        return n ? { x: n.x, y: n.y, here: true, npc: true } : { x: target.x, y: target.y, here: true };
      }
      const next = this.route(this.sceneId, target.scene);
      const exit = next && this.exits.find((e) => e.to === next);
      return exit ? { x: exit.rect[0] + exit.rect[2] / 2, y: exit.rect[1] + exit.rect[3] / 2, here: false, to: next } : null;
    }

    // Người chơi đang đứng gần cửa Hội An Quán
    nearHall() {
      const t = this.findTarget({ building: 'hall' });
      return Boolean(t && t.scene === this.sceneId && Math.hypot(t.x - this.player.x, t.y - this.player.y) < 230);
    }

    /* --- Hành động cuối nhiệm vụ --- */

    hasFinale(id) {
      return this.finales.some((f) => f.id === id);
    }

    playFinale(id, done) {
      const f = this.finales.find((x) => x.id === id);
      if (!f) {
        if (done) done();
        return false;
      }
      this.keys.clear();
      Object.assign(this.player, { path: [], onArrive: null, moving: false });
      this.anim = { f, t: 0, dur: f.act === 'release' ? 4 : 2.8, done };
      return true;
    }

    drawFinale(ctx, f, t) {
      const playing = this.anim && this.anim.f === f;
      if (!playing && !this.hooks.questDone(f.id)) return;
      const k = playing ? Math.min(1, this.anim.t / this.anim.dur) : 1;
      FINALE[f.act](ctx, f, k, t, this.img.lotus);
    }

    countCollectibles(type) {
      return Object.values(this.maps).reduce((n, m) => n + m.objects.filter((o) => o.kind === 'collectible' && (o.props.type || 'tea') === type).length, 0);
    }

    sceneOfNpc(npcId) {
      return MAPS.find((id) => this.maps[id].objects.some((o) => o.kind === 'npc' && o.name === npcId && this.npcActive(o)));
    }

    /* --- Va chạm & tìm đường --- */

    overlaps(r, x, y, w, h) {
      return x < r[0] + r[2] && x + w > r[0] && y < r[1] + r[3] && y + h > r[1];
    }

    npcBox(n) {
      return [n.x - 18, n.y - 12, 36, 14];
    }

    blocked(px, py) {
      const x = px - HB_W / 2;
      const y = py - HB_H;
      const m = this.map;
      if (x < 0 || y < 0 || x + HB_W > m.w * T || py > m.h * T) return true;
      const tx0 = Math.floor(x / T);
      const tx1 = Math.floor((x + HB_W - 1) / T);
      const ty0 = Math.floor(y / T);
      const ty1 = Math.floor((py - 1) / T);
      for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) if (this.solidTile[ty * m.w + tx]) return true;
      if (this.solids.some((r) => this.overlaps(r, x, y, HB_W, HB_H))) return true;
      return this.npcs.some((n) => this.overlaps(this.npcBox(n), x, y, HB_W, HB_H));
    }

    buildGrid() {
      const m = this.map;
      const grid = new Uint8Array(m.w * m.h);
      for (let ty = 0; ty < m.h; ty++) {
        for (let tx = 0; tx < m.w; tx++) {
          grid[ty * m.w + tx] = this.blocked(tx * T + T / 2, ty * T + T / 2 + HB_H / 2) ? 1 : 0;
        }
      }
      this.grid = grid;
    }

    nearestFree(tx, ty) {
      const m = this.map;
      const seen = new Set();
      const q = [[tx, ty]];
      while (q.length) {
        const [x, y] = q.shift();
        const k = y * m.w + x;
        if (x < 0 || y < 0 || x >= m.w || y >= m.h || seen.has(k)) continue;
        seen.add(k);
        if (!this.grid[k]) return [x, y];
        if (seen.size > 400) break;
        q.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      return null;
    }

    findPath(tx, ty) {
      const m = this.map;
      const sx = Math.floor(this.player.x / T);
      const sy = Math.floor((this.player.y - 1) / T);
      let goal = [tx, ty];
      if (tx < 0 || ty < 0 || tx >= m.w || ty >= m.h || this.grid[ty * m.w + tx]) goal = this.nearestFree(Math.max(0, Math.min(m.w - 1, tx)), Math.max(0, Math.min(m.h - 1, ty)));
      if (!goal) return null;
      const start = sy * m.w + sx;
      const end = goal[1] * m.w + goal[0];
      const prev = new Int32Array(m.w * m.h).fill(-1);
      prev[start] = start;
      const q = [start];
      for (let qi = 0; qi < q.length; qi++) {
        const cur = q[qi];
        if (cur === end) break;
        const cx = cur % m.w;
        const cy = Math.floor(cur / m.w);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx;
          const ny = cy + dy;
          const ni = ny * m.w + nx;
          if (nx < 0 || ny < 0 || nx >= m.w || ny >= m.h || prev[ni] !== -1 || (this.grid[ni] && ni !== end)) continue;
          prev[ni] = cur;
          q.push(ni);
        }
      }
      if (prev[end] === -1) return null;
      const path = [];
      for (let at = end; at !== start; at = prev[at]) path.unshift([(at % m.w) * T + T / 2, Math.floor(at / m.w) * T + T / 2 + HB_H / 2]);
      return { path, goal };
    }

    walkTo(x, y, onArrive) {
      const res = this.findPath(Math.floor(x / T), Math.floor(y / T));
      if (!res) return false;
      const path = res.path;
      // Điểm cuối: đúng chỗ chạm nếu đứng được
      if (!this.blocked(x, y) && Math.floor(x / T) === res.goal[0] && Math.floor(y / T) === res.goal[1]) {
        if (path.length) path[path.length - 1] = [x, y];
        else path.push([x, y]);
      }
      this.player.path = path;
      this.player.onArrive = onArrive || null;
      this.player.stuck = 0;
      if (!path.length && onArrive) {
        this.player.onArrive = null;
        onArrive();
      }
      return true;
    }

    face(x, y) {
      const dx = x - this.player.x;
      const dy = y - this.player.y;
      this.player.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    }

    talkTo(npc) {
      const opts = [[0, 60], [-62, 0], [62, 0], [0, -46]]
        .map(([dx, dy]) => [npc.x + dx, npc.y + dy])
        .filter(([x, y]) => !this.blocked(x, y))
        .sort((a, b) => Math.hypot(a[0] - this.player.x, a[1] - this.player.y) - Math.hypot(b[0] - this.player.x, b[1] - this.player.y));
      const go = opts[0] || [npc.x, npc.y + 60];
      const arrive = () => {
        this.face(npc.x, npc.y - 20);
        npc.flip = this.player.x < npc.x;
        if (this.autoNpc === npc.id && this.paused) return;
        this.autoNpc = npc.id;
        this.hooks.onNpc(npc);
      };
      if (Math.hypot(go[0] - this.player.x, go[1] - this.player.y) < 8) arrive();
      else this.walkTo(go[0], go[1], arrive);
    }

    travelTo(npcId) {
      const sceneId = this.sceneOfNpc(npcId);
      if (!sceneId) return false;
      if (sceneId !== this.sceneId) this.enter(sceneId);
      const npc = this.npcs.find((n) => n.id === npcId);
      if (!npc) return false;
      this.autoNpc = npc.id;
      const spot = [[0, 70], [-70, 0], [70, 0]].map(([dx, dy]) => [npc.x + dx, npc.y + dy]).find(([x, y]) => !this.blocked(x, y));
      if (spot) {
        this.player.x = spot[0];
        this.player.y = spot[1];
        this.fade = 1;
        this.camTo(true);
      }
      this.autoNpc = null;
      this.talkTo(npc);
      return true;
    }

    setPosition(sceneId, x, y) {
      this.enter(sceneId, { x, y, dir: 'down' });
    }

    /* --- Điều khiển --- */

    bindInput() {
      const KEYS = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down', A: 'left', D: 'right', W: 'up', S: 'down' };
      window.addEventListener('keydown', (e) => {
        if (this.paused || !this.map || e.target.closest('input, textarea, select, [contenteditable]')) return;
        if (KEYS[e.key]) {
          this.keys.add(KEYS[e.key]);
          this.player.path = [];
          this.player.onArrive = null;
          e.preventDefault();
        } else if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest('button, a')) {
          this.interact();
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', (e) => { if (KEYS[e.key]) this.keys.delete(KEYS[e.key]); });
      window.addEventListener('blur', () => this.keys.clear());
      this.canvas.addEventListener('pointerdown', (e) => this.onPointer(e));
    }

    hold(dir, on) {
      if (on && !this.paused) {
        this.keys.add(dir);
        this.player.path = [];
      } else {
        this.keys.delete(dir);
      }
    }

    interact() {
      const p = this.player;
      const npc = this.npcs.map((n) => [n, Math.hypot(n.x - p.x, n.y - p.y)]).filter(([, dd]) => dd < 110).sort((a, b) => a[1] - b[1])[0];
      if (npc) return this.talkTo(npc[0]);
      const near = this.spots
        .filter((s) => !s.ground && !s.tree)
        .map((s) => [s, Math.hypot(s.rect[0] + s.rect[2] / 2 - p.x, s.rect[1] + s.rect[3] - p.y)])
        .filter(([, dd]) => dd < 110)
        .sort((a, b) => a[1] - b[1])[0];
      if (!near) return;
      if (near[0].action) this.hooks.onAction(near[0].action, near[0]);
      else this.hooks.onPoke(near[0]);
    }

    onPointer(e) {
      if (this.paused || !this.map) return;
      const r = this.canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) * this.canvas.width) / r.width + this.cam.x;
      const y = ((e.clientY - r.top) * this.canvas.height) / r.height + this.cam.y;
      const item = this.items.find((c) => !this.hooks.isCollected(c.id) && Math.abs(c.x - x) < 34 && Math.abs(c.y - 40 - y) < 44);
      if (item) return this.walkTo(item.x, item.y);
      const npc = this.npcs.find((n) => {
        const [, hgt] = this.npcArt(n);
        return x > n.x - 34 && x < n.x + 34 && y > n.y - hgt && y < n.y + 4;
      });
      if (npc) {
        this.autoNpc = null;
        return this.talkTo(npc);
      }
      const spot = this.spots.find((s) => x >= s.rect[0] && x <= s.rect[0] + s.rect[2] && y >= s.rect[1] && y <= s.rect[1] + s.rect[3]);
      if (spot && !(spot.ground && !this.grid[Math.floor(y / T) * this.map.w + Math.floor(x / T)])) {
        this.face(x, y);
        if (spot.action) {
          const sx = spot.rect[0] + spot.rect[2] / 2;
          const sy = spot.rect[1] + spot.rect[3] + 40;
          return this.walkTo(sx, sy, () => { this.face(sx, sy - 80); this.hooks.onAction(spot.action, spot); });
        }
        return this.hooks.onPoke(spot);
      }
      this.walkTo(x, y);
    }

    /* --- Cập nhật --- */

    camTo(snap) {
      const m = this.map;
      const W = this.viewW;
      const mw = m.w * T;
      const mh = m.h * T;
      const f = this.anim && this.anim.f;
      const fx = f ? f.x + f.w / 2 : this.player.x;
      const fy = f ? f.y + f.h / 2 : this.player.y - 40;
      const tx = mw <= W ? -(W - mw) / 2 : Math.max(0, Math.min(mw - W, fx - W / 2));
      const ty = mh <= VIEW_H ? -(VIEW_H - mh) / 2 : Math.max(0, Math.min(mh - VIEW_H, fy - VIEW_H / 2));
      if (snap) {
        this.cam.x = tx;
        this.cam.y = ty;
      } else {
        this.cam.x += (tx - this.cam.x) * 0.12;
        this.cam.y += (ty - this.cam.y) * 0.12;
      }
    }

    // Pháo hoa trên bầu trời đêm (lễ trao danh hiệu)
    celebrate(seconds = 7) {
      this.fx = { t: 0, dur: seconds };
    }

    drawFireworks(ctx, W) {
      const fx = this.fx;
      if (!fx) return;
      ctx.globalCompositeOperation = 'lighter';
      for (let b = 0; b < 9; b++) {
        const t0 = (b * 0.7) % fx.dur;
        const age = fx.t - t0;
        if (age < 0 || age > 1.6) continue;
        const cx = this.cam.x + W * (0.12 + ((b * 0.37) % 0.78));
        const cy = this.cam.y + 90 + ((b * 53) % 160);
        const r = 20 + age * 70;
        const a = Math.max(0, 1 - age / 1.6);
        const color = GATE_COLORS[b % GATE_COLORS.length];
        // quầng sáng giữa và hai vòng tia
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.2);
        glow.addColorStop(0, `rgba(255, 230, 160, ${0.45 * a})`);
        glow.addColorStop(1, 'rgba(255, 230, 160, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(cx - r * 1.2, cy - r * 1.2, r * 2.4, r * 2.4);
        ctx.globalAlpha = a;
        ctx.fillStyle = color;
        for (let k = 0; k < 18; k++) {
          const ang = (k / 18) * Math.PI * 2;
          const fall = age * age * 18;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r + fall, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(cx + Math.cos(ang + 0.17) * r * 0.6, cy + Math.sin(ang + 0.17) * r * 0.6 + fall, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    updateWalkers(dt) {
      this.walkers.forEach((w) => {
        if (w.pause > 0) {
          w.pause -= dt;
          return;
        }
        w.x += w.dir * w.speed * dt;
        w.dist += w.speed * dt;
        if (w.x <= w.x0 || w.x >= w.x1) {
          w.x = Math.min(w.x1, Math.max(w.x0, w.x));
          w.dir = -w.dir;
          w.pause = w.art.wheel ? 0.6 : w.rest; // đầu đường: đứng ngắm phố (nhìn thẳng) rồi quay lại
        }
      });
    }

    update(dt) {
      const p = this.player;
      this.updateWalkers(dt);
      if (this.fx) {
        this.fx.t += dt;
        if (this.fx.t > this.fx.dur) this.fx = null;
      }
      if (this.anim) {
        this.anim.t += dt;
        if (this.anim.t >= this.anim.dur) {
          const { done } = this.anim;
          this.anim = null;
          if (done) done();
        }
        p.moving = false;
        this.camTo(false);
        if (this.fade > 0) this.fade = Math.max(0, this.fade - dt * 2.4);
        return;
      }
      let vx = 0;
      let vy = 0;
      if (!this.paused) {
        if (this.keys.has('left')) vx -= 1;
        if (this.keys.has('right')) vx += 1;
        if (this.keys.has('up')) vy -= 1;
        if (this.keys.has('down')) vy += 1;
        if (!vx && !vy && p.path.length) {
          const [tx, ty] = p.path[0];
          const dx = tx - p.x;
          const dy = ty - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 5) {
            p.path.shift();
            if (!p.path.length && p.onArrive) {
              const cb = p.onArrive;
              p.onArrive = null;
              cb();
            }
          } else {
            vx = dx / dist;
            vy = dy / dist;
          }
        }
      }
      if (vx || vy) {
        const len = Math.hypot(vx, vy);
        const sx = (vx / len) * SPEED * dt;
        const sy = (vy / len) * SPEED * dt;
        const ox = p.x;
        const oy = p.y;
        if (!this.blocked(p.x + sx, p.y)) p.x += sx;
        if (!this.blocked(p.x, p.y + sy)) p.y += sy;
        const moved = Math.hypot(p.x - ox, p.y - oy);
        p.dir = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'right' : 'left') : (vy > 0 ? 'down' : 'up');
        p.moving = moved > 0.1;
        p.phase += dt * 8;
        if (p.path.length && moved < 0.2) {
          p.stuck += dt;
          if (p.stuck > 0.35) {
            p.path = [];
            p.onArrive = null;
          }
        } else {
          p.stuck = 0;
        }
      } else {
        p.moving = false;
      }
      if (!this.paused) this.checkProximity();
      this.camTo(false);
      if (this.fade > 0) this.fade = Math.max(0, this.fade - dt * 2.4);
    }

    // Tới gần NPC hoặc vật phẩm (< 80px) thì tự bật khung thoại / thẻ từ; tới lối ra thì sang cảnh mới
    checkProximity() {
      const p = this.player;
      if (this.guide) {
        const gp = this.guidePoint();
        if (!gp || (gp.here && Math.hypot(gp.x - p.x, gp.y - p.y) < (gp.npc ? NEAR + 20 : 110))) this.guide = null;
      }
      const exit = this.exits.find((e) => p.x > e.rect[0] && p.x < e.rect[0] + e.rect[2] && p.y > e.rect[1] && p.y <= e.rect[1] + e.rect[3] + 2);
      if (exit) {
        this.keys.clear();
        this.enter(exit.to, { x: exit.sx, y: exit.sy, dir: exit.dir });
        return;
      }
      this.items.forEach((c) => {
        if (!this.hooks.isCollected(c.id) && Math.hypot(c.x - p.x, c.y - p.y) < 36) this.hooks.onCollect(c);
      });
      if (this.autoNpc) {
        const prev = this.npcs.find((n) => n.id === this.autoNpc);
        if (!prev || Math.hypot(prev.x - p.x, prev.y - p.y) > NEAR + 60) this.autoNpc = null;
      }
      const npc = this.npcs.find((n) => Math.hypot(n.x - p.x, n.y - p.y) < NEAR);
      if (npc && npc.id !== this.autoNpc && this.hooks.wantsAutoTalk(npc)) {
        this.autoNpc = npc.id;
        p.path = [];
        p.onArrive = null;
        this.keys.clear();
        this.face(npc.x, npc.y - 20);
        npc.flip = p.x < npc.x;
        this.hooks.onNpc(npc);
        return;
      }
      // Tới gần một NPC (chưa đủ gần để bắt chuyện): báo cho game, ví dụ để phát lời rao tiếng Việt
      const near = this.npcs.map((n) => [n, Math.hypot(n.x - p.x, n.y - p.y)]).filter(([, dd]) => dd < NEAR + 90).sort((a2, b2) => a2[1] - b2[1])[0];
      const nearId = near ? near[0].id : null;
      if (nearId !== this.nearNpc) {
        this.nearNpc = nearId;
        if (near && this.hooks.onNear) this.hooks.onNear(near[0]);
      }
      // Đi ngang trước cửa hàng quán: báo cho game để phát lời rao của quán
      const shop = this.buildings.find((b) => b.shop && Math.abs(b.x + b.w / 2 - p.x) < b.w * 0.55 && p.y > b.base - 10 && p.y < b.base + 200);
      const shopId = shop ? shop.shop : null;
      if (shopId !== this.nearShop) {
        this.nearShop = shopId;
        if (shop && this.hooks.onShopNear) this.hooks.onShopNear(shopId);
      }
      if (this.autoSpot) {
        const s = this.spots.find((x) => x.key === this.autoSpot);
        if (!s || Math.hypot(s.rect[0] + s.rect[2] / 2 - p.x, s.rect[1] + s.rect[3] - p.y) > NEAR + 60) this.autoSpot = null;
      }
      // Đang trên đường tới NPC hoặc quầy thì không tự bật thẻ từ dọc đường
      if (p.onArrive) return;
      const spot = this.spots.find((s) => s.main && s.word && Math.hypot(s.rect[0] + s.rect[2] / 2 - p.x, s.rect[1] + s.rect[3] - p.y) < NEAR - 10 && this.hooks.wantsAutoPoke(s));
      if (spot && spot.key !== this.autoSpot) {
        this.autoSpot = spot.key;
        this.hooks.onPoke(spot, { auto: true });
      }
    }

    frame(now) {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      if (this.map) {
        this.update(dt);
        this.render(now);
      }
      requestAnimationFrame((t) => this.frame(t));
    }

    /* --- Vẽ --- */

    npcArt(n) {
      if (n.id === 'ambassador') return [this.hooks.ambassadorArt(), 124];
      const a = NPC_ART[n.id];
      return a ? [a[0], a[1]] : ['cBoy', 124];
    }

    collectLights() {
      const L = [];
      this.props.forEach((pr) => {
        if (pr.draw === 'eboat') L.push({ x: pr.cx, y: pr.box[1] + 30, r: 90, c: '255,190,90' });
        if (pr.floating) L.push({ x: pr.cx, y: pr.base - 30, r: 46, c: '255,200,110', floater: true });
        // Đèn trên vật trang trí (đèn đá, đèn lồng trên tường, cột đèn bến đá…)
        if (pr.glow) {
          String(pr.glow).split(';').forEach((g) => {
            const [fx, fy] = g.split(',').map(Number);
            const gx = pr.flip ? pr.box[0] + pr.box[2] * (1 - fx) : pr.box[0] + pr.box[2] * fx;
            L.push({ x: gx, y: pr.box[1] + pr.box[3] * fy, r: 56, c: '255,180,80' });
          });
        }
      });
      this.above.forEach((a) => {
        if (a.draw !== 'lanternStrings') return;
        for (let x = a.rect.x + 40; x < a.rect.x + a.rect.w; x += 96) L.push({ x, y: a.rect.y + 30, r: 46, c: '255,170,60' });
      });
      if (this.gate && this.hooks.gateLanterns) {
        const g = this.gate;
        const lamps = this.hooks.gateLanterns();
        lamps.forEach((lit, i) => {
          if (lit) L.push({ x: g.x + 40 + ((g.w - 80) * i) / Math.max(1, lamps.length - 1), y: g.base - 100, r: 70, c: '255,180,80' });
        });
      }
      this.buildings.forEach((b) => {
        if (b.key === 'fHall') L.push({ x: b.x + b.w * 0.71, y: b.base - 40, r: 120, c: '200,50,40', boss: true });
        L.push({ x: b.x + b.w / 2, y: b.base - 30, r: 80, c: '255,180,80' });
      });
      return L;
    }

    render(t) {
      const ctx = this.ctx;
      const W = this.canvas.width;
      const cx = Math.round(this.cam.x);
      const cy = Math.round(this.cam.y);
      const vis = (x, y, w, h) => x + w > cx - 40 && x < cx + W + 40 && y + h > cy - 40 && y < cy + VIEW_H + 40;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, VIEW_H);
      ctx.save();
      ctx.translate(-cx, -cy);
      ctx.drawImage(this.ground, 0, 0);

      // Mặt nước lăn tăn
      this.waterTiles.forEach(([tx, ty]) => {
        const x = tx * T;
        const y = ty * T;
        if (!vis(x, y, T, T)) return;
        const ph = (t / 900 + tx * 0.7 + ty * 1.3) % 2;
        if (ph < 0.7) {
          ctx.strokeStyle = 'rgba(160, 210, 190, .45)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x + 14 + ph * 26, y + 30 + (ty % 2) * 12, 9, Math.PI * 1.15, Math.PI * 1.85);
          ctx.stroke();
        }
      });
      this.props.filter((pr) => pr.floating).forEach((pr) => this.drawProp(ctx, pr, t));
      this.finales.filter((f) => FINALE_LAYER[f.act] === 'water').forEach((f) => this.drawFinale(ctx, f, t));

      // Sắp theo chiều sâu: nhà, cây, đồ vật, NPC, người chơi, vật phẩm
      const list = [];
      this.buildings.forEach((b) => { if (vis(b.x, b.y - 60, b.w, b.h + 60)) list.push({ y: b.base, draw: () => this.drawBuilding(ctx, b, t) }); });
      this.walkers.forEach((w) => { if (vis(w.x - 90, w.y - 140, 180, 150)) list.push({ y: w.y, draw: () => this.drawWalker(ctx, w) }); });
      this.trees.forEach((tr) => { if (vis(tr.cx - 80, tr.base - 220, 160, 230)) list.push({ y: tr.base, draw: () => drawTree(ctx, tr.variant, tr.cx, tr.base) }); });
      this.props.forEach((pr) => { if (!pr.floating && vis(pr.box[0], pr.box[1], pr.box[2], pr.box[3])) list.push({ y: pr.base, draw: () => this.drawProp(ctx, pr, t) }); });
      this.npcs.forEach((n) => { if (vis(n.x - 60, n.y - 140, 120, 150)) list.push({ y: n.y, draw: () => this.drawNpc(ctx, n, t) }); });
      this.items.forEach((c) => { if (!this.hooks.isCollected(c.id) && vis(c.x - 40, c.y - 80, 80, 90)) list.push({ y: c.y - 2, draw: () => this.drawItem(ctx, c, t) }); });
      this.finales.filter((f) => FINALE_LAYER[f.act] === 'sorted').forEach((f) => list.push({ y: f.y + f.h, draw: () => this.drawFinale(ctx, f, t) }));
      if (this.gate) {
        const g = this.gate;
        list.push({ y: g.base, draw: () => drawGate(ctx, g, this.hooks.gateLanterns ? this.hooks.gateLanterns() : [], t) });
      }
      const p = this.player;
      list.push({ y: p.y, draw: () => this.drawPlayer(ctx, p) });
      list.sort((a, b) => a.y - b.y).forEach((it) => it.draw());
      // Đi khuất sau nhà hoặc tán cây: vẽ thêm bóng mờ để người chơi vẫn thấy mình
      const hidden = this.buildings.some((b) => b.base > p.y && p.x > b.x + 10 && p.x < b.x + b.w - 10 && p.y - 20 > b.y)
        || this.trees.some((tr) => tr.base > p.y && tr.base - p.y < 150 && Math.abs(tr.cx - p.x) < 50)
        || this.props.some((pr) => pr.h >= 110 && pr.base > p.y && p.y - 20 > pr.box[1] && p.x > pr.box[0] + 8 && p.x < pr.box[0] + pr.box[2] - 8);
      if (hidden) {
        ctx.globalAlpha = 0.45;
        this.drawPlayer(ctx, p);
        ctx.globalAlpha = 1;
      }

      // Lớp trên đầu: dây đèn lồng
      this.above.forEach((a) => {
        const r = a.rect;
        ABOVE[a.draw](ctx, r, t);
      });
      this.finales.filter((f) => FINALE_LAYER[f.act] === 'above').forEach((f) => this.drawFinale(ctx, f, t));

      // Ánh sáng theo giờ trong ngày: sáng, trưa, chiều, hoàng hôn (đèn lồng bắt đầu sáng), tối
      const light = LIGHTS[this.phase()] || LIGHTS.noon;
      if (light.tint) {
        ctx.fillStyle = light.tint;
        ctx.fillRect(cx, cy, W, VIEW_H);
      }
      if (light.glow) {
        ctx.globalCompositeOperation = 'lighter';
        this.lights.forEach((l) => {
          if (!vis(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2)) return;
          const fl = l.boss ? 0.5 + Math.sin(t / 300) * 0.2 : light.glow + Math.sin(t / 260 + l.x) * 0.05;
          const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
          g.addColorStop(0, `rgba(${l.c},${fl})`);
          g.addColorStop(1, `rgba(${l.c},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
        });
        ctx.globalCompositeOperation = 'source-over';
      }

      this.drawFireworks(ctx, W);
      this.drawMarkers(ctx, t, vis);
      ctx.restore();
      if (this.fade > 0) {
        ctx.fillStyle = `rgba(26,26,26,${this.fade})`;
        ctx.fillRect(0, 0, W, VIEW_H);
      }
    }

    drawWalker(ctx, w) {
      const a = w.art;
      const im = this.img[a.img];
      const cw = im.width / (1 + a.nl + a.nr);
      let cell = 0; // đứng ngắm phố: nhìn thẳng
      if (w.pause <= 0 || a.wheel) {
        const n = w.dir < 0 ? a.nl : a.nr;
        const step = a.wheel ? 0 : Math.floor(w.dist / 24) % n;
        cell = w.dir < 0 ? 1 + step : 1 + a.nl + step;
      }
      const dh = a.h;
      const dw = (cw / im.height) * dh;
      const bob = w.pause <= 0 && !a.wheel ? Math.abs(Math.sin(w.dist / 10)) * 2.5 : 0;
      shadow(ctx, w.x, w.y, a.wheel ? 64 : 20);
      ctx.drawImage(im, cell * cw, 0, cw, im.height, w.x - dw / 2, w.y - dh - bob, dw, dh);
    }

    // Khói bếp bốc lên từ quán (thuộc tính steam = "fx,fy" theo tỉ lệ ảnh nhà, nhiều điểm cách nhau bằng ;)
    drawSteam(ctx, b, t) {
      b.steam.forEach(([fx, fy], k) => {
        const sx = b.x + b.w * (b.flip ? 1 - fx : fx);
        const sy = b.y + b.h * fy;
        for (let i = 0; i < 4; i++) {
          const ph = (t / 1700 + i / 4 + k * 0.37) % 1;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * (1 - ph)})`;
          ctx.beginPath();
          ctx.arc(sx + Math.sin(ph * 6 + i + k) * 6, sy - ph * 50, 4 + ph * 11, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    drawBuilding(ctx, b, t = 0) {
      const im = this.img[b.key];
      if (b.flip) {
        ctx.save();
        ctx.translate(b.x + b.w, b.y);
        ctx.scale(-1, 1);
        ctx.drawImage(im, 0, 0, b.w, b.h);
        ctx.restore();
      } else {
        ctx.drawImage(im, b.x, b.y, b.w, b.h);
      }
      if (b.sign) {
        const r = SIGN[b.key];
        const lx = b.flip ? im.width - r[0] - r[2] : r[0];
        const x = b.x + lx * b.scale;
        const y = b.y + r[1] * b.scale;
        const w = r[2] * b.scale;
        const h = r[3] * b.scale;
        rr(ctx, x, y, w, h, 3);
        inked(ctx, '#D9B98A', 2);
        ctx.fillStyle = INK;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `800 ${Math.max(9, Math.round(h / (b.sign.length + 0.7)))}px "Be Vietnam Pro", sans-serif`;
        b.sign.forEach((line, i) => ctx.fillText(line, x + w / 2, y + h * ((i + 1) / (b.sign.length + 1)) + 1, w - 4));
      }
      if (b.steam) this.drawSteam(ctx, b, t);
    }

    drawProp(ctx, pr, t) {
      const bob = pr.floating ? Math.sin(t / 600 + pr.cx) * 3 : 0;
      if (pr.floating || pr.img) shadow(ctx, pr.cx, pr.base, Math.min(pr.w * 0.38, 60));
      if (pr.img && pr.flip) {
        ctx.save();
        ctx.translate(pr.box[0] + pr.box[2], 0);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img[pr.img], 0, pr.box[1] + bob, pr.box[2], pr.box[3]);
        ctx.restore();
      } else if (pr.img) {
        ctx.drawImage(this.img[pr.img], pr.box[0], pr.box[1] + bob, pr.box[2], pr.box[3]);
      } else {
        DRAW[pr.draw](ctx, pr.cx, pr.base, pr.w, pr.h);
      }
      if (pr.label) {
        const [fx, fy] = String(pr.labelAt || '0.5,0.45').split(',').map(Number);
        const lx = pr.box[0] + pr.box[2] * fx;
        const ly = pr.box[1] + pr.box[3] * fy;
        ctx.font = '800 12px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const tw = ctx.measureText(pr.label).width + 18;
        rr(ctx, lx - tw / 2, ly - 12, tw, 24, 4);
        inked(ctx, PAPER, 2);
        ctx.fillStyle = INK;
        ctx.fillText(pr.label, lx, ly + 1);
      }
      pr.on.forEach((it) => {
        if (it.img) ctx.drawImage(this.img[it.img], it.box[0], it.box[1], it.box[2], it.box[3]);
        else DRAW[it.draw](ctx, it.cx, it.base, it.w, it.h);
      });
    }

    drawNpc(ctx, n, t) {
      const [key, hgt] = this.npcArt(n);
      const im = this.img[key];
      const w = (im.width / im.height) * hgt;
      const bob = Math.sin(t / 700 + n.x) > 0.7 ? 1.5 : 0;
      shadow(ctx, n.x, n.y, 24);
      ctx.save();
      if (n.flip) {
        ctx.translate(n.x * 2, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(im, n.x - w / 2, n.y - hgt - bob, w, hgt);
      ctx.restore();
    }

    drawPlayer(ctx, p) {
      const im = this.playerImg;
      if (!im) return;
      shadow(ctx, p.x, p.y, 22);
      if (this.playerKind === 'girl') {
        // Áo dài: 3 khung (trước, nghiêng, sau); đi bộ thì nhún nhẹ
        const cw = im.width / 3;
        const col = p.dir === 'down' ? 0 : p.dir === 'up' ? 2 : 1;
        const bob = p.moving ? Math.abs(Math.sin(p.phase * 1.6)) * 4 : 0;
        const h = CHAR_H;
        const w = (cw / im.height) * h;
        ctx.save();
        if (p.dir === 'left') {
          ctx.translate(p.x * 2, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(im, col * cw, 0, cw, im.height, p.x - w / 2, p.y - h - bob, w, h);
        ctx.restore();
        return;
      }
      const cw = im.width / 4;
      const ch = im.height / 4;
      const row = { down: 0, up: 1, left: 2, right: 3 }[p.dir];
      const col = p.moving ? Math.floor(p.phase) % 4 : 0;
      const h = CHAR_H;
      const w = (cw / ch) * h;
      ctx.drawImage(im, col * cw, row * ch, cw, ch, p.x - w / 2, p.y - h, w, h);
    }

    drawItem(ctx, c, t) {
      const x = c.x;
      const y = c.y - 40 + Math.sin(t / 320 + c.x) * 4;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 40);
      glow.addColorStop(0, c.type === 'tea' ? 'rgba(230,180,34,.6)' : 'rgba(27,77,62,.5)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - 40, y - 40, 80, 80);
      if (c.type === 'tea') {
        const im = this.img.icedTea;
        const w = 40;
        const h = (im.height / im.width) * w;
        ctx.drawImage(im, x - w / 2, y - h / 2, w, h);
      } else {
        drawBook(ctx, x, y);
      }
    }

    drawMarkers(ctx, t, vis) {
      const hooks = this.hooks;
      const labels = hooks.labelsOn();
      const pulse = (Math.sin(t / 260) + 1) / 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Lối sang cảnh khác
      this.exits.forEach((e) => {
        const [x, y, w, h] = e.rect;
        if (!vis(x, y, w, h)) return;
        ctx.fillStyle = `rgba(230, 180, 34, ${0.35 + pulse * 0.35})`;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = INK;
        ctx.font = '900 22px "Be Vietnam Pro", sans-serif';
        const arrow = x === 0 ? '◄' : x + w >= this.map.w * T ? '►' : y === 0 ? '▲' : '▼';
        ctx.fillText(arrow, x + w / 2, y + h / 2);
      });
      const drawn = new Set();
      this.spots.forEach((s) => {
        const cxs = s.rect[0] + s.rect[2] / 2;
        const top = s.rect[1];
        if (!vis(s.rect[0], s.rect[1], s.rect[2], s.rect[3])) return;
        if (s.action === 'boss') {
          const g = ctx.createRadialGradient(cxs, top + s.rect[3] / 2, 0, cxs, top + s.rect[3] / 2, 80);
          g.addColorStop(0, `rgba(200, 50, 40, ${0.3 + pulse * 0.25})`);
          g.addColorStop(1, 'rgba(200, 50, 40, 0)');
          ctx.fillStyle = g;
          ctx.fillRect(cxs - 80, top - 30, 160, s.rect[3] + 60);
          this.seal(ctx, cxs, top - 18, '⚔', false);
          return;
        }
        if (s.action === 'refill') {
          this.seal(ctx, cxs, top - 16, '☕', false);
          return;
        }
        if (!s.word) return;
        if (!hooks.isPoked(s.key)) {
          const tw = (t / 420 + s.rect[0] * 0.013 + s.rect[1] * 0.007) % 3;
          if (tw < 1.3) star(ctx, cxs, top + Math.min(s.rect[3] / 2, 30), Math.sin((tw / 1.3) * Math.PI));
          return;
        }
        if (!labels) return;
        const key = `${s.word}@${Math.round(cxs / 160)},${Math.round(top / 160)}`;
        if (drawn.has(key)) return;
        drawn.add(key);
        const word = hooks.wordLabel(s.word);
        if (!word) return;
        const state = hooks.wordState(s.word);
        ctx.font = '700 14px "Be Vietnam Pro", sans-serif';
        const tw = ctx.measureText(word).width + 14;
        const ly = top - 4;
        rr(ctx, cxs - tw / 2, ly - 11, tw, 22, 6);
        inked(ctx, state === 'known' ? '#1B4D3E' : state === 'unknown' ? '#C83228' : PAPER, 2);
        ctx.fillStyle = state === 'known' || state === 'unknown' ? '#FFF8E7' : INK;
        ctx.fillText(word, cxs, ly + 1);
      });
      // Con dấu nhiệm vụ trên đầu NPC
      this.npcs.forEach((n) => {
        const mark = hooks.questMark(n);
        if (!mark) return;
        const [, hgt] = this.npcArt(n);
        this.seal(ctx, n.x, n.y - hgt - 22 + (mark === '!' ? Math.sin(t / 220) * 3 : 0), mark, mark === '✓');
      });
      if (!this.anim) this.drawGuide(ctx, t);
      if (this.paused || this.anim) return;
      // Bong bóng chào của NPC gần nhất
      const p = this.player;
      const near = this.npcs.map((n) => [n, Math.hypot(n.x - p.x, n.y - p.y)]).filter(([, dd]) => dd < 220).sort((a, b) => a[1] - b[1])[0];
      if (!near) return;
      const n = near[0];
      const text = hooks.greetFor(n);
      if (!text) return;
      const [, hgt] = this.npcArt(n);
      ctx.font = '600 15px "Be Vietnam Pro", sans-serif';
      const tw = Math.min(300, ctx.measureText(text).width + 22);
      const y = n.y - hgt - (hooks.questMark(n) ? 64 : 22);
      rr(ctx, n.x - tw / 2, y - 16, tw, 30, 10);
      inked(ctx, '#FFF8E7', 2.5);
      ctx.fillStyle = INK;
      ctx.fillText(text, n.x, y, 280);
    }

    drawGuide(ctx, t) {
      const gp = this.guidePoint();
      if (!gp) return;
      const p = this.player;
      const ang = Math.atan2(gp.y - (p.y - 40), gp.x - p.x);
      const r = 76 + Math.sin(t / 220) * 6;
      const ax = p.x + Math.cos(ang) * r;
      const ay = p.y - 40 + Math.sin(ang) * r;
      ctx.save();
      ctx.translate(ax, ay);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-10, -15);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-10, 15);
      ctx.closePath();
      inked(ctx, '#C83228', 3);
      ctx.restore();
      const label = gp.here ? this.guide.label : this.hooks.sceneName && `➜ ${this.hooks.sceneName(gp.to)}`;
      if (label) {
        ctx.font = '700 13px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const tw = ctx.measureText(label).width + 16;
        const ly = ay + (Math.sin(ang) > 0.3 ? 26 : -26);
        rr(ctx, ax - tw / 2, ly - 11, tw, 22, 8);
        inked(ctx, '#FFF8E7', 2);
        ctx.fillStyle = INK;
        ctx.fillText(label, ax, ly + 1);
      }
      // Đích đã ở gần: mũi tên đỏ nhún trên đầu NPC / trên lối ra / trước cửa
      const my = gp.npc ? gp.y - 175 : gp.here ? gp.y - 40 : gp.y - 30;
      const bob = Math.abs(Math.sin(t / 240)) * 10;
      ctx.beginPath();
      ctx.moveTo(gp.x - 12, my - 16 - bob);
      ctx.lineTo(gp.x + 12, my - 16 - bob);
      ctx.lineTo(gp.x, my - bob);
      ctx.closePath();
      inked(ctx, '#C83228', 2.5);
    }

    seal(ctx, x, y, text, done) {
      rr(ctx, x - 16, y - 16, 32, 32, 5);
      inked(ctx, done ? '#1B4D3E' : '#C83228', 2.5);
      ctx.fillStyle = done ? PAPER : '#E6B422';
      ctx.font = '800 19px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y + 1);
    }
  }

  IT.Town = Town;
  IT.town = { MAPS };
})();
