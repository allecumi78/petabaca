import { playAudioFile, playAudioList } from "../logic/audio.js";
import { loadProgress, updateSettings } from "../logic/progress.js";

export function shell(title, body) {
  const progress = loadProgress();
  return `
    <header class="topbar">
      <button class="logo-shell" data-route="home" aria-label="Beranda">
        <img src="./src/assets/images/logo-sekolah.png" alt="Logo sekolah" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
        <span class="logo-fallback">🏫</span>
      </button>
      <div class="school-title">
        <strong>PETABACA</strong>
        <span>Petualangan Cepat Bisa Membaca</span>
      </div>
      <div class="header-actions">
        <div class="star-pill" aria-label="Jumlah bintang">⭐ ${progress.stars}</div>
        <button class="sound-btn" data-action="toggle-sound" aria-label="Suara">${progress.soundOn ? "🔊 Suara ON" : "🔇 Suara OFF"}</button>
      </div>
    </header>
    <main class="screen">${body}</main>
    <nav class="dock" aria-label="Navigasi utama">
      <button data-route="map">🗺️ Peta</button><button data-route="games">🎮 Game</button>
      <button data-route="progress">📊 Progress</button><button data-route="teacher">🔐 Guru</button>
    </nav>`;
}

export function baca(text = "Ayo belajar sedikit demi sedikit. Kamu pasti bisa!") {
  return `<section class="baca"><div class="robot" aria-hidden="true">🤖</div><p><strong>BACA:</strong> ${text}</p></section>`;
}

export function choiceButtons(choices, answer, area) {
  return `<div class="choices">${choices.map((c) => `<button class="choice" data-choice="${c}" data-answer="${answer}" data-area="${area}">${c}</button>`).join("")}</div>`;
}

export function reward(message, stars = 20) {
  return `<section class="reward"><h2>🎉 HEBAT!</h2><p>${message}</p><strong>⭐ +${stars} Bintang</strong><button data-route="map">LANJUT PETUALANGAN 🚀</button></section>`;
}

export function bindCommon(appRender) {
  document.querySelectorAll("[data-audio-list]").forEach((btn) => btn.addEventListener("click", () => playAudioList(btn.dataset.audioList.split("|"))));
  document.querySelectorAll("[data-audio-src]").forEach((btn) => btn.addEventListener("click", () => playAudioFile(btn.dataset.audioSrc)));
  document.querySelectorAll("[data-action='toggle-sound']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = loadProgress();
      updateSettings({ soundOn: !p.soundOn });
      appRender(window.currentRoute || "home");
    });
  });
}

