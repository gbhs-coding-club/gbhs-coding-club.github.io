
// Implement later http://docopt.org/

// eventually put in class or smth
let line = function(value, filter = true, prepend = true){
  let l = document.createElement("div");
  l.classList = "line" + (prepend ? " prepend" : "");

  filter ? l.textContent = value : l.innerHTML = value;

  let lines = document.getElementsByClassName("lines")[0];
  lines.append(l);

  window.scrollTo(0, document.body.scrollHeight);
};

let Token = function(type, value){
  this.type = type;
  this.value = value;  
};
Token.prototype.add = function(char){
  this.value += char;
};
Token.prototype.toString = function(){
  return `( ${this.type}, ${this.value} )`;
};

let Lexer = function(string){
  this.text = string;
  this.index = 0;

  this.offset = 0;
  this.line = 0;

  this.tokens = [];
};
Lexer.prototype.peek = function(i=1){
  return this.text.charAt(this.index + i);
};
Lexer.prototype.eatWhitespace = function(){
  while(this.index < this.text.length && this.text[this.index].match(/[\s\n]/)){
    this.text[this.index].match(/\n/) && ((this.line ++) + (this.offset -= this.index));

    this.index ++;
  }  
};
Lexer.prototype.eatToken = function(type){
  let t = "";
  do {
      t += this.text[this.index];
      
      this.index += 1;
  } while(
      this.index < this.text.length &&
      this.check(
          type,
          this.text[this.index]
      )
  );
  
  return t;
};
Lexer.prototype.check = function(type, cur){
  return {
    "string"  : cur => cur.match(/[^"]/),
    "name"    : cur => cur.match(/[a-zA-Z_0-9]/),
    "keyword" : cur => cur.match(/^(var|if)$/),
    "boolean" : cur => cur.match(/^(true|false)$/),
    "hex"     : cur => cur.match(/^[0-9a-fA-F]+$/),
    "number"  : cur => cur.match(/^[0-9]+$/),
    // "operator": cur => cur.match(/^[+-*\/%=<>!&|^~]$/),
    // "identifier": cur => cur.match(/^[a-zA-Z_0-9]*$/),
    // "number" : cur => cur.match(/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/),
    "operator": cur => cur.match(/^([-+/*]|\+\+|\-\-)$/),
    // "whitespace": cur => cur.match(/^\s+$/),
    // "comment": cur => cur.match(/^\/\*(.|\n)*?\*\/$/),
    // "identifier": cur => cur.match(/^[a-zA-Z_0-9]/),
    // "eof"     : cur => cur === ""
    "symbol"  : cur => cur.match(/^[\[\]\(\)\{\}\;\,\.\:]$/), 
  }[type](cur);
};
Lexer.prototype.eat = function(){
  if(this.index >= this.text.length) return;
  
  let token = "";
  let type = "";
  
  let cur = this.text[this.index];
  
  // Whitespace
  if(cur.match(/[ \n\s]/)){
      this.eatWhitespace();
      
      cur = this.text[this.index];
  }
  
  // Hex number
  if(cur === "#"){
    type = "hex";
    token = this.eatToken("hex");
    
    return new Token(type, token);
  }
  
  // name, keyword, boolean
  if(cur.match(/[a-zA-Z_]/)){
    type = "name";
    token = this.eatToken("name");
    
    if(this.check("keyword", token)){
        type = "keyword";
    }
    if(this.check("boolean", token)){
        type = "boolean";
    }
    
    return new Token(type, token);
  }
  
  // String
  if(cur === "\""){
    // this.index += 1;
    
    type = "string";
    token = this.eatToken("string");
    
    this.index += 1;

    return new Token(type, token.slice(1, token.length));
  }

  // Double operators
  if(this.check("operator", cur + this.peek())){
    type = "operator";
    token = cur + this.peek();

    this.index += 2;
      
    return new Token(type, token);
  }
  if(this.check("operator", cur)){
    type = "operator";
    token = cur;

    this.index += 1;

    return new Token(type, token);
  }

  // symbol
  if(this.check("symbol", cur)){
    type = "symbol";
    token = cur;

    this.index += 1;

    return new Token(type, token);
  }
  
  // Number
  if(this.check("number", cur)){
      type = "number";
      token = this.eatToken("number");
      
      return new Token(type, token);
  }
  
  throw "Unknown token: " + cur + " at " + this.line + ":" + (this.index + this.offset);
};

let pages = {
  "home": "home.html",  
};

let command = function(name, args){
  if(name.type != "name") return line("<div class=\"error\">Invalid command: " + name.value + "</div>", false, false);
  
  let commands = {
    "help": (arg) => {
      if(!arg){
        line(
          `<b>help [command]</b> 
            <div class="tabbed">prints this command or help with the one given</div>
           <b>page {"page name" | list}</b> 
            <div class="tabbed">navigates to the html page of the same name or lists all pages</div>
           <b>cls</b>
            <div class="tabbed">Cleats the screen</div>`
        .replace(/\n/g, "<br>"), false, false);

        return;
      }

      if(arg.type != "name") return line("<div class=\"error\">Invalid command: " + arg.value + "<br>Try running <b>help</b> without any arguments or with a command name. like so:<br><br><b>help</b> page</div>", false, false);

      switch(arg.value){
        case "help":
          line(`
            <b>help</b> [command] <br>
            <div class="tabbed">
              With no arguments, prints a list of all commands. With a command name, prints the help for that command.<br>
            </div>
          `, false, false);
          break;
        case "page":
          line(`
            <b>page</b> "page name" | list <br>
            <div class="tabbed">
              Opens the HTML page with the page name 
              (for people who can't handle terminal 
              navigation)

              With list, lists all the pages.
            </div>
          `, false, false);
          break;
        case "cls":
          line(`
              <b>cls</b><br>
              <div class="tabbed">
                Clears all of the lines in the terminal
              </div>
            `, false, false);
            break;
          
        default:
          line(`<div class="error">
            There is no help documentation for <b>${arg.value}</b>. Perhaps it is not a valid command?
          </div>`, false, false);
      }
    },
    "page": (arg) => {
      if(!arg) 
        line(`<div class="error">
          Expected a page to navigate to
        </div>`, false, false);
      if(arg.type != "string") {
        if(arg.type == "name" && arg.value == "list") {
          let pageList = Object.keys(pages);
          let pageString = "";

          for(let i = 0; i < pageList.length; i++){
            pageString += `<a href="pages/${pages[pageList[i]]}">${pageList[i]}</a><br>`;
          }

          line(pageString, false, false);
          
          return;
        }
        
        line(`<div class="error">
          Invalid type of page: ${arg.type}<br>
          Expected a string. Try using<br>

          page "${arg.value}"
        </div>`
        , false, false);
      }

      let pageList = Object.keys(pages);
      if(pageList.indexOf(arg.value) == -1){
        line(`<div class="error">
          Invalid page: ${arg.value}<br>
          Expected one of these:<br>
          ${pageList.join("<br>")}
        </div>`
       , false, false);
        
        return;
      }
      
      window.location = `/people/ProgrammingParadox/pages/${pages[arg.value]}`;
    },
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