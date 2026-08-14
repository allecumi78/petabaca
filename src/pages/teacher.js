import { shell } from "../components/ui.js";
import { skillLabels } from "../data/learningData.js";
import { loadProgress, successRate, weakestItems } from "../logic/progress.js";

const recs = {
  letters: "Latih 5 huruf vokal, lalu huruf M, P, B, S, K. Minta anak menunjuk huruf sebelum memilih jawaban.",
  sounds: "Gunakan pola dengar-ulang-ucap. Anak tidak perlu cepat; yang penting bunyi awal tepat.",
  syllables: "Mulai dari MA, MI, MU, PA, PI, PU. Baca dengan tepuk tangan satu suku kata satu tepuk.",
  words: "Pakai kata dua suku terbuka seperti MAMA, PAPA, BOLA, BUKU. Pecah dulu menjadi suku kata.",
  sentences: "Baca satu kata, geser ke kata berikutnya, lalu tanyakan isi kalimat secara lisan.",
  comprehension: "Gunakan cerita 2-4 kalimat. Tanyakan siapa, apa, di mana, dan bagaimana perasaan tokoh."
};

function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

function readableArea(area) {
  return skillLabels[area] || area;
}

export function TeacherPage() {
  const p = loadProgress();
  const weak = Object.entries(p.skill).sort((a, b) => a[1] - b[1])[0]?.[0] || "letters";
  const mastered = Object.entries(p.skill).filter((x) => x[1] >= 3).map((x) => readableArea(x[0]));
  const items = weakestItems(6);
  return shell("Mode Guru/Orang Tua", `
    <section class="dashboard teacher">
      <h1>🔐 Mode Guru/Orang Tua</h1>
      <label>Nama siswa <input data-name value="${p.studentName}" /></label>
      <div class="teacher-summary">
        <span>Latihan: <strong>${p.total}</strong></span>
        <span>Benar: <strong>${p.correct}</strong></span>
        <span>Keberhasilan: <strong>${successRate()}%</strong></span>
        <span>Bintang: <strong>${p.stars}</strong></span>
      </div>
      <h2>Peta Kemampuan</h2>
      <div class="skill-report">
        ${Object.entries(p.skill).map(([area, value]) => `
          <p><strong>${readableArea(area)}</strong><span>${stars(value)}</span><small>${successRate(area)}% benar</small></p>
        `).join("")}
      </div>
      <p><strong>Materi dikuasai:</strong> ${mastered.join(", ") || "Belum ada"}</p>
      <p><strong>Perlu dilatih lebih dulu:</strong> ${readableArea(weak)}</p>
      <blockquote>Rekomendasi guru: ${recs[weak]}</blockquote>
      <h2>Item yang Perlu Diulang</h2>
      <div class="diagnostic-list">
        ${items.length ? items.map((item) => `<span><strong>${item.label}</strong><small>${readableArea(item.area)}: ${item.correct}/${item.attempts} benar. ${item.lastMistake}</small></span>`).join("") : "<span>Belum ada pola kesalahan. Mulai latihan untuk melihat diagnosis.</span>"}
      </div>
      <button data-action="save-name">Simpan Nama</button>
    </section>`);
}
