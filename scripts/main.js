import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

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
// note: innerHTML removes any previous scripting 
// to the page because it reruns the DOM parser

console.log(Octokit);

// Alrighty
// This code (is supposed to) make 
// those links clickable. :)
const navOptions = document.getElementById("nav-options").children;
for(let i = 0; i<navOptions.length; i++){
  let cur = navOptions[i];

  let link = cur.getAttribute("data-link");
  if(!link) continue;

  cur.addEventListener("click", function(e){
    e.preventDefault();
    
    window.location.href = link;
  });
}
