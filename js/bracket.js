/** Class representing the bracket view. */
class Bracket {

    /**
     * Creates a Bracket Object
     *
     * @param data the full dataset containing the matches and cups data
     */
    constructor(data) {
        this.matchesData = data.matches;
        this.cupData = data.cups;
        this.lineLength = 150;
        this.R16Separation = 85;  
        this.buffer = 30;
        this.svgWidth = 1260;
        this.svgHeight = 860;
        this.lineThickness = 5;
        this.scoreBuffer = 12;
        this.nameBuffer = 5;
        d3.select("#bracket").classed("midright-grid", true);
        this.setUpBracketSVG();
    }

    /**
     * Method to set up the SVG that holds the bracket
     */
    setUpBracketSVG(){
        let bracketSVG = d3.select("#bracket-svg")
                            .attr("width", this.svgWidth)
                            .attr("height", this.svgHeight);

        // Sets up groups to hold each part of the bracket
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
     * Renders the bracket
     * @param activeYear the currently selected year
     */
    async drawBracket(activeYear) {
        d3.select("#bracket-svg").selectAll('text').remove();
        d3.select("#bracket-svg").selectAll('line').remove();
        this.writeTitle(activeYear);
        this.drawBracketLines(activeYear);
        this.addTeamNames(activeYear);
    }


    /**
     * Writes the Bracket Title at the top middle of the bracket
     * @param {The currently selected year} activeYear 
     */
    async writeTitle(activeYear){
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

    /**
     * Method to draw the lines in the bracket. Not all world cups knockout
     * rounds have had the same number of of stages so it draws the correct
     * number of lines for the bracket of the slected years world cup
     * @param activeYear The currently selected year
     */
    async drawBracketLines(activeYear){      
        // if the year is 1950 there is no bracket to be drawn
        if(activeYear == 1950)
            return;

        this.drawFinalLines();

        // 1974 and 1978 only had a final in the knockout rounds
        if(activeYear == 1974 || activeYear == 1978)
            return;

        this.drawSFLines();

        // The knockout round in 1930 and 1982 started at the semifinals
        if(activeYear == 1930 || activeYear == 1982)
            return;

        this.drawQFLines();

        // World cups between 1954-1970 knockout rounds started at the quarterfinals
        if(activeYear == 1954 || activeYear == 1958 || activeYear == 1962 || activeYear == 1966 || activeYear == 1970)
            return;

        this.drawR16Lines();
    }

    /**
     * Draws the Round of 16 bracket lines
     */
    async drawR16Lines(){
        let that = this
        let Roundof16Lines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        let R16Lines = d3.select("#R16-Lines").selectAll('line');
        let joined = R16Lines.data(Roundof16Lines).join('line')
        joined.attr("x1", d =>{
                if(d < 8)
                    return that.buffer;
                else if (d >= 8 && d < 16)
                    return that.svgWidth - that.buffer - that.lineLength - that.lineThickness / 2;
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
                    return that.buffer + that.lineLength + that.lineThickness / 2;
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
    }

    /**
     * Draws the quarterfinal bracket lines
     */
    async drawQFLines(){
        let that = this;
        let QuarterfinalLines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        let QFLines = d3.select("#QF-Lines").selectAll('line');
        let joined = QFLines.data(QuarterfinalLines).join('line')
        joined.attr("x1", d =>{
                if(d < 4)
                    return that.buffer + that.lineLength;
                else if (d >= 4 && d < 8)
                    return that.svgWidth - that.buffer - that.lineLength * 2 - that.lineThickness / 2;
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
                    return that.buffer + that.lineLength * 2 + that.lineThickness / 2;
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
    }

    /**
     * Draws the semifinal bracket lines
     */
    async drawSFLines(){
        let that = this;
        let SemifinalLines = [0, 1, 2, 3, 4, 5];
        let SFLines = d3.select("#SF-Lines").selectAll('line');
        let joined = SFLines.data(SemifinalLines).join('line');
        joined.attr("x1", d =>{
                if(d < 2)
                    return that.buffer + that.lineLength * 2;
                else if (d >= 2 && d < 4)
                    return that.svgWidth - that.buffer - that.lineLength * 3 - that.lineThickness / 2;
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
                    return that.buffer + that.lineLength * 3 + that.lineThickness / 2;
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
    }

    /**
     * Draws the Bracket Lines for the final
     */
    async drawFinalLines(){
        let that = this;
        let FinalLines = [0, 1];
        let FLines = d3.select("#Final-Lines").selectAll('line');
        let joined = FLines.data(FinalLines).join('line')
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

    /**
     * Method to add the team names and their goals to the bracket for the selected year
     * @param activeYear the currently selected year
     */
    async addTeamNames(activeYear){
        let YearData = this.cupData.filter(d => d.Year == activeYear);
        this.writeWinner(YearData);

        // If the year is 1950 write the message for why no bracket is drawn.
        if(activeYear == 1950){
            this.write1950Message();
            return;
        }

        // Write the knockout round data using the helper methods and only write data applicable to the
        // selected world cup year
        let FinalMatchup = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Final');
        this.writeFinalData(FinalMatchup);

        if(activeYear == 1974 || activeYear == 1978)
            return;

        let SFMatchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Semi-finals');
        this.writeSFData(SFMatchups);

        if(activeYear == 1930 || activeYear == 1982)
            return;

        let QFMatchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Quarter-finals');
        this.writeQFData(QFMatchups);

        if(activeYear == 1954 || activeYear == 1958 || activeYear == 1962 || activeYear == 1966 || activeYear == 1970)
            return;

        let R16Matchups = this.matchesData.filter(d => d.Year == activeYear && d.Stage == 'Round of 16');
        this.writeR16Data(R16Matchups);
    }

    /**
     * Writes the round of 16 matchup data to the bracket in the correct spot
     * @param Matchups The Round of 16 matchups
     */
    async writeR16Data(Matchups){
        let that = this;
        let HomeNames = d3.select("#R16HomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineThickness;})
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
                    return that.svgWidth - that.buffer - that.lineThickness;})
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
                    return that.buffer + that.lineLength - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength + that.lineThickness;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4);})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#R16AwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 4)
                    return that.buffer + that.lineLength - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength + that.lineThickness;})
                .attr("y", (d, i) => {
                    if (i < 4)
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * i + that.R16Separation;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 2 * (i - 4) + that.R16Separation;})
                .attr("class", (d, i) => {
                    if (i < 4)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    /**
     * Writes the quarterfinal matchup data to the bracket in the correct spot
     * @param Matchups The quarterfinal matchups
     */
    async writeQFData(Matchups){
        let that = this;
        let HomeNames = d3.select("#QFHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength - that.lineThickness;})
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
                    return that.svgWidth - that.buffer - that.lineLength - that.lineThickness;})
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
                    return that.buffer + that.lineLength * 2 - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2 + that.lineThickness;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation / 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation / 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#QFAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i < 2)
                    return that.buffer + that.lineLength * 2 - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2 + that.lineThickness;})
                .attr("y", (d, i) => {
                    if (i < 2)
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * i + that.R16Separation / 2 + that.R16Separation * 2;
                    else
                        return that.buffer - that.lineThickness + that.R16Separation * 4 * (i - 2) + that.R16Separation / 2 + that.R16Separation * 2;})
                .attr("class", (d, i) => {
                    if (i < 2)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    /**
     * Writes the semifinal matchup data to the bracket in the correct spot
     * @param Matchups The semifinal matchups
     */
    async writeSFData(Matchups){
        let that = this;
        let HomeNames = d3.select("#SFHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 2 + that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 2 - that.lineThickness;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 3 / 2;})
                .attr("class", (d, i) => {
                    if (i == 0)
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
                    return that.svgWidth - that.buffer - that.lineLength * 2 - that.lineThickness;})
              .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 3 / 2 + that.R16Separation * 4;})
              .attr("class", (d, i) => {
                if (i == 0)
                    return "left-bracket bracket-label";
                else
                    return "right-bracket bracket-label";
                })
              .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#SFHomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 3 - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3 + that.lineThickness;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 3 / 2;})
                .attr("class", (d, i) => {
                    if (i == 0)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#SFAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchups).join('text')
        joined.attr("x", (d, i) => {
                if (i == 0)
                    return that.buffer + that.lineLength * 3 - that.lineThickness;
                else
                    return that.svgWidth - that.buffer - that.lineLength * 3 + that.lineThickness;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 3 / 2 + that.R16Separation * 4;})
                .attr("class", (d, i) => {
                    if (i == 0)
                        return "right-bracket bracket-label";
                    else
                        return "left-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

     /**
     * Writes the final matchup data to the bracket in the correct spot
     * @param Matchup The final matchup 
     */
    async writeFinalData(Matchup){
        let that = this;
        let HomeNames = d3.select("#FinalHomeNames").selectAll('text');
        let joined = HomeNames.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 3 + that.lineThickness;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                    return "left-bracket bracket-label";
                })
                .text(d => d.HomeTeamName);

        let AwayNames = d3.select("#FinalAwayNames").selectAll('text');
        joined = AwayNames.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.svgWidth - that.buffer - that.lineLength * 3 - that.lineThickness;})
              .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
              .attr("class", (d, i) => {
                    return "right-bracket bracket-label";
                })
              .text(d => d.AwayTeamName);

        let HomeGoals = d3.select("#FinalHomeGoals").selectAll('text');
        joined = HomeGoals.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 4 - that.lineThickness;})
                .attr("y", (d, i) => {
                    return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                        return "right-bracket bracket-label";
                })
                .text(d => d.HomeTeamGoals);

        let AwayGoals = d3.select("#FinalAwayGoals").selectAll('text');
        joined = AwayGoals.data(Matchup).join('text')
        joined.attr("x", (d, i) => {
                    return that.svgWidth - that.buffer - that.lineLength * 4 + that.lineThickness;})
                .attr("y", (d, i) => {
                        return that.buffer - that.lineThickness + that.R16Separation * 7 / 2;})
                .attr("class", (d, i) => {
                        return "left-bracket bracket-label";
                })
                .text(d => d.AwayTeamGoals);
    }

    /**
     * Write the winner of the currently selected world cup at the approriate
     * place on the bracker.
     * @param YearData The data for the currenlty selected year
     */
    async writeWinner(YearData){
        let that = this;
        let Winner = d3.select("#Winner").selectAll('text');
        let joined = Winner.data(YearData).join('text');
        joined.attr("x", (d, i) => {
                    return that.buffer + that.lineLength * 4;})
                .attr("y", (d, i) => {
                    return that.buffer - 40 + that.R16Separation * 2;})
                .attr("class", (d, i) => {
                    return "middle-bracket winning-label";
                })
                .text(d => {
                    return "Winner: " + d.Winner;
                });
    }

    /**
     * Writes a message explaining to the user why the 1950 would cup does not have 
     * a knockout round bracket drawn
     */
    async write1950Message(){
        let that = this;
        let bracketSVG = d3.select("#bracket-svg");
        let text = bracketSVG.append('text');
        text.attr("x", (d, i) => {
                return that.buffer + that.lineLength * 4;})
            .attr("y", (d, i) => {
                return that.buffer - that.lineThickness + that.R16Separation * 5 / 2 - 25;})
            .attr("class", (d, i) => {
                return "middle-bracket explanation-label";
            })
            .text("The 1950 world cup was the only world cup in history not to have a knockout stage.");

        text = bracketSVG.append('text');
        text.attr("x", (d, i) => {
                return that.buffer + that.lineLength * 4;})
            .attr("y", (d, i) => {
                return that.buffer - that.lineThickness + that.R16Separation * 5 / 2;})
            .attr("class", (d, i) => {
                return "middle-bracket explanation-label";
            })
            .text("Uruguay were crowned champions after a second group stage.");
    }
}
