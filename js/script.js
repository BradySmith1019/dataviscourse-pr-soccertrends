loadData().then(data => {

    this.activeCountry = 'FRA';
    this.activeYear = '2014';
    let that = this;

    console.log(data);
    const worldMap = new Map(data, updateCountry);
    const topRight = new TopRight(data, this.activeYear, updateYear);
    let table = new Table(data.cups);
    let bracket = new Bracket(data);

    const infoBox = new InfoBox(data);
    const lineChart = new LineChart(data, this.activeCountry);

    bracket.drawBracket(activeYear);

    function updateCountry(countryID) {
        that.activeCountry = countryID;
        infoBox.updateTextDescription(that.activeCountry, that.activeYear, that.activeYear);
        topRight.updateSelectedCountry(that.activeCountry);
        worldMap.highlightCountries(that.activeCountry, that.activeYear);
    }

    function updateYear(year) {
        that.activeYear = year;
        topRight.updateSelectedWorldCup(that.activeYear);
        bracket.drawBracket(that.activeYear);
        infoBox.updateTextDescription(that.activeCountry, that.activeYear);
        worldMap.highlightCountries(that.activeCountry, that.activeYear);
    }

    d3.json('data/world.json').then(mapData => {
        worldMap.drawMap(mapData, that.activeYear);
        worldMap.highlightCountries(that.activeCountry, that.activeYear);
    });
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

