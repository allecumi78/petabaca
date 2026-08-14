import { beginnerSyllables, words } from "../data/learningData.js";
import { shell, baca, choiceButtons } from "../components/ui.js";

export function SyllablesPage() {
  const word = words[0];
  const rows = [beginnerSyllables.slice(0, 5), beginnerSyllables.slice(5, 10), beginnerSyllables.slice(10, 15)];
  return shell("Rumah Suku Kata", `
    ${baca("Ketuk satu suku kata. Dengarkan. Ucapkan. Lalu gabungkan menjadi kata.")}
    <section class="syllable-board beginner-board">
      ${rows.map((row) => `<div>${row.map((s) => `<button data-audio-src="./src/assets/audio/${s.toLowerCase()}.mp3">${s}</button>`).join("")}</div>`).join("")}
    </section>
    <section class="lesson-card">
      <h2>Ketuk dan Baca</h2>
      <div class="train-parts">${word.parts.map((p) => `<button data-audio-src="./src/assets/audio/${p.toLowerCase()}.mp3">${p}</button>`).join("")}<strong>= ${word.word}</strong></div>
      <div class="big-image">${word.image}</div>
      <button data-audio-list="./src/assets/audio/${word.parts[0].toLowerCase()}.mp3|./src/assets/audio/${word.parts[1].toLowerCase()}.mp3|./src/assets/audio/${word.word.toLowerCase()}.mp3">🔊 MA... MA... MAMA</button>
    </section>
    <section class="activity" data-next-route="words" data-next-label="Ke Kereta Kata" data-hint="💡 Lihat gambar sapi. Kata SAPI dimulai dari SA." data-success="🎉 Benar. Gambar sapi cocok dengan kata SAPI.">
      <h2>Cocokkan gambar dengan kata: 🐄</h2>
      ${choiceButtons(["MAMA", "SAPI", "IKAN"], "SAPI", "syllables")}
      <p class="feedback"></p>
    </section>`);
}
