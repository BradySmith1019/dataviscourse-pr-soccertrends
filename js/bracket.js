/** Class representing the map view. */
class Bracket {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     */
    constructor(data) {
        this.matchesData = data.matches;
        this.cupData = data.cups;
        this.lineLength = 150;
        this.R16Separation = 100;  
        this.buffer = 30;
        this.svgWidth = 1260;
        this.svgHeight = 860;
        this.lineThickness = 5;
        this.scoreBuffer = 10;
        this.nameBuffer = 5;
        d3.select("#bracket").classed("midright-grid", true);
        this.setUpBracketSVG();
    }

    setUpBracketSVG(){
        let bracketSVG = d3.select("#bracket-svg")
                            .attr("width", this.svgWidth)
                            .attr("height", this.svgHeight);

        bracketSVG.append("g").attr("id", "Title")
        bracketSVG.append("g").attr("id", "R16-Lines");
        bracketSVG.append("g").attr("id", "QF-Lines");
        bracketSVG.append("g").attr("id", "SF-Lines");
        bracketSVG.append("g").attr("id", "Final-Lines");
        bracketSVG.append("g").attr("id", "R16HomeNames");
        bracketSVG.append("g").attr("id", "R16AwayNames");
        bracketSVG.append("g").attr("id", "R16HomeGoals");
        bracketSVG.append("g").attr("id", "R16AwayGoals");
        bracketSVG.append("g").attr("id", "QFHomeNames");
        bracketSVG.append("g").attr("id", "QFAwayNames");
        bracketSVG.append("g").attr("id", "QFHomeGoals");
        bracketSVG.append("g").attr("id", "QFAwayGoals");
        bracketSVG.append("g").attr("id", "SFHomeNames");
        bracketSVG.append("g").attr("id", "SFAwayNames");
        bracketSVG.append("g").attr("id", "SFHomeGoals");
        bracketSVG.append("g").attr("id", "SFAwayGoals");
        bracketSVG.append("g").attr("id", "FinalHomeNames");
        bracketSVG.append("g").attr("id", "FinalAwayNames");
        bracketSVG.append("g").attr("id", "FinalHomeGoals");
        bracketSVG.append("g").attr("id", "FinalAwayGoals");
        bracketSVG.append("g").attr("id", "Winner");
    }  

    /**
     * Renders the map
     * @param world the json data with the shape of all countries and a string for the activeYear
     */
    async drawBracket(activeYear) {
        this.writeTitle(activeYear);
        this.drawBracketLines(activeYear);
        this.addTeamNames(activeYear);
    }

    writeTitle(activeYear){
        let that = this;
        let data = [activeYear];
        let Title = d3.select("#Title").selectAll('text');
        let joined = Title.data(data).join('text');
        joined.attr("x", that.buffer + that.lineLength * 4 - 100)
                .attr("y", that.buffer)
                .attr("class", "bracket-title")
                .text(d => {
                    return d + " Bracket";
                });
    }

