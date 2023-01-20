
// TODO: instead, make Nav.attatch() and it's opposite

export let Nav = (function(){
  class Nav {
    constructor(options) {
      this.options = options;
    }

    // so if you do [... navObject] the array
    // will be full of the options
    *[Symbol.iterator]() {
      for(let i = 0; i<this.options.length; i++){
        yield this.options[i];
      }
    }
  }
  
  return function(element){
    // Alrighty
    // This code (is supposed to) makes 
    // those links clickable. :)
    const navOptions = element.children;
    for(let i = 0; i<navOptions.length; i++){
      let cur = navOptions[i];
    
      let link = cur.getAttribute("data-link");
      if(!link) continue;
    
      cur.addEventListener("click", function(e){
        e.preventDefault();
        
        window.location.href = link;
      });
    }

    return new Nav(navOptions);
  }
})();


