class LineChart {
    constructor(data) {
        this.data = data;
        this.drawChart("2010", "2014");
    }

    drawChart(beginningYear, endYear) {
        let that = this;
        
        let aScale = d3
        .scaleLinear()
        .domain(["Did Not Qualify", "Group Stage", "Round of 16", "Quarterfinals", "Semifinals", "Third Place", "Runners-Up", "Winner"])
        .range([0, 400]);

        let iScale_line = d3
        .scaleLinear()
        .domain([beginningYear, endYear])
        .range([10, 500]);

        let aLineGenerator = d3
        .line()
        .x((d, i) => iScale_line(i))
        .y(d => aScale(d));

        d3.select("#line-chart").classed("bottomright-grid", true).append("svg").attr("id", "line-chart-svg").attr("width", "600").attr("height", "600");
        d3.select("#line-chart-svg").append("g").attr("id", "line-axis");

        let aAxis_line = d3.axisLeft(aScale).ticks(8);
        d3.select("#line-axis").attr("transform", "translate(100,5)").call(aAxis_line);
        d3.select("#line-axis").append("text").text("Placement");//.attr("transform", "translate(50, -3)")

    // Select the graph's path and add data
    let aLine = d3.select("#line-chart-svg").append("g").attr("class", "line-chart-x").attr("id", "line-chart-path")
    .attr("transform", "translate(50,15)").selectAll("path").data(that.data);

    // Handle entering, updating, and exiting new information
    aLine.join(
      enter =>
        enter
          .append("path")
          .attr("class", "line-chart-x")
          .style("stroke-width", 2)
          .style("fill", "none")
          .attr("d", function() {
            return aLineGenerator(data); 
          }),
        update =>
          update
            .attr("class", "line-chart-x")
            .style("stroke-width", 2)
            .style("fill", "none")
            .attr("d", function() {
              return aLineGenerator(data);
            }),
        exit => exit.remove()
    );
    }
}