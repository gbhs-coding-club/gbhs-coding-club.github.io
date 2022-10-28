

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
