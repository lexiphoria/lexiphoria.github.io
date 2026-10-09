/* -------------------------------------------------------------
 * Boss Battle mode ("Đánh Boss Từ Khó")
 *
 * Words answered wrong in Quiz / Sentence Completion (or during a patrol)
 * turn into bosses. Each boss must be hit on 3 different days to be sealed
 * (spaced repetition); a sealed boss counts the word as learned.
 *
 * Relies on globals from Vocabulary_Game.html: progress, saveProgress,
 * currentTopic, vocabularyData, speakWord, triggerConfetti, exitToModes.
 * ------------------------------------------------------------- */

const BOSS_SEAL_HITS = 3;
const BOSS_MAX_PER_BATTLE = 10;
const BOSS_PATROL_SIZE = 6;
const BOSS_MAX_HEARTS = 3;
const BOSS_XP = { hit: 15, crit: 5, hintPenalty: 5, seal: 50, victory: 30, patrol: 10 };
const BOSS_ASSET_DIR = 'assets/boss/';
const BOSS_SFX_NAMES = ['cast', 'hit', 'crit', 'hurt', 'heal_boss', 'potion', 'seal', 'start', 'victory', 'defeat', 'boss_down'];

const BOSS_PROFILES = {
  ourLife: { name: 'Daydream Fluff', img: 'boss_purple' },
  ourSociety: { name: 'Muddle Monster', img: 'boss_teal' },
  demographicTerms: { name: 'Tangle Beast', img: 'boss_blue' },
  phrasalVerbs: { name: 'Mix-up Devil', img: 'boss_red' },
  collocations: { name: 'Repeat-o-saurus', img: 'boss_dino' },
  examIdioms: { name: 'Idiom Phantom', img: 'boss_purple' },
  ourEnvironment: { name: 'Smog Titan', img: 'boss_green' },
  ourFuture: { name: 'Cyber Overlord', img: 'boss_blue' }
};
const BOSS_PATROL_PROFILE = { name: 'Wandering Gremlin', img: 'boss_green' };

// Question tiers get harder as the boss weakens: choose meaning → choose word → type it
const BOSS_TIERS = [
  { label: '✨ Basic Attack', cls: 'tier-0' },
  { label: '🔮 Spell', cls: 'tier-1' },
  { label: '⚡ Finishing Blow', cls: 'tier-2' }
];

let bossBattle = null;
let bossSfx = null;
const bossReduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// --- Helpers ---
function bossEl(id) {
  return document.getElementById(id);
}

