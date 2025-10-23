import { getUserIDs, getListenEvents } from "./data.mjs";
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
  footerContent.textContent = "© 2025 Rashaad Ebrahim - Music Data Project";
  footer.append(footerContent);

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

  // Most listened to song by count
  const mostListenedSongCount = getMostListened(listens, "song", "count");
  if (mostListenedSongCount) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Most listened to song (count)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `${mostListenedSongCount.artist} - ${mostListenedSongCount.title}`;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Most listened song by time
  const mostListenedSongTime = getMostListened(listens, "song", "time");
  if (mostListenedSongTime) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Most listened to song (time)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `${mostListenedSongTime.artist} - ${mostListenedSongTime.title}`;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Most listened artist by count
  const mostListenedArtistCount = getMostListened(listens, "artist", "count");
  if (mostListenedArtistCount) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Most listened artist (count)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = mostListenedArtistCount;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Most listened artist by time
  const mostListenedArtistTime = getMostListened(listens, "artist", "time");
  if (mostListenedArtistTime) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Most listened artist (time)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = mostListenedArtistTime;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Friday night song by count
  const fridayNightSongCount = getFridayNightSong(listens, "count");
  if (fridayNightSongCount) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Friday nights song (count)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `${fridayNightSongCount.artist} - ${fridayNightSongCount.title}`;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Friday night song by time
  const fridayNightSongTime = getFridayNightSong(listens, "time");
  if (fridayNightSongTime) {
    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Friday nights song (time)";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `${fridayNightSongTime.artist} - ${fridayNightSongTime.title}`;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Longest streak
  const longestStreak = getLongestStreak(listens);
  if (longestStreak && longestStreak.length > 0) {
    const streakText = longestStreak
      .map(
        (streak) =>
          `${streak.song.artist} - ${streak.song.title} (length: ${streak.count})`
      )
      .join(", ");

    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Longest streak song";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = streakText;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Every day songs
  const everydaySongs = getEverydaySongs(listens);
  if (everydaySongs && everydaySongs.length > 0) {
    const everydaySongsText = everydaySongs
      .map((song) => `${song.artist} - ${song.title}`)
      .join(", ");

    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = "Every day songs";

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = everydaySongsText;

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  // Top genres
  const topGenres = getTopGenres(listens);
  if (topGenres && topGenres.length > 0) {
    const genreCount = topGenres.length;
    const genreLabel =
      genreCount === 3
        ? "Top three genres"
        : genreCount === 2
        ? "Top two genres"
        : "Top genre";

    const section = document.createElement("section");
    section.className = "question-section";

    const question = document.createElement("h2");
    question.className = "question";
    question.textContent = `${genreLabel}:`;

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = topGenres.join(", ");

    section.append(question);
    section.append(answer);
    questionsContainer.append(section);
  }

  main.append(questionsContainer);
}

window.onload = initializePage;
