import { shell, baca, choiceButtons } from "../components/ui.js";

const items = [
  ["M", "A", "MA", ["MA", "MI", "MU"], "Gabungkan /m/ dan /a/. Mulut berkata MA."],
  ["P", "A", "PA", ["PI", "PU", "PA"], "Gabungkan /p/ dan /a/. Mulut berkata PA."],
  ["B", "A", "BA", ["BI", "BA", "BU"], "Gabungkan /b/ dan /a/. Mulut berkata BA."],
  ["S", "U", "SU", ["SA", "SU", "SI"], "Mulut maju saat mengucap U. Dengarkan SU."],
  ["K", "U", "KU", ["KU", "KA", "KO"], "Dengarkan bunyi awal /k/, lalu sambung U."],
  ["D", "I", "DI", ["DA", "DI", "DU"], "Dengarkan bunyi awal /d/, lalu sambung I."],
  ["D", "U", "DU", ["DU", "DA", "DI"], "Mulut maju saat mengucap U. Dengarkan DU."],
  ["L", "A", "LA", ["LA", "LI", "LU"], "Dengarkan bunyi awal /l/, lalu sambung A."],
  ["L", "I", "LI", ["LA", "LI", "LU"], "Dengarkan bunyi awal /l/, lalu sambung I."],
  ["T", "O", "TO", ["TA", "TU", "TO"], "Mulut membulat saat mengucap O. Dengarkan TO."],
  ["N", "A", "NA", ["NA", "NI", "NU"], "Dengarkan bunyi awal /n/, lalu sambung A."],
  ["N", "I", "NI", ["NA", "NI", "NU"], "Dengarkan bunyi awal /n/, lalu sambung I."],
  ["R", "O", "RO", ["RA", "RO", "RU"], "Mulut membulat saat mengucap O. Dengarkan RO."],
  ["S", "A", "SA", ["SA", "SI", "SU"], "Dengarkan bunyi awal /s/, lalu sambung A."],
  ["T", "A", "TA", ["TA", "TI", "TU"], "Dengarkan bunyi awal /t/, lalu sambung A."],
  ["B", "I", "BI", ["BA", "BI", "BU"], "Dengarkan bunyi awal /b/, lalu sambung I."],
  ["K", "A", "KA", ["KA", "KI", "KU"], "Dengarkan bunyi awal /k/, lalu sambung A."],
  ["M", "I", "MI", ["MA", "MI", "MU"], "Dengarkan bunyi awal /m/, lalu sambung I."],
  ["P", "U", "PU", ["PA", "PI", "PU"], "Mulut maju saat mengucap U. Dengarkan PU."],
  ["G", "A", "GA", ["GA", "GI", "GU"], "Dengarkan bunyi awal /g/, lalu sambung A."]
];
let index = 0;

export function SoundsPage() {
  const [a, b, result, choices, hint] = items[index % items.length];
  return shell("Level Bunyi", `
    ${baca("Dengarkan satu bunyi, lalu bunyi berikutnya. Setelah itu gabungkan menjadi suku kata.")}
    <section class="lesson-card sound-join">
      <button data-audio-list="./src/assets/audio/${a.toLowerCase()}.mp3|./src/assets/audio/${b.toLowerCase()}.mp3|./src/assets/audio/${result.toLowerCase()}.mp3">🔊 Dengarkan</button>
    </section>
    <section class="activity" data-hint="💡 ${hint}" data-success="🎉 Tepat! ${a} dan ${b} menjadi ${result}.">
      <h2>Pilih suku kata yang kamu dengar</h2>
      ${choiceButtons(choices, result, "sounds")}
      <p class="feedback"></p>
    </section>
    <div class="row"><button data-action="next-sound">➡️ Lanjut</button></div>`);
}

export function bindSounds(render) {
  document.querySelector("[data-action='next-sound']")?.addEventListener("click", (event) => { event.currentTarget.disabled = true; index++; render("sounds"); });
}



