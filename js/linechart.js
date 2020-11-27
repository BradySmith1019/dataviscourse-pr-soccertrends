class LineChart {
    constructor(data, activeCountry) {
        this.data = data;
        this.activeCountry = activeCountry;
        this.drawChart("2002", "2014");
    }

    drawChart(beginningYear, endYear) {
        let that = this;
        
        // Scale sequential
        // Scale ordinal
        // Scale categorical
        // legend

        let goodName = that.data["population"].filter(d => d.geo === that.activeCountry.toLowerCase());

        let selectedCountry = that.data["countries"].filter(d => d.Country === goodName[0]["country"]);
        /*let selectedYears = selectedCountry.filter(function(d) {
            return d >= beginningYear && d <= endYear;
        });*/

        /*let begin = parseInt(beginningYear);
        let end = parseInt(endYear);
        let selectedYears = [];
        while (begin <= end) {
            let beginFinish = begin + "Finish";
            let endFinish = end + "Finish";

            selectedYears.push(selectedCountry[0][beginFinish]);

            begin = begin + 4;
        }*/
        let aScale = d3
        .scaleBand()
        .domain(["Winners", "Runners-Up", "Third Place", "Semifinalists", "Quarterfinalists", "Round of 16", "Group Stage", "Did Not Qualify"])//that.data["countries"].map(d => d.placement))
        .rangeRound([0, 400])
        .padding(0.1)
        ;

        let iScale_line = d3
        .scaleLinear()
        //.domain([beginningYear, endYear])
        .rangeRound([10, 500]);

        let aLineGenerator = d3
        .line()
        .x((d, i) => d)
        .y(function(d) { 
            return console.log(d) 
        });

        //aScale.domain(that.data["countries"].map(d => d.placement));
        iScale_line.domain([beginningYear, endYear]);

        d3.select("#line-chart").classed("bottomright-grid", true).append("svg").attr("id", "line-chart-svg").attr("width", "600").attr("height", "600");
        d3.select("#line-chart-svg").append("g").attr("id", "left-axis");

        let aAxis_line = d3.axisLeft(aScale).ticks(8);
        d3.select("#left-axis").attr("transform", "translate(100,5)").call(aAxis_line);
        d3.select("#left-axis").append("text").text("Placement").attr("transform", "translate(50, 20)");

        d3.select("#line-chart-svg").append("g").attr("id", "bottom-axis");
        let bottomAxis = d3.axisBottom(iScale_line).ticks((((endYear - beginningYear) / 4)));
        d3.select("#bottom-axis").attr("transform", "translate(90, 405)").call(bottomAxis);
        

    // Select the graph's path and add data
    //d3.select("#line-chart-svg").append("path").data(f).attr("d", aLineGenerator);
    let aLine = d3.select("#line-chart-svg").append("g").attr("class", "line-chart-x").attr("id", "line-chart-path")
    .attr("transform", "translate(50,15)").selectAll("path").data(selectedCountry);

    // Handle entering, updating, and exiting new information
    aLine.join(
      enter =>
        enter
          .append("path")
          .attr("class", "line-chart-x")
          .style("stroke-width", 2)
          .style("fill", "none")
          .attr("d", function(d) {
              console.log(d);
              let noFinish = Object.keys(d);
              return aLineGenerator(d);
              if (d >= beginningYear && d.Year <= endYear) {
                  //let sendingIn = {dummy: "dummy", placement: "holder"};
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