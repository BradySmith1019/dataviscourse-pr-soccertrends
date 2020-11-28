class LineChart {
    constructor(data, activeCountry) {
        this.data = data;
        this.activeCountry = activeCountry;
        this.drawChart("FRA");
    }

    drawChart(activeCountry) {
        this.activeCountry = activeCountry;
        let that = this;
        if (activeCountry === null || activeCountry === undefined) {
            return;
        }

        // Removes the previous line chart
        d3.select("#line-chart-svg").remove();

        // Converts the abbreviated country name to the actual country name
        let goodName = that.data["population"].filter(d => d.geo === that.activeCountry.toLowerCase());

        // Selects the current country
        let selectedCountry = that.data["countries"].filter(d => d.Country === goodName[0]["country"]);

        // Scale for the y-axis
        let aScale = d3
        .scaleBand()
        .domain(["Winners", "Final Group", "Runners-Up", "Third Place", "Semifinalists", "Quarterfinalists", "Round of 16", "Group Stage", "Did Not Qualify"])//that.data["countries"].map(d => d.placement))
        .rangeRound([0, 400]);

        // Scale for the x-axis
        let iScale_line = d3
        .scaleLinear()
        .domain([1930, 2014])
        .rangeRound([10, 600]);

        let aLineGenerator = d3
        .line()
        .x(function(d) {
            // Takes off the "finish" at the end of the data so that it is just the year
            let noFinish = d.Year.substring(0, 4);
            return iScale_line(noFinish);
        })
        .y(function(d) { 
            return aScale(d.Placement) 
        });

        // Adds the line chart to the bottom left of the css grid layout
        d3.select("#line-chart").classed("bottomright-grid", true).append("svg").attr("id", "line-chart-svg").attr("width", "100%").attr("height", "800");
        
        // Adds the y-axis to the svg
        d3.select("#line-chart-svg").append("g").attr("id", "left-axis");

        // Creates the y-axis
        let aAxis_line = d3.axisLeft(aScale).ticks(9);

        // Populates the y-axis
        d3.select("#left-axis").attr("transform", "translate(80,50)").call(aAxis_line);

        // Adds titles to the axes
        d3.select("#line-chart-svg").append("text").text("Placement").attr("transform", "translate(-1, 30)");
        d3.select("#line-chart-svg").append("text").text("Year").attr("transform", "translate(400, 500)");

        // Adds the x-axis to the svg
        d3.select("#line-chart-svg").append("g").attr("id", "bottom-axis");

        // Creates the x-axis
        let bottomAxis = d3.axisBottom(iScale_line)
        .tickValues(d3.range(1930, 2014 + 4, 4))
        .tickFormat(d3.format("d"));

        // Populates the x-axis
        d3.select("#bottom-axis").attr("transform", "translate(70, 450)").call(bottomAxis);
        
        // Finds the indices of all the world cups in the given data to be used in creating the line
        let beginFinish = 1930 + "Finish";
        let endFinish = 2014 + "Finish";
        let arr = Object.entries(selectedCountry[0]);
        let beginIndex = arr.findIndex(d => d[0] === beginFinish);
        let endIndex = arr.findIndex(d => d[0] === endFinish);

        let ranger = arr.slice(beginIndex, endIndex + 1);

        // Needed to ensure the .enter and .update only iterate through once
        // doesn't work otherwise
        let holder = [];
        holder.push(1);
        
        // Adds the line to the line chart
        let aLine = d3.select("#line-chart-svg").append("g").attr("class", "line-chart-x").attr("id", "line-chart-path")
        .attr("transform", "translate(72,73)").selectAll("path").data(holder);

        // Holds the newly formatted data to be passed into the line generator
        let newArr = [];
        
        // Handle entering, updating, and exiting new information
        aLine.join(
            enter =>
                enter
                    .append("path")
                    .attr("class", "line-chart-x")
                    .attr("d", function(d) {
                        console.log(d);
                        for (let i = 0; i < ranger.length; i++) {
                            let newer = {"Year": ranger[i][0], "Placement": ranger[i][1]};
                            newArr.push(newer);
                        }
                        return aLineGenerator(newArr);
              
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