    drawBracketLines(activeYear){
        let that = this;
        let Roundof16Lines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        let R16Lines = d3.select("#R16-Lines").selectAll('line');
        let joined = R16Lines.data(Roundof16Lines).join('line')
        joined.attr("x1", d =>{
                if(d < 8)
                    return that.buffer;
                else if (d >= 8 && d < 16)
                    return that.svgWidth - that.buffer - that.lineLength;
                else if (d >= 16 && d < 20)
                    return that.lineLength + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength;})
              .attr("y1", d =>{
                if(d < 8)
                    return that.buffer + that.R16Separation * d;
                else if (d >= 8 && d < 16)
                    return that.buffer + that.R16Separation * (d - 8);
                else if (d >= 16 && d < 20)
                    return that.buffer + that.R16Separation * 2 * (d - 16);
                else
                    return that.buffer + that.R16Separation * 2 * (d - 20);})
              .attr("x2", d =>{
                if(d < 8)
                    return that.buffer + that.lineLength;
                else if (d >= 8 && d < 16)
                    return that.svgWidth - that.buffer;
                else if (d >= 16 && d < 20)
                    return that.lineLength + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength;})
              .attr("y2", d =>{
                if(d < 8)
                    return that.buffer + that.R16Separation * d;
                else if (d >= 8 && d < 16)
                    return that.buffer + that.R16Separation * (d - 8);
                else if (d >= 16 && d < 20)
                    return that.buffer + that.R16Separation * 2 * (d - 16) + that.R16Separation;
                else
                    return that.buffer + that.R16Separation * 2 * (d - 20) + that.R16Separation;})
              .attr("class", "bracket-line");       
        
        let QuarterfinalLines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        let QFLines = d3.select("#QF-Lines").selectAll('line');
        joined = QFLines.data(QuarterfinalLines).join('line')
        joined.attr("x1", d =>{
                if(d < 4)
                    return that.buffer + that.lineLength;
                else if (d >= 4 && d < 8)
                    return that.svgWidth - that.buffer - that.lineLength * 2;
                else if (d >= 8 && d < 10)
                    return that.lineLength * 2 + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2;})
              .attr("y1", d =>{
                if(d < 4)
                    return that.buffer + that.R16Separation * 2 * d + that.R16Separation / 2;
                else if (d >= 4 && d < 8)
                    return that.buffer + that.R16Separation * 2 * (d - 4) + that.R16Separation / 2;
                else if (d >= 8 && d < 10)
                    return that.buffer + that.R16Separation * 4 * (d - 8) + that.R16Separation / 2;
                else
                    return that.buffer + that.R16Separation * 4 * (d - 10) + that.R16Separation / 2;})
              .attr("x2", d =>{
                if(d < 4)
                    return that.buffer + that.lineLength * 2;
                else if (d >= 4 && d < 8)
                    return that.svgWidth - that.buffer - that.lineLength;
                else if (d >= 8 && d < 10)
                    return that.lineLength * 2 + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2;})
              .attr("y2", d =>{
                if(d < 4)
                    return that.buffer + that.R16Separation * 2 * d + that.R16Separation / 2;
                else if (d >= 4 && d < 8)
                    return that.buffer + that.R16Separation * 2 * (d - 4) + that.R16Separation / 2;
                else if (d >= 8 && d < 10)
                    return that.buffer + that.R16Separation * 4 * (d - 8) + 2 * that.R16Separation + that.R16Separation / 2;
                else
                    return that.buffer + that.R16Separation * 4 * (d - 10) + 2 * that.R16Separation + that.R16Separation / 2;})
              .attr("class", "bracket-line");        
    
        let SemifinalLines = [0, 1, 2, 3, 4, 5];
        let SFLines = d3.select("#SF-Lines").selectAll('line');
        joined = SFLines.data(SemifinalLines).join('line');
        joined.attr("x1", d =>{
                if(d < 2)
                    return that.buffer + that.lineLength * 2;
                else if (d >= 2 && d < 4)
                    return that.svgWidth - that.buffer - that.lineLength * 3;
                else if (d == 4)
                    return that.lineLength * 3 + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3;})
              .attr("y1", d =>{
                if(d < 2)
                    return that.buffer + that.R16Separation * 4 * d + that.R16Separation / 2 * 3;
                else if (d >= 2 && d < 4)
                    return that.buffer + that.R16Separation * 4 * (d - 2) + that.R16Separation / 2 * 3;
                else
                    return that.buffer + that.R16Separation / 2 * 3;})
              .attr("x2", d =>{
                if(d < 2)
                    return that.buffer + that.lineLength * 3;
                else if (d >= 2 && d < 4)
                    return that.svgWidth - that.buffer - that.lineLength * 2;
                else if (d == 4)
                    return that.lineLength * 3 + that.buffer;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3;})
              .attr("y2", d =>{
                if(d < 2)
                    return that.buffer + that.R16Separation * 4 * d + that.R16Separation / 2 * 3;
                else if (d >= 2 && d < 4)
                    return that.buffer + that.R16Separation * 4 * (d - 2) + that.R16Separation / 2 * 3;
                else
                    return that.buffer + that.R16Separation / 2 * 3 + that.R16Separation * 4;})
              .attr("class", "bracket-line"); 

        let FinalLines = [0, 1];
        let FLines = d3.select("#Final-Lines").selectAll('line');
        joined = FLines.data(FinalLines).join('line')
        joined.attr("x1", d =>{
                if(d == 0)
                    return that.buffer + that.lineLength * 3;
                else
                    return that.buffer + that.lineLength * 4;})
              .attr("y1", d =>{
                if(d == 0)
                    return that.buffer + that.R16Separation * 7 / 2;
                else
                    return that.buffer + that.R16Separation * 7 / 2 - that.lineLength;})
              .attr("x2", d =>{
                if(d == 0)
                    return that.buffer + that.lineLength * 5;
                else
                    return that.buffer + that.lineLength * 4;})
              .attr("y2", d =>{
                if(d == 0)
                    return that.buffer + that.R16Separation * 7 / 2;
                else
                    return that.buffer + that.R16Separation * 7 / 2;})
              .attr("class", "bracket-line"); 
    }

