import { Home } from "./pages/home.js";
import { MapPage } from "./pages/map.js";
import { LettersPage, bindLetters } from "./pages/letters.js";
import { SoundsPage, bindSounds } from "./pages/sounds.js";
import { SyllablesPage } from "./pages/syllables.js";
import { WordsPage, bindWords } from "./pages/words.js";
import { SentencesPage, bindSentences } from "./pages/sentences.js";
import { StoryPage, bindStory } from "./pages/story.js";
import { GamesPage, bindGames } from "./pages/games.js";
import { ProgressPage } from "./pages/progressPage.js";
import { TeacherPage } from "./pages/teacher.js";
import { QuickPage, bindQuick } from "./pages/quick.js";
import { bindCommon, reward } from "./components/ui.js";
import { playAudioFile } from "./logic/audio.js";
import { recordResult, updateSettings } from "./logic/progress.js";

const app = document.querySelector("#app");
const successAudio = "./src/assets/audio/hebat-kamu-berhasil.mp3";
const retryAudio = "./src/assets/audio/ayo-coba-lagi.mp3";
const routes = { home: Home, map: MapPage, letters: LettersPage, sounds: SoundsPage, syllables: SyllablesPage, words: WordsPage, sentences: SentencesPage, story: StoryPage, games: GamesPage, progress: ProgressPage, teacher: TeacherPage, quick: QuickPage };
let pendingRoute = null;
let renderScheduled = false;

function showReward(message, stars) {
  window.requestAnimationFrame(() => {
    app.innerHTML = reward(message, stars);
    bindCommon(render);
  });
}

function record(area, ok, message, stars = 10, meta = {}) {
  const progress = recordResult(area, ok, ok ? stars : 0, meta);
  const awarded = progress.awardedStars || 0;
  playAudioFile(ok ? successAudio : retryAudio);
  showReward(awarded ? message : "Jawaban benar ini sudah pernah mendapat bintang.", awarded);
}

function recordInline(area, ok, message, stars = 10, meta = {}) {
  const progress = recordResult(area, ok, ok ? stars : 0, meta);
  playAudioFile(ok ? successAudio : retryAudio);
  return progress.awardedStars || !ok ? message : "Benar, tetapi tombol ini sudah mendapat bintang.";
}

function bindChoices() {
  document.querySelectorAll("[data-choice]").forEach((btn, choiceIndex) => btn.addEventListener("click", () => {
    const activity = btn.closest(".activity");
    if (activity?.dataset.answered === "true" || btn.disabled) return;
    btn.disabled = true;
    const { choice, answer, area = "letters" } = btn.dataset;
    const ok = choice === answer;
    const feedback = activity?.querySelector(".feedback") || document.querySelector(".feedback");
    const activityIndex = [...document.querySelectorAll(".activity")].indexOf(activity);
    const rewardKey = `${window.currentRoute || "home"}:${activityIndex}:${area}:${answer}:${choiceIndex}`;
    if (ok) {
      if (activity) activity.dataset.answered = "true";
      activity?.querySelectorAll("[data-choice]").forEach((choiceBtn) => { choiceBtn.disabled = true; });
      btn.classList.add("correct");
      recordResult(area, true, 10, { item: answer, label: answer, choice, rewardKey });
      if (feedback) {
        feedback.textContent = activity?.dataset.success || "🎉 Hebat! Kamu berhasil!";
        const nextRoute = activity?.dataset.nextRoute;
        const nextLabel = activity?.dataset.nextLabel || "Lanjut";
        if (nextRoute && !activity.querySelector("[data-next-added]")) {
          feedback.insertAdjacentHTML("afterend", `<div class="row" data-next-added="true"><button data-route="${nextRoute}">➡️ ${nextLabel}</button></div>`);
          activity.querySelector("[data-next-added] [data-route]")?.addEventListener("click", (event) => render(event.currentTarget.dataset.route));
        }
      }
      playAudioFile(successAudio);
    } else {
      btn.classList.add("try");
      btn.disabled = true;
      recordResult(area, false, 0, { item: answer, label: answer, choice, rewardKey });
      if (feedback) feedback.textContent = activity?.dataset.hint || "💡 Hampir. Dengarkan lagi, lalu pilih yang paling cocok.";
      playAudioFile(retryAudio);
    }
  }));
}

function renderNow(route) {
  window.currentRoute = route;
  document.body.dataset.route = route;
  app.innerHTML = (routes[route] || Home)();
  bindCommon(render);
  bindChoices();
  if (route === "letters") bindLetters(render);
  if (route === "sounds") bindSounds(render);
  if (route === "words") bindWords(render, record);
  if (route === "sentences") bindSentences(render);
  if (route === "story") bindStory(render);
  if (route === "games") bindGames(render, recordInline);
  if (route === "quick") bindQuick(render);
  document.querySelector("[data-action='save-name']")?.addEventListener("click", () => {
    updateSettings({ studentName: document.querySelector("[data-name]").value || "Sahabat BACA" });
    render("teacher");
  });
}

export function render(route = "home") {
  pendingRoute = route;
  if (renderScheduled) return;
  renderScheduled = true;
  window.requestAnimationFrame(() => {
    const nextRoute = pendingRoute || "home";
    pendingRoute = null;
    renderScheduled = false;
    renderNow(nextRoute);
  });
}


document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (!routeButton) return;
  event.preventDefault();
  render(routeButton.dataset.route || "home");
});
render("home");







