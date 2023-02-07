
import { Token } from './Token.js';

// note: no single tick strings

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
    "symbol"  : cur => cur.match(/^[\[\]\(\)\{\}\;\,\.\:\$\'\#]$/), 
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

export { Lexer };
