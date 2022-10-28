console.log("Hello, World!"); // This thing starts the thingy

const name = "Kris";
for(let i = 0; i < name.length; i++){
  let e = document.createElement("div");
  e.textContent = name[i];

  document.body.append(e);
}
