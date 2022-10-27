

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
