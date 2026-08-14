import { shell, baca } from "../components/ui.js";
import { words } from "../data/learningData.js";
import { playAudioFile } from "../logic/audio.js";
import { recordResult } from "../logic/progress.js";

let target = "B";
let score = 0;
let build = [];
let catchFeedback = "";
let buildFeedback = "";

const findBAudio = "./src/assets/audio/ayo-cari-b.mp3";
const foundBAudio = "./src/assets/audio/hebat-huruf-b.mp3";
const retryAudio = "./src/assets/audio/ayo-coba-lagi.mp3";

export function GamesPage() {
  const letters = ["A", "B", "M", "O", "B", "S"];
  const word = words[5];
  return shell("Mini Games", `
    ${baca("Game ini melatih mata melihat huruf dan tangan menyusun kata.")}
    <section class="game-zone">
      <button class="audio-prompt" data-audio-src="${findBAudio}">🔊 Putar Audio</button>
      <p>Skor game: ⭐ ${score}</p>
      <div class="falling">${letters.map((l, i) => `<button style="--delay:${i * .25}s; --x:${8 + i * 14}%" data-catch="${l}" data-catch-id="catch-${i}-${l}">${l}</button>`).join("")}</div>
      <p class="catch-feedback">${catchFeedback}</p>
    </section>
    <section class="lesson-card">
      <h2>Susun Kata</h2><div class="big-image">${word.image}</div>
      <p>Klik, untuk menyusun</p>
      <div class="train-parts">${["DA", "KU"].map((p) => `<button data-build="${p}">${p}</button>`).join("")}</div>
      <div class="drop-zone">${build.join(" + ") || "Hasil di sini"}</div>
      <button data-action="check-build">Cek KUDA</button>
      <button data-action="reset-build">Ulang Susun</button>
      <p class="build-feedback">${buildFeedback}</p>
    </section>`);
}

export function bindGames(render, recordInline) {
  document.querySelectorAll("[data-catch]").forEach((btn) => btn.addEventListener("click", () => {
    if (btn.disabled) return;
    btn.disabled = true;
    const ok = btn.dataset.catch === target;
    if (ok) {
      const progress = recordResult("letters", true, 10, { item: target, label: `Huruf ${target}`, choice: btn.dataset.catch, rewardKey: `games:${btn.dataset.catchId}` });
      score += progress.awardedStars || 0;
      playAudioFile(foundBAudio);
      catchFeedback = progress.awardedStars ? "⭐ +10 poin. Hebat! Itu huruf B!" : "Benar. Tombol ini sudah mendapat bintang.";
    } else {
      recordResult("letters", false, 0, { item: target, label: `Huruf ${target}`, choice: btn.dataset.catch, rewardKey: `games:${btn.dataset.catchId}` });
      playAudioFile(retryAudio);
      catchFeedback = "Hampir! Yuk cari B lagi.";
    }
    render("games");
  }));
  document.querySelectorAll("[data-build]").forEach((btn) => btn.addEventListener("click", () => {
    if (btn.disabled) return;
    btn.disabled = true;
    if (build.length < 2) build.push(btn.dataset.build);
    buildFeedback = "";
    render("games");
  }));
  document.querySelector("[data-action='reset-build']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    build = [];
    buildFeedback = "";
    render("games");
  });
  document.querySelector("[data-action='check-build']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    const ok = build.join("") === "KUDA";
    buildFeedback = recordInline("words", ok, ok ? "🎉 KU + DA = KUDA!" : "💡 Coba mulai dari KU, lalu DA.", 20, { item: "KUDA", label: "KUDA", choice: build.join("") || "kosong", rewardKey: "games:build:KUDA" });
    build = [];
    render("games");
  });
}


