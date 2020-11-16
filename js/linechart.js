class LineChart {
    constructor(data, activeCountry) {
        this.data = data;
        this.activeCountry = activeCountry;
        this.drawChart("2002", "2014");
    }

    drawChart(beginningYear, endYear) {
        let that = this;
        
        let aScale = d3
        .scaleBand()
        .domain(["Winner", "Runners-Up", "Third Place", "Semifinals", "Quarterfinals", "Round of 16", "Group Stage", "Did Not Qualify"])
        .range([0, 400])
        ;

        let iScale_line = d3
        .scaleLinear()
        .domain([beginningYear, endYear])
        .range([10, 500]);

        let aLineGenerator = d3
        .line()
        .x((d, i) => iScale_line(i))
        .y(d => aScale(d.placement));

        d3.select("#line-chart").classed("bottomright-grid", true).append("svg").attr("id", "line-chart-svg").attr("width", "600").attr("height", "600");
        d3.select("#line-chart-svg").append("g").attr("id", "left-axis");

        let aAxis_line = d3.axisLeft(aScale);
        d3.select("#left-axis").attr("transform", "translate(100,5)").call(aAxis_line);
        d3.select("#left-axis").append("text").text("Placement").attr("transform", "translate(50, 20)");

        d3.select("#line-chart-svg").append("g").attr("id", "bottom-axis");
        let bottomAxis = d3.axisBottom(iScale_line).ticks((((endYear - beginningYear) / 4) + 1));
        d3.select("#bottom-axis").attr("transform", "translate(90, 405)").call(bottomAxis);
        

    // Select the graph's path and add data
    let aLine = d3.select("#line-chart-svg").append("g").attr("class", "line-chart-x").attr("id", "line-chart-path")
    .attr("transform", "translate(50,15)").selectAll("path").data(that.data["cups"]);

    // Handle entering, updating, and exiting new information
    aLine.join(
      enter =>
        enter
          .append("path")
          .attr("class", "line-chart-x")
          .style("stroke-width", 2)
          .style("fill", "none")
          .attr("d", function(d) {
              if (d.Year >= beginningYear && d.Year <= endYear) {
                  let sendingIn = {dummy: "dummy", placement: "holder"};
                  if (d.Winner === that.activeCountry) {
                      sendingIn.placement = "Winner";
                      return aLineGenerator("Winner");
                  }
                  if (d.RunnersUp === that.activeCountry) {
                      sendingIn.placement = "Runners-Up"
                      return aLineGenerator("Runners-Up")
                  }
                  if (d.Third === that.activeCountry) {
                      sendingIn.placement = "Third Place";
                      return aLineGenerator("Third Place");
                  }
                  if (d.Fourth === that.activeCountry) {
                      sendingIn.placement = "Semifinals";
                      return aLineGenerator("Semifinals");
                  }
                  else {
                      sendingIn.placement = "Did Not Qualify";
                      return aLineGenerator(d);
                  }
              }
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