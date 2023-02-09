
/*

import { snippet } from "../snippets/snippet.js";

let nav = snippet("../snippets/nav.html")
  .then((elem) => { document.body.append(elem); return elem; });

*/

export function snippet(path){
  return fetch(path)
    .then(response => response.text())
    .then(html => {
      let parser = new DOMParser();
      let document = parser.parseFromString(html, "text/html");

      return document.documentElement;
    })
}
