loadData().then(data => {

    // Default selections
    this.activeCountry = 'FRA';
    this.activeYear = '2014';
    let that = this;

    // Creates each of the views
    const worldMap = new Map(data, updateCountry);
    const topRight = new TopRight(data, this.activeYear, updateYear);
    let table = new Table(data.cups);
    let bracket = new Bracket(data);

    const infoBox = new InfoBox(data);
    const lineChart = new LineChart(data, this.activeCountry);

    bracket.drawBracket(activeYear);

    // Calls the appropriate functions in each view when the selected country has been changed
    function updateCountry(countryID) {
        this.activeCountry = countryID;
        worldMap.updateHighlightClick(this.activeCountry);
        infoBox.updateTextDescription(this.activeCountry, that.activeYear, that.activeYear);
        topRight.updateSelectedCountry(this.activeCountry);
        lineChart.drawChart(this.activeCountry);
    }

    // Calls the appropriate functions in each view when the selected World Cup has changed
    function updateYear(year) {

        this.activeYear = year;
        topRight.updateSelectedWorldCup(this.activeYear);
        bracket.drawBracket(this.activeYear);
        infoBox.updateTextDescription(this.activeCountry, this.activeYear);
    }

    // Loads in the world map data so it can be drawn
    d3.json('data/world.json').then(mapData => {
        worldMap.drawMap(mapData, that.activeYear);
        worldMap.updateHighlightClick(that.activeCountry);
    });

    document.addEventListener("click", function (e) {
        updateCountry(null);
    }, true);
});

async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let pop = await loadFile('data/pop.csv');
    let matches = await loadFile('data/WorldCupMatches.csv');
    let players = await loadFile('data/WorldCupPlayers.csv');
    let cups = await loadFile('data/WorldCups.csv');
    let countries = await loadFile('data/WorldCupCountries.csv');

    return {
        'population': pop,
        'matches': matches,
        'players': players,
        'cups': cups,
        'countries': countries
    };
}

