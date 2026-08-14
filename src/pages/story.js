import { stories } from "../data/learningData.js";
import { shell, baca, choiceButtons } from "../components/ui.js";

let index = 0;

export function StoryPage() {
  const story = stories[index % stories.length];
  const storyNumber = (index % stories.length) + 1;
  return shell("Pulau Cerita", `
    ${baca("Baca cerita pendek pelan-pelan. Setelah itu jawab pertanyaan dari isi cerita.")}
    <section class="lesson-card story">
      <span class="step-counter">Cerita ${storyNumber} dari ${stories.length}</span>
      <div class="big-image">${story.image}</div><h2>${story.title}</h2>
      ${story.parts.map((p) => `<p>${p}</p>`).join("")}
    </section>
    ${story.questions.map((q) => `
      <section class="activity">
        <h2>${q.q}</h2>
        ${choiceButtons(q.choices, q.answer, "comprehension")}
        <p class="feedback"></p>
      </section>`).join("")}
    <div class="row">
      <button data-action="next-story">➡️ Cerita Berikutnya</button>
      <button data-route="progress">Lihat Progress</button>
    </div>`);
}

export function bindStory(render) {
  document.querySelector("[data-action='next-story']")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    index++;
    render("story");
  });
}
