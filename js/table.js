/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     * @param Data - The full data array which contains the data stored in the table
     */
    constructor(Data) {
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
                key: 'QualifiedCountries'
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
        this.vizHeight = 20;

        // Scaling function used to set the scale for the bars in the table
        this.scaleGoals = d3.scaleLinear()
                            .domain([-.4, 6.4])
                            .range([0, this.vizWidth]);

        this.scaleAttendence = d3.scaleLinear()
                                 .domain([-5000, 80000])
                                 .range([0, this.vizWidth]);

        // Draw the table
        d3.select("#table").classed("midleft-grid", true);
        this.attachSortHandlers();
        this.drawLegend();
        this.drawTable();
    }

    /** Draw the legend for the table (the first row) */
    drawLegend() {
        let svg = d3.select('#goalsAxis');
        svg.attr("width", this.vizWidth)
            .attr("height", 20);
        
        svg.append('line')
            .attr("x1", this.scaleGoals(0))
            .attr("y1", 12)
            .attr("x2", this.scaleGoals(0))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleGoals(0))
            .attr("y", 10)
            .attr('class', 'label')
            .text("0.0");
        
        svg.append('line')
            .attr("x1", this.scaleGoals(1.5))
            .attr("y1", 12)
            .attr("x2", this.scaleGoals(1.5))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleGoals(1.5))
            .attr("y", 10)
            .attr('class', 'label')
            .text("1.5");
        
        svg.append('line')
            .attr("x1", this.scaleGoals(3))
            .attr("y1", 12)
            .attr("x2", this.scaleGoals(3))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleGoals(3))
            .attr("y", 10)
            .attr('class', 'label')
            .text("3.0");

        svg.append('line')
            .attr("x1", this.scaleGoals(4.5))
            .attr("y1", 12)
            .attr("x2", this.scaleGoals(4.5))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleGoals(4.5))
            .attr("y", 10)
            .attr('class', 'label')
            .text("4.5");
        
        svg.append('line')
            .attr("x1", this.scaleGoals(6))
            .attr("y1", 12)
            .attr("x2", this.scaleGoals(6))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleGoals(6))
            .attr("y", 10)
            .attr('class', 'label')
            .text("6.0");
        
        svg = d3.select('#attendenceAxis');
            svg.attr("width", this.vizWidth)
                .attr("height", 20);

        svg.append('line')
            .attr("x1", this.scaleAttendence(0))
            .attr("y1", 12)
            .attr("x2", this.scaleAttendence(0))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleAttendence(0))
            .attr("y", 10)
            .attr('class', 'label')
            .text("0k");

        svg.append('line')
            .attr("x1", this.scaleAttendence(25000))
            .attr("y1", 12)
            .attr("x2", this.scaleAttendence(25000))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleAttendence(25000))
            .attr("y", 10)
            .attr('class', 'label')
            .text("25k");

        svg.append('line')
            .attr("x1", this.scaleAttendence(50000))
            .attr("y1", 12)
            .attr("x2", this.scaleAttendence(50000))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleAttendence(50000))
            .attr("y", 10)
            .attr('class', 'label')
            .text("50k");

        svg.append('line')
            .attr("x1", this.scaleAttendence(75000))
            .attr("y1", 12)
            .attr("x2", this.scaleAttendence(75000))
            .attr("y2", 20)
            .attr("class", "table-legend-line");
        
        svg.append('text')
            .attr("x", this.scaleAttendence(75000))
            .attr("y", 10)
            .attr('class', 'label')
            .text("75k");                   
    }    

    // Draw the table using all available data
    drawTable() {
        this.updateHeaders();
        let rowSelection = d3.select('#tableBody')
            .selectAll('tr')
            .data(this.tableData)
            .join('tr');

        let forecastSelection = rowSelection.selectAll('td')
            .data(this.rowToCellDataTransform)
            .join('td')
            .attr('class', "table-text");

        let textSelection = forecastSelection.filter(d => d.type === 'text');
        let text = textSelection.selectAll('text')
                                .data(d =>  [d])
                                .join('text')
                                .text(d => d.value)
                                .attr("class", "table-text");


        let goalsVizSelection = forecastSelection.filter(d => d.type === 'goals viz');

        let svgSelect = goalsVizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', this.vizHeight);

        this.addGoalsRectangles(svgSelect);
        

        let attendenceVizSelection = forecastSelection.filter(d => d.type === 'attendence viz');

        svgSelect = attendenceVizSelection.selectAll('svg')
                .data(d => [d])
                .join('svg')
                .attr('width', this.vizWidth)
                .attr('height', this.vizHeight);

        this.addAttendenceRectangles(svgSelect);
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

        let qualifiedCountriesInfo = {
            type: 'text',
            value: d.QualifiedCountries,
        };

        let goalsPerGameInfo = {
            type: 'goals viz',
            value: d.GoalsPerGame,
        };

        let attendencePerGameInfo = {
            type: 'attendence viz',
            value: d.AttendancePerGame,
        };

        let dataList = [yearInfo, hostInfo, winnerInfo, runnersUpInfo, thirdInfo, qualifiedCountriesInfo, goalsPerGameInfo, attendencePerGameInfo];
        return dataList;
    }

    /**
     * Method that draws all of the bars in the Goals Per Game column
     * @param containerSelect - The container to draw the bars in
     */
    addGoalsRectangles(containerSelect) {

        containerSelect.selectAll("rect").remove();

        containerSelect.append("rect")
                        .attr("x", d => { 
                            return this.scaleGoals(0);})
                        .attr("y", 2.5)
                        .attr("width", d => {
                                return this.scaleGoals(d.value) - this.scaleGoals(0);})
                        .attr("height", 25)
                        .attr("class", "goals table-rect");                
    }

    /**
     * Method that draws all of the bars in the Attendance Per Game column
     * @param containerSelect - The container to draw the bars in
     */
    addAttendenceRectangles(containerSelect) {

        containerSelect.selectAll("rect").remove();

        containerSelect.append("rect")
                        .attr("x", d => { 
                            return this.scaleAttendence(0);})
                        .attr("y", 2.5)
                        .attr("width", d => {
                                return this.scaleAttendence(d.value) - this.scaleAttendence(0);})
                        .attr("height", 15)
                        .attr("class", "attendence table-rect");                
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