function bossToday() {
  // Local date (the rest of the app uses UTC, which flips at 7am in Vietnam)
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getBossStore() {
  if (!progress.bosses) progress.bosses = {};
  return progress.bosses;
}

function bossKey(topic, word) {
  return `${topic}_${word}`;
}

function bossLastHit(boss) {
  return boss.hits[boss.hits.length - 1];
}

function isBossDue(boss) {
  return !boss.sealed && bossLastHit(boss) !== bossToday();
}

function findBossWord(topic, word) {
  return (vocabularyData[topic] || []).find(w => w.word === word);
}

function topicBosses(topic) {
  return Object.values(getBossStore()).filter(b => b.topic === topic && findBossWord(topic, b.word));
}

function bossStars(hits) {
  return '⭐'.repeat(hits) + '☆'.repeat(Math.max(0, BOSS_SEAL_HITS - hits));
}

function bossCount(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

function bossShuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function bossEscape(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function bossNormalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.,!?;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function bossCleanWord(text) {
  return bossNormalize(String(text || '').replace(/\(.*?\)/g, '').trim());
}

// --- Hard-word tracking (called from Quiz / Sentence Completion) ---
function recordHardWord(topic, word) {
  const store = getBossStore();
  const key = bossKey(topic, word);
  const boss = store[key];
  if (!boss) {
    store[key] = { topic, word, hits: [], wrong: 1, sealed: false, created: bossToday() };
  } else {
    boss.wrong += 1;
    if (boss.sealed) {
      // A sealed word answered wrong again comes back to life
      boss.sealed = false;
      boss.hits = [];
    }
  }
  saveProgress();
}

function refreshBossBadges() {
  const counts = {};
  Object.values(getBossStore()).forEach(b => {
    if (!b.sealed) counts[b.topic] = (counts[b.topic] || 0) + 1;
  });

  document.querySelectorAll('#dashboard-screen .topic-card[data-topic]').forEach(card => {
    const n = counts[card.dataset.topic] || 0;
    let badge = card.querySelector('.topic-boss-badge');
    if (!n) {
      if (badge) badge.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'topic-boss-badge';
      card.appendChild(badge);
    }
    badge.textContent = `👾 ${n}`;
    badge.title = `${bossCount(n, 'boss', 'bosses')} waiting`;
  });

  const modeBadge = bossEl('boss-mode-badge');
  if (modeBadge) {
    const active = topicBosses(currentTopic).filter(b => !b.sealed);
    const due = active.filter(isBossDue).length;
    if (due) modeBadge.textContent = `👾 ${bossCount(due, 'boss', 'bosses')} ready today`;
    else if (active.length) modeBadge.textContent = `⏳ ${bossCount(active.length, 'boss', 'bosses')} back tomorrow`;
    else modeBadge.textContent = '🔍 No bosses yet – go on patrol';
  }
}

// --- Sound effects ---
function loadBossSfx() {
  if (bossSfx) return;
  bossSfx = {};
  BOSS_SFX_NAMES.forEach(name => {
    const audio = new Audio(`${BOSS_ASSET_DIR}sfx/${name}.wav`);
    audio.preload = 'auto';
    audio.volume = 0.5;
    bossSfx[name] = audio;
  });
}

function playBossSfx(name) {
  if (progress.bossMuted || !bossSfx || !bossSfx[name]) return;
  const audio = bossSfx[name];
  try {
    audio.currentTime = 0;
    const playing = audio.play();
    if (playing && playing.catch) playing.catch(() => {});
  } catch (e) {
    // Ignore playback errors (autoplay policies, missing files)
  }
}

function toggleBossMute() {
  progress.bossMuted = !progress.bossMuted;
  saveProgress();
  updateBossMuteButton();
}

function updateBossMuteButton() {
  const btn = bossEl('boss-mute-btn');
  btn.textContent = progress.bossMuted ? '🔇' : '🔊';
  btn.title = progress.bossMuted ? 'Unmute sound' : 'Mute sound';
}

// --- Screen / panel navigation ---
function showBossPanel(name) {
  ['lobby', 'arena', 'result'].forEach(panel => {
    bossEl(`boss-${panel}`).style.display = panel === name ? 'block' : 'none';
  });
  const titles = { lobby: 'Boss Battle', arena: '', result: 'Battle Result' };
  const backLabels = { lobby: '← Modes', arena: '← Retreat', result: '← Boss Lobby' };
  bossEl('boss-back-btn').textContent = backLabels[name];
  if (name !== 'arena') bossEl('boss-header-title').textContent = titles[name];
  window.scrollTo({ top: 0, behavior: bossReduceMotion ? 'auto' : 'smooth' });
}

function openBossLobby() {
  loadBossSfx();
  updateBossMuteButton();
  bossEl('boss-screen').style.display = 'block';
  renderBossLobby();
  showBossPanel('lobby');
}

function bossBack() {
  const arenaOpen = bossEl('boss-arena').style.display === 'block';
  if (arenaOpen) {
    if (bossBattle && !bossBattle.ended && !confirm('Rút lui khỏi trận đấu? Các đòn đã đánh vẫn được lưu.')) return;
    if (bossBattle) bossBattle.ended = true;
    backToBossLobby();
  } else if (bossEl('boss-result').style.display === 'block') {
    backToBossLobby();
  } else {
    bossEl('boss-screen').style.display = 'none';
    exitToModes();
  }
}

function backToBossLobby() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  renderBossLobby();
  showBossPanel('lobby');
}

function leaveBossToModes() {
  bossEl('boss-screen').style.display = 'none';
  exitToModes();
}

// --- Lobby ---
function renderBossLobby() {
  const profile = BOSS_PROFILES[currentTopic] || BOSS_PROFILES.ourLife;
  const bosses = topicBosses(currentTopic);
  const active = bosses.filter(b => !b.sealed);
  const due = active.filter(isBossDue);
  const sealed = bosses.filter(b => b.sealed);

  bossEl('boss-lobby-name').textContent = profile.name;
  bossEl('boss-lobby-img').src = `${BOSS_ASSET_DIR}${profile.img}.webp`;
  bossEl('boss-lobby-img').alt = profile.name;

  let tagline;
  if (due.length) {
    tagline = `${profile.name} đang giữ ${due.length} từ khó của bạn. Hạ nó ngay hôm nay!`;
  } else if (active.length) {
    tagline = `Bạn đã đánh hết lượt hôm nay. ${active.length} boss sẽ quay lại vào ngày mai.`;
  } else {
    tagline = 'Chưa có từ khó nào. Hãy bấm Patrol hoặc làm Meaning Quiz – từ nào sai sẽ hóa thành boss.';
  }
  bossEl('boss-lobby-tagline').textContent = tagline;

  bossEl('boss-stat-due').textContent = due.length;
  bossEl('boss-stat-wait').textContent = active.length - due.length;
  bossEl('boss-stat-sealed').textContent = sealed.length;

  const fightBtn = bossEl('boss-fight-btn');
  fightBtn.disabled = due.length === 0;
  fightBtn.textContent = due.length
    ? `⚔️ Fight (${bossCount(Math.min(due.length, BOSS_MAX_PER_BATTLE), 'word', 'words')})`
    : '⚔️ No bosses ready';

  const list = bossEl('boss-word-list');
  if (!bosses.length) {
    list.innerHTML = '<div class="boss-empty">👻 Chưa có boss nào trong chủ đề này.<br>Bấm <strong>Patrol</strong> để thử sức với vài từ ngẫu nhiên.</div>';
    return;
  }

  const order = b => (b.sealed ? 2 : isBossDue(b) ? 0 : 1);
  const sorted = [...bosses].sort((a, b) => order(a) - order(b) || b.wrong - a.wrong);
  list.innerHTML = sorted.map(b => {
    const state = b.sealed ? 'is-sealed' : isBossDue(b) ? 'is-due' : 'is-wait';
    const label = b.sealed ? '🔒 Sealed' : isBossDue(b) ? '⚔️ Ready' : '⏳ Tomorrow';
    return `<div class="boss-word-chip ${state}">
        <span class="boss-chip-word">${bossEscape(b.word)}</span>
        <span class="boss-chip-meta"><span class="boss-chip-stars">${bossStars(b.hits.length)}</span><span>${label}</span></span>
      </div>`;
  }).join('');
}

// --- Battle setup ---
function startBossBattle(kind) {
  let entries;
  if (kind === 'boss') {
    const due = topicBosses(currentTopic).filter(isBossDue);
    due.sort((a, b) => b.wrong - a.wrong || a.created.localeCompare(b.created));
    entries = due.slice(0, BOSS_MAX_PER_BATTLE).map(b => ({
      key: bossKey(b.topic, b.word),
      boss: b,
      data: findBossWord(b.topic, b.word),
      stage: Math.min(b.hits.length, BOSS_SEAL_HITS - 1)
    }));
  } else {
    const store = getBossStore();
    const words = vocabularyData[currentTopic] || [];
    const notBoss = words.filter(w => !store[bossKey(currentTopic, w.word)]);
    const fresh = notBoss.filter(w => !progress.learned[bossKey(currentTopic, w.word)]);
    const pool = fresh.length >= BOSS_PATROL_SIZE ? fresh : notBoss;
    entries = bossShuffle(pool).slice(0, BOSS_PATROL_SIZE).map(w => ({
      key: bossKey(currentTopic, w.word),
      boss: null,
      data: w,
      stage: 0
    }));
  }

  if (!entries.length) {
    alert(kind === 'boss' ? 'Hôm nay chưa có boss nào sẵn sàng!' : 'Không còn từ nào để tuần tra trong chủ đề này!');
    return;
  }

  const profile = kind === 'boss' ? (BOSS_PROFILES[currentTopic] || BOSS_PROFILES.ourLife) : BOSS_PATROL_PROFILE;
  bossBattle = {
    kind,
    profile,
    queue: bossShuffle(entries),
    idx: 0,
    hearts: BOSS_MAX_HEARTS,
    combo: 0,
    maxHp: entries.length,
    hp: entries.length,
    correct: 0,
    xp: 0,
    log: [],
    answered: false,
    ended: false
  };

  const enemy = bossEl('boss-enemy');
  if (enemy.getAnimations) enemy.getAnimations().forEach(a => a.cancel());
  bossEl('boss-enemy-img').src = `${BOSS_ASSET_DIR}${profile.img}.webp`;
  bossEl('boss-enemy-img').alt = profile.name;
  bossEl('boss-enemy-name').textContent = profile.name;
  bossEl('boss-header-title').textContent = kind === 'boss' ? '⚔️ Boss Battle' : '🔍 Patrol';

  bossEl('boss-hp-bar').innerHTML = entries.map(() => '<span class="boss-hp-seg"></span>').join('');
  updateBossHud();
  showBossPanel('arena');
  playBossSfx('start');
  loadBossQuestion();
}

function bossPickOptions(correct, pool) {
  const target = bossNormalize(correct);
  const seen = new Set([target]);
  const distractors = [];
  bossShuffle(pool).forEach(text => {
    const norm = bossNormalize(text);
    if (text && !seen.has(norm) && distractors.length < 3) {
      seen.add(norm);
      distractors.push(text);
    }
  });
  return bossShuffle([correct, ...distractors]);
}

function buildBossQuestion(entry) {
  const w = entry.data;
  const pool = vocabularyData[currentTopic] || [];
  const sentenceAnswer = (w.blankSentence && Array.isArray(w.options) && w.answer)
    ? w.options[w.answer.charCodeAt(0) - 65]
    : null;
  const cleanWord = bossCleanWord(w.word);
  const typeable = cleanWord.length > 0 && cleanWord.length <= 30;

  let stage = Math.max(0, Math.min(entry.stage || 0, BOSS_SEAL_HITS - 1));
  let type = ['meaning', 'reverse', 'spell'][stage] || 'meaning';
  if (type === 'meaning' && sentenceAnswer) type = 'sentence';
  if (type === 'spell' && !sentenceAnswer && !typeable) {
    type = 'reverse';
    stage = 1;
  }

  const q = { type, tier: stage, word: w, hintLevel: 0, hintUsed: false };
  if (type === 'meaning') {
    q.answer = w.meaning;
    q.options = bossPickOptions(w.meaning, pool.map(x => x.meaning));
  } else if (type === 'sentence') {
    q.answer = sentenceAnswer;
    q.options = [...w.options];
  } else if (type === 'reverse') {
    q.answer = w.word;
    q.options = bossPickOptions(w.word, pool.map(x => x.word));
  } else {
    q.useSentence = !!sentenceAnswer;
    const wordAccepted = [w.word, cleanWord, ...w.word.split('/')].filter(Boolean);
    q.accepted = sentenceAnswer ? [sentenceAnswer] : wordAccepted;
    q.display = (sentenceAnswer || cleanWord || w.word.split('/')[0]).trim();
  }
  return q;
}

// --- Question rendering ---
function loadBossQuestion() {
  const b = bossBattle;
  const entry = b.queue[b.idx];
  const q = buildBossQuestion(entry);
  b.q = q;
  b.answered = false;

  updateBossHud();

  const tier = BOSS_TIERS[q.tier];
  const label = bossEl('boss-attack-label');
  const typeNames = {
    meaning: 'Pick the meaning',
    sentence: 'Complete the sentence',
    reverse: 'Pick the word',
    spell: 'Type the word'
  };
  label.className = `boss-attack-label ${tier.cls}`;
  label.textContent = `${tier.label} · ${typeNames[q.type]}`;

  bossEl('boss-seal').textContent = entry.boss
    ? `${bossStars(entry.boss.hits.length)} Seal ${entry.boss.hits.length}/${BOSS_SEAL_HITS}`
    : '🔍 Patrol word';

  const main = bossEl('boss-q-main');
  const sub = bossEl('boss-q-sub');
  const hint = bossEl('boss-q-hint');
  const listenBtn = bossEl('boss-listen-btn');
  main.className = 'boss-q-main';
  sub.textContent = '';
  listenBtn.style.display = 'none';

  if (q.type === 'meaning') {
    main.textContent = q.word.word;
    sub.textContent = [q.word.ipa, q.word.type ? `(${q.word.type})` : ''].filter(Boolean).join(' ');
    hint.textContent = 'Choose the correct Vietnamese meaning of the word above:';
    listenBtn.style.display = 'inline-flex';
  } else if (q.type === 'sentence') {
    main.classList.add('is-sentence');
    main.textContent = q.word.blankSentence;
    hint.textContent = 'Choose the best option to complete the sentence:';
  } else if (q.type === 'reverse') {
    main.classList.add('is-meaning');
    main.textContent = q.word.meaning;
    hint.textContent = 'Choose the English word or phrase with this meaning:';
  } else if (q.useSentence) {
    main.classList.add('is-sentence');
    main.textContent = q.word.blankSentence;
    sub.textContent = `Meaning: ${q.word.meaning}`;
    hint.textContent = 'Type the missing words to land the finishing blow:';
  } else {
    main.classList.add('is-meaning');
    main.textContent = q.word.meaning;
    sub.textContent = q.word.ipa || '';
    hint.textContent = 'Listen, then type the English word to land the finishing blow:';
    listenBtn.style.display = 'inline-flex';
  }

  const options = bossEl('boss-options');
  const spell = bossEl('boss-spell');
  options.innerHTML = '';

  if (q.type === 'spell') {
    options.style.display = 'none';
    spell.style.display = 'flex';
    const input = bossEl('boss-spell-input');
    input.value = '';
    input.className = 'spelling-input';
    input.disabled = false;
    bossEl('boss-hint-pattern').textContent = '';
    bossEl('boss-hint-btn').disabled = false;
    bossEl('boss-submit-btn').disabled = false;
    setTimeout(() => input.focus(), 50);
  } else {
    spell.style.display = 'none';
    options.style.display = '';
    const labels = ['A', 'B', 'C', 'D'];
    q.options.forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.dataset.value = text;
      if (q.type === 'sentence') {
        btn.innerHTML = `<span class="option-label" style="font-weight: 800; color: #fbbf24; margin-right: 10px;">${labels[i]}.</span>${bossEscape(text)}`;
      } else {
        btn.textContent = text;
      }
      btn.onclick = () => checkBossChoice(text, btn);
      options.appendChild(btn);
    });
  }

  bossEl('boss-feedback').style.display = 'none';
  bossEl('boss-next-btn').style.display = 'none';
}

