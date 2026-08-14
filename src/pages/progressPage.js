import { shell, baca } from "../components/ui.js";
import { skillLabels } from "../data/learningData.js";
import { loadProgress, successRate } from "../logic/progress.js";

function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

export function ProgressPage() {
  const p = loadProgress();
  const skillValues = Object.values(p.skill);
  const overall = Math.min(100, Math.round((skillValues.reduce((a, b) => a + b, 0) / (skillValues.length * 5)) * 100));
  return shell("Perkembanganku", `
    ${baca("Lihat bintangmu. Latihan kecil setiap hari membuat membaca semakin mudah.")}
    <section class="dashboard">
      <label>Progress keseluruhan <span>${overall}%</span><progress max="100" value="${overall}"></progress></label>
      <div class="skill-report">
        ${Object.entries(p.skill).map(([area, value]) => `<p><strong>${skillLabels[area] || area}</strong><span>${stars(value)}</span><small>${successRate(area)}% benar</small></p>`).join("")}
      </div>
      <div class="stats"><span>Latihan: ${p.total}</span><span>Benar: ${p.correct}</span><span>Berhasil: ${successRate()}%</span><span>Level terakhir: ${skillLabels[p.lastLevel] || p.lastLevel}</span></div>
      <h2>Lencana</h2><div class="badges">${p.badges.length ? p.badges.map((b) => `<span>${b}</span>`).join("") : "<span>⭐ Ayo kumpulkan lencana pertama!</span>"}</div>
    </section>`);
}
