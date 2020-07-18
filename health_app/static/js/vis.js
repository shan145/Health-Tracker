// health_app/templates/health/vis.js

/**
 * Creates visualizations for weight data using d3
 */

// Constants for SVG container
const height = 600;
const width = 800;
const margins = {"top": 50, "right": 50, "bottom": 50, "left": 50};
const chartHeight = height-margins.top-margins.bottom;
const chartWidth = width-margins.right-margins.left;

// Constants for scales


// Creating Visualization with SVG
let svg = d3.select("#svg")
            .append("svg")
            .attr("height", height)
            .attr("width", width)

//Creating tester svg for now-need to add routes for getting health data
function randomPixel() {
    return Math.random() * svg.attr("height");
  }
  

// JS style loop
let colors = ["red","blue","red","blue","red","blue","red","blue","red","blue"];
colors.forEach( (d, i) => {
    // d = the element in the array
    // i = the position in the array
    console.log(d,i);
    
    let rad = 4 + Math.random() * 20;
    
    svg.append("circle")
    .attr("r", rad)
    .attr("cx", randomPixel() )
    .attr("cy", randomPixel() )
    .attr("fill", d);
    
    
} );


// 4. How do we update the attributes of existing elements?   
d3.selectAll("circle")
    .transition().delay(1000).duration(500)
    .attr("r",20);
    
d3.selectAll("circle")
    .transition().delay(1600).duration(500)
    .attr("r", 100)
    .attr("cx", 200)
    .attr("cy", 200)
    .style("fill", "purple");