function speakBossWord() {
  if (bossBattle && bossBattle.q) speakWord(bossBattle.q.word.word);
}

function checkBossChoice(selected, selectedBtn) {
  const b = bossBattle;
  if (!b || b.answered) return;
  const isCorrect = bossNormalize(selected) === bossNormalize(b.q.answer);

  document.querySelectorAll('#boss-options .quiz-option-btn').forEach(btn => {
    btn.classList.add('locked');
    if (bossNormalize(btn.dataset.value) === bossNormalize(b.q.answer)) btn.classList.add('correct');
  });
  if (!isCorrect) selectedBtn.classList.add('wrong');

  resolveBossAnswer(isCorrect);
}

function showBossSpellHint() {
  const b = bossBattle;
  if (!b || b.answered) return;
  const q = b.q;
  q.hintUsed = true;
  q.hintLevel += 1;

  // Reveal one more letter per click, keep spaces, never reveal the whole answer
  const letters = q.display.replace(/\s/g, '').length;
  const reveal = Math.min(q.hintLevel, Math.max(1, letters - 1));
  let shown = 0;
  const pattern = [...q.display].map(ch => {
    if (/\s/.test(ch)) return '  ';
    shown += 1;
    return shown <= reveal ? ch : '_';
  }).join(' ');
  bossEl('boss-hint-pattern').textContent = pattern;
  if (reveal >= letters - 1) bossEl('boss-hint-btn').disabled = true;
}

