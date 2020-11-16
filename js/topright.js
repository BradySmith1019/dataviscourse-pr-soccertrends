class TopRight {
    constructor(data, activeYear) {
        this.data = data;
        this.activeYear = activeYear;
        this.updateSelectedCountry("USA");
        this.updateSelectedWorldCup("2014");
        this.drawYearSlider();
    }

    async updateSelectedCountry(activeCountry) {
        if (activeCountry !== null) {
            d3.select("#selected-country").remove();
            d3.select("#selected").classed("topright-grid", true).append("h2").attr("id", "selected-country").text("Selected Country: " + activeCountry);
        }
    }

    async updateSelectedWorldCup(activeYear) {
        if (activeYear !== null) {
            d3.select("#selected").append("h2").text("Selected World Cup: " + activeYear);
        }
    }

    async drawYearSlider() {
        d3.select("#selected").append("div").attr("id", "year-slider").attr("class", "view");
        d3.select("#year-slider").append("svg");

        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1930, 2014]).range([30, 525]);

        let yearSlider = d3.select("#year-slider")
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1930)
            .attr('max', 2014)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        sliderText.attr('x', yearScale(this.activeYear));
        sliderText.attr('y', 25);
    }
}