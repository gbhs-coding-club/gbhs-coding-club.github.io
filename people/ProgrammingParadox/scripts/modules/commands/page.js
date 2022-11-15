
import { line  } from "../line.js";
import { pages } from "../pages.js";

export function page(arg){
  if(!arg) {
    line(`<div class="error">
      Expected a page to navigate to
    </div>`, false, false);

    return;
  }
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
}