function submitBossSpell() {
  const b = bossBattle;
  if (!b || b.answered) return;
  const input = bossEl('boss-spell-input');
  if (!input) return;
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  const normVal = bossNormalize(value);
  const cleanVal = bossCleanWord(value);
  const isCorrect = b.q.accepted.some(ans => {
    const normAns = bossNormalize(ans);
    const cleanAns = bossCleanWord(ans);
    return normAns === normVal || cleanAns === cleanVal || cleanAns === normVal || normAns === cleanVal;
  });
  input.disabled = true;
  input.classList.add(isCorrect ? 'correct' : 'wrong');
  bossEl('boss-hint-btn').disabled = true;
  bossEl('boss-submit-btn').disabled = true;
  resolveBossAnswer(isCorrect);
}

function handleBossSpellKey(event) {
  if (event.key !== 'Enter') return;
  // preventDefault also stops the follow-up keypress from clicking the focused "next" button
  event.preventDefault();
  submitBossSpell();
}

// --- Answer resolution ---
function resolveBossAnswer(isCorrect) {
  const b = bossBattle;
  b.answered = true;
  const entry = b.queue[b.idx];
  const today = bossToday();
  const log = { word: entry.data.word, correct: isCorrect, status: '', stars: null };
  let crit = false;
  let gainedXp = 0;

  if (isCorrect) {
    b.combo += 1;
    b.correct += 1;
    crit = b.combo >= 3 && !b.q.hintUsed;
    gainedXp = (b.kind === 'boss' ? BOSS_XP.hit : BOSS_XP.patrol)
      - (b.q.hintUsed ? BOSS_XP.hintPenalty : 0)
      + (crit ? BOSS_XP.crit : 0);

    if (entry.boss) {
      const boss = entry.boss;
      if (bossLastHit(boss) !== today) boss.hits.push(today);
      if (boss.hits.length >= BOSS_SEAL_HITS) {
        boss.sealed = true;
        boss.sealedAt = today;
        progress.learned[entry.key] = true;
        if (progress.review) delete progress.review[entry.key]; // sealed words leave the flashcard review queue
        gainedXp += BOSS_XP.seal;
        log.status = 'sealed';
      } else {
        log.status = 'hit';
      }
      log.stars = boss.hits.length;
    } else {
      log.status = 'safe';
    }

    b.hp -= 1;
    const potion = b.combo % 3 === 0 && b.hearts < BOSS_MAX_HEARTS;
    if (potion) b.hearts += 1;
    animateHeroAttack(crit, log.status === 'sealed', potion);
  } else {
    b.combo = 0;
    b.hearts -= 1;
    let healed = false;
    if (entry.boss) {
      const boss = entry.boss;
      boss.wrong += 1;
      if (bossLastHit(boss) === today) {
        boss.hits.pop();
        healed = true;
        log.status = 'healed';
      } else {
        log.status = 'missed';
      }
      log.stars = boss.hits.length;
    } else {
      recordHardWord(currentTopic, entry.data.word);
      log.status = 'spawned';
    }
    animateBossAttack(healed);
  }

  if (entry.boss) {
    bossEl('boss-seal').textContent = entry.boss.sealed
      ? `${bossStars(BOSS_SEAL_HITS)} Sealed`
      : `${bossStars(entry.boss.hits.length)} Seal ${entry.boss.hits.length}/${BOSS_SEAL_HITS}`;
  }

  b.xp += gainedXp;
  progress.xp += gainedXp;
  b.log.push(log);
  saveProgress();
  renderBossFeedback(isCorrect, crit, log, gainedXp);

  const nextBtn = bossEl('boss-next-btn');
  if (b.hearts <= 0) nextBtn.textContent = 'See results ➔';
  else if (b.idx >= b.queue.length - 1) nextBtn.textContent = 'Finish battle ➔';
  else nextBtn.textContent = 'Next attack ➔';
  nextBtn.style.display = 'inline-flex';
  // Let keyboard users continue with Enter / Space
  setTimeout(() => nextBtn.focus({ preventScroll: true }), 0);
}

