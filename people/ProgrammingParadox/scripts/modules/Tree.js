
import { Lexer } from "./Lexer.js";

let Tree = function() {
  /*

  {
    nodes: [
      {
        wants: [
          {
            type: "string",
            value: undefined,
          },
          {
            type: "name",
            value: "gobble"
          }
        ]

        does: ()=>{},

        tree: new Tree()
        
      }
    ]
  }
  
  */

  this.nodes = [];
};
Tree.prototype.node = function(pattern, fn, tree) {
  let lexer = new Lexer(pattern);

  let types = "'$!%+=&";
  let typeLookup = {
    "'": "string",
    "$": "name",
    "!": "boolean",
    "%": "hex",
    "+": "number",
    "=": "operator",
    "&": "symbol",
  };

  let node = {
    wants: [],

    does: () => { },

    tree: undefined,
  };

  while (true) {
    let type = lexer.eat();

    if (!type) break;

    if (!types.includes(type.value))
      throw `unknown type: "${type.value}". Sorry. ` + (
        cur.type == "name" ? `Perhaps you forgot a type identifier? Try "$${type.value}", maybe?` :
          `I'd offer some advice, but I got nothing. Maybe check for stupid mistakes?`
      );

    let name = lexer.eat();

    if (!name) throw `Unexpected end after "${type.value}"`;
    if (name.type != "name")
      throw `I don't know why, but for some reason you put a ${name.type} instead of a name. plz fix.`;

    let want = {
      type: typeLookup[type.value],
      name: name.value,
      value: undefined,
    };

    if (lexer.peek() == ":") {
      let colon = lexer.eat();

      let value = lexer.eat();

      if (!value)`Unexpected end after "${value.value}"`;

      function assertType(value, type) {
        if (value.type != type) {
          throw `you asked for a ${type}, but didn't give me one. Instead you gave me \"${value.value}\", which is a ${value.type}`
        }
      }

      switch (type.value) {
        case "'":
          assertType(value, "string");
          want.value = value.value;

          break;
        case "$":
          // eat a name, build object
          assertType(value, "name");
          want.value = value.value;

          break;
        case "!":
          // eat a boolean, build object
          assertType(value, "boolean");
          want.value = value.value;

          break;
        case "%":
          // eat a hex value, build object
          assertType(value, "hex");
          want.value = value.value;

          break;
        case "+":
          // eat a number, build object
          assertType(value, "number");
          want.value = value.value;

          break;
        case "=":
          // eat an operator, build object
          assertType(value, "operator");
          want.value = value.value;

          break;
        case "&":
          // eat a symbol, build object
          assertType(value, "symbol");
          want.value = value.value;

          break;

        // want.value = value.value;
      }
    }

    node.wants.push(want);
  }

  this.nodes.push(node);

  return this;
};
Tree.prototype.default = function(fn) {
  this.default = fn;
  
  return this;
};

export { Tree };

