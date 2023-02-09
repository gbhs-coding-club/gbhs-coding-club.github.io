
import { snippet } from "../snippets/snippet.js";

snippet("../snippets/nav.html")
  .then(elem => document.getElementById("nav").replaceWith(elem));

