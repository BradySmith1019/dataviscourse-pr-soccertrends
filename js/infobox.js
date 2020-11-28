/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.country = country;
        this.region = region;
        this.indicator_name = indicator_name;
        this.value = value;
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {

        this.data = data;
        this.updateTextDescription("FRA", "2014");
    }

    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, beginningYear) {

        let that = this;
        //this.clearHighlight();
        if (activeCountry === null || activeCountry === undefined || beginningYear === undefined || beginningYear === null) {
            return;
            //this.clearHighlight();
        }

        else {
            this.clearHighlight();
            let arr = Object.values(this.data);
            let filtered = [,];
            let region;
            for (let i = 0; i < arr.length; i++) {
                for (let k = 0; k < arr[i].length; k++) {
                    if (arr[i][k].geo.toUpperCase() === activeCountry) {
                        if (arr[i][k].indicator === "pop") {
                            region = arr[i][k].region;
                        }
                        filtered.push(arr[i][k]);
                        break;
                    }
                }
                break;
            }

            let infoDatas = [];
            for (let m = 1; m < filtered.length; m++) {
                let info = new InfoBoxData(filtered[m].country, region, filtered[m].indicator, filtered[m][activeYear]);
                infoDatas.push(info);
            }

            let goodName = that.data["population"].filter(d => d.geo === activeCountry.toLowerCase());

            let selectedCountry;
            if (goodName[0]["country"] === "United States") {
                selectedCountry = that.data["countries"].filter(d => d.Country === "USA");
            }
            else {
                selectedCountry = that.data["countries"].filter(d => d.Country === goodName[0]["country"]);
            }

            let infoApp = d3.select("#infobox").classed("bottomleft-grid", true).append("div").attr("class", "country-detail")
            .classed("bottomleft-grid", true).attr("id", "infoboxdiv").attr("transform", "translate(0, -500)");
            infoApp.append("h2").text("Country: " + infoDatas[0].country).attr("id", "Country-Name");

            if (selectedCountry.length === 0) {
                infoApp.append("h4").text("Overall World Cup Record " + " (W-L-D): N/A" );
                infoApp.append("h4").text("Highest Finish: N/A");
                infoApp.append("h4").text("Average Goals per Game: N/A");
                infoApp.append("h4").text("Average Goals Conceded per Game: N/A");
                infoApp.append("h4").text("Total World Cups Won: N/A");
            }
            else {
                infoApp.append("h4").text("Overall World Cup Record " + " (W-L-D): " + selectedCountry[0]["AllTimeRecord"]);
                infoApp.append("h4").text("Highest Finish: " + selectedCountry[0]["HighestEverFinish"]);
                infoApp.append("h4").text("Average Goals per Game: " + parseFloat(selectedCountry[0]["GoalsPerGame"]).toFixed(2));
                infoApp.append("h4").text("Average Goals Conceded per Game: " + parseFloat(selectedCountry[0]["GoalsConcededPerGame"]).toFixed(2));
                infoApp.append("h4").text("Total World Cups Won: " + selectedCountry[0]["WorldCupWins"]);
            }

        }

    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        d3.select("#infoboxdiv").remove();
    }

}