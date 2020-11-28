class TopRight {
    constructor(data, activeYear, updateYear) {
        this.data = data;
        this.activeCountry = "FRA";
        this.activeYear = activeYear;
        this.updateYear = updateYear;
        this.worldCupArray = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014];
        this.updateSelectedCountry("FRA");
        this.updateSelectedWorldCup("2014");
        this.drawInstructions();
        this.drawYearSlider();
    }

    async updateSelectedCountry(activeCountry) {
        if (activeCountry !== null) {
            this.activeCountry = activeCountry;

            // Converts the abbreviated country name to the full country name
            let goodName = this.data["population"].filter(d => d.geo === activeCountry.toLowerCase());

            // Adds the info to the top right of the css grid layout
            let selected = d3.select("#selected").classed("topright-grid", true).selectAll("h1").data(goodName);

            selected.join(
                enter =>
                    enter
                        .append("h1")
                        .attr("id", "selected-country")
                        .text("Selected Country: " + goodName[0]["country"]),
                update =>
                    update
                        .text("Selected Country: " + goodName[0]["country"]),
                exit => exit.remove()
            );
        }
    }

    async updateSelectedWorldCup(newActiveYear) {
        this.activeYear = newActiveYear;
        if (this.activeYear !== null) {
            let that = this;

            // Converts the abbreviated country name to the full country name
            let goodName = this.data["population"].filter(d => d.geo === that.activeCountry.toLowerCase());

            // Adds the info to the top right of the css grid layout
            let selected = d3.select("#selected").classed("topright-grid", true).selectAll("h2").data(goodName);

            selected.join(
                enter =>
                    enter
                        .append("h2")
                        .text("Selected World Cup: " + that.activeYear),
                update =>
                    update
                        .text("Selected World Cup: " + that.activeYear),
                exit => exit.remove()
            );
        }
    }

    async drawYearSlider() {
        d3.select("#selected").classed("topright-grid", true).append("div").attr("id", "year-slider").attr("class", "view");
        d3.select("#year-slider").append("svg");

        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([0, 19]).range([30, 525]);

        let yearSlider = d3.select("#year-slider")
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 0)
            .attr('max', 19)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text("2014");

        sliderText.attr('x', yearScale(19));
        sliderText.attr('y', 25);

        yearSlider.on('input', function (d, i) {

            let sliderText = sliderLabel.selectAll("text").text(that.worldCupArray[this.value]);
            sliderText.attr('x', yearScale(this.value));
            sliderText.attr('y', 25);
            that.updateYear(that.worldCupArray[this.value]);
        });
    }

    async drawInstructions() {
        let selected = d3.select("#selected").classed("topright-grid", true);

        selected.append("h5").text("To select a country, click it on the map. To select a World " + 
        "Cup, use the year slider.")

    }
}