
// Hacky solution for personal page links, style later
let names = { 
    "raptor8134" : "James",
    "uvadhar11" : "Umang",
    "ProgrammingParadox" : "Josh",
    "Kristopher-Iliev" : "Kristopher",
    "hedgeschol" : "Andrew"
}

export function loadPeople(element) {
  Promise.all(Object.keys(names).map(a => fetch(`https://api.github.com/users/${a}`)))
    .then((profiles) => {
      return Promise.all(profiles.map(a => a.json()))
    })
    .then((data) => {
      let namesElement = element;
  
      // maybe turn into a forEach? This is a little
      // hard to read...
      for (
        let i = 0, 
          entries = Object.entries(names), 
          person = entries[0]; 
        
        i<entries.length;
        i++, person=entries[i]
      ) {
        // main data
        let profile = data[i];
  
        // console.log(person, profile);
        
        // main parent element
        let nameElement = document.createElement("div");
        nameElement.classList.add("name");
  
        // Github profile picture
        let imageElement = document.createElement("img");
        imageElement.classList.add("name-image");
        imageElement.setAttribute("src", profile.avatar_url ?? "../images/unknown.png");
        imageElement.setAttribute("width", "50");
        imageElement.setAttribute("height", "50");
  
        nameElement.appendChild(imageElement);
  
        // stat holder element
        let statElement = document.createElement("div");
        statElement.classList.add("name-stats");
  
        // Link to their page
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "/people/" + person[0]);
        linkElement.textContent = person[1];
        linkElement.classList.add("name-link");
      
        statElement.appendChild(linkElement);
  
        // github username
        let usernameElement = document.createElement("div");
        usernameElement.classList.add("name-username");
        usernameElement.textContent = profile.login ?? person[0];
  
        statElement.appendChild(usernameElement);
  
        nameElement.appendChild(statElement);
        namesElement.appendChild(nameElement);
      }
    })
    .catch((err) => console.error("There was a problem loading the people " + err));
}