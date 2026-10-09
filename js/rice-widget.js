// Trang chủ: Cánh đồng tri thức (cây lúa 10 giai đoạn) và
// Thẻ chứng nhận Mùa Vàng Bội Thu. Số liệu lấy từ js/study-tracker.js (PortalStudy):
// lúa lớn lên nhờ nước kiếm được khi học ở các trang bài tập, không còn nút tưới thủ công.
(function () {
  const S = window.PortalStudy;
  const $ = (id) => document.getElementById(id);
  if (!S || !$('homeRiceImg')) return;

  const IMG_DIR = 'assets/rice/';
  const STAGES = [
    { title: 'Seed Swelling', img: 'cozy_oriental_rice_stage_1_swelling.png', desc: 'Soaked rice seeds swell up in the soft soil.' },
    { title: 'Germination', img: 'cozy_oriental_rice_stage_2_germination.png', desc: 'The first green shoot pokes out of the soil.' },
    { title: 'Tillering', img: 'cozy_oriental_rice_stage_3_tillering.png', desc: 'The young plant sends out many leafy side shoots.' },
    { title: 'Stem Elongation', img: 'cozy_oriental_rice_stage_4_stem_elongation.png', desc: 'The stems grow tall and strong, joint by joint.' },
    { title: 'Booting', img: 'cozy_oriental_rice_stage_5_panicle_initiation.png', desc: 'The young rice head swells inside the leaf sheath.' },
    { title: 'Heading', img: 'cozy_oriental_rice_stage_6_heading.png', desc: 'Green rice heads push out of the flag leaf.' },
    { title: 'Flowering', img: 'cozy_oriental_rice_stage_7_flowering.png', desc: 'Tiny rice flowers open and pollinate.' },
    { title: 'Milky Ripe', img: 'cozy_oriental_rice_stage_8_milky_ripe.png', desc: 'Grains fill with milky liquid and the heads begin to bend.' },
    { title: 'Dough Ripe', img: 'cozy_oriental_rice_stage_9_dough_ripe.png', desc: 'Grains turn soft and doughy as the husks go yellow.' },
    { title: 'Fully Ripe', img: 'cozy_oriental_rice_stage_10_golden_harvest.png', desc: 'Heavy golden heads are ready to harvest!' }
  ];
  const LAST = STAGES.length - 1;
  const R = S.RULES;

  const els = {
    img: $('homeRiceImg'),
    stepTag: $('homeRiceStepTag'),
    title: $('homeRiceStageTitle'),
    desc: $('homeRiceDesc'),
    water: $('homeWaterCount'),
    gain: $('homeWaterGain'),
    bar: $('homeRiceProgress'),
    fill: $('homeRiceProgressFill'),
    todayMin: $('riceTodayMinutes'),
    todayChip: $('riceTodayChip'),
    perfect: $('ricePerfectCount'),
    harvestBtn: $('riceHarvestBtn'),
    streak: $('riceStreak'),
    modal: $('harvestCertModal'),
    canvas: $('certCanvas'),
    certName: $('certNameInput'),
    download: $('certDownloadBtn'),
    newCrop: $('certNewCropBtn'),
    closeCert: $('certCloseBtn')
  };

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
  }

  let certShown = false;

  function render(d) {
    // ---- Cánh đồng lúa ----
    const i = S.stageIndex(d);
    const stage = STAGES[i];
    const src = IMG_DIR + stage.img;
    if (els.img.getAttribute('src') !== src) els.img.src = src;
    els.img.alt = `Rice growth stage ${i + 1}: ${stage.title}`;
    els.stepTag.textContent = `STAGE ${i + 1} / ${STAGES.length}`;
    els.title.textContent = stage.title;
    els.desc.textContent = stage.desc;
    els.water.textContent = String(d.waterCount);
    els.fill.style.width = `${Math.min(100, ((d.cropWater + R.dropsPerStage) / (S.HARVEST_WATER + R.dropsPerStage)) * 100)}%`;
    els.bar.setAttribute('aria-valuenow', String(i + 1));
    document.querySelectorAll('#homeRiceDots span').forEach((dot, n) => dot.classList.toggle('active', n <= i));

    const todayMin = Math.floor(d.day.seconds / 60);
    els.todayMin.textContent = String(Math.min(todayMin, R.goalMinutes));
    els.todayChip.classList.toggle('done', d.day.goal);
    els.perfect.textContent = String(d.day.perfect);
    els.harvestBtn.hidden = i < LAST;

    els.streak.textContent = String(S.currentStreak(d));

    // ---- Lúa vừa lớn thêm từ lần xem trước: nảy nhẹ và hiện số giọt nước nhận được ----
    if (d.cropWater > d.lastSeenCropWater) {
      els.gain.textContent = `+${d.cropWater - d.lastSeenCropWater} 💧`;
      els.gain.classList.remove('show');
      void els.gain.offsetWidth;
      els.gain.classList.add('show');
      els.img.classList.add('bounce');
      setTimeout(() => els.img.classList.remove('bounce'), 400);
      S.markSeen();
    }

    if (i === LAST && !certShown) {
      certShown = true;
      openCertificate();
    }
  }

  // ---- Thẻ chứng nhận Mùa Vàng Bội Thu (vẽ bằng canvas để tải về đúng như trên màn hình) ----
  const certBg = new Image();
  certBg.src = IMG_DIR + 'cozy_oriental_golden_harvest_certificate.webp';
  const certFont = '"Plus Jakarta Sans", "Segoe UI", sans-serif';

  async function drawCertificate() {
    const d = S.read();
    const ctx = els.canvas.getContext('2d');
    try {
      await Promise.all([
        certBg.decode(),
        document.fonts ? document.fonts.load(`700 22px ${certFont}`) : null
      ]);
    } catch (e) { /* vẫn vẽ chữ nếu ảnh nền chưa tải được */ }
    const W = els.canvas.width;
    const H = els.canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(0, 0, W, H);
    if (certBg.complete && certBg.naturalWidth) ctx.drawImage(certBg, 0, 0, W, H);

    const cx = 600;
    const name = (els.certName.value || d.studentName || '').trim() || 'A Diligent Student';
    const accuracy = d.cropTotal ? `${Math.round((d.cropCorrect / d.cropTotal) * 100)}%` : '—';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = '#8C5A1E';
    ctx.font = `700 20px ${certFont}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    ctx.fillText('THIS CERTIFIES THAT', cx, 368);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

    ctx.fillStyle = '#3B2314';
    let size = 54;
    do {
      ctx.font = `italic 700 ${size}px Georgia, "Times New Roman", serif`;
      size -= 2;
    } while (ctx.measureText(name).width > 560 && size > 26);
    ctx.fillText(name, cx, 432);

    ctx.strokeStyle = '#C9A04A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 210, 452);
    ctx.lineTo(cx + 210, 452);
    ctx.stroke();

    ctx.fillStyle = '#3B2314';
    ctx.font = `26px Georgia, "Times New Roman", serif`;
    ctx.fillText(`has brought in Golden Harvest No. ${d.totalHarvests + 1}`, cx, 496);
    ctx.fillStyle = '#5B4632';
    ctx.font = `19px ${certFont}`;
    ctx.fillText('caring for the rice through all 10 growth stages', cx, 528);

    ctx.fillStyle = '#3B2314';
    ctx.font = `600 19px ${certFont}`;
    ctx.fillText(`⏱ ${formatTime(d.cropSeconds)} studied     🎯 ${accuracy} accuracy     📚 ${S.wordsMastered()} words mastered`, cx, 580);

    ctx.fillStyle = '#8C5A1E';
    ctx.font = `600 17px ${certFont}`;
    ctx.fillText(`Harvested on ${new Date().toLocaleDateString('en-GB')}`, cx, 618);
  }

  function openCertificate() {
    els.certName.value = S.read().studentName;
    els.modal.hidden = false;
    drawCertificate();
    els.certName.focus();
  }

  function closeCertificate() {
    els.modal.hidden = true;
    els.harvestBtn.focus();
  }

  els.harvestBtn.addEventListener('click', openCertificate);
  els.closeCert.addEventListener('click', closeCertificate);
  els.modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertificate(); });
  els.certName.addEventListener('input', () => {
    S.setName(els.certName.value);
    drawCertificate();
  });
  els.download.addEventListener('click', async () => {
    await drawCertificate();
    els.canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `golden-harvest-${S.read().totalHarvests + 1}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }, 'image/png');
  });
  els.newCrop.addEventListener('click', () => {
    S.harvest();
    els.modal.hidden = true;
    certShown = false;
    render(S.read());
  });


  S.onChange(render);
  render(S.read());
})();
