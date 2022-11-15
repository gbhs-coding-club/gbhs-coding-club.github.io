export function line(value, filter = true, prepend = true){
  let l = document.createElement("div");
  l.classList = "line" + (prepend ? " prepend" : "");

  filter ? l.textContent = value : l.innerHTML = value;

  let lines = document.getElementsByClassName("lines")[0];
  lines.append(l);

  window.scrollTo(0, document.body.scrollHeight);
}