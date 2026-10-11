/* Sổ câu sai (Mistake Notebook) dùng chung cho các deck bài tập của portal.
   Mỗi trang bài tập gọi PortalReview.record(deck, câu hỏi, phương án đã chọn) đúng một lần khi học sinh
   trả lời một câu: deck cộng số câu đã làm / làm đúng, câu sai được lưu kèm đáp án đúng, lời giải và
   đoạn văn để xem lại và làm lại ở review.html. Làm đúng lại một câu đã sai thì câu đó chuyển sang "Fixed".

   localStorage 'portal_review_log':
   { v: 1,
     decks: { <deck>: { answered, correct, last, items: { <key>: câu sai } } },
     ctx:   { <key>: { title, text } } }   đoạn văn dùng chung cho nhiều câu (bài đọc, bài điền từ)
   câu sai: { src, tag, q, opts, ans, pick, why, ctx, wrong, first, at, fixed }

   Liên kết "Mistakes" trên các trang: thẻ có data-review-link="<deck>" (hoặc "all") được gắn href tới
   review.html; phần tử con data-review-count hiện số câu cần xem lại. */
(function () {
  'use strict';

  const KEY = 'portal_review_log';
  const MAX_ITEMS = 400;   // mỗi deck; vượt thì bỏ câu đã sửa cũ nhất trước, rồi tới câu sai cũ nhất

  const DECKS = [
    { id: 'vocabulary', name: 'Vocabulary Mastery', href: 'Vocabulary_Game.html', color: '#C83228' },
    { id: 'engquiz', name: 'English Quiz', href: 'EngQuiz.html', color: '#1B4D3E' },
    { id: 'textcompletion', name: 'Text Completion', href: 'TextCompletion.html', color: '#2E4A7D' },
    { id: 'examprep', name: 'Exam Prep', href: 'HSG%2012/index.html', color: '#1F1D24' },
    { id: 'vact', name: 'V-ACT Test', href: 'V-ACT_TEST/index.html', color: '#B5525F' },
  ];

  // Thư mục gốc của portal, suy ra từ đường dẫn script này (trang có thể nằm sâu như V-ACT_TEST/test3/)
  const ROOT = (function () {
    const s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/js\/review-log\.js(?:\?.*)?$/, '') : '';
  })();

  function fresh() { return { v: 1, decks: {}, ctx: {} }; }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d && typeof d === 'object' && d.decks) {
        if (!d.ctx) d.ctx = {};
        return d;
      }
    } catch (e) { }
    return fresh();
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;   // hết dung lượng: giữ dữ liệu cũ, không làm hỏng trang bài tập
    }
  }

  function deckOf(data, deck) {
    if (!data.decks[deck]) data.decks[deck] = { answered: 0, correct: 0, last: 0, items: {} };
    return data.decks[deck];
  }

  // Mã băm ngắn (FNV-1a) làm khoá ổn định cho câu hỏi và đoạn văn
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  // ---- Văn bản: chỉ giữ vài thẻ định dạng an toàn khi hiển thị lại ----
  const ALLOWED = /&lt;(\/?)(b|strong|i|em|u|br)\s*\/?&gt;/gi;

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safe(html) {
    return escapeHtml(html).replace(ALLOWED, (m, slash, tag) => '<' + slash + tag.toLowerCase() + '>');
  }

  // HTML của trang bài tập → chuỗi chỉ còn b/i/u/br: gạch chân lỗi sai (V-ACT) thành <u>, bỏ thẻ khác
  function tidy(html) {
    return String(html == null ? '' : html)
      .replace(/<span[^>]*underline[^>]*>([\s\S]*?)<\/span>/gi, '<u>$1</u>')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
      .replace(/<(?!\/?(?:b|strong|i|em|u)\b)[^>]*>/gi, '')
      .replace(/<(\/?)(b|strong|i|em|u)\b[^>]*>/gi, '<$1$2>')
      .replace(/&nbsp;/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function plain(html) {
    return tidy(html).replace(/<[^>]*>/g, '');
  }

  // Câu chứa chỗ trống khớp `marker` trong đoạn văn, làm đề cho câu điền từ không có đề riêng.
  // Chỗ trống là cả một câu (dạng điền câu) thì lấy thêm câu trước và câu sau cho đủ ngữ cảnh.
  function around(text, marker) {
    const t = String(text || '');
    const m = t.match(marker);
    if (!m) return '';
    const bounds = [0];
    const re = /[.?!]["'”’)]?\s+|\n+/g;
    let b;
    while ((b = re.exec(t))) bounds.push(b.index + b[0].length);
    bounds.push(t.length);
    let s = 0;
    while (s < bounds.length - 2 && bounds[s + 1] <= m.index) s++;
    let e = s + 1;
    const words = t.slice(bounds[s], bounds[e]).replace(m[0], '').replace(/[^A-Za-z]/g, '');
    if (words.length < 30) {
      if (s > 0) s--;
      if (e < bounds.length - 1) e++;
    }
    let out = t.slice(bounds[s], bounds[e]).trim();
    if (out.length > 480) {
      const rel = out.indexOf(m[0]);
      out = (rel > 220 ? '…' : '') + out.slice(Math.max(0, rel - 220), rel + 240) + (rel + 240 < out.length ? '…' : '');
    }
    return out;
  }

  // ---- Ghi nhận một câu trả lời ----
  // q: { id?, src, tag, question, options: [..], answer: chỉ số đúng, explain, context?: { title, text } }
  function record(deck, q, picked) {
    if (!deck || !q || !Array.isArray(q.options)) return;
    const ok = picked === q.answer;
    const data = load();
    const d = deckOf(data, deck);
    const now = Date.now();
    d.answered++;
    if (ok) d.correct++;
    d.last = now;

    const key = q.id ? String(q.id) : hash(plain(q.question) + '|' + plain(q.options[q.answer]));
    const it = d.items[key];
    if (!ok) {
      let ctx = null;
      if (q.context && q.context.text) {
        const text = tidy(q.context.text);
        ctx = 'c' + hash((q.context.title || '') + '|' + text);
        data.ctx[ctx] = { title: plain(q.context.title || ''), text };
      }
      d.items[key] = Object.assign(it || { wrong: 0, first: now }, {
        src: plain(q.src || ''), tag: plain(q.tag || ''), q: tidy(q.question),
        opts: q.options.map(tidy), ans: q.answer, pick: picked,
        why: tidy(q.explain), ctx, at: now, fixed: 0,
      });
      d.items[key].wrong++;
    } else if (it && !it.fixed) {
      it.fixed = now;   // làm đúng lại ngay trong deck cũng tính là đã sửa
    }
    prune(data, d);
    save(data);
    refreshLinks();
  }

  function prune(data, d) {
    const keys = Object.keys(d.items);
    if (keys.length > MAX_ITEMS) {
      keys.sort((a, b) => {
        const A = d.items[a], B = d.items[b];
        if (!!A.fixed !== !!B.fixed) return A.fixed ? -1 : 1;
        return (A.fixed || A.at) - (B.fixed || B.at);
      });
      keys.slice(0, keys.length - MAX_ITEMS).forEach((k) => delete d.items[k]);
    }
    // Bỏ đoạn văn không còn câu nào dùng
    const used = new Set();
    Object.values(data.decks).forEach((dk) => Object.values(dk.items).forEach((it) => it.ctx && used.add(it.ctx)));
    Object.keys(data.ctx).forEach((k) => { if (!used.has(k)) delete data.ctx[k]; });
  }

  // ---- Đọc / sửa từ trang review ----
  function update(deck, key, fn) {
    const data = load();
    const d = data.decks[deck];
    if (!d || !d.items[key]) return;
    if (fn(d, d.items[key]) === 'delete') delete d.items[key];
    prune(data, d);
    save(data);
    refreshLinks();
  }

  // Xoá các câu đã sửa của những deck đã chọn
  function clearFixed(ids) {
    const data = load();
    ids.forEach((id) => {
      const d = data.decks[id];
      if (d) Object.keys(d.items).forEach((k) => { if (d.items[k].fixed) delete d.items[k]; });
    });
    prune(data, { items: {} });
    save(data);
    refreshLinks();
  }

  function stats(deck) {
    const d = load().decks[deck] || { answered: 0, correct: 0, items: {} };
    const items = Object.values(d.items);
    const open = items.filter((it) => !it.fixed).length;
    return {
      answered: d.answered, correct: d.correct, last: d.last || 0,
      accuracy: d.answered ? Math.round((d.correct / d.answered) * 100) : null,
      open, fixed: items.length - open,
    };
  }

  function openCount(deck) {
    if (deck === 'all') return DECKS.reduce((n, dk) => n + stats(dk.id).open, 0);
    return stats(deck).open;
  }

  function reviewUrl(deck) {
    return ROOT + 'review.html' + (deck && deck !== 'all' ? '?deck=' + encodeURIComponent(deck) : '');
  }

  // Gắn đường dẫn và số câu cho mọi thẻ data-review-link trên trang
  function refreshLinks() {
    document.querySelectorAll('[data-review-link]').forEach((el) => {
      const deck = el.getAttribute('data-review-link');
      if (el.tagName === 'A') el.href = reviewUrl(deck);
      const n = openCount(deck);
      el.classList.toggle('has-mistakes', n > 0);
      el.querySelectorAll('[data-review-count]').forEach((c) => { c.textContent = n; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refreshLinks);
  else refreshLinks();
  // Trang mở lại từ bộ nhớ đệm (nút Back) hoặc tab khác vừa ghi thêm câu sai
  window.addEventListener('pageshow', refreshLinks);
  window.addEventListener('storage', (e) => { if (e.key === KEY) refreshLinks(); });

  window.PortalReview = {
    DECKS, ROOT, record, stats, openCount, reviewUrl, refreshLinks, clearFixed,
    load, save, update, hash, safe, tidy, plain, around, escapeHtml,
  };
})();