    addTeamNames(activeYear){
        let R16Matchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Round of 16');
        let QFMatchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Quarter-finals');
        let SFMatchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Semi-finals');
        let FinalMatchup = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Final');
        let YearData = this.cupData.filter(d => d.Year == activeYear);
        console.log(QFMatchups);
        this.writeR16Data(R16Matchups);
        this.writeQFData(QFMatchups);
        this.writeSFData(SFMatchups);
        this.writeFinalData(FinalMatchup);
        this.writeWinner(YearData);
    }

    writeR16Data(Matchups){
        let that = this;
        let HomeNames = d3.select("#R16HomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4);})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamName);

        let AwayNames = d3.select("#R16AwayNames").selectAll('text');
        joined = AwayNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i + that.R16Separation;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4) + that.R16Separation;})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#R16HomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineLength - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength + that.scoreBuffer;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4);})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#R16AwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineLength - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength + that.scoreBuffer;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i + that.R16Separation;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4) + that.R16Separation;})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    writeQFData(Matchups){
        let that = this;
        let HomeNames = d3.select("#QFHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70 - that.lineLength;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation / 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamName);

        let AwayNames = d3.select("#QFAwayNames").selectAll('text');
        joined = AwayNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70 - that.lineLength;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation * 2 + that.R16Separation / 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation * 2 + that.R16Separation / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#QFHomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength * 2 - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2 + that.scoreBuffer;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation / 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#QFAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength * 2 - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2 + that.scoreBuffer;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation / 2 + that.R16Separation * 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation / 2 + that.R16Separation * 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    writeSFData(Matchups){
        let that = this;
        let HomeNames = d3.select("#SFHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 2 + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70 - that.lineLength * 2;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 3 / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamName);

        let AwayNames = d3.select("#SFAwayNames").selectAll('text');
        joined = AwayNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 2 + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - 70 - that.lineLength * 2;})
              .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 3 / 2 + that.R16Separation * 4;})
              .attr("class", (d, i) => {
                if (i < 2)
                    return "left-bracket bracket-label";
                else
                    return "right-bracket bracket-label";
                })
              .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#SFHomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 3 - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3 + that.scoreBuffer;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 3 / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#SFAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 3 - that.scoreBuffer * 3;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3 + that.scoreBuffer;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 3 / 2 + that.R16Separation * 4;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    writeFinalData(Matchup){
        let that = this;
        let HomeNames = d3.select("#FinalHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 3 + that.lineThickness;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamName);

        let AwayNames = d3.select("#FinalAwayNames").selectAll('text');
        joined = AwayNames.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.svgWidth - that.buffer - 70 - that.lineLength * 3;})
              .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
              .attr("class", (d, i) => {
                if (i < 2)
                    return "left-bracket bracket-label";
                else
                    return "right-bracket bracket-label";
                })
              .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#FinalHomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 4 - that.scoreBuffer * 3;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#FinalAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.svgWidth - that.buffer - that.lineLength * 4 + that.scoreBuffer;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "left-bracket bracket-label";
                    else
                        return "right-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    writeWinner(YearData){
        let that = this;
        let Winner = d3.select("#Winner").selectAll('text');
        let joined = Winner.data(YearData).join('text');
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 4 - 100;})
                .attr("y", (d, i) => {
                    return that.buffer - 20 + that.R16Separation * 2;})
                .attr("class", (d, i) => {
                    return "winning-label";
                })
                .text(d => {
                    return "Winner: " + d.Winner;
                });
    }
}
