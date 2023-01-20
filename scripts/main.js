
// If you don't know what import does
// you can just happily scroll along.
// If you're curious, import allows the
// usage of stuff from other JavaScript
// files. Fun!

// This first import is importing something
// named "Nav" from "./nav.js". It's used
// to make the links on the navbar clickable.
import { Nav } from "./nav.js";

// why doesn't it work with window.onload 
// or .addEventListener("load", function(){})"?

// Ok some research says that this runs after all
// other processes.
let nav = document.getElementById('nav');
window.setInterval(function() {
  let navSpace = document.getElementById('nav-space');
  let navBox = nav.getBoundingClientRect();

  navSpace.style.height = navBox.height + 'px';
}, 0);

// Hacky solution for personal page links, style later
let names = { 
    "raptor8134" : "James",
    "uvadhar11" : "Umang",
    "ProgrammingParadox" : "Josh",
    "Kristopher-Iliev" : "Kristopher",
    "hedgeschol" : "Andrew"
}
let namesElement = document.getElementById("names");
for (name in names) {
  let nameElement = document.createElement("div");
  nameElement.classList.add("name");

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", "/people/" + name);
  linkElement.textContent = names[name];
  linkElement.classList.add("name-title");

  nameElement.appendChild(linkElement);
    
  namesElement.appendChild(nameElement);
}

Nav(document.getElementById("nav-options"));
