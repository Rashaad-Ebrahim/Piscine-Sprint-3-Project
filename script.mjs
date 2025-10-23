import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  getMostListened,
  getFridayNightSong,
  getLongestStreak,
  getEverydaySongs,
  getTopGenres,
} from "./analysis.mjs";

// Initialize the page with basic layout
function initializePage() {
  // --- HEADER ---
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = "Music Data Analysis";
  header.append(title);

  const userSelectLabel = document.createElement("label");
  userSelectLabel.textContent = "Select Listener: ";
  userSelectLabel.htmlFor = "userSelect";

  const userSelect = document.createElement("select");
  userSelect.id = "userSelect";
  userSelect.setAttribute(
    "aria-label",
    "Select a user to view their music data"
  );

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select User";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  userSelect.append(defaultOption);

  // Populate dropdown
  const users = getUserIDs();
  users.forEach((user) => {
    const option = document.createElement("option");
    option.textContent = user.name;
    option.value = user.id;
    userSelect.append(option);
  });

  // Event listener for user selection
  userSelect.addEventListener("change", (event) => {
    const selectedUserId = event.target.value;
    if (selectedUserId) {
      displayUserData(selectedUserId);
    }
  });

  userSelectLabel.append(userSelect);
  header.append(userSelectLabel);

  // --- MAIN ---
  const main = document.createElement("main");
  const initialMessage = document.createElement("p");
  initialMessage.className = "initial-message";
  initialMessage.textContent =
    "Please select a user from the dropdown to view their music data analysis.";
  main.append(initialMessage);

  // --- FOOTER ---
  const footer = document.createElement("footer");
  const footerContent = document.createElement("p");
  footerContent.textContent = "Music Data Project";
  footer.appendChild(footerContent);

  // Append everything to body
  document.body.append(header);
  document.body.append(main);
  document.body.append(footer);
}

// Display all questions for selected user
function displayUserData(userId) {
  const listens = getListenEvents(userId);
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Handle case where user has no listening data
  if (listens.length === 0) {
    const message = document.createElement("p");
    message.className = "no-data";
    message.textContent = "This user didn't listen to any songs.";
    main.append(message);
    return;
  }

  // Create container for all questions
  const questionsContainer = document.createElement("div");
  questionsContainer.className = "questions-container";

  // --- QUESTIONS ---

  // Most listened song by count
  const mostListenedSongCount = getMostListened(listens, "song", "count");
  if (mostListenedSongCount) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h3");
    question.className = "question";
    question.textContent = "What was the user's most often listened to song?";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `${mostListenedSongCount.artist} - ${mostListenedSongCount.title}`;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  main.append(questionsContainer);

}

window.onload = initializePage;
