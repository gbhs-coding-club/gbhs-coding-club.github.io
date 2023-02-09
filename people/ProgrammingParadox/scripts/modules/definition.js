
/*

// https://stackoverflow.com/questions/9725675/is-there-a-standard-format-for-command-line-shell-help-text

export help = definition(
  "help", [
    [
      "",
      (def) => {
        line(def.description, false, false);
      }
    ]
  ]
);

---

export help = definition("help")
  .tree((new Tree())
    .node("$name", 
      (def, args) => { if only called with a name }

      (new Tree())
        .default(() => called with an extra argument);
    )

    .default(()=>{ no arguments were given, or not a valid argument })
  );

export page = definition("page")
  .tree((new Tree())
    .node("'string", 
      (def, args)=>{ go to page },

      (new Tree())
        .default(() => { called with an extra argument })
    )

    .default(() => { no arguments were given })
  );

'stringNameGoesHere :thisValue
$nameNameGoesHere :thisValue
!boolNameGoesHere :thisValue
%hexNameGoesHere :thisValue
+NumberNameGoesHere :thisValue
=OperatorNameGoesHere :thisValue
&SymbolNameGoesHere :thisValue


*/

import { Lexer } from "./Lexer.js";
import { Tree } from "./Tree.js";
import { Command } from "./Command.js";


let definition = function(name) {
  let instance = 0;

  return new Command({
    name
  });
};

let help = definition("help")
  .tree((new Tree())
    .node("$name",
      (def, args) => { console.log("called with a name as it's first argument"); },

      (new Tree())
        .default((def) => { console.log("no arguments after name"); })
    )

    .default((def) => { console.log("It's been called in some other way"); })
  );

console.log( help.nodes );

export { definition, Tree };