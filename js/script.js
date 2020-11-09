loadData().then(data => {

    this.activeCountry = null;
    this.activeYear = 2014;
    let that = this;

    console.log(data);
    const worldMap = new Map(data, updateCountry);

    function updateCountry(countryID) {
        this.activeCountry = countryID;
        worldMap.updateHighlightClick(this.activeCountry);
    }

    function updateYear(year) {

        //TODO - your code goes here -
        this.activeYear = year;
        gapPlot.drawYearBar();
        gapPlot.updatePlot(this.activeYear);
        infoBox.updateTextDescription(this.activeCountry, this.activeYear);
    }

    d3.json('data/world.json').then(mapData => {
        worldMap.drawMap(mapData, this.activeYear);
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
    let matches = await loadFile('data/WorldCupMatches(1).csv');
    let players = await loadFile('data/WorldCupPlayers.csv');
    let cups = await loadFile('data/WorldCups(1).csv');

    return {
        'population': pop,
        'matches': matches,
        'players': players,
        'cups': cups
    };
}

