
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

export { Token };
