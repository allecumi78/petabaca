import { shell, baca } from "../components/ui.js";

export function Home() {
  return shell("PETUALANGAN CEPAT BISA MEMBACA", `
    <section class="hero">
      <div>
        <h1>🌈 PETUALANGAN CEPAT BISA MEMBACA 🚀</h1>
        <p>Belajar sedikit demi sedikit, membaca jadi lebih mudah!</p>
        <div class="hero-actions">
          <button data-route="map">Mulai Petualangan</button>
          <button data-route="quick">⏱️ LATIHAN 5 MENIT</button>
        </div>
      </div>
      <div class="hero-art reading-illustration" aria-label="Ilustrasi anak sedang belajar membaca">
        <div class="reading-scene">
          <div class="reading-sun"></div>
          <div class="reading-bubble one"></div>
          <div class="reading-bubble two"></div>
          <div class="reading-bubble three"></div>
          <div class="reading-bubble four"></div>
          <div class="reading-bubble five"></div>
          <div class="reading-child one">
            <img src="./src/assets/images/siswa-putra-membaca.png" alt="Siswa putra membaca buku" loading="lazy">
          </div>
          <div class="reading-child two">
            <img src="./src/assets/images/siswa-putri-membaca.png" alt="Siswa putri belajar membaca" loading="lazy">
          </div>
          <div class="reading-ground"></div>
        </div>
        <p class="hero-credit">V3.00 © 2026 | Kontributor: ROJALI, S.Pd.</p>
      </div>
    </section>
    ${baca("Hai! Aku BACA. Kita dengar, lihat, ucapkan, susun, baca, lalu pahami bersama.")}`);
}

