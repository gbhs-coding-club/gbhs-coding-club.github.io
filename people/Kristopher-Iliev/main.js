console.log("Get outta here!"); // This Starts the Console
// Scans constant for letter numbers, then prints them
const name = "Kris";
for(let i = 0; i < name.length; i++){
  let e = document.createElement("div");
  e.textContent = name[i];

  document.body.append(e);
}
