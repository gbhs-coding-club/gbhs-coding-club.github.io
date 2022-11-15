import { line } from "../line.js";

export function help(arg) {
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
}