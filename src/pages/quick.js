import { shell, baca, choiceButtons } from "../components/ui.js";

const audioBase = "./src/assets/audio/";
const tasks = [
  { audio: "A", src: "a.mp3", choices: ["A", "I", "U"], answer: "A", area: "letters", hint: "Mulut terbuka lebar saat mengucap A." },
  { audio: "I", src: "i.mp3", choices: ["I", "E", "A"], answer: "I", area: "letters", hint: "I terdengar tipis seperti awal kata ikan." },
  { audio: "U", src: "u.mp3", choices: ["O", "U", "V"], answer: "U", area: "letters", hint: "Mulut maju saat mengucap U." },
  { audio: "M", src: "m.mp3", choices: ["M", "N", "W"], answer: "M", area: "letters", hint: "M punya dua puncak dan bunyi awal mama." },
  { audio: "BA", src: "ba.mp3", choices: ["BO", "BA", "BI"], answer: "BA", area: "sounds", hint: "Dengarkan /b/ lalu /a/: BA." },
  { audio: "MA", src: "ma.mp3", choices: ["MA", "MI", "MU"], answer: "MA", area: "sounds", hint: "Dengarkan awal mama: MA." },
  { audio: "SU", src: "su.mp3", choices: ["SA", "SU", "SI"], answer: "SU", area: "syllables", hint: "Sambungkan S dan U menjadi SU." },
  { audio: "BOLA", src: "bola.mp3", choices: ["BUKU", "BOLA", "SAPI"], answer: "BOLA", area: "words", hint: "BOLA dimulai dari BO." },
  { audio: "Budi", src: "budi.mp3", choices: ["Budi", "Siti", "Ayah"], answer: "Budi", area: "sentences", hint: "Dengarkan nama di awal suara." }
];

let step = 0;

export function QuickPage() {
  if (step >= tasks.length) {
    return shell("Latihan 5 Menit", `${baca("Hebat! Kamu sudah berlatih membaca hari ini!")}<section class="reward"><h2>🌟 Selesai!</h2><p>Kamu menyelesaikan latihan harian.</p><button data-route="progress">Lihat Progress</button><button data-action="restart-quick">Ulang Latihan</button></section>`);
  }
  const item = tasks[step];
  return shell("Latihan 5 Menit", `
    ${baca("Dengarkan suara, ucapkan pelan, lalu pilih jawaban yang sesuai.")}
    <section class="activity quick-listening" data-hint="💡 ${item.hint}" data-success="🎉 Tepat. Kamu mendengar ${item.answer}.">
      <span class="step-counter">Soal ${step + 1} dari ${tasks.length}</span>
      <button class="audio-prompt" data-audio-src="${audioBase}${item.src}">🔊 Putar Audio</button>
      ${choiceButtons(item.choices, item.answer, item.area)}
      <p class="feedback"></p>
      <button data-action="next-quick">➡️ Soal Berikutnya</button>
    </section>`);
}

export function bindQuick(render) {
  document.querySelector("[data-action='next-quick']")?.addEventListener("click", (event) => { event.currentTarget.disabled = true; step++; render("quick"); });
  document.querySelector("[data-action='restart-quick']")?.addEventListener("click", (event) => { event.currentTarget.disabled = true; step = 0; render("quick"); });
}
