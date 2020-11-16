/**
 * Data structure for the data associated with an individual country.
 * the CountryData class will be used to keep the data for drawing your map.
 * You will use the region to assign a class to color the map!
 */
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}

/** Class representing the map view. */
class Map {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     */
    constructor(data, updateCountry) {
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.populationData = data.population;
        this.matchesData = data.matches;
        this.updateCountry = updateCountry;
    }

    /**
     * Renders the map
     * @param world the json data with the shape of all countries and a string for the activeYear
     */
    async drawMap(world) {

        let geoJson = topojson.feature(world, world.objects.countries);
        console.log(geoJson);
        let countriesData = this.populationData.map(function(d, i) {
            let g = geoJson.features.find(element => element.id === d.geo.toUpperCase());
            let dReg;
            if (d.region) {
                dReg = d.region;
            }
            else {
                dReg = "countries";
            }
            return new CountryData("Feature", d.geo.toUpperCase(), d, g, dReg);
        });

        let greenlandGeometry = geoJson.features.find(element => element.id === "GRL");
        countriesData.push(new CountryData("Feature", "GRL", undefined, greenlandGeometry, "countries"));

        let antarcticaGeometry = geoJson.features.find(element => element.id === "ATA");
        countriesData.push(new CountryData("Feature", "ATA", undefined, antarcticaGeometry, "countries"));

        let selectMap = d3.select("#body-wrap").classed("grid-container", true)
        .select("#map-chart").classed("topleft-grid", true);
        let svg = selectMap.append("svg").attr("id", "map-chart-svg").attr("class", "map-chart svg");
        
        let path = d3.geoPath().projection(this.projection);

        let paths = svg.selectAll("path").data(countriesData);

        let that = this;
        paths.join(
            enter =>
                enter
                    .append("path")
                    .attr("d", function(d) {
                        return path(d.geometry);
                    })
                    .attr("class", function(d){
                        return d.region;
                    })
                    .attr("id", function(d) {
                        return d.id;
                    })
                    .on("click", d => this.updateCountry(d.id))
                    .on("mouseover", function(d) {
                        that.highlightCountry(d.id);
                        d3.select(this).append("title").text(d.id);
                    }),
            update =>
                update
                    .attr("d", path)
                    .attr("class", "boundary")
                    .attr("id", function(d) {
                        return d.id;
                    }),
            exit => exit.remove()
        );

        let graticule = d3.geoGraticule();
        d3.select("#map-chart-svg").append("path")
        .datum(graticule).attr("class", "graticule")
        .attr("d", path).attr("fill", "none");
        let go = graticule.outline();
        d3.select("#map-chart-svg").append("path")
        .datum(go).attr("class", "stroke").attr("d", path);
    }

    highlightCountry(activeCountry) {
        if (activeCountry != null) {
            let svg = document.getElementById("map-chart-svg");

            for (let i = 0; i < svg.children.length; i++) {
                let theRegion = svg.children[i].getAttribute("class");
                if (theRegion === "path.asia.selected-country") {
                    theRegion = "asia";
                }
                if (theRegion === "path.europe.selected-country") {
                    theRegion = "europe";
                }
                if (theRegion === "path.americas.selected-country") {
                    theRegion = "americas";
                }
                if (theRegion === "path.africa.selected-country") {
                    theRegion = "africa";
                }
                if (svg.children[i].id === activeCountry) {
                    if (theRegion === "asia") {
                        let regionFill = "#2d7aad";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "africa") {
                        let regionFill = "#cc9a04";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "americas") {
                        let regionFill = "#aaba18";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "europe") {
                        let regionFill = "#7c0238";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }
                }
                else {
                    svg.children[i].setAttribute("class", theRegion);
                }
            }
        }

        // else {
        //     this.clearHighlight();
        // }
    }

    /**
     * Highlights the selected conutry and region on mouse click
     * @param activeCountry the country ID of the country to be rendered as selected/highlighted
     */
    updateHighlightClick(activeCountry) {

        if (activeCountry !== null) {
            
            let svg = document.getElementById("map-chart-svg");

            for (let i = 0; i < svg.children.length; i++) {
                let theRegion = svg.children[i].getAttribute("class");
                if (theRegion === "path.asia.selected-country") {
                    theRegion = "asia";
                }
                if (theRegion === "path.europe.selected-country") {
                    theRegion = "europe";
                }
                if (theRegion === "path.americas.selected-country") {
                    theRegion = "americas";
                }
                if (theRegion === "path.africa.selected-country") {
                    theRegion = "africa";
                }
                if (svg.children[i].id === activeCountry) {
                    if (theRegion === "asia") {
                        let regionFill = "#2d7aad";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "africa") {
                        let regionFill = "#cc9a04";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "americas") {
                        let regionFill = "#aaba18";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }

                    else if (theRegion === "europe") {
                        let regionFill = "#7c0238";
                        svg.children[i].setAttribute("class", "path." + theRegion + ".selected-country");
                        svg.children[i].setAttribute("fill", regionFill);
                    }
                }
                else {
                    svg.children[i].setAttribute("class", theRegion);
                }
            }
        }

        // else {
        //     this.clearHighlight();
        // }
       
    }

    /**
     * Clears all highlights
     */
    clearHighlight() {

        let svg = document.getElementById("map-chart-svg");

        for (let i = 0; i < svg.children.length; i++) {
            let theRegion = svg.children[i].getAttribute("class");
            if (theRegion === "path.asia.selected-country") {
                theRegion = "asia";
            }
            if (theRegion === "path.europe.selected-country") {
                theRegion = "europe";
            }
            if (theRegion === "path.americas.selected-country") {
                theRegion = "americas";
            }
            if (theRegion === "path.africa.selected-country") {
                theRegion = "africa";
            }

            svg.children[i].setAttribute("class", theRegion);


        }

    }

}