function renderBossFeedback(isCorrect, crit, log, gainedXp) {
  const w = bossBattle.q.word;
  const titles = {
    sealed: '🔒 Sealed!',
    hit: crit ? '💥 Critical hit!' : '✅ Hit!',
    safe: crit ? '💥 Critical hit!' : '✅ Correct!',
    healed: '💢 The boss strikes back and regains a star!',
    missed: '💢 The boss strikes back!',
    spawned: '👾 This word became a boss!'
  };
  const notes = {
    sealed: 'Từ này đã bị phong ấn vĩnh viễn và được tính là <strong>đã thuộc</strong>.',
    hit: `Seal ${log.stars}/${BOSS_SEAL_HITS}. Hẹn bạn ngày mai để đánh tiếp.`,
    safe: 'Bạn đã nắm chắc từ này.',
    healed: `Seal giảm còn ${log.stars}/${BOSS_SEAL_HITS}. Hãy ghi nhớ đáp án bên dưới.`,
    missed: 'Ghi nhớ đáp án bên dưới để lần sau hạ được boss.',
    spawned: 'Vào Boss Lobby để hạ nó trong những ngày tới.'
  };

  const correctText = bossBattle.q.type === 'spell' ? bossBattle.q.display : bossBattle.q.answer;
  let html = `<strong>Answer:</strong> ${bossEscape(correctText)}<br>`;
  html += `<strong>${bossEscape(w.word)}</strong> ${bossEscape(w.ipa || '')} – ${bossEscape(w.meaning)}<br>`;
  if (w.example) html += `<em>${bossEscape(w.example)}</em><br>`;
  if (w.exampleTranslation) html += `${bossEscape(w.exampleTranslation)}<br>`;
  html += `<span style="color: var(--boss-gold);">${notes[log.status]}</span>`;
  if (gainedXp) html += ` <span style="color: #fcd34d; font-weight: 700;">+${gainedXp} XP</span>`;

  const title = bossEl('boss-feedback-title');
  title.textContent = titles[log.status];
  title.style.color = isCorrect ? 'var(--correct)' : '#f87171';
  bossEl('boss-feedback-content').innerHTML = html;
  const box = bossEl('boss-feedback');
  box.style.borderLeftColor = isCorrect ? 'var(--correct)' : 'var(--wrong)';
  box.style.display = 'block';
}

