/* Panel "My Progress" trên trang chủ: mỗi deck một dòng (số câu đã làm, tỉ lệ đúng, số câu sai cần xem lại),
   bấm vào dòng nào thì mở Sổ câu sai (review.html) của deck đó. Số liệu lấy từ js/review-log.js. */
(function () {
  'use strict';

  function render() {
    const list = document.getElementById('progressList');
    if (!list || !window.PortalReview) return;
    const R = window.PortalReview;
    list.innerHTML = R.DECKS.map((d) => {
      const s = R.stats(d.id);
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
    R.refreshLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
  // Quay lại trang chủ bằng nút Back (trang lấy từ bộ nhớ đệm) thì cập nhật số liệu mới
  window.addEventListener('pageshow', (e) => { if (e.persisted) render(); });
})();
