
let parse = function(text = ""){
    
};

let typing = document.getElementById('typing');
typing.addEventListener("keydown", (event) => {
  if(event.key == "Enter"){
    let line = document.createElement("div");
    line.classList = "line";

    line.textContent = event.target.value;

    let lines = document.getElementsByClassName("lines")[0];
    lines.append(line);

    parse(event.target.value);

    event.target.value = "";
  }
});