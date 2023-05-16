const data = [
  { commodityName: 'Tea Loose', avgprices: 156.096 },
  { commodityName: 'Tur/Arhar Dal', avgprices: 50.032},
  { commodityName: 'Tomato', avgprices: 23.74 },
  { commodityName: 'Milk', avgprices: 26.8528 },
  { commodityName: 'Salt Pack', avgprices: 10.7736 },
  { commodityName: 'Rice', avgprices: 17.7798 },
  { commodityName: 'Onion', avgprices: 16.2152 },
  { commodityName: 'Sugar', avgprices: 27.0724 },
  { commodityName: 'Sunflower Oil', avgprices: 87.884 }
];

const width = 1300;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d4-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 200])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", 'royalblue')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.avgprices, b.avgprices)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.avgprices))
    .attr('title', (d) => d.avgprices)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.avgprices))
    .attr("width", x.bandwidth());
    svg.append("text")
    .attr("class", "x label")
    .attr("fill","white")
    .attr("text-anchor", "middle")
    .attr("font-size", 20)
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom -52) + ")")
    .text("Name of the Commodity");
    
  
    svg.append("text")
    .attr("class", "y label")
    .attr("fill","white")
    .attr("text-anchor", "middle")
    .attr("font-size", 20)
    .attr("transform", "rotate(-90) translate(" + (-height/2) + "," + (-margin.left ) + ")")
    .text("Average of prices(in kg)");
function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].commodityName))
    .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
