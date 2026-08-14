import { sentences } from "../data/learningData.js";
import { shell, baca, choiceButtons } from "../components/ui.js";

let index = 0;
let activeWordIndex = -1;

export function SentencesPage() {
  const item = sentences[index % sentences.length];
  const words = item.text.split(" ");
  return shell("Jembatan Kalimat", `
    ${baca("Baca kalimat pendek. Tekan tombol untuk menyalakan kata berikutnya.")}
    <section class="lesson-card">
      <p class="sentence" data-sentence-words>${words.map((word, wordIndex) => `<span class="sentence-word${wordIndex === activeWordIndex ? " active-word" : ""}">${word}</span>`).join(" ")}</p>
      <button type="button" data-action="next-word-highlight">Kata Berikutnya</button>
      <button type="button" data-action="reset-word-highlight">Ulang Highlight</button>
    </section>
    <section class="activity"><h2>${item.question}</h2>${choiceButtons(item.choices, item.answer, "sentences")}<p class="feedback"></p></section>
    <div class="row"><button data-action="next-sentence">➡️ Lanjut</button></div>`);
}

export function bindSentences(render) {
  document.querySelector("[data-action='next-word-highlight']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    const item = sentences[index % sentences.length];
    const totalWords = item.text.split(" ").length;
    activeWordIndex = (activeWordIndex + 1) % totalWords;
    render("sentences");
  });
  document.querySelector("[data-action='reset-word-highlight']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    activeWordIndex = -1;
    render("sentences");
  });
  document.querySelector("[data-action='next-sentence']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    activeWordIndex = -1;
    index++;
    render("sentences");
  });
}