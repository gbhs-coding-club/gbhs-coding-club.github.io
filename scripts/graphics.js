/*
window.setInterval(() => {
let a = document.getElementById("center-svg");
  
let b = a.getBBox();



console.log(b);
  
}, 3000);
*/
let squares = [];
for(let i = 0; i<5; i++) {
  let x = Math.random();
  let y = Math.random();
  
  squares.push({x, y});
}

export function graphic(){ 
  // console.log("hello!");
  
  let svg = d3.select("#center-svg");
  svg.style("fill", "#F00");
  
  let svgBox = svg.node().getBBox();

  // svg.style("background-color", "#F00");

  console.log(svg.node());
  
  console.log(svgBox);
  
  let t = svg.selectAll("rect")
    .data(squares)
    .join("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .style("fill", "#FFF")
    .style("stroke", "#EEE")
    .style("stroke-weight", "0.1")
    .attr("width", 0.1)
    .attr("height", 0.1);

  console.log("rects", t);
  
  
  
  console.log(d3);
}
