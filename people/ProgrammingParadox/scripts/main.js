
// eventually put in class or smth
let line = function(value, filter = true, prepend = true){
  let line = document.createElement("div");
  line.classList = "line" + (prepend ? " prepend" : "");

  filter ? line.textContent = value : line.innerHTML = value;

  let lines = document.getElementsByClassName("lines")[0];
  lines.append(line);
};

let Lexer = function(string){
  this.text = string;
  this.index = 0;

  this.tokens = [];
};
Lexer.prototype.peek = function(i=1){
  return this.text.charAt(this.index + i);
};
Lexer.prototype.eatWhitespace = function(){
  while(this.index < this.text.length && this.text[this.index].match(/[\s\n]/)){
    this.index ++;
  }  
};
Lexer.prototype.eat = function(){
  let token = {
    value: "",
  };

  let cur = this.text[this.index];

  while((cur = this.text.charAt(this.index)).match(/[^\s\n]/)){
    token.value += this.text.charAt(this.index);

    console.log(this.index, token.value);
    
    this.index ++;
  }

  this.eatWhitespace();

  return token;
};

let l = new Lexer("this is a test123 ++ -- + - +-");
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());
console.log(l.eat());

// uhh
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