const data = [
    { cityName: 'Delhi', doctorCount: 11 },
    { cityName: 'Meerut', doctorCount: 4 },
    { cityName: 'Jaipur', doctorCount: 2 },
    { cityName: 'Pune', doctorCount: 5 },
    { cityName: 'Mumbai', doctorCount: 10 },
    { cityName: 'Kolkata', doctorCount: 3 },
    { cityName: 'Guwahati', doctorCount: 7 },
  ];
  
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, 14])
    .range([height - margin.bottom, margin.top])
  
  svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.doctorCount, b.doctorCount)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.doctorCount))
      .attr('title', (d) => d.doctorCount)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.doctorCount))
      .attr("width", x.bandwidth());
  svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "middle")
 .attr("fill","white")
.attr("font-size", 20)
  .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom -52) + ")")
  .text("City Name");

  svg.append("text")
  .attr("class", "y label")
 .attr("fill","white")
.attr("font-size", 20)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90) translate(" + (-height/2) + "," + (-margin.left + 20) + ")")
  .text("Doctor's Count");
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].cityName))
      .attr("font-size", '20px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
