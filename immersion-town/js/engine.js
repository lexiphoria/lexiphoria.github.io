/* Immersion Town – lõi game top-down: vẽ bản đồ, camera, va chạm, tìm đường, điều khiển và điểm chạm. */
(() => {
  'use strict';

  const IT = (window.IT = window.IT || {});
  const W = IT.world;
  const T = W.T;
  const SPEED = 5.5; // ô/giây
  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const KEYS = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
  };

  const inRect = (r, x, y) => x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3];

  class Engine {
    constructor(canvas, hooks) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.hooks = hooks;
      this.paused = false;
      this.keyDir = null;
      this.cam = { x: 0, y: 0 };
      this.fade = 0;
      this.player = { x: 0, y: 0, px: 0, py: 0, dir: 'down', path: [], moving: false, step: 0, stepT: 0, target: null, onArrive: null };
      this.last = performance.now();
      this.bindInput();
      this.resize();
      window.addEventListener('resize', () => this.resize());
      requestAnimationFrame((t) => this.frame(t));
    }

    /* ---------- Nạp bản đồ ---------- */

    load(mapId, spawn) {
      const map = W.maps[mapId];
      this.map = map;
      const solid = new Uint8Array(map.w * map.h);
      const block = (x, y, w = 1, h = 1) => {
        for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (i >= 0 && j >= 0 && i < map.w && j < map.h) solid[j * map.w + i] = 1;
      };
      for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) if (!W.WALKABLE.has(map.grid[y][x])) solid[y * map.w + x] = 1;

      const stat = document.createElement('canvas');
      stat.width = map.w * T;
      stat.height = map.h * T;
      const sctx = stat.getContext('2d');
      for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) W.drawTile(sctx, map, x, y);

      const spots = [];
      const addSpot = (value, rect, extra = {}) => {
        if (!value) return;
        const spot = { key: `${map.id}:${spots.length}`, rect, ...extra };
        if (value.startsWith('@')) spot.action = value.slice(1);
        else spot.word = value;
        spots.push(spot);
      };

      if (map.bridge) {
        const b = map.bridge;
        W.drawBridgeBase(sctx, b);
        block(b.x, b.y, b.w, 1);
        block(b.x, b.y + b.h - 1, b.w, 1);
        addSpot(b.word, [b.x, b.y - 0.1, b.w, 1]);
      }
      map.buildings.forEach((b) => {
        const parts = W.drawBuilding(sctx, b);
        block(b.x, b.y, b.w, b.h);
        const hot = b.hot || {};
        for (const part of ['sign', 'display', 'door', 'windows', 'base', 'wall', 'roof']) {
          if (!hot[part] || !parts[part]) continue;
          const rects = part === 'windows' ? parts.windows : [parts[part]];
          rects.forEach((r) => addSpot(hot[part], r));
        }
      });
      map.props.forEach((p) => {
        const w = p.w || 1;
        const h = p.h || 1;
        if (p.solid !== false) block(p.x, p.y, w, h);
        if (p.words) p.words.forEach((word, i) => addSpot(word, [p.x + i * (w / p.words.length), p.y - 0.3, w / p.words.length, h + 0.3], { prop: p }));
        else if (p.word) addSpot(p.word, [p.x, p.y - 0.3, w, h + 0.3], { prop: p, action: p.action });
      });
      (map.areas || []).forEach((a) => addSpot(a.word, a.rect));
      // Ô nhỏ chạm trước, ô lớn (tường, mái) chạm sau
      spots.sort((a, b) => a.rect[2] * a.rect[3] - b.rect[2] * b.rect[3]);

      const above = document.createElement('canvas');
      above.width = stat.width;
      above.height = stat.height;
      W.drawAbove(above.getContext('2d'), map);

      this.solid = solid;
      this.staticLayer = stat;
      this.aboveLayer = above;
      this.spots = spots;
      this.lights = W.lightSources(map);
      this.npcs = map.npcs.map((n) => ({ ...n }));
      const s = spawn || map.spawn;
      Object.assign(this.player, { x: s.x, y: s.y, px: s.x * T, py: s.y * T, dir: s.dir || 'down', path: [], moving: false, target: null, onArrive: null });
      this.fade = 1;
      this.resize();
      if (this.hooks.onMapChange) this.hooks.onMapChange(map);
    }

    /* ---------- Kích thước khung nhìn ---------- */

    resize() {
      const cw = (this.canvas.parentElement && this.canvas.parentElement.clientWidth) || 640;
      const narrow = cw < 640;
      let cols = Math.max(9, Math.round(cw / (narrow ? 31 : 54)));
      // Chiều cao khung không vượt quá khoảng 60% màn hình để còn thấy thanh công cụ
      const tile = cw / cols;
      const viewH = window.innerHeight || 720;
      let rows = Math.max(8, Math.min(narrow ? 14 : 13, Math.round((viewH * (narrow ? 0.55 : 0.6)) / tile)));
      if (this.map) {
        cols = Math.min(cols, this.map.w);
        rows = Math.min(rows, this.map.h);
      }
      if (this.canvas.width !== cols * T || this.canvas.height !== rows * T) {
        this.canvas.width = cols * T;
        this.canvas.height = rows * T;
        this.ctx.imageSmoothingEnabled = false;
      }
    }

    /* ---------- Truy vấn ô ---------- */

    isFree(x, y) {
      const m = this.map;
      if (x < 0 || y < 0 || x >= m.w || y >= m.h) return false;
      if (this.solid[y * m.w + x]) return false;
      return !this.npcs.some((n) => n.x === x && n.y === y);
    }

    npcAt(x, y) {
      return this.npcs.find((n) => n.x === x && n.y === y);
    }

    collectibleAt(x, y) {
      return this.map.collectibles.find((c) => c.x === x && c.y === y && !this.hooks.isCollected(c.id));
    }

    exitAt(x, y) {
      return this.map.exits.find((e) => x >= e.x && x < e.x + e.w && y >= e.y && y < e.y + e.h);
    }

    // BFS tới ô đích hoặc tới một trong các ô đích
    findPath(goals) {
      const m = this.map;
      const start = this.player.y * m.w + this.player.x;
      const goalSet = new Set(goals.filter(([x, y]) => this.isFree(x, y) || (x === this.player.x && y === this.player.y)).map(([x, y]) => y * m.w + x));
      if (!goalSet.size) return null;
      if (goalSet.has(start)) return [];
      const prev = new Int32Array(m.w * m.h).fill(-1);
      prev[start] = start;
      const queue = [start];
      for (let qi = 0; qi < queue.length; qi++) {
        const cur = queue[qi];
        const cx = cur % m.w;
        const cy = Math.floor(cur / m.w);
        for (const [dx, dy] of Object.values(DIRS)) {
          const nx = cx + dx;
          const ny = cy + dy;
          const ni = ny * m.w + nx;
          if (nx < 0 || ny < 0 || nx >= m.w || ny >= m.h || prev[ni] !== -1 || !this.isFree(nx, ny)) continue;
          prev[ni] = cur;
          if (goalSet.has(ni)) {
            const path = [];
            for (let at = ni; at !== start; at = prev[at]) path.unshift([at % m.w, Math.floor(at / m.w)]);
            return path;
          }
          queue.push(ni);
        }
      }
      return null;
    }

    neighbors(x, y, w = 1, h = 1) {
      const out = [];
      for (let i = x; i < x + w; i++) {
        out.push([i, y - 1], [i, y + h]);
      }
      for (let j = y; j < y + h; j++) {
        out.push([x - 1, j], [x + w, j]);
      }
      return out;
    }

    walkTo(goals, onArrive) {
      const path = this.findPath(goals);
      if (!path) return false;
      this.player.path = path;
      this.player.onArrive = onArrive || null;
      if (!path.length && !this.player.moving && onArrive) {
        this.player.onArrive = null;
        onArrive();
      }
      return true;
    }

    face(tx, ty) {
      const dx = tx - (this.player.x + 0.5);
      const dy = ty - (this.player.y + 0.5);
      this.player.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    }

    talkTo(npc) {
      this.walkTo(this.neighbors(npc.x, npc.y), () => {
        this.face(npc.x + 0.5, npc.y + 0.5);
        const dx = this.player.x - npc.x;
        const dy = this.player.y - npc.y;
        npc.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        this.hooks.onNpc(npc);
      });
    }

    goToNpc(id) {
      const npc = this.npcs.find((n) => n.id === id);
      if (npc) this.talkTo(npc);
      return Boolean(npc);
    }

    /* ---------- Điều khiển ---------- */

    bindInput() {
      window.addEventListener('keydown', (e) => {
        if (this.paused || !this.map || e.target.closest('input, textarea, select, [contenteditable]')) return;
        if (KEYS[e.key]) {
          this.keyDir = KEYS[e.key];
          this.player.path = [];
          this.player.onArrive = null;
          e.preventDefault();
        } else if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest('button, a')) {
          this.interactFacing();
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', (e) => {
        if (KEYS[e.key] === this.keyDir) this.keyDir = null;
      });
      window.addEventListener('blur', () => { this.keyDir = null; });
      this.canvas.addEventListener('pointerdown', (e) => this.onPointer(e));
    }

    onPointer(e) {
      if (this.paused || !this.map) return;
      const rect = this.canvas.getBoundingClientRect();
      const wx = ((e.clientX - rect.left) * this.canvas.width) / rect.width + this.cam.x;
      const wy = ((e.clientY - rect.top) * this.canvas.height) / rect.height + this.cam.y;
      const fx = wx / T;
      const fy = wy / T;
      const tx = Math.floor(fx);
      const ty = Math.floor(fy);

      const item = this.collectibleAt(tx, ty);
      if (item) {
        this.walkTo([[tx, ty]]);
        return;
      }
      const npc = this.npcs.find((n) => fx >= n.x && fx <= n.x + 1 && fy >= n.y - 0.45 && fy <= n.y + 1);
      if (npc) {
        if (npc.word && !npc.quest) {
          this.face(npc.x + 0.5, npc.y + 0.5);
          this.hooks.onPoke({ key: `${this.map.id}:npc:${npc.id}`, word: npc.word, npc });
          return;
        }
        this.talkTo(npc);
        return;
      }
      const spot = this.spots.find((s) => inRect(s.rect, fx, fy));
      if (spot) {
        this.face(fx, fy);
        if (spot.action === 'boss') {
          const door = spot.rect;
          this.walkTo(this.neighbors(Math.floor(door[0]), Math.floor(door[1]), Math.ceil(door[2]), Math.ceil(door[3])), () => {
            this.player.dir = 'up';
            this.hooks.onAction('boss', spot);
          });
          return;
        }
        this.hooks.onPoke(spot);
        return;
      }
      if (this.isFree(tx, ty)) {
        this.walkTo([[tx, ty]]);
      } else {
        const near = this.neighbors(tx, ty).sort((a, b) => Math.hypot(a[0] - this.player.x, a[1] - this.player.y) - Math.hypot(b[0] - this.player.x, b[1] - this.player.y));
        this.walkTo(near);
      }
    }

    interactFacing() {
      const [dx, dy] = DIRS[this.player.dir];
      const fx = this.player.x + dx;
      const fy = this.player.y + dy;
      const npc = this.npcAt(fx, fy);
      if (npc) {
        if (npc.word && !npc.quest) this.hooks.onPoke({ key: `${this.map.id}:npc:${npc.id}`, word: npc.word, npc });
        else this.talkTo(npc);
        return;
      }
      const spot = this.spots.find((s) => inRect(s.rect, fx + 0.5, fy + 0.5) || inRect(s.rect, fx + 0.5, fy + 0.1));
      if (spot) {
        if (spot.action === 'boss') this.hooks.onAction('boss', spot);
        else this.hooks.onPoke(spot);
      }
    }

    /* ---------- Cập nhật ---------- */

    update(dt) {
      const p = this.player;
      if (!p.moving && !this.paused) {
        let next = null;
        if (p.path.length) next = p.path.shift();
        else if (this.keyDir) {
          const [dx, dy] = DIRS[this.keyDir];
          p.dir = this.keyDir;
          next = [p.x + dx, p.y + dy];
        }
        if (next) {
          const [nx, ny] = next;
          p.dir = nx > p.x ? 'right' : nx < p.x ? 'left' : ny > p.y ? 'down' : ny < p.y ? 'up' : p.dir;
          if (this.isFree(nx, ny)) {
            p.target = [nx, ny];
            p.moving = true;
          } else {
            p.path = [];
          }
        }
      }
      if (p.moving) {
        const tx = p.target[0] * T;
        const ty = p.target[1] * T;
        const stepPx = SPEED * T * dt;
        const dx = tx - p.px;
        const dy = ty - p.py;
        const dist = Math.hypot(dx, dy);
        if (dist <= stepPx) {
          p.px = tx;
          p.py = ty;
          p.x = p.target[0];
          p.y = p.target[1];
          p.moving = false;
          this.arrived();
        } else {
          p.px += (dx / dist) * stepPx;
          p.py += (dy / dist) * stepPx;
        }
        p.stepT += dt;
        if (p.stepT > 0.14) {
          p.stepT = 0;
          p.step = p.step === 1 ? 2 : 1;
        }
      } else {
        p.step = 0;
      }
      if (this.fade > 0) this.fade = Math.max(0, this.fade - dt * 2.5);
    }

    arrived() {
      const p = this.player;
      const item = this.collectibleAt(p.x, p.y);
      if (item) this.hooks.onCollect(item);
      const exit = this.exitAt(p.x, p.y);
      if (exit) {
        p.path = [];
        p.onArrive = null;
        this.keyDir = null;
        this.hooks.onExit(exit);
        return;
      }
      if (!p.path.length && p.onArrive) {
        const cb = p.onArrive;
        p.onArrive = null;
        cb();
      }
    }

    /* ---------- Vẽ ---------- */

    frame(now) {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      if (this.map) {
        this.update(dt);
        this.render(now);
      }
      requestAnimationFrame((t) => this.frame(t));
    }

    render(t) {
      const ctx = this.ctx;
      const map = this.map;
      const cw = this.canvas.width;
      const ch = this.canvas.height;
      const p = this.player;
      this.cam.x = Math.round(Math.max(0, Math.min(map.w * T - cw, p.px + T / 2 - cw / 2)));
      this.cam.y = Math.round(Math.max(0, Math.min(map.h * T - ch, p.py + T / 2 - ch / 2)));
      const cx = this.cam.x;
      const cy = this.cam.y;
      const visible = (x, y, pad = 64) => x > cx - pad && x < cx + cw + pad && y > cy - pad && y < cy + ch + pad;

      ctx.save();
      ctx.translate(-cx, -cy);
      ctx.drawImage(this.staticLayer, cx, cy, cw, ch, cx, cy, cw, ch);

      // Mặt nước lăn tăn
      const x0 = Math.floor(cx / T);
      const y0 = Math.floor(cy / T);
      for (let y = y0; y <= y0 + ch / T + 1 && y < map.h; y++) {
        for (let x = x0; x <= x0 + cw / T + 1 && x < map.w; x++) {
          if (map.grid[y][x] !== '~') continue;
          const phase = (t / 900 + x * 0.7 + y * 1.3) % 2;
          if (phase < 0.6) {
            ctx.fillStyle = 'rgba(178, 235, 242, .35)';
            ctx.fillRect(x * T + 6 + Math.round(phase * 20), y * T + 14 + (y % 2) * 6, 8, 2);
          }
        }
      }
      if (map.moon) W.drawMoon(ctx, map.moon, t);
      map.floaters.forEach((f) => W.drawFloater(ctx, f, t));

      // Đồ vật và nhân vật sắp theo chiều sâu (Y-sort)
      const items = [];
      map.props.forEach((pr) => {
        if (visible(pr.x * T, pr.y * T, 96)) items.push({ y: (pr.y + (pr.h || 1)) * T, draw: () => W.drawProp(ctx, pr) });
      });
      this.npcs.forEach((n) => {
        if (!visible(n.x * T, n.y * T)) return;
        const look = this.hooks.lookFor(n);
        const bob = Math.sin(t / 500 + n.x) > 0.6 ? 1 : 0;
        items.push({ y: (n.y + 1) * T - 0.5, draw: () => W.drawPerson(ctx, n.x * T + 16, (n.y + 1) * T - 2 - bob, look, n.dir || 'down', 0) });
      });
      items.push({ y: p.py + T, draw: () => W.drawPerson(ctx, p.px + 16, p.py + T - 2, this.hooks.playerLook(), p.dir, p.step) });
      items.sort((a, b) => a.y - b.y).forEach((it) => it.draw());

      // Lớp trên đầu: mái Chùa Cầu (mờ khi đi bên dưới), dây đèn lồng
      const b = map.bridge;
      const under = b && p.x >= b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h - 1;
      ctx.globalAlpha = under ? 0.45 : 1;
      ctx.drawImage(this.aboveLayer, cx, cy, cw, ch, cx, cy, cw, ch);
      ctx.globalAlpha = 1;

      if (map.night) {
        ctx.fillStyle = 'rgba(12, 18, 56, 0.52)';
        ctx.fillRect(cx, cy, cw, ch);
        ctx.globalCompositeOperation = 'lighter';
        this.lights.forEach((l) => {
          if (!visible(l.x, l.y, l.r)) return;
          const flick = l.boss ? 0.55 + Math.sin(t / 300) * 0.25 : 0.42 + Math.sin(t / 260 + l.x) * 0.06;
          const ly = l.floater ? l.y + Math.sin(t / 600 + l.x) * 2 : l.y;
          const g = ctx.createRadialGradient(l.x, ly, 0, l.x, ly, l.r);
          g.addColorStop(0, `rgba(${l.c},${flick})`);
          g.addColorStop(1, `rgba(${l.c},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(l.x - l.r, ly - l.r, l.r * 2, l.r * 2);
        });
        ctx.globalCompositeOperation = 'source-over';
      }

      this.drawMarkers(ctx, t, visible);
      ctx.restore();

      if (this.fade > 0) {
        ctx.fillStyle = `rgba(0,0,0,${this.fade})`;
        ctx.fillRect(0, 0, cw, ch);
      }
    }

    drawMarkers(ctx, t, visible) {
      const map = this.map;
      const hooks = this.hooks;
      const pulse = (Math.sin(t / 250) + 1) / 2;

      // Lối sang bản đồ khác
      map.exits.forEach((e) => {
        const x = (e.x + e.w / 2) * T;
        const y = (e.y + e.h / 2) * T;
        if (!visible(x, y)) return;
        ctx.fillStyle = `rgba(255, 224, 130, ${0.45 + pulse * 0.4})`;
        const dir = e.x === 0 ? -1 : 1;
        for (let k = 0; k < 2; k++) {
          const ax = x + dir * (k * 8 - 4) + dir * pulse * 3;
          ctx.beginPath();
          ctx.moveTo(ax + dir * 6, y);
          ctx.lineTo(ax - dir * 2, y - 7);
          ctx.lineTo(ax - dir * 2, y + 7);
          ctx.fill();
        }
      });

      // Vật phẩm: Battery Pack và Booklet
      map.collectibles.forEach((c) => {
        if (hooks.isCollected(c.id)) return;
        const x = c.x * T + 16;
        const y = c.y * T + 14 + Math.sin(t / 300 + c.x) * 3;
        if (!visible(x, y)) return;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
        glow.addColorStop(0, c.type === 'battery' ? 'rgba(0,230,118,.55)' : 'rgba(100,181,246,.6)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - 18, y - 18, 36, 36);
        if (c.type === 'battery') {
          ctx.fillStyle = '#1b5e20';
          ctx.fillRect(x - 6, y - 9, 12, 18);
          ctx.fillRect(x - 3, y - 11, 6, 2);
          ctx.fillStyle = '#00e676';
          ctx.fillRect(x - 4, y - 2, 8, 9);
          ctx.fillStyle = '#b9f6ca';
          ctx.fillRect(x - 4, y - 7, 8, 4);
        } else {
          ctx.fillStyle = '#0d47a1';
          ctx.fillRect(x - 8, y - 9, 16, 18);
          ctx.fillStyle = '#1e88e5';
          ctx.fillRect(x - 6, y - 7, 12, 14);
          ctx.fillStyle = '#fff59d';
          ctx.fillRect(x - 4, y - 4, 8, 2);
          ctx.fillRect(x - 4, y, 8, 2);
        }
      });

      // Điểm chạm: lấp lánh khi chưa khám phá, nhãn từ khi đã chạm
      const labels = hooks.labelsOn();
      ctx.font = '8px Silkscreen, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const drawnLabels = new Set();
      this.spots.forEach((s) => {
        if (!s.word) return;
        const x = (s.rect[0] + s.rect[2] / 2) * T;
        const y = s.rect[1] * T;
        if (!visible(x, y)) return;
        if (!hooks.isPoked(s.key)) {
          const tw = (t / 400 + s.rect[0] * 1.7 + s.rect[1]) % 3;
          if (tw < 1.2) {
            const a = Math.sin((tw / 1.2) * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
            ctx.fillRect(x - 1, y + 4 - 5, 2, 10);
            ctx.fillRect(x - 5, y + 4 - 1, 10, 2);
            ctx.fillStyle = `rgba(255, 213, 79, ${a})`;
            ctx.fillRect(x - 1, y + 3, 2, 2);
          }
          return;
        }
        if (!labels) return;
        const labelKey = `${s.word}@${Math.round(x / 64)},${Math.round(y / 48)}`;
        if (drawnLabels.has(labelKey)) return;
        drawnLabels.add(labelKey);
        const word = hooks.wordLabel(s.word);
        if (!word) return;
        const state = hooks.wordState(s.word);
        const tw = ctx.measureText(word).width + 8;
        const ly = Math.max(y - 4, 6);
        ctx.fillStyle = state === 'known' ? 'rgba(21, 128, 61, .92)' : state === 'unknown' ? 'rgba(234, 88, 12, .92)' : 'rgba(255, 255, 255, .9)';
        ctx.fillRect(Math.round(x - tw / 2), Math.round(ly - 6), Math.round(tw), 12);
        ctx.fillStyle = state === 'known' || state === 'unknown' ? '#ffffff' : '#1e1b4b';
        ctx.fillText(word, Math.round(x), Math.round(ly) + 0.5);
      });

      // Dấu nhiệm vụ trên đầu NPC
      this.npcs.forEach((n) => {
        const mark = hooks.questMark(n);
        if (!mark) return;
        const x = n.x * T + 16;
        const y = n.y * T - 22 + (mark === '!' ? Math.sin(t / 220) * 2 : 0);
        if (!visible(x, y)) return;
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(x - 8, y - 9, 16, 16);
        ctx.fillStyle = mark === '!' ? '#FBC02D' : '#86efac';
        ctx.fillRect(x - 6, y - 7, 12, 12);
        ctx.fillStyle = '#1e1b4b';
        ctx.font = '700 10px Silkscreen, monospace';
        ctx.fillText(mark, x, y - 0.5);
      });

      // Bong bóng chào của NPC gần nhất
      const p = this.player;
      let nearest = null;
      let best = 2.6;
      this.npcs.forEach((n) => {
        const d = Math.hypot(n.x - p.px / T, n.y - p.py / T);
        if (d < best) {
          best = d;
          nearest = n;
        }
      });
      if (nearest && !this.paused) {
        const text = hooks.greetFor(nearest);
        if (text) {
          ctx.font = '600 10px "Plus Jakarta Sans", "Segoe UI", sans-serif';
          const tw = Math.min(180, ctx.measureText(text).width + 14);
          const x = Math.max(this.cam.x + tw / 2 + 2, Math.min(this.cam.x + this.canvas.width - tw / 2 - 2, nearest.x * T + 16));
          const y = nearest.y * T - (hooks.questMark(nearest) ? 40 : 22);
          ctx.fillStyle = '#1e1b4b';
          ctx.fillRect(Math.round(x - tw / 2) - 1, y - 12, Math.round(tw) + 2, 22);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(Math.round(x - tw / 2), y - 11, Math.round(tw), 20);
          ctx.fillRect(nearest.x * T + 12, y + 9, 6, 4);
          ctx.fillStyle = '#1e1b4b';
          ctx.fillText(text, Math.round(x), y - 0.5, 170);
        }
      }
    }
  }

  IT.Engine = Engine;
})();
