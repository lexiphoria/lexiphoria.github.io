/* Immersion Town – thế giới Hội An 2026: bản đồ ô 32×32 và toàn bộ hình vẽ pixel (không cần tệp ảnh).
   Ký hiệu nền: '.' cỏ, ':' gạch tàu, ',' đường đá, '~' nước (không đi được), '=' sàn gỗ cầu/bến. */
(() => {
  'use strict';

  const IT = (window.IT = window.IT || {});
  const T = 32;

  /* ---------- Tiện ích vẽ ---------- */

  function R(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function hash(x, y, seed = 0) {
    let h = (x * 374761393 + y * 668265263 + seed * 982451653) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const mix = (c) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
    const r = mix((n >> 16) & 255);
    const g = mix((n >> 8) & 255);
    const b = mix(n & 255);
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

  function signText(ctx, text, cx, cy, color, size = 9) {
    ctx.fillStyle = color;
    ctx.font = `800 ${size}px "Plus Jakarta Sans", "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, cx, cy + 0.5);
  }

  /* ---------- Nền ---------- */

  const WALKABLE = new Set(['.', ':', ',', '=']);

  function drawTile(ctx, map, tx, ty) {
    const ch = map.grid[ty][tx];
    const x = tx * T;
    const y = ty * T;
    const at = (i, j) => (map.grid[j] ? map.grid[j][i] : undefined);
    switch (ch) {
      case '.': {
        R(ctx, x, y, T, T, '#6dbb63');
        for (let k = 0; k < 4; k++) {
          const hx = Math.floor(hash(tx, ty, k) * 28);
          const hy = Math.floor(hash(ty, tx, k + 9) * 28);
          R(ctx, x + hx, y + hy, 2, 4, k % 2 ? '#5aa451' : '#85cc7a');
        }
        if (hash(tx, ty, 7) < 0.08) {
          R(ctx, x + 12, y + 14, 4, 4, '#fff176');
          R(ctx, x + 13, y + 15, 2, 2, '#ff8f00');
        }
        break;
      }
      case ':': {
        R(ctx, x, y, T, T, '#c46f45');
        for (let j = 0; j < 2; j++) {
          for (let i = 0; i < 2; i++) {
            if (hash(tx * 2 + i, ty * 2 + j, 3) < 0.35) R(ctx, x + i * 16 + 1, y + j * 16 + 1, 14, 14, '#cf7c51');
          }
        }
        R(ctx, x, y, T, 1, '#a95a35');
        R(ctx, x, y + 16, T, 1, '#a95a35');
        R(ctx, x, y, 1, T, '#a95a35');
        R(ctx, x + 16, y, 1, T, '#a95a35');
        break;
      }
      case ',': {
        R(ctx, x, y, T, T, '#8d9ca3');
        for (let j = 0; j < 3; j++) {
          const off = (j + ty) % 2 ? 6 : 0;
          for (let i = -1; i < 3; i++) {
            const sx = x + i * 12 + off + 1;
            const sy = y + j * 11 + 1;
            const left = Math.max(sx, x);
            const right = Math.min(sx + 10, x + T);
            if (right <= left) continue;
            const tone = hash(tx * 3 + i, ty * 3 + j, 5);
            R(ctx, left, sy, right - left, Math.min(9, y + T - sy), tone < 0.33 ? '#b7c4ca' : tone < 0.66 ? '#a9b8be' : '#c5d0d4');
          }
        }
        break;
      }
      case '~': {
        R(ctx, x, y, T, T, '#00838F');
        R(ctx, x + Math.floor(hash(tx, ty, 2) * 20), y + 8, 8, 2, '#1a9ea9');
        R(ctx, x + Math.floor(hash(tx, ty, 4) * 20), y + 22, 6, 2, '#1a9ea9');
        const land = (c) => c !== undefined && c !== '~' && c !== '=';
        if (land(at(tx, ty - 1))) {
          R(ctx, x, y, T, 7, '#90a4ae');
          R(ctx, x, y + 7, T, 2, '#546e7a');
        }
        if (land(at(tx - 1, ty))) R(ctx, x, y, 5, T, '#90a4ae');
        if (land(at(tx + 1, ty))) R(ctx, x + T - 5, y, 5, T, '#90a4ae');
        if (land(at(tx, ty + 1))) R(ctx, x, y + T - 4, T, 4, '#78909C');
        break;
      }
      case '=': {
        R(ctx, x, y, T, T, '#9c7a5b');
        for (let k = 0; k < 4; k++) R(ctx, x, y + k * 8 + 7, T, 1, '#6d4c41');
        R(ctx, x + (ty % 2 ? 10 : 22), y, 1, T, '#7b5a40');
        break;
      }
      default:
        R(ctx, x, y, T, T, '#c46f45');
    }
  }

  /* ---------- Nhà cửa ---------- */

  function drawRoof(ctx, X, Y, W, H, base, mossy) {
    R(ctx, X, Y, W, H, base);
    for (let i = 0; i < W; i += 8) R(ctx, X + i, Y, 3, H, shade(base, -0.18));
    for (let j = 10; j < H; j += 10) R(ctx, X, Y + j, W, 1, shade(base, -0.3));
    R(ctx, X, Y, W, 5, shade(base, -0.35));
    R(ctx, X, Y + H - 4, W, 4, shade(base, -0.45));
    if (mossy) {
      for (let k = 0; k < Math.floor(W / 24); k++) {
        const mx = X + 4 + Math.floor(hash(X, k, 1) * (W - 16));
        const my = Y + 8 + Math.floor(hash(Y, k, 2) * (H - 20));
        R(ctx, mx, my, 10, 4, '#6f8f3a');
        R(ctx, mx + 2, my - 2, 5, 2, '#7fa24a');
      }
    }
  }

  function drawShutterWindow(ctx, x, y, w, h, color) {
    R(ctx, x - 2, y - 2, w + 4, h + 4, '#4e342e');
    R(ctx, x, y, w, h, '#3e2723');
    const half = Math.floor(w / 2);
    R(ctx, x + 1, y + 1, half - 2, h - 2, color);
    R(ctx, x + half + 1, y + 1, half - 2, h - 2, color);
    for (let k = 4; k < h - 2; k += 4) {
      R(ctx, x + 1, y + k, half - 2, 1, shade(color, -0.35));
      R(ctx, x + half + 1, y + k, half - 2, 1, shade(color, -0.35));
    }
  }

  function drawFlowers(ctx, x, y, w, h, seed) {
    for (let k = 0; k < 14; k++) {
      const fx = x + Math.floor(hash(seed, k, 3) * w);
      const fy = y + Math.floor(hash(k, seed, 4) * h);
      R(ctx, fx, fy, 4, 4, k % 3 ? '#E91E63' : '#f48fb1');
    }
    for (let k = 0; k < 5; k++) R(ctx, x + Math.floor(hash(seed, k, 8) * w), y + Math.floor(hash(k, seed, 9) * h), 3, 3, '#2e7d32');
  }

  // Trả về các vùng (đơn vị ô) để tạo điểm chạm Poke & Prod.
  function drawBuilding(ctx, b) {
    const X = b.x * T;
    const Y = b.y * T;
    const W = b.w * T;
    const H = b.h * T;
    const roofH = 2 * T - 4;
    const parts = { roof: [b.x, b.y, b.w, 1.85], wall: [b.x, b.y + 1.85, b.w, b.h - 1.85], windows: [] };
    const toTiles = (x, y, w, h) => [x / T, y / T, w / T, h / T];
    const wallY = Y + roofH;
    const wallH = H - roofH;

    if (b.kind === 'hall') {
      R(ctx, X, wallY, W, wallH, '#FBC02D');
      R(ctx, X, wallY, W, 6, '#c49000');
      drawRoof(ctx, X - 4, Y + 6, W + 8, roofH - 6, '#00796b', false);
      R(ctx, X - 8, Y + 4, 12, 8, '#FFC107');
      R(ctx, X + W - 4, Y + 4, 12, 8, '#FFC107');
      R(ctx, X + W / 2 - 40, Y + 2, 80, 6, '#FFC107');
      for (const px of [X + 18, X + W / 2 - 46, X + W / 2 + 38, X + W - 26]) R(ctx, px, wallY + 4, 8, wallH - 4, '#b71c1c');
      const gx = X + W / 2 - 30;
      R(ctx, gx - 4, wallY + 18, 68, wallH - 18, '#7f0000');
      R(ctx, gx, wallY + 24, 60, wallH - 24, '#1a0b2e');
      R(ctx, X + W / 2 - 36, wallY + 4, 72, 12, '#b71c1c');
      signText(ctx, 'HỘI QUÁN', X + W / 2, wallY + 10, '#FFE082', 8);
      parts.door = toTiles(gx, wallY + 24, 60, wallH - 24);
      parts.sign = toTiles(X + W / 2 - 36, wallY + 4, 72, 12);
      return parts;
    }

    const wall = b.wall || '#FBC02D';
    R(ctx, X, wallY, W, wallH, wall);
    if (b.wood) {
      for (let i = 6; i < W; i += 10) R(ctx, X + i, wallY, 1, wallH, shade(wall, -0.3));
    } else {
      for (let k = 0; k < 6; k++) {
        R(ctx, X + Math.floor(hash(b.x, k, 6) * (W - 10)), wallY + 10 + Math.floor(hash(k, b.y, 7) * (wallH - 20)), 8, 3, shade(wall, -0.08));
      }
    }
    R(ctx, X, wallY, W, 6, shade(wall, -0.3));
    // Rêu chân tường
    R(ctx, X, Y + H - 5, W, 5, shade(wall, -0.2));
    for (let k = 0; k < Math.floor(W / 10); k++) {
      R(ctx, X + Math.floor(hash(b.x, k, 11) * (W - 8)), Y + H - 8 - Math.floor(hash(k, b.x, 12) * 6), 8, 4, '#7a9a3a');
    }
    parts.base = [b.x, b.y + b.h - 0.4, b.w, 0.4];

    // Cửa ra vào
    const doorW = 22;
    const doorH = 34;
    const doorX = X + W / 2 - doorW / 2;
    R(ctx, doorX - 2, Y + H - doorH - 2, doorW + 4, doorH + 2, '#3e2723');
    R(ctx, doorX, Y + H - doorH, doorW, doorH, b.kind === 'shop' || b.kind === 'workshop' ? '#ffe9b0' : '#6d4c41');
    R(ctx, doorX + doorW / 2 - 1, Y + H - doorH, 2, doorH, '#3e2723');

    // Cửa sổ / quầy trưng bày
    const winY = wallY + 14;
    const winW = 22;
    const winH = 24;
    const slots = [X + 10, X + W - 10 - winW];
    if (b.w >= 7) slots.push(X + W / 2 - doorW / 2 - winW - 10 > X + 40 ? X + W / 2 - doorW / 2 - winW - 8 : null);
    slots.filter((sx) => sx != null).forEach((sx, i) => {
      if (b.kind === 'tailor' && i === 0) {
        // Cửa kính trưng bày lụa
        R(ctx, sx - 2, winY - 2, winW + 30, winH + 4, '#4e342e');
        R(ctx, sx, winY, winW + 26, winH, '#fff8e1');
        ['#E91E63', '#1565C0', '#FBC02D', '#43a047', '#c62828', '#8e24aa'].forEach((c, k) => R(ctx, sx + 2 + k * 8, winY + 3, 6, winH - 6, c));
        parts.display = toTiles(sx - 2, winY - 2, winW + 30, winH + 4);
        return;
      }
      if (b.kind === 'shop') {
        R(ctx, sx - 2, winY - 2, winW + 4, winH + 4, '#4e342e');
        R(ctx, sx, winY, winW, winH, '#fff3e0');
        for (let k = 0; k < 6; k++) R(ctx, sx + 2 + (k % 3) * 7, winY + 3 + Math.floor(k / 3) * 11, 5, 8, ['#FF6F00', '#E91E63', '#1565C0', '#43a047', '#FBC02D', '#8e24aa'][k]);
        parts.windows.push(toTiles(sx - 2, winY - 2, winW + 4, winH + 4));
        return;
      }
      drawShutterWindow(ctx, sx, winY, winW, winH, b.shutter || '#2e7d32');
      parts.windows.push(toTiles(sx - 2, winY - 2, winW + 4, winH + 4));
    });

    // Biển hiệu
    if (b.sign) {
      ctx.font = '800 8px "Plus Jakarta Sans", "Segoe UI", sans-serif';
      const sw = Math.min(W - 16, ctx.measureText(b.sign).width + 14);
      const sx = X + W / 2 - sw / 2;
      const sy = wallY + 1;
      R(ctx, sx, sy, sw, 12, b.signBg || '#3e2723');
      signText(ctx, b.sign, X + W / 2, sy + 6, b.signColor || '#FFE082', 8);
      parts.sign = toTiles(sx, sy, sw, 12);
    }

    // Mái ngói âm dương phủ rêu
    drawRoof(ctx, X - 3, Y, W + 6, roofH, b.roof || '#A64B2A', b.mossy !== false);

    if (b.kind === 'workshop') {
      // Tấm pin mặt trời trên mái
      for (let k = 0; k < Math.floor((W - 20) / 30); k++) {
        const px = X + 10 + k * 30;
        R(ctx, px, Y + 10, 26, 30, '#0d47a1');
        R(ctx, px + 2, Y + 12, 22, 26, '#1565C0');
        R(ctx, px + 12, Y + 12, 1, 26, '#64b5f6');
        R(ctx, px + 2, Y + 24, 22, 1, '#64b5f6');
      }
      parts.panels = [b.x, b.y, b.w, 1.4];
    }
    if (b.kind === 'lanternshop') {
      const colors = ['#FF6F00', '#E91E63', '#FBC02D', '#c62828', '#1565C0', '#8e24aa'];
      for (let k = 0; k < Math.floor(W / 16); k++) {
        const lx = X + 6 + k * 16;
        R(ctx, lx + 5, wallY + 2, 1, 6, '#3e2723');
        R(ctx, lx, wallY + 8, 12, 14, colors[k % colors.length]);
        R(ctx, lx + 2, wallY + 6, 8, 2, '#FFC107');
        R(ctx, lx + 2, wallY + 22, 8, 2, '#FFC107');
      }
    }
    if (b.flowers) {
      const fx = b.flowers === 'left' ? X - 6 : X + W - 34;
      drawFlowers(ctx, fx, Y + roofH - 14, 40, 26, b.x * 7 + b.y);
    }
    return parts;
  }

  /* ---------- Chùa Cầu (mái che phía trên người chơi) ---------- */

  function drawBridgeBase(ctx, b) {
    const X = b.x * T;
    const Y = b.y * T;
    const W = b.w * T;
    // Lan can và cột hai bên
    R(ctx, X, Y + T - 6, W, 6, '#8d6e63');
    R(ctx, X, Y + 4 * T, W, 6, '#8d6e63');
    for (const px of [X, X + W - 8]) {
      R(ctx, px, Y + 6, 8, T - 6, '#5d4037');
      R(ctx, px, Y + 4 * T, 8, T - 4, '#5d4037');
    }
  }

  function drawBridgeRoof(ctx, b) {
    const X = b.x * T;
    const Y = b.y * T;
    const W = b.w * T;
    const H = 3.6 * T;
    drawRoof(ctx, X - 6, Y + 6, W + 12, H, '#8f4024', true);
    R(ctx, X - 10, Y + 2, 14, 10, '#6b2f1a');
    R(ctx, X + W - 4, Y + 2, 14, 10, '#6b2f1a');
    R(ctx, X + W / 2 - 34, Y + H / 2, 68, 14, '#3e2723');
    signText(ctx, 'CHÙA CẦU', X + W / 2, Y + H / 2 + 7, '#FFE082', 9);
  }

  /* ---------- Đồ vật (props) ---------- */

  const LANTERN_COLORS = ['#FF6F00', '#E91E63', '#FBC02D', '#c62828', '#1565C0', '#8e24aa'];

  function lanternShape(ctx, cx, cy, color, size = 1) {
    const w = 10 * size;
    const h = 12 * size;
    R(ctx, cx - w / 2 + 2, cy - h / 2, w - 4, h, color);
    R(ctx, cx - w / 2, cy - h / 2 + 2, w, h - 4, color);
    R(ctx, cx - w / 2 + 2, cy - h / 2 - 2, w - 4, 2, '#FFC107');
    R(ctx, cx - w / 2 + 2, cy + h / 2, w - 4, 2, '#FFC107');
    R(ctx, cx - 1, cy + h / 2 + 2, 2, 4 * size, '#c62828');
  }

  const PROP_DRAW = {
    pot(ctx, x, y) {
      R(ctx, x + 9, y + 18, 14, 12, '#a1502b');
      R(ctx, x + 7, y + 16, 18, 4, '#bf6a3c');
      drawFlowers(ctx, x + 6, y + 2, 20, 14, x + y);
    },
    hedge(ctx, x, y, w, h) {
      for (let j = 0; j < h; j += 10) {
        for (let i = 0; i < w; i += 8) {
          R(ctx, x + i + 2, y + j, 3, 12, '#558b2f');
          R(ctx, x + i + 5, y + j + 4, 3, 9, '#7cb342');
        }
      }
    },
    tree(ctx, x, y) {
      R(ctx, x + 13, y + 14, 6, 18, '#6d4c41');
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.arc(x + 16, y + 6, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#43a047';
      ctx.beginPath();
      ctx.arc(x + 12, y + 1, 9, 0, Math.PI * 2);
      ctx.fill();
    },
    qrboard(ctx, x, y) {
      R(ctx, x + 14, y + 16, 4, 16, '#5d4037');
      R(ctx, x + 4, y - 2, 24, 22, '#3e2723');
      R(ctx, x + 6, y, 20, 18, '#fafafa');
      for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) if (hash(i, j, x) > 0.45 || (i % 3 === 0 && j % 3 === 0)) R(ctx, x + 8 + i * 4, y + 2 + j * 4, 3, 3, '#212121');
      R(ctx, x + 6, y + 18, 20, 2, '#FFC107');
    },
    mannequin(ctx, x, y) {
      R(ctx, x + 15, y + 26, 2, 6, '#5d4037');
      R(ctx, x + 10, y + 30, 12, 2, '#5d4037');
      R(ctx, x + 13, y - 10, 6, 6, '#e0c9a6');
      R(ctx, x + 10, y - 4, 12, 12, '#c62828');
      R(ctx, x + 11, y + 8, 10, 18, '#c62828');
      R(ctx, x + 15, y + 8, 2, 18, '#ffb300');
    },
    tailortable(ctx, x, y) {
      R(ctx, x + 2, y + 10, 28, 14, '#8d6e63');
      R(ctx, x + 4, y + 24, 3, 8, '#5d4037');
      R(ctx, x + 25, y + 24, 3, 8, '#5d4037');
      R(ctx, x + 5, y + 8, 12, 6, '#1565C0');
      R(ctx, x + 18, y + 6, 9, 9, '#fff176');
      R(ctx, x + 20, y + 8, 5, 5, '#8d6e63');
      R(ctx, x + 16, y + 13, 12, 1, '#fff176');
    },
    alleysign(ctx, x, y) {
      R(ctx, x + 2, y + 4, 4, 28, '#5d4037');
      R(ctx, x + 26, y + 4, 4, 28, '#5d4037');
      R(ctx, x, y, T, 10, '#3e2723');
      signText(ctx, 'HẺM', x + 16, y + 5, '#FFE082', 7);
    },
    cyclo(ctx, x, y) {
      R(ctx, x + 2, y + 6, 22, 14, '#c62828');
      R(ctx, x + 4, y + 2, 18, 6, '#b71c1c');
      R(ctx, x + 24, y + 12, 30, 3, '#37474f');
      R(ctx, x + 46, y + 2, 4, 14, '#37474f');
      R(ctx, x + 42, y + 2, 10, 3, '#37474f');
      for (const wx of [x + 2, x + 18, x + 50]) {
        R(ctx, wx, y + 20, 10, 10, '#212121');
        R(ctx, wx + 3, y + 23, 4, 4, '#9e9e9e');
      }
    },
    trellis(ctx, x, y, w) {
      R(ctx, x + 4, y - 10, 6, 40, '#6d4c41');
      R(ctx, x + w - 10, y - 10, 6, 40, '#6d4c41');
      R(ctx, x, y - 16, w, 10, '#6d4c41');
      drawFlowers(ctx, x - 4, y - 24, w + 8, 22, x);
      drawFlowers(ctx, x, y - 6, 14, 30, y);
      drawFlowers(ctx, x + w - 14, y - 6, 14, 30, y + 3);
    },
    bench(ctx, x, y, w) {
      R(ctx, x + 2, y + 8, w - 4, 6, '#8d6e63');
      R(ctx, x + 2, y + 16, w - 4, 6, '#a1887f');
      R(ctx, x + 4, y + 22, 4, 8, '#5d4037');
      R(ctx, x + w - 8, y + 22, 4, 8, '#5d4037');
    },
    hatstall(ctx, x, y, w) {
      R(ctx, x + 2, y + 14, w - 4, 12, '#8d6e63');
      R(ctx, x + 4, y + 26, 3, 6, '#5d4037');
      R(ctx, x + w - 7, y + 26, 3, 6, '#5d4037');
      for (let k = 0; k < 3; k++) {
        const hx = x + 6 + k * 18;
        R(ctx, hx + 6, y + 2, 4, 2, '#e6d3a3');
        R(ctx, hx + 3, y + 4, 10, 3, '#e6d3a3');
        R(ctx, hx, y + 7, 16, 4, '#d9c48f');
        R(ctx, hx - 1, y + 11, 18, 2, '#bfa874');
      }
    },
    menuboard(ctx, x, y) {
      R(ctx, x + 6, y + 24, 3, 8, '#5d4037');
      R(ctx, x + 23, y + 24, 3, 8, '#5d4037');
      R(ctx, x + 2, y - 4, 28, 28, '#5d4037');
      R(ctx, x + 4, y - 2, 24, 24, '#263238');
      for (let k = 0; k < 4; k++) R(ctx, x + 7, y + 2 + k * 5, 12 + (k % 2) * 5, 2, '#eceff1');
      signText(ctx, 'MENU', x + 16, y - 7, '#FFE082', 7);
    },
    breadbasket(ctx, x, y) {
      R(ctx, x + 3, y + 14, 26, 14, '#a1887f');
      R(ctx, x + 3, y + 14, 26, 3, '#795548');
      for (let k = 0; k < 4; k++) {
        R(ctx, x + 5 + k * 6, y + 2 + (k % 2) * 3, 5, 16, '#e6a64c');
        R(ctx, x + 6 + k * 6, y + 4 + (k % 2) * 3, 2, 10, '#f3c27a');
      }
    },
    cart(ctx, x, y) {
      R(ctx, x + 2, y - 8, 28, 4, '#E91E63');
      R(ctx, x + 4, y - 4, 2, 12, '#9e9e9e');
      R(ctx, x + 26, y - 4, 2, 12, '#9e9e9e');
      R(ctx, x + 2, y + 6, 28, 16, '#eceff1');
      R(ctx, x + 2, y + 6, 28, 3, '#b0bec5');
      signText(ctx, 'BÁNH MÌ', x + 16, y + 15, '#c62828', 6);
      R(ctx, x + 4, y + 22, 8, 8, '#212121');
      R(ctx, x + 20, y + 22, 8, 8, '#212121');
    },
    saucetable(ctx, x, y) {
      R(ctx, x + 3, y + 14, 26, 6, '#8d6e63');
      R(ctx, x + 5, y + 20, 3, 10, '#5d4037');
      R(ctx, x + 24, y + 20, 3, 10, '#5d4037');
      R(ctx, x + 8, y + 2, 7, 12, '#b71c1c');
      R(ctx, x + 10, y - 1, 3, 3, '#fafafa');
      R(ctx, x + 18, y + 4, 7, 10, '#6d4c41');
      R(ctx, x + 20, y + 1, 3, 3, '#fafafa');
    },
    stall(ctx, x, y, w) {
      for (let i = 0; i < w; i += 16) R(ctx, x + i, y - 14, 16, 10, (i / 16) % 2 ? '#fafafa' : '#c62828');
      R(ctx, x, y - 4, w, 2, '#8d6e63');
      R(ctx, x + 2, y - 4, 3, 18, '#5d4037');
      R(ctx, x + w - 5, y - 4, 3, 18, '#5d4037');
      R(ctx, x, y + 12, w, 18, '#8d6e63');
      R(ctx, x, y + 12, w, 4, '#a1887f');
      // Nồi cao lầu
      R(ctx, x + 14, y + 2, 26, 12, '#455a64');
      R(ctx, x + 16, y, 22, 4, '#78909C');
      R(ctx, x + 18, y - 6, 3, 6, 'rgba(255,255,255,.6)');
      R(ctx, x + 28, y - 8, 3, 6, 'rgba(255,255,255,.6)');
      for (let k = 0; k < 3; k++) {
        R(ctx, x + w - 60 + k * 16, y + 6, 12, 6, '#fafafa');
        R(ctx, x + w - 58 + k * 16, y + 4, 8, 3, '#FFC107');
      }
      signText(ctx, 'CAO LẦU', x + w / 2, y - 9, '#212121', 7);
    },
    herbbasket(ctx, x, y) {
      R(ctx, x + 3, y + 14, 26, 14, '#a1887f');
      R(ctx, x + 3, y + 14, 26, 3, '#795548');
      for (let k = 0; k < 10; k++) R(ctx, x + 4 + Math.floor(hash(k, x, 1) * 22), y + 4 + Math.floor(hash(x, k, 2) * 12), 5, 4, k % 2 ? '#43a047' : '#7cb342');
    },
    well(ctx, x, y, w, h) {
      ctx.fillStyle = '#78909C';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2 + 4, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#546e7a';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2 + 4, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0b4f5a';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2 + 4, 13, 0, Math.PI * 2);
      ctx.fill();
      R(ctx, x + 8, y - 6, 4, 34, '#5d4037');
      R(ctx, x + w - 12, y - 6, 4, 34, '#5d4037');
      R(ctx, x + 6, y - 10, w - 12, 6, '#8d6e63');
      R(ctx, x + w / 2 - 2, y - 4, 2, 22, '#bcaaa4');
      R(ctx, x + w / 2 - 6, y + 16, 10, 8, '#8d6e63');
      R(ctx, x + w / 2 - 22, y + h - 8, 44, 10, '#3e2723');
      signText(ctx, 'GIẾNG BÁ LỄ', x + w / 2, y + h - 3, '#FFE082', 6);
    },
    table(ctx, x, y, w, h, prop) {
      R(ctx, x + 2, y + 10, w - 4, 14, '#90a4ae');
      R(ctx, x + 2, y + 10, w - 4, 3, '#cfd8dc');
      R(ctx, x + 4, y + 24, 3, 8, '#607d8b');
      R(ctx, x + w - 7, y + 24, 3, 8, '#607d8b');
      (prop.items || []).forEach((item, i) => {
        const ix = x + 6 + i * 32;
        if (item === 'noodles') {
          R(ctx, ix + 2, y + 2, 18, 10, '#fafafa');
          R(ctx, ix + 4, y + 2, 14, 4, '#FFC107');
          R(ctx, ix + 8, y + 1, 6, 2, '#a1502b');
        } else if (item === 'chopsticks') {
          R(ctx, ix + 2, y + 4, 16, 8, '#fafafa');
          R(ctx, ix, y + 2, 22, 2, '#8d6e63');
          R(ctx, ix, y + 6, 22, 2, '#8d6e63');
        } else if (item === 'greens') {
          R(ctx, ix, y + 4, 22, 8, '#fafafa');
          for (let k = 0; k < 6; k++) R(ctx, ix + 2 + k * 3, y + 2 + (k % 2) * 2, 4, 5, k % 2 ? '#43a047' : '#7cb342');
        } else if (item === 'chilli') {
          R(ctx, ix + 2, y + 6, 14, 6, '#fafafa');
          for (let k = 0; k < 4; k++) R(ctx, ix + 3 + k * 3, y + 3, 2, 6, '#d32f2f');
        }
      });
    },
    stool(ctx, x, y) {
      R(ctx, x + 9, y + 14, 14, 4, '#1e88e5');
      R(ctx, x + 10, y + 18, 3, 10, '#1565C0');
      R(ctx, x + 19, y + 18, 3, 10, '#1565C0');
    },
    basket(ctx, x, y) {
      R(ctx, x + 6, y + 14, 20, 14, '#a1887f');
      R(ctx, x + 6, y + 14, 20, 3, '#795548');
      R(ctx, x + 15, y - 2, 2, 16, '#bcaaa4');
      R(ctx, x + 9, y + 8, 6, 6, '#FFC107');
      R(ctx, x + 17, y + 8, 6, 6, '#8bc34a');
    },
    signpost(ctx, x, y, w, h, prop) {
      R(ctx, x + 14, y + 6, 4, 26, '#5d4037');
      R(ctx, x - 14, y - 6, 60, 14, '#3e2723');
      signText(ctx, prop.text || '', x + 16, y + 1, '#FFE082', 7);
    },
    boat(ctx, x, y, w) {
      R(ctx, x + 6, y + 8, w - 12, 14, '#6d4c41');
      R(ctx, x, y + 12, w, 8, '#5d4037');
      R(ctx, x + 6, y + 10, w - 12, 3, '#8d6e63');
      R(ctx, x + w / 2 - 6, y + 2, 2, 10, '#3e2723');
    },
    // --- Phố lồng đèn đêm ---
    solarstation(ctx, x, y) {
      R(ctx, x + 14, y - 6, 4, 38, '#78909C');
      R(ctx, x, y - 14, 32, 10, '#0d47a1');
      R(ctx, x + 2, y - 12, 28, 6, '#1565C0');
      R(ctx, x + 15, y - 12, 1, 6, '#64b5f6');
      R(ctx, x + 6, y + 6, 20, 20, '#37474f');
      R(ctx, x + 9, y + 9, 14, 8, '#00e676');
      signText(ctx, '⚡', x + 16, y + 21, '#FFC107', 8);
    },
    batterybox(ctx, x, y) {
      R(ctx, x + 6, y + 8, 20, 22, '#455a64');
      R(ctx, x + 12, y + 5, 8, 3, '#455a64');
      R(ctx, x + 9, y + 12, 14, 14, '#263238');
      R(ctx, x + 10, y + 19, 12, 6, '#00e676');
      R(ctx, x + 10, y + 13, 12, 5, '#00c853');
    },
    workbench(ctx, x, y, w) {
      R(ctx, x + 2, y + 10, w - 4, 14, '#a1887f');
      R(ctx, x + 2, y + 10, w - 4, 3, '#d7ccc8');
      R(ctx, x + 4, y + 24, 4, 8, '#6d4c41');
      R(ctx, x + w - 8, y + 24, 4, 8, '#6d4c41');
      // khung tre
      ctx.strokeStyle = '#c8a165';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 7, y - 2, 16, 14);
      R(ctx, x + 14, y - 2, 2, 14, '#c8a165');
      // keo dán
      R(ctx, x + 40, y + 2, 12, 10, '#eceff1');
      R(ctx, x + 42, y, 8, 3, '#1565C0');
      // tua rua
      for (let k = 0; k < 3; k++) R(ctx, x + 70 + k * 6, y - 2, 3, 14, k % 2 ? '#FFC107' : '#c62828');
    },
    lanternstall(ctx, x, y, w) {
      R(ctx, x, y - 16, w, 6, '#5d4037');
      R(ctx, x + 2, y - 10, 3, 40, '#5d4037');
      R(ctx, x + w - 5, y - 10, 3, 40, '#5d4037');
      R(ctx, x, y + 14, w, 16, '#8d6e63');
      // đèn lồng xếp gấp dẹt trên quầy
      for (let k = 0; k < 4; k++) R(ctx, x + 8 + k * 8, y + 8, 6, 8, LANTERN_COLORS[k]);
      // đèn lụa treo
      for (let k = 0; k < Math.floor(w / 20); k++) lanternShape(ctx, x + 14 + k * 20, y - 2, LANTERN_COLORS[(k + 2) % 6]);
    },
    ledpost(ctx, x, y) {
      R(ctx, x + 14, y - 14, 4, 46, '#455a64');
      R(ctx, x + 10, y - 20, 12, 8, '#eceff1');
      R(ctx, x + 12, y - 18, 8, 4, '#fffde7');
      R(ctx, x + 8, y - 24, 16, 4, '#0d47a1');
    },
    marketstall(ctx, x, y, w, h, prop) {
      for (let i = 0; i < w; i += 16) R(ctx, x + i, y - 14, 16, 10, (i / 16) % 2 ? '#FFC107' : '#E91E63');
      R(ctx, x + 2, y - 4, 3, 30, '#5d4037');
      R(ctx, x + w - 5, y - 4, 3, 30, '#5d4037');
      R(ctx, x, y + 12, w, 18, '#8d6e63');
      for (let k = 0; k < Math.floor(w / 12); k++) R(ctx, x + 6 + k * 12, y + 4, 8, 8, LANTERN_COLORS[(k + 1) % 6]);
      if (prop.text) signText(ctx, prop.text, x + w / 2, y - 9, '#212121', 7);
    },
    cruisesign(ctx, x, y) {
      R(ctx, x + 14, y + 4, 4, 28, '#5d4037');
      R(ctx, x - 14, y - 10, 60, 16, '#00838F');
      signText(ctx, 'NIGHT CRUISE', x + 16, y - 2, '#ffffff', 7);
    },
    jacketrack(ctx, x, y) {
      R(ctx, x + 4, y + 2, 3, 30, '#5d4037');
      R(ctx, x + 25, y + 2, 3, 30, '#5d4037');
      R(ctx, x + 4, y + 2, 24, 3, '#5d4037');
      R(ctx, x + 7, y + 6, 8, 16, '#ff6d00');
      R(ctx, x + 17, y + 6, 8, 16, '#ff6d00');
      R(ctx, x + 7, y + 12, 8, 2, '#eceff1');
      R(ctx, x + 17, y + 12, 8, 2, '#eceff1');
    },
    candletable(ctx, x, y) {
      R(ctx, x + 2, y + 12, 28, 10, '#8d6e63');
      R(ctx, x + 4, y + 22, 3, 8, '#5d4037');
      R(ctx, x + 25, y + 22, 3, 8, '#5d4037');
      for (let k = 0; k < 3; k++) {
        R(ctx, x + 4 + k * 9, y + 6, 8, 6, '#f8bbd0');
        R(ctx, x + 7 + k * 9, y + 2, 2, 4, '#fff8e1');
        R(ctx, x + 7 + k * 9, y, 2, 2, '#FFC107');
      }
    },
    mooring(ctx, x, y) {
      R(ctx, x + 10, y + 6, 12, 22, '#5d4037');
      R(ctx, x + 8, y + 4, 16, 4, '#3e2723');
      R(ctx, x + 10, y + 14, 12, 2, '#bcaaa4');
    },
    dockcharger(ctx, x, y) {
      R(ctx, x + 10, y + 2, 12, 28, '#eceff1');
      R(ctx, x + 12, y + 6, 8, 8, '#00e676');
      R(ctx, x + 14, y + 16, 4, 10, '#1565C0');
      R(ctx, x + 20, y + 20, 10, 2, '#212121');
    },
    eboat(ctx, x, y, w) {
      R(ctx, x + 8, y + 16, w - 16, 26, '#6d4c41');
      R(ctx, x, y + 24, w, 12, '#5d4037');
      R(ctx, x + 8, y + 18, w - 16, 3, '#8d6e63');
      R(ctx, x + 18, y + 2, w - 36, 12, '#0d47a1');
      R(ctx, x + 20, y + 4, w - 40, 8, '#1565C0');
      for (let k = 0; k < 4; k++) R(ctx, x + 24 + k * 28, y + 4, 1, 8, '#64b5f6');
      R(ctx, x + 20, y + 14, 3, 10, '#3e2723');
      R(ctx, x + w - 23, y + 14, 3, 10, '#3e2723');
      for (let k = 0; k < 4; k++) lanternShape(ctx, x + 30 + k * 26, y + 20, LANTERN_COLORS[k], 0.8);
      signText(ctx, '⚡ ECO', x + w - 26, y + 32, '#b9f6ca', 7);
    },
  };

  function drawProp(ctx, prop) {
    const fn = PROP_DRAW[prop.kind];
    if (fn) fn(ctx, prop.x * T, prop.y * T, (prop.w || 1) * T, (prop.h || 1) * T, prop);
  }

  /* ---------- Hoa đăng trôi, trăng, bóng phản chiếu (động) ---------- */

  function drawFloater(ctx, f, t) {
    const bob = Math.sin(t / 600 + f.x) * 2;
    const x = f.x * T + 16;
    const y = f.y * T + 16 + bob;
    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.fillRect(x - 9, y + 6, 18, 3);
    R(ctx, x - 8, y - 1, 16, 7, '#7cb342');
    R(ctx, x - 6, y - 5, 12, 6, f.color || '#f8bbd0');
    R(ctx, x - 1, y - 9, 2, 4, '#fff8e1');
    R(ctx, x - 1, y - 11, 2, 2, '#FFC107');
  }

  function drawMoon(ctx, m, t) {
    const x = m.x * T;
    const y = m.y * T;
    const wob = Math.sin(t / 500) * 2;
    ctx.fillStyle = 'rgba(255, 249, 196, 0.85)';
    ctx.beginPath();
    ctx.ellipse(x + 32 + wob, y + 30, 22, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 131, 143, 0.55)';
    for (let k = 0; k < 4; k++) ctx.fillRect(x + 8, y + 18 + k * 7 + (Math.round(t / 300) % 2), 50, 2);
  }

  /* ---------- Nhân vật pixel ---------- */

  function drawPerson(ctx, x, y, look, dir = 'down', step = 0) {
    const p = 2;
    const ox = Math.round(x - 12);
    const oy = Math.round(y - 32);
    const B = (c, r, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(ox + c * p, oy + r * p, w * p, h * p);
    };
    const skin = look.skin || '#f1c27d';
    const hair = look.hair || '#2b2b2b';
    const top = look.top || '#0f766e';
    const bottom = look.bottom || '#263238';
    const shoe = '#3e2723';

    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.beginPath();
    ctx.ellipse(x, y - 1, 9, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const liftA = step === 1 ? 1 : 0;
    const liftB = step === 2 ? 1 : 0;
    if (look.long) {
      B(3, 14 - liftA, 3, 1, bottom);
      B(6, 14 - liftB, 3, 1, bottom);
    } else {
      B(3, 12, 3, 3 - liftA, bottom);
      B(6, 12, 3, 3 - liftB, bottom);
    }
    B(3, 15 - liftA, 3, 1, shoe);
    B(6, 15 - liftB, 3, 1, shoe);

    if (dir === 'up' && look.extra === 'backpack') B(3, 7, 6, 5, '#795548');
    if (look.long) {
      B(2, 11, 8, 3, bottom);
      B(2, 7, 8, 4, top);
      B(4, 11, 4, 3, top);
    } else {
      B(2, 7, 8, 5, top);
    }
    if (look.pattern) {
      B(3, 8, 1, 1, look.pattern);
      B(7, 9, 1, 1, look.pattern);
      B(5, 12, 1, 1, look.pattern);
      B(4, 10, 1, 1, look.pattern);
    }
    if (look.extra === 'conical-hat' && !look.long && dir !== 'up') B(5, 8, 2, 1, shade(top, 0.25));
    B(1, 7, 1, 4, top);
    B(10, 7, 1, 4, top);
    B(1, 11, 1, 1, skin);
    B(10, 11, 1, 1, skin);

    B(2, 1, 8, 6, skin);
    const style = look.style || 'short';
    if (dir === 'up') {
      B(2, 0, 8, 7, hair);
      if (style === 'long') B(3, 7, 6, 3, hair);
    } else if (dir === 'left') {
      B(2, 0, 8, 3, hair);
      B(6, 3, 4, 3, hair);
      if (style === 'long') B(7, 3, 3, 6, hair);
      B(3, 4, 1, 1, '#212121');
    } else if (dir === 'right') {
      B(2, 0, 8, 3, hair);
      B(2, 3, 4, 3, hair);
      if (style === 'long') B(2, 3, 3, 6, hair);
      B(8, 4, 1, 1, '#212121');
    } else {
      B(3, 0, 6, 1, hair);
      B(2, 1, 8, 2, hair);
      B(2, 3, 1, 2, hair);
      B(9, 3, 1, 2, hair);
      if (style === 'long') {
        B(1, 3, 2, 6, hair);
        B(9, 3, 2, 6, hair);
      }
      B(4, 4, 1, 1, '#212121');
      B(7, 4, 1, 1, '#212121');
      B(5, 6, 2, 1, '#c97b63');
    }
    if (style === 'bun') B(5, -1, 2, 2, hair);
    if (look.extra === 'glasses' && dir !== 'up') {
      if (dir === 'down') {
        B(3, 4, 2, 1, '#212121');
        B(7, 4, 2, 1, '#212121');
      } else {
        B(dir === 'left' ? 2 : 8, 4, 2, 1, '#212121');
      }
    }
    if (look.extra === 'backpack' && dir === 'down') {
      B(3, 7, 1, 3, '#5d4037');
      B(8, 7, 1, 3, '#5d4037');
    }
    if (look.extra === 'camera' && dir !== 'up') {
      B(4, 9, 4, 2, '#37474f');
      B(5, 9, 2, 1, '#90a4ae');
    }
    if (look.extra === 'net') {
      B(10, 1, 1, 10, '#8d6e63');
      ctx.fillStyle = 'rgba(255,255,255,.55)';
      ctx.fillRect(ox + 9 * p, oy - 2 * p, 4 * p, 3 * p);
    }
    if (look.extra === 'conical-hat') {
      B(5, -3, 2, 1, '#e6d3a3');
      B(4, -2, 4, 1, '#e6d3a3');
      B(3, -1, 6, 1, '#e6d3a3');
      B(1, 0, 10, 1, '#d9c48f');
      B(0, 1, 12, 1, '#bfa874');
    }
  }

  /* ---------- Bản đồ ---------- */

  function grid(w, h, ch) {
    return Array.from({ length: h }, () => Array(w).fill(ch));
  }

  function fill(g, x, y, w, h, ch) {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j] && i < g[j].length) g[j][i] = ch;
  }

  function dayMap() {
    const g = grid(40, 24, ':');
    fill(g, 0, 6, 40, 3, ',');
    fill(g, 12, 1, 1, 4, ',');
    fill(g, 0, 10, 12, 6, '.');
    fill(g, 34, 10, 6, 6, '.');
    fill(g, 0, 16, 40, 2, ',');
    fill(g, 0, 18, 40, 6, '~');
    fill(g, 32, 0, 2, 18, '~');
    fill(g, 32, 6, 2, 3, '=');
    fill(g, 32, 16, 2, 2, '=');
    return {
      id: 'day',
      name: 'Phố cổ Hội An',
      subtitle: 'Ban ngày · Nhà cổ, tiệm may và ẩm thực',
      night: false,
      w: 40,
      h: 24,
      grid: g,
      spawn: { x: 6, y: 7, dir: 'down' },
      buildings: [
        { id: 'h1', kind: 'house', x: 0, y: 0, w: 5, h: 5, wall: '#FBC02D', shutter: '#2e7d32', flowers: 'left', hot: { roof: 'yin-yang-roof-tiles', windows: 'wooden-shutters' } },
        { id: 'tanky', kind: 'house', x: 5, y: 0, w: 7, h: 5, wall: '#7b4a2a', wood: true, shutter: '#4e342e', sign: 'NHÀ CỔ TẤN KÝ', hot: { sign: 'ancient-house', wall: 'ancient-house', base: 'moss' } },
        { id: 'h3', kind: 'house', x: 13, y: 0, w: 5, h: 5, wall: '#FBC02D', shutter: '#1565C0', hot: { roof: 'yin-yang-roof-tiles', windows: 'wooden-shutters', base: 'moss' } },
        { id: 'tailor', kind: 'tailor', x: 18, y: 0, w: 7, h: 5, wall: '#fdd835', sign: 'ÁO DÀI · MAY ĐO', signBg: '#c62828', signColor: '#ffffff', hot: { sign: 'tailor-shop', display: 'silk-fabric' } },
        { id: 'h5', kind: 'house', x: 25, y: 0, w: 6, h: 5, wall: '#FBC02D', shutter: '#2e7d32', flowers: 'right', hot: { windows: 'wooden-shutters' } },
        { id: 'phunghung', kind: 'house', x: 34, y: 0, w: 6, h: 5, wall: '#6d4c41', wood: true, shutter: '#3e2723', sign: 'NHÀ CỔ PHÙNG HƯNG', hot: { sign: 'ancient-house', wall: 'ancient-house', roof: 'yin-yang-roof-tiles' } },
        { id: 'h7', kind: 'house', x: 28, y: 10, w: 4, h: 5, wall: '#f9a825', shutter: '#1565C0', flowers: 'left', hot: { roof: 'yin-yang-roof-tiles' } },
      ],
      bridge: { x: 31, y: 5, w: 4, h: 5, word: 'japanese-covered-bridge' },
      props: [
        { kind: 'hedge', x: 31, y: 0, w: 1, h: 5 },
        { kind: 'alleysign', x: 12, y: 0, word: 'cobblestone-alley' },
        { kind: 'pot', x: 0, y: 5 },
        { kind: 'pot', x: 13, y: 5 },
        { kind: 'pot', x: 30, y: 5 },
        { kind: 'qrboard', x: 10, y: 5, word: 'audio-guide' },
        { kind: 'qrboard', x: 35, y: 5, word: 'qr-code' },
        { kind: 'mannequin', x: 18, y: 5, word: 'mannequin' },
        { kind: 'tailortable', x: 24, y: 5, word: 'measuring-tape' },
        { kind: 'cyclo', x: 8, y: 9, w: 2, word: 'cyclo' },
        { kind: 'trellis', x: 2, y: 10, w: 3, word: 'bougainvillea' },
        { kind: 'bench', x: 6, y: 11, w: 2 },
        { kind: 'hatstall', x: 4, y: 13, w: 2, word: 'conical-hat' },
        { kind: 'tree', x: 10, y: 11 },
        { kind: 'tree', x: 1, y: 14 },
        { kind: 'basket', x: 8, y: 15, word: 'carrying-pole' },
        { kind: 'basket', x: 10, y: 15, word: 'carrying-pole' },
        { kind: 'menuboard', x: 12, y: 10, word: 'menu-board' },
        { kind: 'breadbasket', x: 13, y: 11, word: 'crispy-crust' },
        { kind: 'cart', x: 14, y: 11, word: 'food-cart' },
        { kind: 'saucetable', x: 15, y: 10, word: 'secret-sauce' },
        { kind: 'stall', x: 18, y: 10, w: 5, word: 'specialty-noodles' },
        { kind: 'herbbasket', x: 23, y: 11, word: 'herbal-greens' },
        { kind: 'well', x: 25, y: 10, w: 2, h: 2, word: 'ancient-well' },
        { kind: 'table', x: 18, y: 13, w: 2, items: ['chopsticks', 'noodles'], words: ['chopsticks', 'specialty-noodles'] },
        { kind: 'table', x: 22, y: 13, w: 2, items: ['greens', 'chilli'], words: ['herbal-greens', 'chilli'] },
        { kind: 'stool', x: 17, y: 13, word: 'plastic-stool' },
        { kind: 'stool', x: 20, y: 13, word: 'plastic-stool' },
        { kind: 'stool', x: 21, y: 13, word: 'plastic-stool' },
        { kind: 'stool', x: 24, y: 13, word: 'plastic-stool' },
        { kind: 'tree', x: 35, y: 11 },
        { kind: 'tree', x: 38, y: 13 },
        { kind: 'signpost', x: 38, y: 15, text: '🌙 Phố Lồng Đèn →' },
        { kind: 'boat', x: 5, y: 19, w: 3, solid: false },
        { kind: 'boat', x: 24, y: 20, w: 3, solid: false },
      ],
      npcs: [
        { id: 'sarah', x: 20, y: 5, dir: 'down', quest: 'q_tailor', greet: 'Excuse me! Can you help me?' },
        { id: 'minh', x: 22, y: 5, dir: 'left', quest: 'q_tailor', greet: 'Chào cháu! Giúp chú với!' },
        { id: 'mark', x: 16, y: 12, dir: 'down', quest: 'q_food', greet: 'Hey there! 👋' },
        { id: 'ba', x: 21, y: 11, dir: 'down', quest: 'q_food', greet: 'Cao lầu nóng đây!' },
        { id: 'vendor', x: 9, y: 15, dir: 'down', word: 'street-vendor', greet: 'Chè đây! Chè đây!', look: { hair: '#3e3e3e', skin: '#d9a877', top: '#8d6e63', bottom: '#212121', extra: 'conical-hat' } },
      ],
      collectibles: [
        { id: 'bat_d1', type: 'battery', x: 3, y: 12 },
        { id: 'bat_d2', type: 'battery', x: 26, y: 13 },
        { id: 'bat_d3', type: 'battery', x: 37, y: 11 },
        { id: 'bat_d4', type: 'battery', x: 24, y: 17 },
        { id: 'bk_passive', type: 'booklet', x: 11, y: 5 },
        { id: 'bk_arrange', type: 'booklet', x: 25, y: 5 },
        { id: 'bk_suggest', type: 'booklet', x: 12, y: 12 },
      ],
      exits: [{ x: 39, y: 16, w: 1, h: 2, to: 'night', spawn: { x: 1, y: 7, dir: 'right' } }],
      floaters: [],
      areas: [],
      lights: [],
    };
  }

  function nightMap() {
    const g = grid(36, 22, ':');
    fill(g, 0, 6, 36, 3, ',');
    fill(g, 0, 13, 36, 2, ',');
    fill(g, 0, 15, 36, 7, '~');
    fill(g, 15, 15, 4, 4, '=');
    fill(g, 20, 15, 3, 1, '=');
    const floaters = [
      { x: 5, y: 17, color: '#f8bbd0' }, { x: 8, y: 19, color: '#fff59d' }, { x: 11, y: 16, color: '#ffccbc' },
      { x: 26, y: 17, color: '#f8bbd0' }, { x: 29, y: 20, color: '#fff59d' }, { x: 33, y: 16, color: '#ffccbc' },
      { x: 13, y: 20, color: '#f8bbd0' },
    ];
    return {
      id: 'night',
      name: 'Phố Lồng Đèn & Bến sông Hoài',
      subtitle: 'Ban đêm · Đèn LED năng lượng mặt trời và thuyền điện',
      night: true,
      w: 36,
      h: 22,
      grid: g,
      spawn: { x: 1, y: 7, dir: 'right' },
      buildings: [
        { id: 'workshop', kind: 'workshop', x: 1, y: 0, w: 8, h: 5, wall: '#FBC02D', shutter: '#2e7d32', sign: 'XƯỞNG LỒNG ĐÈN', hot: { roof: 'solar-panel', sign: 'workshop', windows: 'silk-lantern' } },
        { id: 'souvenir', kind: 'shop', x: 9, y: 0, w: 6, h: 5, wall: '#fdd835', sign: 'QUÀ LƯU NIỆM', hot: { windows: 'souvenir', sign: 'souvenir' } },
        { id: 'lanterns', kind: 'lanternshop', x: 15, y: 0, w: 7, h: 5, wall: '#f9a825', shutter: '#4e342e', sign: 'ĐÈN LỒNG LỤA', hot: { wall: 'silk-lantern', sign: 'silk-lantern' } },
        { id: 'hall', kind: 'hall', x: 23, y: 0, w: 8, h: 5, hot: { door: '@boss' } },
        { id: 'h-night', kind: 'house', x: 31, y: 0, w: 5, h: 5, wall: '#FBC02D', shutter: '#1565C0', flowers: 'left', hot: { roof: 'yin-yang-roof-tiles' } },
      ],
      props: [
        { kind: 'hedge', x: 0, y: 0, w: 1, h: 5 },
        { kind: 'hedge', x: 22, y: 0, w: 1, h: 5 },
        { kind: 'signpost', x: 1, y: 5, text: '☀️ ← Phố cổ' },
        { kind: 'ledpost', x: 6, y: 9, word: 'led-bulb' },
        { kind: 'ledpost', x: 14, y: 9, word: 'led-bulb' },
        { kind: 'ledpost', x: 24, y: 9, word: 'led-bulb' },
        { kind: 'solarstation', x: 2, y: 11, word: 'solar-charging-station', action: 'recharge' },
        { kind: 'batterybox', x: 3, y: 11, word: 'rechargeable-battery' },
        { kind: 'workbench', x: 7, y: 11, w: 3, words: ['bamboo-frame', 'glue', 'tassel'] },
        { kind: 'lanternstall', x: 11, y: 11, w: 3, words: ['folding-lantern', 'silk-lantern', 'souvenir'] },
        { kind: 'marketstall', x: 16, y: 11, w: 3, text: 'CHỢ ĐÊM', word: 'night-market' },
        { kind: 'marketstall', x: 20, y: 11, w: 3, word: 'night-market' },
        { kind: 'cruisesign', x: 14, y: 13, word: 'night-cruise' },
        { kind: 'jacketrack', x: 19, y: 13, word: 'life-jacket' },
        { kind: 'candletable', x: 15, y: 15, word: 'candle' },
        { kind: 'mooring', x: 15, y: 18, word: 'pier' },
        { kind: 'mooring', x: 18, y: 18, word: 'pier' },
        { kind: 'dockcharger', x: 22, y: 15, word: 'charging-dock' },
        { kind: 'eboat', x: 19, y: 16, w: 5, h: 2, word: 'eco-electric-boat', solid: false },
        { kind: 'tree', x: 33, y: 10 },
        { kind: 'tree', x: 29, y: 11 },
      ],
      npcs: [
        { id: 'emma', x: 5, y: 5, dir: 'down', quest: 'q_lantern', greet: 'Hi! These lanterns are so pretty!' },
        { id: 'david', x: 16, y: 16, dir: 'down', quest: 'q_cruise', greet: 'Good evening!' },
        { id: 'tu', x: 17, y: 17, dir: 'left', quest: 'q_cruise', greet: 'Lên thuyền đi cháu!' },
        { id: 'artisan', x: 8, y: 10, dir: 'down', word: 'artisan', greet: 'Xin chào! Hello!', look: { hair: '#424242', skin: '#d9a877', top: '#c62828', bottom: '#37474f' } },
        { id: 'volunteer', x: 27, y: 14, dir: 'down', word: 'volunteer', greet: 'Keep the river clean!', look: { hair: '#5d4037', skin: '#f1c27d', top: '#7cb342', bottom: '#455a64', extra: 'net' } },
      ],
      collectibles: [
        { id: 'bat_n1', type: 'battery', x: 1, y: 11 },
        { id: 'bat_n2', type: 'battery', x: 13, y: 12 },
        { id: 'bat_n3', type: 'battery', x: 33, y: 12 },
        { id: 'bat_n4', type: 'battery', x: 20, y: 14 },
        { id: 'bk_steps', type: 'booklet', x: 10, y: 12 },
        { id: 'bk_relative', type: 'booklet', x: 17, y: 15 },
      ],
      exits: [{ x: 0, y: 6, w: 1, h: 3, to: 'day', spawn: { x: 38, y: 16, dir: 'left' } }],
      floaters,
      moon: { x: 30, y: 18 },
      // Vùng chạm không gắn với đồ vật (trên mặt nước)
      areas: [
        ...floaters.map((f) => ({ word: 'biodegradable-lantern', rect: [f.x, f.y - 0.2, 1, 1] })),
        { word: 'full-moon', rect: [30, 18, 2, 2] },
        { word: 'reflection', rect: [1, 15.3, 3, 0.9] },
        { word: 'riverbank', rect: [8, 15, 3, 0.8] },
      ],
    };
  }

  /* ---------- Đèn đêm và dây đèn lồng (lớp phía trên người chơi) ---------- */

  function lanternStrings(map) {
    const strings = [];
    for (let x = 2; x < map.w - 2; x += 4) {
      strings.push({ x1: x * T, y1: 5 * T + 6, x2: (x + 2) * T, y2: 9 * T + 10 });
    }
    return strings;
  }

  function drawAbove(ctx, map) {
    if (map.bridge) drawBridgeRoof(ctx, map.bridge);
    if (!map.night) return;
    for (const s of lanternStrings(map)) {
      ctx.strokeStyle = 'rgba(40, 20, 10, .8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.quadraticCurveTo((s.x1 + s.x2) / 2 + 10, (s.y1 + s.y2) / 2 + 12, s.x2, s.y2);
      ctx.stroke();
      for (let k = 1; k < 7; k++) {
        const tt = k / 7;
        const lx = (1 - tt) * (1 - tt) * s.x1 + 2 * (1 - tt) * tt * ((s.x1 + s.x2) / 2 + 10) + tt * tt * s.x2;
        const ly = (1 - tt) * (1 - tt) * s.y1 + 2 * (1 - tt) * tt * ((s.y1 + s.y2) / 2 + 12) + tt * tt * s.y2;
        lanternShape(ctx, lx, ly + 6, LANTERN_COLORS[(k + Math.round(s.x1 / T)) % 6], 0.8);
      }
    }
  }

  function lightSources(map) {
    if (!map.night) return [];
    const lights = [];
    for (const s of lanternStrings(map)) {
      for (let k = 1; k < 7; k += 2) {
        const tt = k / 7;
        lights.push({ x: s.x1 + (s.x2 - s.x1) * tt + 6, y: s.y1 + (s.y2 - s.y1) * tt + 10, r: 34, c: '255,170,60' });
      }
    }
    map.props.forEach((p) => {
      if (p.kind === 'ledpost') lights.push({ x: p.x * T + 16, y: p.y * T - 14, r: 60, c: '220,240,255' });
      if (p.kind === 'lanternstall' || p.kind === 'marketstall') lights.push({ x: (p.x + p.w / 2) * T, y: p.y * T, r: 50, c: '255,160,60' });
      if (p.kind === 'solarstation' || p.kind === 'dockcharger') lights.push({ x: p.x * T + 16, y: p.y * T + 12, r: 30, c: '0,230,118' });
      if (p.kind === 'eboat' || p.kind === 'candletable') lights.push({ x: (p.x + (p.w || 1) / 2) * T, y: p.y * T + 20, r: 46, c: '255,190,90' });
    });
    map.buildings.forEach((b) => {
      if (b.kind === 'lanternshop' || b.kind === 'workshop' || b.kind === 'shop') {
        for (let k = 0; k < b.w; k += 2) lights.push({ x: (b.x + k + 0.5) * T, y: (b.y + 3) * T, r: 40, c: '255,170,60' });
      }
      if (b.kind === 'hall') lights.push({ x: (b.x + b.w / 2) * T, y: (b.y + 4) * T, r: 70, c: '170,90,255', boss: true });
    });
    map.floaters.forEach((f) => lights.push({ x: f.x * T + 16, y: f.y * T + 8, r: 26, c: '255,200,110', floater: true }));
    return lights;
  }

  IT.world = {
    T,
    WALKABLE,
    maps: { day: dayMap(), night: nightMap() },
    shade,
    drawTile,
    drawBuilding,
    drawBridgeBase,
    drawProp,
    drawPerson,
    drawFloater,
    drawMoon,
    drawAbove,
    lightSources,
  };
})();
