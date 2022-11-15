
import { line } from "./line.js";

import { help } from "./commands/help.js";
import { page } from "./commands/page.js";

let pages = {
  "home": "home.html",  
};

export let command = function(name, args){
  if(name.type != "name") return line("<div class=\"error\">Invalid command: " + name.value + "</div>", false, false);
  
  let commands = {
    "help": help,
    "page": page,
    "cls" : (arg) => {
      const lines = document.getElementsByClassName("lines")[0];
      while (lines.firstChild) {
        lines.removeChild(lines.lastChild);
      }
    }, 
  };

  if(Object.keys(commands).indexOf(name.value) === -1){
    return line("<div class=\"error\">Unknown command: <b>" + name.value + "</b></div>", false, false);
  }

  // console.log(commands[name.value], name, args);

  commands[name.value].apply(null, args);
};
