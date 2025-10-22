import { getUserIDs, getListenEvents } from "./data.mjs";
import { getMostListenedSongByCount } from "./analysis.mjs";

// --- Helper functions ---
function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) element.className = options.className;
  if (options.id) element.id = options.id;
  if (options.textContent) element.textContent = options.textContent;
  if (options.innerHTML) element.innerHTML = options.innerHTML; // Alternative for HTML content
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
}

// Display single question
function displaySingleQuestion(userId) {
  const listens = getListenEvents(userId);
  const mostListenedSong = getMostListenedSongByCount(listens);

  const main = document.querySelector("main");
  main.innerHTML = "";

  if (mostListenedSong) {
    const result = createElement("p", {
      textContent: `Most listened song: ${mostListenedSong.artist} - ${mostListenedSong.title}`,
    });
    main.append(result);
  } else {
    const message = createElement("p", {
      textContent: "No listening data available.",
    });
    main.append(message);
  }
}

// --- HEADER ---
const header = createElement("header", { className: "header" });

// create title
const title = createElement("h1", {
  className: "title",
  textContent: "Music Data",
});

// create dropdown
const userSelectLabel = createElement("label", {
  textContent: "Select Listener: ",
});

const userSelect = createElement("select", { id: "userSelect" });

// Select user option
let userOption = createElement("option", {
  textContent: "Select User",
  attributes: {
    value: "",
    disabled: true,
    selected: true,
  },
});

userSelect.append(userOption);

// Populate dropdown
const users = getUserIDs();
console.log(users);
users.forEach((user) => {
  userOption = createElement("option", {
    textContent: user.name,
    attributes: {
      value: user.id,
    },
  });
  userSelect.append(userOption);
});

// userSelect event listener
userSelect.addEventListener("change", (event) => {
  const selectedUserId = event.target.value;
  if (selectedUserId) {
    displaySingleQuestion(selectedUserId);
  }
});

userSelectLabel.append(userSelect);

header.append(title);
header.append(userSelectLabel);

// --- MAIN ---
const main = createElement("main");
const questionDataContainer = createElement("div", { className: "container" });

// To be added to style file
questionDataContainer.style.display = "flex";
questionDataContainer.style.gap = "25px";

const question = createElement("p", {
  className: "question",
  textContent: "Some question here",
});

// TODO -- to be done dynamically
const output = createElement("p", {
  className: "question",
  textContent: "Some output information here",
});

questionDataContainer.append(question);
questionDataContainer.append(output);
main.append(questionDataContainer);

// --- Footer ---
const footer = createElement("footer");
const footerContent = createElement("p", {
  textContent: "Rashaad Ebrahim - 2025",
});
footer.append(footerContent);

window.onload = function () {
  document.querySelector("body").append(header);
  document.querySelector("body").append(main);
  document.querySelector("body").append(footer);
};
