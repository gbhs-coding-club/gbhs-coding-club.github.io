
import { Token   } from './modules/Token.js';
import { Lexer   } from './modules/Lexer.js';
import { command } from './modules/command.js';
import { line    } from "./modules/line.js";

// Implement later http://docopt.org/

let typing = document.getElementById('typing');
typing.addEventListener("keydown", (event) => {
  if(event.key == "Enter"){
    line(event.target.value);

    if(event.target.value.length == 0){
      return;
    }

    let t = [];
    let l = new Lexer(event.target.value.toString());
    let c;
    try {
      while((c = l.eat())){
        t.push(c);
      }
    } catch(err) {
      line(`<div class="error">Lexer error: ${err}</div>`, false, false);
      event.target.value = "";
      
      return;
    }
    
    command(t[0], t.slice(1, t.length));

    event.target.value = "";
  }
});