// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { countUsers } from "./common.mjs";

const header = document.createElement("header");

// create title
const title = document.createElement("h1");
title.innerText = "Music Data";

// create dropdown
const userSelectLabel = document.createElement("label");
const userSelect = document.createElement("select");
const userOption = document.createElement("option");
userOption.textContent = "Select User"
userSelect.append(userOption);
userSelectLabel.append(userSelect);

header.append(title);
header.append(userSelectLabel);

window.onload = function () {
  // document.querySelector("body").innerText = `There are ${countUsers()} users`;
  document.querySelector("body").append(header);
};
