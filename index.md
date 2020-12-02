## Welcome to World Cup Soccer Trends

You can use the [editor on GitHub](https://github.com/BradySmith1019/dataviscourse-pr-soccertrends/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>The World's Game</title>
    <link rel="stylesheet" href="styles.css"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <script src="https://d3js.org/d3.v5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.19/topojson.js"></script>
    <script src="https://d3js.org/d3-geo-projection.v2.js"></script>
    <script src="js/map.js" async></script>
    <script src="js/infobox.js" async></script>
    <script src="js/linechart.js" async></script>
    <script src="js/table.js" async></script>
    <script src="js/topright.js" async></script>
    <script src="js/bracket.js" async></script>
    <script src="js/script.js" async></script>
</head>
<body>
    <div class="header">
        <h1>The World's Game</h1>
        <p class="info">World Cup Soccer Statistics by Michael Linnebach and Brady Smith</p>
    </div>
    <div class="wrapper">
        <div id="body-wrap" class="inner-wrapper">
            <div id="map-chart" class="view"></div>
            <div id="selected" class="view"></div>
            <div id="table" class="table">
                <table class="table">
                    <thead class=table-header>
                    <tr id="columnHeaders">
                        <th class="sortable">Year<i class="fas no-display"></i></th>
                        <th class="sortable">Host<i class="fas no-display"></i></th>
                        <th class="sortable">Champions<i class="fas no-display"></i></th>
                        <th class="sortable">Runner Up<i class="fas no-display"></i></th>
                        <th class="sortable">Third Place<i class="fas no-display"></i></th>
                        <th class="sortable">Countries Qualified<i class="fas no-display"></i></th>
                        <th class="sortable">Goals Per Game<i class="fas no-display"></i></th>
                        <th class="sortable">Attendance Per Game<i class="fas no-display"></i></th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><svg id="goalsAxis"></svg></td>
                        <td><svg id="attendenceAxis"></svg></td>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                </table>
            </div>
            <div id="bracket">
                <svg id="bracket-svg"></svg>
            </div>
            <div id="infobox" class="view"></div>
            <div id="line-chart" class="view"></div>
        </div>
    </div>
</body>
</html>