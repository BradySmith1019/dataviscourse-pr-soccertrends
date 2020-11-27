class TopRight {
    constructor(data, activeYear, updateYear) {
        this.data = data;
        this.activeYear = activeYear;
        this.updateYear = updateYear;
        this.worldCupArray = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014];
        this.updateSelectedCountry("France");
        this.updateSelectedWorldCup("2014");
        this.drawYearSlider();
    }

    async updateSelectedCountry(activeCountry) {
        if (activeCountry !== null) {
            d3.select("#selected-country").remove();
            d3.select("#selected").classed("topright-grid", true).append("h1").attr("id", "selected-country").text("Selected Country: " + activeCountry);
        }
    }

    async updateSelectedWorldCup(newActiveYear) {
        this.activeYear = newActiveYear;
        if (activeYear !== null) {
            d3.select("h2").remove();
            d3.select("#selected").append("h2").text("Selected World Cup: " + this.activeYear);
        }
    }

    async drawYearSlider() {
        d3.select("#selected").append("div").attr("id", "year-slider").attr("class", "view");
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
}