function nextBossStep() {
  const b = bossBattle;
  if (!b || !b.answered) return;
  if (b.hearts <= 0 || b.idx >= b.queue.length - 1) {
    endBossBattle();
    return;
  }
  b.idx += 1;
  loadBossQuestion();
}

// --- HUD & animations ---
function updateBossHud() {
  const b = bossBattle;
  bossEl('boss-hearts').textContent = '❤️'.repeat(Math.max(0, b.hearts)) + '🖤'.repeat(Math.max(0, BOSS_MAX_HEARTS - b.hearts));
  bossEl('boss-combo').textContent = b.combo >= 2 ? `🔥 Combo x${b.combo}` : '';
  bossEl('boss-hp-text').textContent = `${b.hp}/${b.maxHp}`;
  bossEl('boss-progress-text').textContent = `Attack ${Math.min(b.idx + 1, b.queue.length)}/${b.queue.length}`;
  bossEl('boss-hp-bar').querySelectorAll('.boss-hp-seg').forEach((seg, i) => {
    seg.classList.toggle('empty', i >= b.hp);
  });
}

function bossAnimate(el, frames, options) {
  if (!el || bossReduceMotion || !el.animate) return null;
  return el.animate(frames, options);
}

function bossFlash(el, cls) {
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 320);
}

