// Widget trồng lúa trang chủ: mỗi lần tưới +10 giọt nước và cây lúa lên 1 giai đoạn (10 giai đoạn).
// Tiến độ lưu trong localStorage ('user_rice_farm_data') nên giữ nguyên khi tải lại trang.
(function () {
  const STORAGE_KEY = 'user_rice_farm_data';
  const IMG_DIR = 'assets/rice/';

  const STAGES = [
    { title: 'Seed Swelling', img: 'rice_stage_1_swelling.svg', desc: 'Soaked rice seeds swell up in the soft soil.' },
    { title: 'Germination', img: 'rice_stage_2_germination.svg', desc: 'The first green shoot pokes out of the soil.' },
    { title: 'Tillering', img: 'rice_stage_3_tillering.svg', desc: 'The young plant sends out many leafy side shoots.' },
    { title: 'Stem Elongation', img: 'rice_stage_4_stem_elongation.svg', desc: 'The stems grow tall and strong, joint by joint.' },
    { title: 'Panicle Initiation', img: 'rice_stage_5_panicle_initiation.svg', desc: 'A tiny rice head starts forming inside the leaf sheath.' },
    { title: 'Heading', img: 'rice_stage_6_heading.svg', desc: 'Green rice heads push out of the flag leaf.' },
    { title: 'Flowering', img: 'rice_stage_7_flowering.svg', desc: 'Tiny rice flowers open and pollinate.' },
    { title: 'Milky Ripe', img: 'rice_stage_8_milky_ripe.svg', desc: 'Grains fill with milky liquid and the heads begin to bend.' },
    { title: 'Dough Ripe', img: 'rice_stage_9_dough_ripe.svg', desc: 'Grains turn soft and doughy as the husks go yellow.' },
    { title: 'Golden Harvest', img: 'rice_stage_10_golden_harvest.svg', desc: 'Heavy golden heads are ready to harvest!' }
  ];
  const LAST = STAGES.length - 1;

  const $ = (id) => document.getElementById(id);
  const els = {
    img: $('homeRiceImg'),
    stepTag: $('homeRiceStepTag'),
    title: $('homeRiceStageTitle'),
    desc: $('homeRiceDesc'),
    water: $('homeWaterCount'),
    bar: $('homeRiceProgress'),
    fill: $('homeRiceProgressFill'),
    harvests: $('totalHarvestCount'),
    waterBtn: $('waterRiceBtn'),
    modal: $('riceHarvestModal'),
    newCropBtn: $('startNewCropBtn')
  };
  if (!els.img) return;

  function count(v) {
    return Number.isInteger(v) && v >= 0 ? v : 0;
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (d) {
        return {
          waterCount: count(d.waterCount),
          stageIndex: Math.min(count(d.stageIndex), LAST),
          totalHarvests: count(d.totalHarvests)
        };
      }
    } catch (e) { /* localStorage bị chặn hoặc dữ liệu hỏng: bắt đầu lại */ }
    return { waterCount: 0, stageIndex: 0, totalHarvests: 0 };
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farm));
    } catch (e) { /* không lưu được thì vẫn chơi được trong phiên này */ }
  }

  let farm = load();

  function render() {
    const i = farm.stageIndex;
    const stage = STAGES[i];
    els.img.src = IMG_DIR + stage.img;
    els.img.alt = `Rice growth stage ${i + 1}: ${stage.title}`;
    els.stepTag.textContent = `STAGE ${i + 1} / ${STAGES.length}`;
    els.title.textContent = stage.title;
    els.desc.textContent = stage.desc;
    els.water.textContent = String(farm.waterCount);
    els.fill.style.width = `${((i + 1) / STAGES.length) * 100}%`;
    els.bar.setAttribute('aria-valuenow', String(i + 1));
    els.harvests.textContent = `🌾 Harvests: ${farm.totalHarvests}`;
    document.querySelectorAll('#homeRiceDots span').forEach((dot, d) => {
      dot.classList.toggle('active', d <= i);
    });
  }

  function showHarvestModal() {
    els.modal.hidden = false;
    els.newCropBtn.focus();
  }

  // Tưới cây: +amount giọt nước, lúa lên 1 giai đoạn; tới giai đoạn cuối thì mở modal thu hoạch.
  function waterPortalRice(amount = 10) {
    farm.waterCount += amount;
    if (farm.stageIndex < LAST) farm.stageIndex += 1;
    save();
    render();
    els.img.classList.add('bounce');
    setTimeout(() => els.img.classList.remove('bounce'), 400);
    if (farm.stageIndex === LAST) showHarvestModal();
  }

  function startNewRiceCrop() {
    farm.totalHarvests += 1;
    farm.stageIndex = 0;
    save();
    els.modal.hidden = true;
    render();
    els.waterBtn.focus();
  }

  els.waterBtn.addEventListener('click', () => waterPortalRice(10));
  els.newCropBtn.addEventListener('click', startNewRiceCrop);

  // Cho phép đoạn mã khác trên trang thưởng nước khi học sinh hoàn thành bài
  window.waterPortalRice = waterPortalRice;

  render();
})();
