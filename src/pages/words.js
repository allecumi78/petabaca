import { words } from "../data/learningData.js";
import { shell, baca } from "../components/ui.js";

let index = 0;
let selected = [];

export function WordsPage() {
  const item = words[index % words.length];
  const mixed = [...item.parts].reverse();
  return shell("Kereta Kata", `
    ${baca("Susun gerbong suku kata sesuai gambar. Tap gerbong pertama, lalu gerbong berikutnya.")}
    <section class="lesson-card train">
      <div class="big-image">${item.image}</div><h2>Susun kata: <button class="word-audio-btn" data-audio-src="./src/assets/audio/${item.word.toLowerCase()}.mp3">🔊 Putar</button></h2>
      <div class="train-parts">${mixed.map((p) => `<button draggable="true" data-part="${p}">🚃 ${p}</button>`).join("")}</div>
      <div class="drop-zone" aria-label="Tempat menyusun kata">${selected.join(" + ") || "Pilih gerbong di sini"}</div>
      <button data-action="check-word">Cek Kata</button>
      <p class="feedback"></p>
    </section>`);
}

export function bindWords(render, record) {
  const item = words[index % words.length];
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => { if (btn.disabled) return; btn.disabled = true; if (selected.length < item.parts.length) selected.push(btn.dataset.part); render("words"); });
    btn.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", btn.dataset.part));
  });
  const drop = document.querySelector(".drop-zone");
  drop?.addEventListener("dragover", (e) => e.preventDefault());
  drop?.addEventListener("drop", (e) => { e.preventDefault(); if (selected.length < item.parts.length) selected.push(e.dataTransfer.getData("text/plain")); render("words"); });
  document.querySelector("[data-action='check-word']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    const ok = selected.join("") === item.word;
    record("words", ok, ok ? "✨ Gerbong menyatu dan kereta berjalan! " + item.parts.join(" + ") + " = " + item.word : "💡 Hampir! Yuk susun dari kiri ke kanan.", 20);
    if (ok) index++;
    selected = [];
  });
}

