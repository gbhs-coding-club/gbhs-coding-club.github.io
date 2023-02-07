
// If you don't know what import does
// you can just happily scroll along.
// If you're curious, import allows the
// usage of stuff from other JavaScript
// files. Fun!

// This first import is importing something
// named "Nav" from "./nav.js". It's used
// to make the links on the navbar clickable.
import { Nav } from "./nav.js";

// this second import is what loads people's
// profiles and stuff onto the home page.
import { loadPeople } from "./people.js";

// this is some code being imported in. Yup.
import { graphic } from "./graphics.js";

// why doesn't it work with window.onload 
// or .addEventListener("load", function(){})"?

// Ok some research says that this runs after all
// other processes.

// should probably move to nav.js
let nav = document.getElementById('nav');
window.setInterval(function() {
  let navSpace = document.getElementById('nav-space');
  let navBox = nav.getBoundingClientRect();

  navSpace.style.height = navBox.height + 'px';
}, 0);

loadPeople(document.getElementById("names"));


// Initialize the nav bar
Nav(document.getElementById("nav-options"));

// graphic
// window.onload = function(){ console.log("hi"); graphic(); };

fetch("https://api.github.com/users/ProgrammingParadox")
  .then((data) => data.json())
  .then((data) => console.log(data));

