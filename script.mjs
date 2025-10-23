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
  header.appendChild(title);

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
  userSelect.appendChild(defaultOption);

  // Populate dropdown
  const users = getUserIDs();
  users.forEach((user) => {
    const option = document.createElement("option");
    option.textContent = user.name;
    option.value = user.id;
    userSelect.appendChild(option);
  });

  // Event listener for user selection
  userSelect.addEventListener("change", (event) => {
    const selectedUserId = event.target.value;
    if (selectedUserId) {
      displayUserData(selectedUserId);
    }
  });

  userSelectLabel.appendChild(userSelect);
  header.appendChild(userSelectLabel);

  // --- MAIN ---
  const main = document.createElement("main");
  const initialMessage = document.createElement("p");
  initialMessage.className = "initial-message";
  initialMessage.textContent =
    "Please select a user from the dropdown to view their music data analysis.";
  main.appendChild(initialMessage);

  // --- FOOTER ---
  const footer = document.createElement("footer");
  const footerContent = document.createElement("p");
  footerContent.textContent = "Music Data Project";
  footer.appendChild(footerContent);

  // Append everything to body
  document.body.appendChild(header);
  document.body.appendChild(main);
  document.body.appendChild(footer);
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
    main.appendChild(message);
    return;
  }



  
  // if (mostListenedSong) {
  //   const result = createElement("p", {
  //     textContent: `Most listened song: ${mostListenedSong.artist} - ${mostListenedSong.title}`,
  //   });
  //   main.append(result);
  // } else {
  //   const message = createElement("p", {
  //     textContent: "No listening data available.",
  //   });
  //   main.append(message);
  // }
}

window.onload = initializePage;
