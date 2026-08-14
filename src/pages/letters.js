import { beginnerLetterGroups, confusingLetters, letters } from "../data/learningData.js";
import { shell, baca, choiceButtons } from "../components/ui.js";

const letterAudio = {
  A: "a-apel.mp3", B: "b-bola.mp3", C: "c-ceri.mp3", D: "d-dadu.mp3", E: "e-elang.mp3", F: "f-foto.mp3",
  G: "g-gigi.mp3", H: "h-hati.mp3", I: "i-ikan.mp3", J: "j-jeruk.mp3", K: "k-kuda.mp3", L: "l-lilin.mp3",
  M: "m-mama.mp3", N: "n-nasi.mp3", O: "o-obat.mp3", P: "p-papa.mp3", Q: "q-quran.mp3", R: "r-roti.mp3",
  S: "s-sapi.mp3", T: "t-topi.mp3", U: "u-ular.mp3", V: "v-vas.mp3", W: "w-wajan.mp3", X: "x-xilofon.mp3",
  Y: "y-yoyo.mp3", Z: "z-zebra.mp3"
};

let index = 0;

function shuffledChoices(itemIndex) {
  const beginner = ["A", "I", "U", "E", "O", "M", "P", "B", "S", "K"];
  const answer = beginner[itemIndex % beginner.length];
  const pool = [answer, beginner[(itemIndex + 3) % beginner.length], beginner[(itemIndex + 6) % beginner.length]];
  const correctPosition = itemIndex % pool.length;
  pool.splice(pool.indexOf(answer), 1);
  pool.splice(correctPosition, 0, answer);
  return { answer, pool };
}

export function LettersPage() {
  const { answer, pool } = shuffledChoices(index);
  const item = letters.find((letter) => letter.letter === answer) || letters[0];
  const confusion = confusingLetters[index % confusingLetters.length];
  const audioSrc = `./src/assets/audio/${letterAudio[item.letter]}`;
  const searchAudioList = `./src/assets/audio/cari-huruf.mp3|./src/assets/audio/${confusion.target.toLowerCase()}.mp3`;
  return shell("Level Huruf", `
    ${baca("Lihat hurufnya. Dengarkan suaranya. Ucapkan pelan, lalu pilih huruf yang sama.")}
    <section class="starter-strip" aria-label="Kelompok latihan huruf pemula">
      ${beginnerLetterGroups.map((group) => `<article><strong>${group.title}</strong><p>${group.focus.join(" ")}</p><small>${group.note}</small></article>`).join("")}
    </section>
    <section class="lesson-card">
      <div class="big-image">${item.image}</div>
      <button data-audio-src="${audioSrc}">🔊 DENGARKAN</button>
    </section>
    <section class="activity" data-hint="💡 Lihat lagi bentuk hurufnya. ${item.letter} seperti awal kata ${item.word}." data-success="🎉 Tepat! Itu huruf ${item.letter}.">
      <h2>Pilih huruf yang sama</h2>
      ${choiceButtons(pool, item.letter, "letters")}
      <p class="feedback"></p>
    </section>
    <section class="activity contrast-card" data-hint="💡 ${confusion.hint}" data-success="Bagus. Kamu bisa membedakan huruf yang mirip.">
      <h2>Huruf mirip:</h2>
      <button class="audio-prompt" data-audio-list="${searchAudioList}">🔊 Cari huruf</button>
      ${choiceButtons(confusion.choices, confusion.target, "letters")}
      <p class="feedback"></p>
    </section>
    <div class="row"><button data-action="next-letter">➡️ Lanjut</button></div>`);
}

export function bindLetters(render) {
  document.querySelector("[data-action='next-letter']")?.addEventListener("click", (event) => { event.currentTarget.disabled = true; index++; render("letters"); });
}