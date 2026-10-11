/* Panel "My Progress" trên trang chủ: gọn một dòng gồm cuốn sổ (số câu sai cần xem lại) và thanh tiến độ chung
   (tỉ lệ đúng của mọi deck). Bấm vào thì mở danh sách từng deck; bấm một deck thì mở Sổ câu sai (review.html)
   của deck đó. Số liệu lấy từ js/review-log.js. */
(function () {
  'use strict';

  const OPEN_KEY = 'progress_panel_open';   // nhớ trạng thái mở / đóng trên máy này

  function render() {
    const list = document.getElementById('progressList');
    if (!list || !window.PortalReview) return;
    const R = window.PortalReview;
    let answered = 0, correct = 0, open = 0;

    list.innerHTML = R.DECKS.map((d) => {
      const s = R.stats(d.id);
      answered += s.answered;
      correct += s.correct;
      open += s.open;
      const meta = s.answered ? `${s.answered} answered · ${s.accuracy}% correct` : 'Not started';
      const badge = s.open
        ? `<span class="pp-miss" title="${s.open} mistakes to review">${s.open}</span>`
        : (s.answered ? '<span class="pp-ok" title="No mistakes to review">✓</span>' : '');
      const bar = s.answered ? `<span class="pp-bar"><span style="width:${s.accuracy}%"></span></span>` : '';
      return `<li><a href="${R.reviewUrl(d.id)}" style="--deck:${d.color}">
        <span class="pp-dot" aria-hidden="true"></span>
        <span class="pp-text"><span class="pp-name">${R.escapeHtml(d.name)}</span><span class="pp-meta">${meta}</span>${bar}</span>
        ${badge}</a></li>`;
    }).join('');

    // Dòng tóm tắt
    const acc = answered ? Math.round((correct / answered) * 100) : 0;
    document.getElementById('progressTotalBar').style.width = acc + '%';
    document.getElementById('progressTotalMeta').textContent = answered
      ? `${answered} answered · ${acc}% correct`   // số câu sai đã hiện trên huy hiệu của cuốn sổ
      : 'Not started';
    const badge = document.getElementById('progressBadge');
    badge.textContent = open;
    badge.hidden = !open;
    document.querySelector('#progressCard .progress-sum').title = open
      ? `${open} mistakes to review — tap to see each deck`
      : 'Tap to see each deck';
    R.refreshLinks();
  }

  function setup() {
    const card = document.getElementById('progressCard');
    if (!card) return;
    try { card.open = localStorage.getItem(OPEN_KEY) === '1'; } catch (e) { }
    card.addEventListener('toggle', () => {
      try { localStorage.setItem(OPEN_KEY, card.open ? '1' : '0'); } catch (e) { }
    });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
  // Quay lại trang chủ bằng nút Back (trang lấy từ bộ nhớ đệm) thì cập nhật số liệu mới
  window.addEventListener('pageshow', (e) => { if (e.persisted) render(); });
})();
