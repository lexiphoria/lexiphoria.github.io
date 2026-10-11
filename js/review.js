/* Trang Sổ câu sai (review.html): chọn deck, xem đáp án đúng + lời giải của từng câu đã sai,
   hoặc chế độ "Try again" để làm lại; làm đúng thì câu chuyển sang mục Fixed. */
(function () {
  'use strict';

  const R = window.PortalReview;
  const PAGE = 30;
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  const params = new URLSearchParams(location.search);
  let deck = R.DECKS.some((d) => d.id === params.get('deck')) ? params.get('deck') : 'all';
  let view = 'open';      // 'open' | 'fixed'
  let mode = 'review';    // 'review' | 'retry'
  let shown = PAGE;

  const $ = (id) => document.getElementById(id);
  const esc = R.escapeHtml;
  const deckInfo = (id) => R.DECKS.find((d) => d.id === id) || { id, name: id, color: '#1A1A1A', href: '#' };

  // Gom các câu sai của deck đang chọn (hoặc tất cả), mới nhất lên đầu
  function collect() {
    const data = R.load();
    const ids = deck === 'all' ? R.DECKS.map((d) => d.id) : [deck];
    const out = [];
    ids.forEach((id) => {
      const d = data.decks[id];
      if (!d) return;
      Object.entries(d.items).forEach(([key, it]) => out.push({ deck: id, key, it }));
    });
    out.sort((a, b) => (b.it.fixed || b.it.at) - (a.it.fixed || a.it.at));
    return { data, open: out.filter((x) => !x.it.fixed), fixed: out.filter((x) => x.it.fixed) };
  }

  function renderTabs() {
    const tabs = [{ id: 'all', name: 'All decks', color: '#1A1A1A' }].concat(R.DECKS);
    $('deckTabs').innerHTML = tabs.map((t) => {
      const n = R.openCount(t.id);
      return `<button type="button" class="rv-tab${t.id === deck ? ' is-on' : ''}" data-deck="${t.id}" style="--deck:${t.color}" aria-pressed="${t.id === deck}">
        ${esc(t.name)}<span class="rv-badge${n ? '' : ' is-zero'}">${n}</span></button>`;
    }).join('');
  }

  function renderSummary(list) {
    const ids = deck === 'all' ? R.DECKS.map((d) => d.id) : [deck];
    let answered = 0, correct = 0;
    ids.forEach((id) => { const s = R.stats(id); answered += s.answered; correct += s.correct; });
    const acc = answered ? Math.round((correct / answered) * 100) + '%' : '—';
    const info = deckInfo(deck);
    const open = deck === 'all' ? '' : `<a class="rv-open" href="${R.ROOT + info.href}" style="--deck:${info.color}">Open ${esc(info.name)} →</a>`;
    $('summary').innerHTML = `
      <div class="rv-stat"><b>${answered}</b><span>Answered</span></div>
      <div class="rv-stat"><b>${acc}</b><span>Accuracy</span></div>
      <div class="rv-stat is-open"><b>${list.open.length}</b><span>To review</span></div>
      <div class="rv-stat is-fixed"><b>${list.fixed.length}</b><span>Fixed</span></div>
      ${open}`;
    $('countOpen').textContent = list.open.length;
    $('countFixed').textContent = list.fixed.length;
    $('clearFixed').hidden = !(view === 'fixed' && list.fixed.length);
  }

  function optionsHtml(x, reveal) {
    const it = x.it;
    return it.opts.map((o, i) => {
      let cls = 'rv-opt';
      let note = '';
      if (reveal) {
        if (i === it.ans) { cls += ' is-correct'; note = '<span class="rv-note">Correct answer</span>'; }
        else if (i === it.pick) { cls += ' is-picked'; note = '<span class="rv-note">Your answer</span>'; }
        else cls += ' is-dim';
      }
      return `<li><button type="button" class="${cls}" data-opt="${i}"${reveal ? ' disabled' : ''}>
        <span class="rv-letter">${LETTERS[i] || i + 1}</span><span class="rv-otext">${R.safe(o)}</span>${note}</button></li>`;
    }).join('');
  }

  function cardHtml(x, data) {
    const it = x.it;
    const info = deckInfo(x.deck);
    const reveal = mode === 'review';
    const ctx = it.ctx && data.ctx[it.ctx];
    const missed = it.wrong > 1 ? `<span class="rv-miss">Missed ×${it.wrong}</span>` : '';
    const fixed = it.fixed ? '<span class="rv-fixed">✓ Fixed</span>' : '';
    return `<article class="rv-card${it.fixed ? ' is-fixed' : ''}" data-deck="${x.deck}" data-key="${esc(x.key)}" style="--deck:${info.color}">
      <div class="rv-meta">
        ${deck === 'all' ? `<span class="rv-deck">${esc(info.name)}</span>` : ''}
        ${it.src ? `<span>${esc(it.src)}</span>` : ''}
        ${it.tag ? `<span class="rv-tag">${esc(it.tag)}</span>` : ''}
        ${missed}${fixed}
      </div>
      ${it.q ? `<div class="rv-q">${R.safe(it.q)}</div>` : ''}
      ${ctx ? `<details class="rv-ctx"><summary>Show passage</summary>${ctx.title ? `<h3>${esc(ctx.title)}</h3>` : ''}<div class="rv-ctx-text">${R.safe(ctx.text)}</div></details>` : ''}
      <ol class="rv-opts">${optionsHtml(x, reveal)}</ol>
      <div class="rv-why"${reveal && it.why ? '' : ' hidden'}>${R.safe(it.why)}</div>
      <div class="rv-actions">
        <span class="rv-result" aria-live="polite"></span>
        <button type="button" class="rv-remove" title="Remove from notebook">Remove</button>
      </div>
    </article>`;
  }

  function render() {
    const list = collect();
    renderTabs();
    renderSummary(list);
    const items = view === 'open' ? list.open : list.fixed;
    if (!items.length) {
      $('list').innerHTML = `<div class="rv-empty">
        <img src="assets/characters/sticker_cheer_happy.png" alt="">
        <p>${view === 'open' ? 'No mistakes to review here.' : 'Nothing fixed yet.'}</p></div>`;
      $('showMore').hidden = true;
      return;
    }
    $('list').innerHTML = items.slice(0, shown).map((x) => cardHtml(x, list.data)).join('');
    $('showMore').hidden = items.length <= shown;
    $('showMore').textContent = `Show more (${items.length - shown})`;
  }

  // Làm lại một câu ở chế độ Try again
  function retry(card, picked) {
    const d = card.dataset.deck, key = card.dataset.key;
    let ok = false;
    R.update(d, key, (dk, it) => {
      ok = picked === it.ans;
      if (ok) it.fixed = Date.now();
      else { it.wrong++; it.pick = picked; it.at = Date.now(); it.fixed = 0; }
    });
    const it = (R.load().decks[d] || { items: {} }).items[key];
    if (!it) return;
    card.querySelectorAll('.rv-opt').forEach((b) => {
      const i = +b.dataset.opt;
      b.disabled = true;
      if (i === it.ans) b.classList.add('is-correct');
      else if (i === picked) b.classList.add('is-picked');
      else b.classList.add('is-dim');
    });
    const why = card.querySelector('.rv-why');
    if (it.why) why.hidden = false;
    const res = card.querySelector('.rv-result');
    res.textContent = ok ? '✓ Correct — moved to Fixed' : '✗ Not yet — keep it in your notebook';
    res.className = 'rv-result ' + (ok ? 'is-ok' : 'is-bad');
    renderTabs();
    renderSummary(collect());
  }

  // ---- Sự kiện ----
  $('deckTabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-deck]');
    if (!b) return;
    deck = b.dataset.deck;
    shown = PAGE;
    const url = new URL(location.href);
    if (deck === 'all') url.searchParams.delete('deck'); else url.searchParams.set('deck', deck);
    history.replaceState(null, '', url);
    render();
  });

  document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
    view = b.dataset.view;
    shown = PAGE;
    document.querySelectorAll('[data-view]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    render();
  }));

  document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    render();
  }));

  $('list').addEventListener('click', (e) => {
    const card = e.target.closest('.rv-card');
    if (!card) return;
    const opt = e.target.closest('.rv-opt');
    if (opt && !opt.disabled && mode === 'retry') {
      retry(card, +opt.dataset.opt);
      return;
    }
    if (e.target.closest('.rv-remove')) {
      R.update(card.dataset.deck, card.dataset.key, () => 'delete');
      render();
    }
  });

  $('showMore').addEventListener('click', () => { shown += PAGE; render(); });

  $('clearFixed').addEventListener('click', () => {
    if (!confirm('Remove all fixed questions from the notebook?')) return;
    R.clearFixed(deck === 'all' ? R.DECKS.map((d) => d.id) : [deck]);
    render();
  });

  // Mở lại bằng nút Back (trang lấy từ bộ nhớ đệm) thì vẽ lại theo dữ liệu mới
  window.addEventListener('pageshow', (e) => { if (e.persisted) render(); });
  render();
})();
