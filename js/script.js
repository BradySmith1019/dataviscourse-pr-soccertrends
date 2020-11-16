loadData().then(data => {

    this.activeCountry = 'USA';
    this.activeYear = '2014';
    let that = this;

    console.log(data);
    const worldMap = new Map(data, updateCountry);
    const infoBox = new InfoBox(data);
    const lineChart = new LineChart(data);
    const topRight = new TopRight(data, this.activeYear);
    let table = new Table(data.cups);

    let bracket = new Bracket(data);
    bracket.drawBracket(activeYear);


    function updateCountry(countryID) {
        this.activeCountry = countryID;
        worldMap.updateHighlightClick(this.activeCountry);
        infoBox.updateTextDescription(this.activeCountry, that.activeYear, that.activeYear);
        topRight.updateSelectedCountry(this.activeCountry);
    }

    function updateYear(year) {

        this.activeYear = year;
        //infoBox.updateTextDescription(this.activeCountry, this.activeYear);
    }

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

    return {
        'population': pop,
        'matches': matches,
        'players': players,
        'cups': cups
    };
}