function bossCenter(el, yRatio) {
  const stageRect = bossEl('boss-stage').getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - stageRect.left + r.width / 2, y: r.top - stageRect.top + r.height * yRatio };
}

function bossPop(text, point, variant) {
  const pop = document.createElement('div');
  pop.className = `boss-pop ${variant}`;
  pop.textContent = text;
  pop.style.left = `${point.x}px`;
  pop.style.top = `${point.y}px`;
  bossEl('boss-stage').appendChild(pop);
  const anim = bossAnimate(pop, [
    { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 0 },
    { transform: 'translate(-50%, -90%) scale(1.15)', opacity: 1, offset: 0.25 },
    { transform: 'translate(-50%, -190%) scale(1)', opacity: 0 }
  ], { duration: 1100, easing: 'ease-out' });
  setTimeout(() => pop.remove(), anim ? 1150 : 900);
}

function animateHeroAttack(crit, sealed, potion) {
  const hero = bossEl('boss-hero');
  const enemy = bossEl('boss-enemy');
  const proj = bossEl('boss-projectile');
  const from = bossCenter(hero, 0.35);
  const to = bossCenter(enemy, 0.45);

  playBossSfx('cast');
  bossAnimate(hero, [
    { transform: 'translateX(0)' },
    { transform: 'translateX(16px)' },
    { transform: 'translateX(0)' }
  ], { duration: 300, easing: 'ease-out' });

  const impact = () => {
    proj.style.display = 'none';
    playBossSfx(crit ? 'crit' : 'hit');
    bossFlash(enemy, 'is-hit');
    bossAnimate(enemy, [
      { transform: 'translateX(0)' },
      { transform: 'translateX(12px) rotate(3deg)' },
      { transform: 'translateX(-8px) rotate(-2deg)' },
      { transform: 'translateX(0)' }
    ], { duration: 320 });
    bossPop(crit ? 'CRITICAL! -1' : '-1', to, crit ? 'crit' : 'dmg');
    updateBossHud();
    if (sealed) {
      setTimeout(() => {
        playBossSfx('seal');
        bossPop('🔒 SEALED!', { x: to.x, y: to.y - 40 }, 'seal');
      }, 350);
    }
    if (potion) setTimeout(() => showBossPotion(), sealed ? 900 : 450);
  };

  proj.style.display = 'block';
  const half = proj.offsetWidth / 2;
  const flight = bossAnimate(proj, [
    { transform: `translate(${from.x - half}px, ${from.y - half}px) scale(0.5) rotate(0deg)` },
    { transform: `translate(${to.x - half}px, ${to.y - half}px) scale(${crit ? 1.5 : 1}) rotate(540deg)` }
  ], { duration: 420, easing: 'ease-in' });
  if (flight) flight.onfinish = impact;
  else impact();
}

function animateBossAttack(healed) {
  const hero = bossEl('boss-hero');
  const enemy = bossEl('boss-enemy');
  bossAnimate(enemy, [
    { transform: 'translateX(0) scale(1)' },
    { transform: 'translateX(-70px) scale(1.06)' },
    { transform: 'translateX(0) scale(1)' }
  ], { duration: 420, easing: 'ease-out' });

  setTimeout(() => {
    playBossSfx('hurt');
    bossFlash(hero, 'is-hurt');
    bossAnimate(bossEl('boss-stage'), [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(0)' }
    ], { duration: 300 });
    bossPop('-❤️', bossCenter(hero, 0.3), 'hurt');
    updateBossHud();
  }, bossReduceMotion ? 0 : 230);

  if (healed) {
    setTimeout(() => {
      playBossSfx('heal_boss');
      bossPop('+1 ⭐ healed', bossCenter(enemy, 0.2), 'heal');
    }, bossReduceMotion ? 0 : 650);
  }
}

function showBossPotion() {
  const potion = bossEl('boss-potion');
  const p = bossCenter(bossEl('boss-hero'), 0.1);
  playBossSfx('potion');
  potion.style.left = `${p.x - 27}px`;
  potion.style.top = `${p.y - 40}px`;
  potion.style.display = 'block';
  const anim = bossAnimate(potion, [
    { transform: 'translateY(10px) scale(0.4)', opacity: 0 },
    { transform: 'translateY(-10px) scale(1.1)', opacity: 1, offset: 0.4 },
    { transform: 'translateY(-40px) scale(0.9)', opacity: 0 }
  ], { duration: 1000, easing: 'ease-out' });
  setTimeout(() => { potion.style.display = 'none'; }, anim ? 1000 : 600);
  bossPop('+❤️ Potion!', { x: p.x, y: p.y - 10 }, 'heal');
  updateBossHud();
}

