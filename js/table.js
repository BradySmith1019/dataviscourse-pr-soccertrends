/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(Data) {
        console.log("in constructor");
        this.tableData = Data.map(d => d);

        // Create the header data
        this.headerData = [
            {
                sorted: false,
                ascending: false,
                key: 'Year'
            },
            {
                sorted: false,
                ascending: false,
                key: 'Host',
            },
            {
                sorted: false,
                ascending: false,
                key: 'Winner'
            },
            {
                sorted: false,
                ascending: false,
                key: 'RunnersUp'
            },
            {
                sorted: false,
                ascending: false,
                key: 'Third'
            },
            {
                sorted: false,
                ascending: false,
                key: 'Fourth'
            },
            {
                sorted: false,
                ascending: false,
                key: 'QualifiedCountries'
            },
            {
                sorted: false,
                ascending: false,
                key: 'MatchesPlayed'
            },
            {
                sorted: false,
                ascending: false,
                key: 'GoalsPerGame'
            },
            {
                sorted: false,
                ascending: false,
                key: 'AttendencePerGame'
            },
        ]

        // Sets up the width and height of a single vizualization in the table
        this.vizWidth = 150;
        this.vizHeight = 30;

        this.attachSortHandlers();
        this.drawTable();
    }

    // Draw the table using all available data
    drawTable() {
        console.log(this.tableData);
        this.updateHeaders();
        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(this.tableData)
            .join('tr');

        let forecastSelection = rowSelection.selectAll('td')
            .data(this.rowToCellDataTransform)
            .join('td')
            .attr('class', d => d.class);

        let textSelection = forecastSelection.filter(d => d.type === 'text');
        let text = textSelection.selectAll('text')
                                .data(d =>  [d])
                                .join('text')
                                .text(d => d.value)
                                .attr("class", "table-text");


        let freqVizSelection = forecastSelection.filter(d => d.type === 'frequency viz');
   }

    /** Convert the data into separte data for each cell column */
    rowToCellDataTransform(d) {
        let yearInfo = {
            type: 'text',
            value: d.Year ,
        };

        let hostInfo = {
            type: 'text',
            value: d.Host,
        };

        let winnerInfo = {
            type: 'text',
            value: d.Winner,
        };

        let runnersUpInfo = {
            type: 'text',
            value: d.RunnersUp ,
        };

        let thirdInfo = {
            type: 'text',
            value: d.Third,
        };
        let fourthInfo = {
            type: 'text',
            value: d.Fourth,
        };

        let qualifiedCountriesInfo = {
            type: 'text',
            value: d.QualifiedCountries,
        };

        let matchesPlayedInfo = {
            type: 'text',
            value: d.MatchesPlayed,
        };

        let goalsPerGameInfo = {
            type: 'text',
            value: d.GoalsPerGame,
        };

        let attendencePerGameInfo = {
            type: 'text',
            value: d.AttendancePerGame,
        };

        let dataList = [yearInfo, hostInfo, winnerInfo, runnersUpInfo, thirdInfo, fourthInfo, qualifiedCountriesInfo, matchesPlayedInfo, goalsPerGameInfo, attendencePerGameInfo];
        return dataList;
    }

    /** Update the column headers based on the sort state */
    updateHeaders() {
        let thElement = d3.select('#columnHeaders')
           .selectAll('th');
        thElement.attr("class", d => {
                if(!d.sorted) 
                    return "sortable"; 
                else 
                    return "sorting sortable";
                })
        let icon = thElement.select("i")
        icon.attr("class", d => {
            if (!d.sorted)
                return "fas no-display";
            else if (d.ascending)
                return "fas fa-sort-up";
            else
                return "fas fa-sort-down";
        });
    }

    /** update the column headers based on the sort state */
    updateHeaders() {
        let thElement = d3.select('#columnHeaders')
           .selectAll('th');
        thElement.attr("class", d => {
                if(!d.sorted) 
                    return "sortable"; 
                else 
                    return "sorting sortable";
                })
        let icon = thElement.select("i")
        icon.attr("class", d => {
            if (!d.sorted)
                return "fas no-display";
            else if (d.ascending)
                return "fas fa-sort-up";
            else
                return "fas fa-sort-down";
        });
        
    }
        
    /** Attaches the sort handlers to the column headers */ 
    attachSortHandlers() 
    {
        d3.select('#columnHeaders')
            .selectAll('th')
            .data(this.headerData)
            .on("click", (e, d) => this.sortData(d));
    }

    /** Chooses how to sort data based on what column header was clicked */
    sortData(d){
        d = this.headerData[d];
        for (let data of this.headerData){
            if(data.key === d.key && d.sorted)
                data.ascending = !data.ascending;
            if(data.key === d.key)
                data.sorted = true;
            else{
                data.sorted = false;
                data.ascending = false;
            }
        }

        if(d.key === "Year"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    return b.Year - a.Year;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    return a.Year - b.Year;
                })
            }
        }

        else if(d.key === "Host"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.Host < b.Host)
                        return 1;
                    
                    else if (a.Host > b.Host)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.Host < b.Host)
                        return -1;
                    
                    else if (a.Host > b.Host)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "Winner"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.Winner < b.Winner)
                        return 1;
                    
                    else if (a.Winner > b.Winner)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.Winner < b.Winner)
                        return -1;
                    
                    else if (a.Winner > b.Winner)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "RunnersUp"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.RunnersUp < b.RunnersUp)
                        return 1;
                    
                    else if (a.RunnersUp > b.RunnersUp)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.RunnersUp < b.RunnersUp)
                        return -1;
                    
                    else if (a.RunnersUp > b.RunnersUp)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "Third"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.Third < b.Third)
                        return 1;
                    
                    else if (a.Third > b.Third)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.Third < b.Third)
                        return -1;
                    
                    else if (a.Third > b.Third)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "Fourth"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.Fourth < b.Fourth)
                        return 1;
                    
                    else if (a.Fourth > b.Fourth)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.Fourth < b.Fourth)
                        return -1;
                    
                    else if (a.Fourth > b.Fourth)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "QualifiedCountries"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if(b.QualifiedCountries - a.QualifiedCountries == 0)
                        return b.Year - a.Year;
                    return b.QualifiedCountries - a.QualifiedCountries;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if(a.QualifiedCountries - b.QualifiedCountries == 0)
                        return a.Year - b.Year;
                    return a.QualifiedCountries - b.QualifiedCountries;
                })
            }
        }

        else if(d.key === "MatchesPlayed"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if(b.MatchesPlayed - a.MatchesPlayed == 0)
                        return b.Year - a.Year;
                    return b.MatchesPlayed - a.MatchesPlayed;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if(a.MatchesPlayed - b.MatchesPlayed == 0)
                        return a.Year - b.Year;
                    return a.MatchesPlayed - b.MatchesPlayed;
                })
            }
        }

        else if(d.key === "GoalsPerGame"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    return b.GoalsPerGame - a.GoalsPerGame;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    return a.GoalsPerGame - b.GoalsPerGame;
                })
            }
        }

        else{
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    return b.AttendancePerGame - a.AttendancePerGame;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    return a.AttendancePerGame - b.AttendancePerGame;
                })
            }
        }

        this.drawTable();
    }
}
