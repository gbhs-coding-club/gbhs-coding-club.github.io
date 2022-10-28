
// eventually put in class or smth
let line = function(value, filter = true, prepend = true){
  let line = document.createElement("div");
  line.classList = "line" + (prepend ? " prepend" : "");

  filter ? line.textContent = value : line.innerHTML = value;

  let lines = document.getElementsByClassName("lines")[0];
  lines.append(line);
};

let parse = function(text = ""){
    if(text == "help"){
      line("<b>help</b> doesn't do anything yet. Sorry. I lied.", false, false);
    }
};

let typing = document.getElementById('typing');
typing.addEventListener("keydown", (event) => {
  if(event.key == "Enter"){
    line(event.target.value);    
    parse(event.target.value);

    event.target.value = "";
  }
});