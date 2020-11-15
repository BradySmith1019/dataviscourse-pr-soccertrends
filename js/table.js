/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(Data) {
        this.tableData = Data.map(d => d);

        // Create the header data
        this.headerData = [
            {
                sorted: false,
                ascending: false,
                key: 'year'
            },
            {
                sorted: false,
                ascending: false,
                key: 'host',
            },
            {
                sorted: false,
                ascending: false,
                key: 'winners'
            },
            {
                sorted: false,
                ascending: false,
                key: 'runners-up'
            },
            {
                sorted: false,
                ascending: false,
                key: 'third'
            },
            {
                sorted: false,
                ascending: false,
                key: 'fourth'
            },
            {
                sorted: false,
                ascending: false,
                key: 'qualified countries'
            },
            {
                sorted: false,
                ascending: false,
                key: 'matches played'
            },
            {
                sorted: false,
                ascending: false,
                key: 'goals per game'
            },
            {
                sorted: false,
                ascending: false,
                key: 'attendence per game'
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
                                .style("text-align", "center");


        let freqVizSelection = forecastSelection.filter(d => d.type === 'frequency viz');

        let svgSelect = freqVizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', this.vizHeight);

        this.addFrequencyRectangles(svgSelect);
        

        let percentageVizSelection = forecastSelection.filter(d => d.type === 'percentage viz');

        svgSelect = percentageVizSelection.selectAll('svg')
                .data(d => [d])
                .join('svg')
                .attr('width', this.vizWidth)
                .attr('height', this.vizHeight);

        this.addPercentageRectangles(svgSelect);
    }

    /** Convert the data into separte data for each cell column */
    rowToCellDataTransform(d) {
        let phraseInfo = {
            type: 'text',
            value: d.phrase ,
        };

        let frequencyInfo = {
            type: 'frequency viz',
            value: d.total * 2, 
            category: d.category,
        };

        let percentageInfo = {
            type: 'percentage viz',
            value : {
                democratPercentage: d.percent_of_d_speeches,
                republicanPercentage: d.percent_of_r_speeches,
            },
            category: d.category,
        };

        let totalInfo = {
            type: 'text',
            value: d.total,
        }

        let dataList = [phraseInfo, frequencyInfo, percentageInfo, totalInfo];
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

    /** Draw the data based on a given partial set of data */
    drawPartialTable(data){
        this.updateHeadersPartial();
        let rowSelection = d3.select('#predictionTableBody')
            .selectAll('tr')
            .data(data)
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
                                .style("text-align", "center");


        let freqVizSelection = forecastSelection.filter(d => d.type === 'frequency viz');

        let svgSelect = freqVizSelection.selectAll('svg')
            .data(d => [d])
            .join('svg')
            .attr('width', this.vizWidth)
            .attr('height', this.vizHeight);

        this.addFrequencyRectangles(svgSelect);
        

        let percentageVizSelection = forecastSelection.filter(d => d.type === 'percentage viz');

        svgSelect = percentageVizSelection.selectAll('svg')
                .data(d => [d])
                .join('svg')
                .attr('width', this.vizWidth)
                .attr('height', this.vizHeight);

        this.addPercentageRectangles(svgSelect);
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

    // Clears the column headers for a partial set of data since a partial set
    // cannot be sorted
    updateHeadersPartial() {
        let thElement = d3.select('#columnHeaders')
           .selectAll('th');
        thElement.attr("class", "sortable");
        let icon = thElement.select("i");
        icon.attr("class", "fas no-display");
    }

    /** Adds the frequency rectangles to the table */
    addFrequencyRectangles(containerSelect) {

        containerSelect.selectAll("rect").remove();

        containerSelect.append("rect")
                        .attr("x", d => { 
                            return this.scaleFrequency(0);})
                        .attr("y", 5)
                        .attr("width", d => {
                                return this.scaleFrequency(d.value) - this.scaleFrequency(0);})
                        .attr("height", 20)
                        .attr("class", d => {
                            if(d.category === "economy/fiscal issues")
                                return "bar economy";
                        
                            else if(d.category === "energy/environment")
                                return "bar energy";
                        
                            else if (d.category === "crime/justice")
                                return "bar crime";
                        
                            else if (d.category === "education")
                                return "bar education"
                        
                            else if (d.category === "health care")
                                return "bar health-care";
    
                            else
                                return "bar mental-health";});                
    }

    /** Adds the percentage rectangles to the visualization */
    addPercentageRectangles(containerSelect) {
        containerSelect.selectAll("rect").remove();

        containerSelect.append("rect")
                        .attr("x", d => { 
                            return this.scalePercentage(-1 * d.value.democratPercentage);})
                        .attr("y", 5)
                        .attr("width", d => {
                                return this.scalePercentage(0) - this.scalePercentage(-1 * d.value.democratPercentage);})
                        .attr("height", 20)
                        .attr("class", "democrat");                

        containerSelect.append("rect")
                        .attr("x", d => { 
                            return this.scalePercentage(0);})
                        .attr("y", 5)
                        .attr("width", d => {
                                return this.scalePercentage(d.value.republicanPercentage) - this.scalePercentage(0);})
                        .attr("height", 20)
                        .attr("class", "republican");  
        
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

        if(d.key === "phrase"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    if (a.phrase < b.phrase)
                        return 1;
                    
                    else if (a.phrase > b.phrase)
                        return -1;
                    
                    return 0;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    if (a.phrase < b.phrase)
                        return -1;
                    
                    else if (a.phrase > b.phrase)
                        return 1;
                    
                    return 0;
                })
            }
        }

        else if(d.key === "percentages"){
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    return b.percent_of_d_speeches - a.percent_of_d_speeches;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    return b.percent_of_r_speeches - a.percent_of_r_speeches;
                })
            }
        }

        else{
            if(!d.ascending){
                this.tableData.sort((a,b) =>
                {
                    return a.total - b.total;
                })
            }
            else{
                this.tableData.sort((a,b) =>
                {
                    return b.total - a.total;
                })
            }
        }

        this.drawTable();
    }
}
