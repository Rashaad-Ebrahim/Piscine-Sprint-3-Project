// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { countUsers } from "./common.mjs";

// --- HEADER ---
const header = document.createElement("header");
header.className = "header";

// create title
const title = document.createElement("h1");
title.className = "title";
title.innerText = "Music Data";

// create dropdown
const userSelectLabel = document.createElement("label");
const userSelect = document.createElement("select");
const userOption = document.createElement("option");
// More options to be added
userOption.textContent = "Select User";
userSelect.append(userOption);
userSelectLabel.append(userSelect);

header.append(title);
header.append(userSelectLabel);

// --- MAIN ---
const main = document.createElement("main");
const questionDataContainer = document.createElement("div");
questionDataContainer.className = "container";

// To be added to style file
questionDataContainer.style.display = "flex";
questionDataContainer.style.gap = "25px";

const question = document.createElement("p");

// TODO -- to be done dynamically 
question.className = "question";
question.textContent = "Some question here";

const output = document.createElement("p");
output.className = "question";
output.textContent = "Some output information here";

questionDataContainer.append(question);
questionDataContainer.append(output);
main.append(questionDataContainer);
// const userSelect = document.createElement("select");
// const userOption = document.createElement("option");

// --- Footer ---
const footer = document.createElement("footer");
const footerContent = document.createElement("p");
footerContent.textContent = "Rashaad Ebrahim - 2025";
footer.append(footerContent);

window.onload = function () {
  document.querySelector("body").append(header);
  document.querySelector("body").append(main);
  document.querySelector("body").append(footer);
};
