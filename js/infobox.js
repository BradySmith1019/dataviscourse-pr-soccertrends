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
        this.clearHighlight();
        if (activeCountry === null || beginningYear === undefined) {
            this.clearHighlight();
        }

        else {
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

            let cupYears = this.data["cups"].filter(d => d.Year === beginningYear);
            let wins = 0;
            let totalWins = 0;
            for (let i = 0; i < cupYears.length; i++) {
                if (infoDatas.length != 0) {
                    if (cupYears[i]["Winner"] === infoDatas[0].country) {
                        wins++;
                    }
                }

            }

            for (let k = 0; k < this.data["cups"].length; k++) {
                if (infoDatas.length != 0) {
                    if (this.data["cups"][k]["Winner"] === infoDatas[0].country) {
                        totalWins++;
                    }
                }

            }

            let infoApp = d3.select("#infobox").classed("bottomleft-grid", true).append("div").attr("class", "country-detail")
            .classed("bottomleft-grid", true).attr("id", "infoboxdiv").attr("transform", "translate(0, -500)");
            infoApp.append("h2").text("Country: " + infoDatas[0].country).attr("id", "Country-Name");


                infoApp.append("h4").text(beginningYear +  " World Cup Record " + " (W-L-D): ");
                infoApp.append("h4").text("Highest Finish: " + that.data["countries"][0]["HighestEverFinish"]);
                infoApp.append("h4").text("Average Goals per Game: " + that.data["countries"][0]["GoalsPerGame"]);
                infoApp.append("h4").text("Average Goals Conceded per Game: " + that.data["countries"][0]["GoalsConcededPerGame"]);
            

            infoApp.append("h4").text("Total World Cups Won: " + totalWins);

        }

    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        d3.select("#infoboxdiv").remove();
    }

}