// --- Battle end ---
function endBossBattle() {
  const b = bossBattle;
  b.ended = true;
  b.outcome = b.hearts <= 0 ? 'defeat' : (b.hp <= 0 ? 'victory' : 'retreat');

  if (b.outcome === 'victory' && b.kind === 'boss') {
    b.xp += BOSS_XP.victory;
    progress.xp += BOSS_XP.victory;
    saveProgress();
  }

  if (b.outcome === 'victory') {
    playBossSfx('boss_down');
    bossAnimate(bossEl('boss-enemy'), [
      { transform: 'scale(1) rotate(0deg)', opacity: 1, filter: 'brightness(1)' },
      { transform: 'scale(1.15) rotate(-6deg)', opacity: 1, filter: 'brightness(2)', offset: 0.3 },
      { transform: 'scale(0.2) rotate(25deg)', opacity: 0, filter: 'brightness(3)' }
    ], { duration: 900, easing: 'ease-in', fill: 'forwards' });
    setTimeout(showBossResult, bossReduceMotion ? 0 : 950);
  } else {
    showBossResult();
  }
}

function showBossResult() {
  const b = bossBattle;
  const sealedCount = b.log.filter(l => l.status === 'sealed').length;
  const spawnedCount = b.log.filter(l => l.status === 'spawned').length;
  const img = bossEl('boss-result-img');
  let title;
  let subtitle;

  if (b.outcome === 'victory') {
    img.src = `${BOSS_ASSET_DIR}item_gift.webp`;
    if (b.kind === 'boss') {
      title = '🏆 Victory!';
      subtitle = `Bạn đã hạ ${b.profile.name}! ` + (sealedCount
        ? `${sealedCount} từ đã bị phong ấn vĩnh viễn.`
        : 'Quay lại ngày mai để tiếp tục phong ấn các từ khó.');
    } else {
      title = '🏆 Perfect patrol!';
      subtitle = 'Không có quái vật nào lọt lưới. Bạn đã nắm chắc các từ này.';
    }
    playBossSfx('victory');
    triggerConfetti();
  } else if (b.outcome === 'retreat') {
    img.src = `${BOSS_ASSET_DIR}${b.profile.img}.webp`;
    if (b.kind === 'boss') {
      title = '💨 The boss fled!';
      subtitle = `Bạn đánh trúng ${b.correct}/${b.queue.length} đòn. Những từ còn lại vẫn đang chờ – có thể đánh lại ngay hôm nay.`;
    } else {
      title = '👾 New bosses found!';
      subtitle = `${spawnedCount} từ đã hóa thành boss. Vào Boss Lobby để hạ chúng.`;
    }
    playBossSfx('cast');
  } else {
    img.src = `${BOSS_ASSET_DIR}hero_cat.webp`;
    title = '💫 Out of hearts!';
    subtitle = 'Hết tim rồi. Các đòn đánh trúng vẫn được lưu – nghỉ một chút rồi thử lại nhé.';
    playBossSfx('defeat');
  }
  img.alt = title;

  bossEl('boss-result-title').textContent = title;
  bossEl('boss-result-subtitle').textContent = subtitle;
  bossEl('boss-res-correct').textContent = `${b.correct}/${b.log.length}`;
  bossEl('boss-res-xp').textContent = `+${b.xp}`;
  bossEl('boss-res-third').textContent = b.kind === 'boss' ? sealedCount : spawnedCount;
  bossEl('boss-res-third-label').textContent = b.kind === 'boss' ? 'Sealed' : 'New bosses';

  const statusInfo = {
    sealed: ['🔒 Sealed!', 'gold'],
    hit: ['+1 ⭐', 'good'],
    safe: ['✓ Safe', 'good'],
    healed: ['💢 Boss +1 ⭐', 'bad'],
    missed: ['✗ Missed', 'bad'],
    spawned: ['👾 New boss', 'bad']
  };
  bossEl('boss-result-list').innerHTML = b.log.map(l => {
    const [text, cls] = statusInfo[l.status];
    const stars = l.stars == null ? '' : ` <span class="boss-chip-stars">${bossStars(l.stars)}</span>`;
    return `<div class="boss-result-row">
        <span class="boss-result-word">${bossEscape(l.word)}</span>
        <span class="boss-result-status ${cls}">${text}${stars}</span>
      </div>`;
  }).join('');

  const dueLeft = topicBosses(currentTopic).filter(isBossDue).length;
  const againBtn = bossEl('boss-again-btn');
  againBtn.style.display = dueLeft ? 'inline-flex' : 'none';
  againBtn.textContent = `⚔️ Fight again (${bossCount(Math.min(dueLeft, BOSS_MAX_PER_BATTLE), 'word', 'words')})`;

  showBossPanel('result');
}
