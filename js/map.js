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
        this.ABVRToNameDict = this.CreateABRRToNameDict();
    }

    CreateABRRToNameDict(){
        let dict = {};
        dict["ABW"] = "Aruba";
        dict["AFG"] = "Afghanistan";
        dict["AGO"] = "Angola";
        dict["AIA"] = "Anguilla";
        dict["ALA"] = "Åland Islands";
        dict["ALB"] = "Albania";
        dict["AND"] = "Andorra";
        dict["ARE"] = "United Arab Emirates";
        dict["ARG"] = "Argentina";
        dict["ARM"] = "Armenia";
        dict["ASM"] = "American Samoa";
        dict["ATA"] = "Antarctica";
        dict["ATF"] = "French Southern Territories";
        dict["ATG"] = "Antigua and Barbuda";
        dict["AUS"] = "Australia";
        dict["AUT"] = "Austria";
        dict["AZE"] = "Azerbaijan";
        dict["BDI"] = "Burundi";
        dict["BEL"] = "Belgium";
        dict["BEN"] = "Benin";
        dict["BES"] = "Bonaire, Sint Eustatius and Saba";
        dict["BFA"] = "Burkina Faso";
        dict["BGD"] = "Bangladesh";
        dict["BGR"] = "Bulgaria";
        dict["BHR"] = "Bahrain";
        dict["BHS"] = "Bahamas";
        dict["BIH"] = "Bosnia and Herzegovina";
        dict["BLM"] = "Saint Barthélemy";
        dict["BLR"] = "Belarus";
        dict["BLZ"] = "Belize";
        dict["BMU"] = "Bermuda";
        dict["BOL"] = "Bolivia";
        dict["BRA"] = "Brazil";
        dict["BRB"] = "Barbados";
        dict["BRN"] = "Brunei Darussalam";
        dict["BTN"] = "Bhutan";
        dict["BVT"] = "Bouvet Island";
        dict["BWA"] = "Botswana";
        dict["CAF"] = "Central African Republic";
        dict["CAN"] = "Canada";
        dict["CCK"] = "Cocos (Keeling) Islands";
        dict["CHE"] = "Switzerland";
        dict["CHL"] = "Chile";
        dict["CHN"] = "China";
        dict["CIV"] = "Côte d'Ivoire";
        dict["CMR"] = "Cameroon";
        dict["COD"] = "Democratic Republic of the Congo";
        dict["COG"] = "Congo";
        dict["COK"] = "Cook Islands";
        dict["COL"] = "Colombia";
        dict["COM"] = "Comoros";
        dict["CPV"] = "Cabo Verde";
        dict["CRI"] = "Costa Rica";
        dict["CUB"] = "Cuba";
        dict["CUW"] = "Curaçao";
        dict["CXR"] = "Christmas Island";
        dict["CYM"] = "Cayman Islands";
        dict["CYP"] = "Cyprus";
        dict["CZE"] = "Czechia";
        dict["DEU"] = "Germany";
        dict["DJI"] = "Djibouti";
        dict["DMA"] = "Dominica";
        dict["DNK"] = "Denmark";
        dict["DOM"] = "Dominican Republic";
        dict["DZA"] = "Algeria";
        dict["ECU"] = "Ecuador";
        dict["EGY"] = "Egypt";
        dict["ERI"] = "Eritrea";
        dict["ESH"] = "Western Sahara";
        dict["ESP"] = "Spain";
        dict["EST"] = "Estonia";
        dict["ETH"] = "Ethiopia";
        dict["FIN"] = "Finland";
        dict["FJI"] = "Fiji";
        dict["FLK"] = "Falkland Islands (Malvinas)";
        dict["FRA"] = "France";
        dict["FRO"] = "Faroe Islands";
        dict["FSM"] = "Micronesia (Federated States of)";
        dict["GAB"] = "Gabon";
        dict["GBR"] = "England";
        dict["GEO"] = "Georgia";
        dict["GGY"] = "Guernsey";
        dict["GHA"] = "Ghana";
        dict["GIB"] = "Gibraltar";
        dict["GIN"] = "Guinea";
        dict["GLP"] = "Guadeloupe";
        dict["GMB"] = "Gambia";
        dict["GNB"] = "Guinea-Bissau";
        dict["GNQ"] = "Equatorial Guinea";
        dict["GRC"] = "Greece";
        dict["GRD"] = "Grenada";
        dict["GRL"] = "Greenland";
        dict["GTM"] = "Guatemala";
        dict["GUF"] = "French Guiana";
        dict["GUM"] = "Guam";
        dict["GUY"] = "Guyana";
        dict["HKG"] = "Hong Kong";
        dict["HMD"] = "Heard Island and McDonald Islands";
        dict["HND"] = "Honduras";
        dict["HRV"] = "Croatia";
        dict["HTI"] = "Haiti";
        dict["HUN"] = "Hungary";
        dict["IDN"] = "Indonesia";
        dict["IMN"] = "Isle of Man";
        dict["IND"] = "India";
        dict["IOT"] = "British Indian Ocean Territory";
        dict["IRL"] = "Ireland";
        dict["IRN"] = "Iran";
        dict["IRQ"] = "Iraq";
        dict["ISL"] = "Iceland";
        dict["ISR"] = "Israel";
        dict["ITA"] = "Italy";
        dict["JAM"] = "Jamaica";
        dict["JEY"] = "Jersey";
        dict["JOR"] = "Jordan";
        dict["JPN"] = "Japan";
        dict["KAZ"] = "Kazakhstan";
        dict["KEN"] = "Kenya";
        dict["KGZ"] = "Kyrgyzstan";
        dict["KHM"] = "Cambodia";
        dict["KIR"] = "Kiribati";
        dict["KNA"] = "Saint Kitts and Nevis";
        dict["KOR"] = "Korea Republic";
        dict["KWT"] = "Kuwait";
        dict["LAO"] = "Lao People's Democratic Republic";
        dict["LBN"] = "Lebanon";
        dict["LBR"] = "Liberia";
        dict["LBY"] = "Libya";
        dict["LCA"] = "Saint Lucia";
        dict["LIE"] = "Liechtenstein";
        dict["LKA"] = "Sri Lanka";
        dict["LSO"] = "Lesotho";
        dict["LTU"] = "Lithuania";
        dict["LUX"] = "Luxembourg";
        dict["LVA"] = "Latvia";
        dict["MAC"] = "Macao";
        dict["MAF"] = "Saint Martin";
        dict["MAR"] = "Morocco";
        dict["MCO"] = "Monaco";
        dict["MDA"] = "Moldova";
        dict["MDG"] = "Madagascar";
        dict["MDV"] = "Maldives";
        dict["MEX"] = "Mexico";
        dict["MHL"] = "Marshall Islands";
        dict["MKD"] = "North Macedonia";
        dict["MLI"] = "Mali";
        dict["MLT"] = "Malta";
        dict["MMR"] = "Myanmar";
        dict["MNE"] = "Montenegro";
        dict["MNG"] = "Mongolia";
        dict["MNP"] = "Northern Mariana Islands";
        dict["MOZ"] = "Mozambique";
        dict["MRT"] = "Mauritania";
        dict["MSR"] = "Montserrat";
        dict["MTQ"] = "Martinique";
        dict["MUS"] = "Mauritius";
        dict["MWI"] = "Malawi";
        dict["MYS"] = "Malaysia";
        dict["MYT"] = "Mayotte";
        dict["NAM"] = "Namibia";
        dict["NCL"] = "New Caledonia";
        dict["NER"] = "Niger";
        dict["NFK"] = "Norfolk Island";
        dict["NGA"] = "Nigeria";
        dict["NIC"] = "Nicaragua";
        dict["NIU"] = "Niue";
        dict["NLD"] = "Netherlands";
        dict["NOR"] = "Norway";
        dict["NPL"] = "Nepal";
        dict["NRU"] = "Nauru";
        dict["NZL"] = "New Zealand";
        dict["OMN"] = "Oman";
        dict["PAK"] = "Pakistan";
        dict["PAN"] = "Panama";
        dict["PCN"] = "Pitcairn";
        dict["PER"] = "Peru";
        dict["PHL"] = "Philippines";
        dict["PLW"] = "Palau";
        dict["PNG"] = "Papua New Guinea";
        dict["POL"] = "Poland";
        dict["PRI"] = "Puerto Rico";
        dict["PRK"] = "North Korea";
        dict["PRT"] = "Portugal";
        dict["PRY"] = "Paraguay";
        dict["PSE"] = "Palestine";
        dict["PYF"] = "French Polynesia";
        dict["QAT"] = "Qatar";
        dict["REU"] = "Réunion";
        dict["ROU"] = "Romania";
        dict["RUS"] = "Russia";
        dict["RWA"] = "Rwanda";
        dict["SAU"] = "Saudi Arabia";
        dict["SDN"] = "Sudan";
        dict["SEN"] = "Senegal";
        dict["SGP"] = "Singapore";
        dict["SGS"] = "South Georgia and the South Sandwich Islands";
        dict["SHN"] = "Saint Helena, Ascension and Tristan da Cunha";
        dict["SJM"] = "Svalbard and Jan Mayen";
        dict["SLB"] = "Solomon Islands";
        dict["SLE"] = "Sierra Leone";
        dict["SLV"] = "El Salvador";
        dict["SMR"] = "San Marino";
        dict["SOM"] = "Somalia";
        dict["SPM"] = "Saint Pierre and Miquelon";
        dict["SRB"] = "Serbia";
        dict["SSD"] = "South Sudan";
        dict["STP"] = "Sao Tome and Principe";
        dict["SUR"] = "Suriname";
        dict["SVK"] = "Slovakia";
        dict["SVN"] = "Slovenia";
        dict["SWE"] = "Sweden";
        dict["SWZ"] = "Eswatini";
        dict["SXM"] = "Sint Maarten";
        dict["SYC"] = "Seychelles";
        dict["SYR"] = "Syrian Arab Republic";
        dict["TCA"] = "Turks and Caicos Islands";
        dict["TCD"] = "Chad";
        dict["TGO"] = "Togo";
        dict["THA"] = "Thailand";
        dict["TJK"] = "Tajikistan";
        dict["TKL"] = "Tokelau";
        dict["TKM"] = "Turkmenistan";
        dict["TLS"] = "Timor-Leste";
        dict["TON"] = "Tonga";
        dict["TTO"] = "Trinidad and Tobago";
        dict["TUN"] = "Tunisia";
        dict["TUR"] = "Turkey";
        dict["TUV"] = "Tuvalu";
        dict["TWN"] = "Taiwan";
        dict["TZA"] = "Tanzania";
        dict["UGA"] = "Uganda";
        dict["UKR"] = "Ukraine";
        dict["UMI"] = "United States Minor Outlying Islands";
        dict["URY"] = "Uruguay";
        dict["USA"] = "USA";
        dict["UZB"] = "Uzbekistan";
        dict["VAT"] = "Holy See";
        dict["VCT"] = "Saint Vincent and the Grenadines";
        dict["VEN"] = "Venezuela";
        dict["VGB"] = "British Virgin Islands";
        dict["VIR"] = "U.S. Virgin Islands";
        dict["VNM"] = "Viet Nam";
        dict["VUT"] = "Vanuatu";
        dict["WLF"] = "Wallis and Futuna";
        dict["WSM"] = "Samoa";
        dict["YEM"] = "Yemen";
        dict["ZAF"] = "South Africa";
        dict["ZMB"] = "Zambia";
        dict["ZWE"] = "Zimbabwe";
        return dict;
    }

    /**
     * Renders the map
     * @param world the json data with the shape of all countries and a string for the activeYear
     */
    async drawMap(world) {
        let geoJson = topojson.feature(world, world.objects.countries);
        console.log(geoJson);
        console.log(this.ABVRToNameDict);
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
                        d3.select(this).append("title").text(that.ABVRToNameDict[d.id]);
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
