import { getUserIDs } from "./data.mjs";

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
    textContent: user,
    attributes: {
      value: user,
    },
  });
  userSelect.append(userOption);
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
