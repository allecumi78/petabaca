import { loadProgress } from "./progress.js";

let lastPlayAt = 0;
let activeAudio = null;
let playToken = 0;
const audioCache = new Map();

function getAudio(src) {
  if (!audioCache.has(src)) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audioCache.set(src, audio);
  }
  return audioCache.get(src);
}

function stopActiveAudio() {
  if (!activeAudio) return;
  try {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  } catch {
    // Abaikan masalah audio browser.
  }
  activeAudio = null;
}

function playSingle(src, token, onEnd) {
  if (token !== playToken || !src) return;
  stopActiveAudio();

  try {
    const audio = getAudio(src);
    activeAudio = audio;
    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      if (typeof onEnd === "function") onEnd();
    };
    audio.onerror = () => {
      if (activeAudio === audio) activeAudio = null;
    };
    audio.currentTime = 0;
    audio.play().catch(() => {
      if (activeAudio === audio) activeAudio = null;
    });
  } catch {
    activeAudio = null;
  }
}

function schedulePlay(callback) {
  window.requestAnimationFrame(() => {
    window.setTimeout(callback, 0);
  });
}

export function playAudioFile(src) {
  const settings = loadProgress();
  const now = Date.now();
  if (!settings.soundOn || !src) return;
  if (now - lastPlayAt < 450) return;
  lastPlayAt = now;
  const token = ++playToken;

  schedulePlay(() => playSingle(src, token));
}

export function playAudioList(sources) {
  const settings = loadProgress();
  const now = Date.now();
  const list = Array.isArray(sources) ? sources.filter(Boolean) : [];
  if (!settings.soundOn || !list.length) return;
  if (now - lastPlayAt < 450) return;
  lastPlayAt = now;
  const token = ++playToken;
  let index = 0;

  function playNext() {
    index += 1;
    if (token !== playToken || index >= list.length) return;
    playSingle(list[index], token, playNext);
  }

  schedulePlay(() => playSingle(list[0], token, playNext));
}

export function stopAudio() {
  playToken += 1;
  stopActiveAudio();
}