const key = "petualanganCepatBacaProgress";

const skillTemplate = { letters: 0, sounds: 0, syllables: 0, words: 0, sentences: 0, comprehension: 0 };

const initial = {
  studentName: "Sahabat BACA",
  stars: 0,
  total: 0,
  correct: 0,
  lastLevel: "Beranda",
  skill: { ...skillTemplate },
  attemptsByArea: {},
  correctByArea: {},
  itemStats: {},
  earnedRewards: [],
  badges: [],
  soundOn: true
};

let progressCache = null;
let saveTimer = null;

function normalizeNumberMap(value = {}) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, Number(v) || 0]));
}

function normalizeItemStats(value = {}) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).map(([keyName, stat]) => [keyName, {
    label: stat?.label || keyName,
    area: stat?.area || "letters",
    attempts: Number(stat?.attempts) || 0,
    correct: Number(stat?.correct) || 0,
    lastMistake: stat?.lastMistake || ""
  }]));
}

function normalizeProgress(saved = {}) {
  return {
    ...initial,
    ...saved,
    skill: { ...skillTemplate, ...(saved.skill && typeof saved.skill === "object" ? saved.skill : {}) },
    attemptsByArea: normalizeNumberMap(saved.attemptsByArea),
    correctByArea: normalizeNumberMap(saved.correctByArea),
    itemStats: normalizeItemStats(saved.itemStats),
    earnedRewards: Array.isArray(saved.earnedRewards) ? saved.earnedRewards : [],
    badges: Array.isArray(saved.badges) ? saved.badges : []
  };
}

function cloneProgress(progress) {
  return {
    ...progress,
    skill: { ...progress.skill },
    attemptsByArea: { ...progress.attemptsByArea },
    correctByArea: { ...progress.correctByArea },
    itemStats: Object.fromEntries(Object.entries(progress.itemStats).map(([k, v]) => [k, { ...v }])),
    earnedRewards: [...(progress.earnedRewards || [])],
    badges: [...progress.badges]
  };
}

export function loadProgress() {
  if (progressCache) return cloneProgress(progressCache);
  try {
    progressCache = normalizeProgress(JSON.parse(localStorage.getItem(key) || "{}"));
  } catch {
    progressCache = normalizeProgress();
  }
  return cloneProgress(progressCache);
}

export function saveProgress(progress) {
  progressCache = normalizeProgress(progress);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(key, JSON.stringify(progressCache));
    } catch {
      // Aplikasi tetap berjalan walau penyimpanan browser sedang dibatasi.
    }
  }, 180);
}

export function recordResult(area, isCorrect, reward = 10, meta = {}) {
  const progress = loadProgress();
  const normalizedArea = area || "letters";
  progress.total += 1;
  progress.attemptsByArea[normalizedArea] = (progress.attemptsByArea[normalizedArea] || 0) + 1;
  progress.lastLevel = normalizedArea;

  let awardedStars = 0;
  if (isCorrect) {
    const rewardKey = meta.rewardKey || (meta.item ? `${normalizedArea}:${meta.item}:${meta.choice || "correct"}` : "");
    const alreadyRewarded = rewardKey && progress.earnedRewards.includes(rewardKey);
    progress.correct += 1;
    progress.correctByArea[normalizedArea] = (progress.correctByArea[normalizedArea] || 0) + 1;
    if (!alreadyRewarded) {
      if (rewardKey) progress.earnedRewards.push(rewardKey);
      progress.stars += reward;
      awardedStars = reward;
      progress.skill = { ...skillTemplate, ...(progress.skill || {}) };
      progress.skill[normalizedArea] = Math.min(5, (progress.skill[normalizedArea] || 0) + 1);
      const badgeMap = { letters: "🏅 Jago Huruf", sounds: "🏅 Peka Bunyi", syllables: "🏅 Master Suku Kata", words: "🏅 Pemburu Kata", sentences: "🏅 Penjelajah Kalimat", comprehension: "🏆 Bintang Membaca" };
      if (progress.skill[normalizedArea] >= 3 && badgeMap[normalizedArea] && !progress.badges.includes(badgeMap[normalizedArea])) progress.badges.push(badgeMap[normalizedArea]);
    }
  }

  if (meta.item) {
    const itemKey = `${normalizedArea}:${meta.item}`;
    const stat = progress.itemStats[itemKey] || { label: meta.label || meta.item, area: normalizedArea, attempts: 0, correct: 0, lastMistake: "" };
    stat.label = meta.label || stat.label;
    stat.area = normalizedArea;
    stat.attempts += 1;
    if (isCorrect) stat.correct += 1;
    if (!isCorrect) stat.lastMistake = meta.choice ? `Memilih ${meta.choice}` : "Perlu diulang";
    progress.itemStats[itemKey] = stat;
  }

  progress.awardedStars = awardedStars;
  saveProgress(progress);
  return progress;
}

export function updateSettings(settings) {
  const progress = { ...loadProgress(), ...settings };
  saveProgress(progress);
  return progress;
}

export function successRate(area) {
  const p = loadProgress();
  if (!area) return p.total ? Math.round((p.correct / p.total) * 100) : 0;
  const total = p.attemptsByArea[area] || 0;
  return total ? Math.round(((p.correctByArea[area] || 0) / total) * 100) : 0;
}

export function weakestItems(limit = 5) {
  const p = loadProgress();
  return Object.values(p.itemStats)
    .filter((item) => item.attempts > item.correct)
    .sort((a, b) => (b.attempts - b.correct) - (a.attempts - a.correct))
    .slice(0, limit);
}



