import { shell, baca } from "../components/ui.js";
import { beginnerPath, skillLabels } from "../data/learningData.js";
import { loadProgress } from "../logic/progress.js";

const levels = [
  ["letters", "🌳", "Hutan Huruf", "Kenali bentuk huruf besar dan kecil.", "Mulai dari A, I, U, E, O"],
  ["sounds", "🔊", "Gua Bunyi", "Dengarkan bunyi huruf dan gabungkan.", "Latih telinga dan suara"],
  ["syllables", "🏠", "Rumah Suku Kata", "Ketuk MA, BA, SA dan baca bersama.", "Gabungkan bunyi pendek"],
  ["words", "🚂", "Kereta Kata", "Susun gerbong menjadi kata.", "Baca kata sederhana"],
  ["sentences", "🏰", "Istana Kalimat", "Baca kalimat pendek dengan highlight.", "Naik ke kalimat"],
  ["story", "⭐", "Pulau Cerita", "Baca cerita pendek dan jawab pertanyaan.", "Pahami isi bacaan"]
];

function levelState(route, progress) {
  const rule = beginnerPath.find((item) => item.route === route);
  if (!rule || rule.minSkill === 0) return { className: "ready", label: "Siap mulai" };
  const current = progress.skill[rule.area] || 0;
  if (current >= 5) return { className: "done", label: "Sudah kuat" };
  if (current >= rule.minSkill) return { className: "ready", label: "Siap dicoba" };
  return { className: "practice", label: `Latih ${skillLabels[rule.area]} dulu` };
}

function nextBestRoute(progress) {
  return beginnerPath.find((item) => (progress.skill[item.area] || 0) < Math.max(item.minSkill, 3))?.route || "quick";
}

export function MapPage() {
  const progress = loadProgress();
  const recommended = nextBestRoute(progress);
  return shell("Peta Petualangan", `
    <section class="map-hero">
      <div>
        <span class="map-kicker">Peta Belajar Pemula</span>
        <h1>Belajar Membaca Pelan dan Pasti</h1>
        <p>Ikuti urutan dari kiri ke kanan. Anak boleh mencoba semua tempat, tetapi tanda di kartu membantu guru memilih latihan yang paling tepat.</p>
      </div>
      <button class="quick-map-link" data-route="${recommended}">Mulai yang Disarankan</button>
    </section>
    ${baca("Untuk pemula, cukup satu tujuan kecil dulu: lihat, dengar, ucapkan, lalu pilih.")}
    <section class="adventure-map" aria-label="Daftar tempat petualangan membaca">
      ${levels.map(([route, icon, title, desc, tag], i) => {
        const state = levelState(route, progress);
        return `
        <button class="level-card ${state.className}" data-route="${route}">
          <span class="step">${i + 1}</span>
          <span class="level-icon" aria-hidden="true">${icon}</span>
          <span class="level-content">
            <strong>${title}</strong>
            <small>${desc}</small>
            <em>${tag}</em>
            <span class="level-status">${state.label}</span>
          </span>
        </button>`;
      }).join("")}
    </section>`);
}
