# dataviscourse-pr-soccertrends

This is a github project for a visualization displaying world cup data.

URL to our visualization website: 

URL to our visualization demonstration video:

Overall, we feel like our visualization is pretty straight forward and easy to use. The only thing that may not
be clear right off is that when you first load the visualization it is a fairly large visualizaion and therefore
if you do not scroll down you may miss the selected country infobox and the selected country line chart. If you
would like more specifics about the visualizaiton please read the visualization description below then the 
repository description below this explains what each part of the repository is doing.

Visualization Description:

Our visualization consists of 6 different views, a world map, a table, a bracket, two infoboxes, and a line chart.

Firstly, there is an infobox in the top right which displays basic information. It lists the currently selected country
and the currently selected world cup. As a default the currently selected country will be France and the currently 
selected world cup will be 2014. Also contained here are instructions for the user telling them that in order to select
a country you can click on it in the world map and in order to select a world cup year you can use the year slider. The
year slider is also in this general area and it allows you to drag it to select any valid world cup year 1930-2014. It
will move in four year increments since the world cup is played every four years except it will jump from 1938 to 1950
because no world cups were held in 1942 and 1946 due to world war II.

Then, to the left of this infobox in the top left is the world map which is what allows you to select a country as previously
mentioned. Also the world map encodes the currently selected country by filling it in with magenta. Similarly it encodes the
winning, runners-up, and third place country by filling them in with gold, silver, and bronze respectively. Also it encodes the 
host of the currently selected world cup by giving it a black and thicker border.

Below the world map in the middle left is our table. This shows the data for all world cups ever played in history. It states the
year that they took place, the host, winning, runners-up, and third place countries, the number of teams that qualified for the 
tournament, and the average number of goals and attendence per game. This is designed to let you see all basic information for any
world cup. Also if you click on the header of any column in the table the table will be sorted by that column.

To the right of the Table and below the top right infobox is the Bracket selection. In this part of the visualization the knockout
round bracket for the currently selected world cup is drawn with the exception being the 1950 world cup which is the only world
cup to not have any sort of knockout round. You may notice that the same size of bracket is not drawn for every world cup and this
is intentional because not every tournament has the same size knockout round. For some the knockout round started in the final while
for others the knockout round started in the semifinals, quarterfinals, or round of 16.

Below the Table in the bottom left is the second infobox which is the currently selected country infobox. This is meant to give some
interesting details about how the currently selected country has performed at world cups. It lists the countries name, their overall
world cup record, their highest ever finish and in which world cup it occured, the number of world cups they have one, the average 
number of goals they have scored per game, and the average number of goals they have conceded per game.

Then, the last part of the visualization is to the right of the currently selected country infobox and below the bracket in the bottom
right. This is the line chart which plots how the currently selected country has performed at every world cup thorughout history. Every
finsih from did not qualify to winners is plotted and it can help you see which countries were dominant in the past but not now and which
countries are on the rise in terms of world cup finshes.

Repository Description:

The .vs code folder contians basic information used to run the code in visual studio code which is what we were designing it in.

The Data Compilation Code - C# file contians a C# method that was used to take the match data and transform it into the country data for
our visualization.

The data folder contains all data used for our visualization this is what the javascript files read in order to determine how to display the
visualization. It contains a json file that was used to draw the world map and also contains multiple csv files which hold the general world
cup data, match data, and the data for a specific countries at the world cup.

The js folder contains our javascript code that actually renders the visualization. The script.js folder is the one that is ran upon startup
and it constructs and updates all of the views when necessary. Then, all other js files are used to specifically compose one specific part of 
the visualization and are named based on what they are rendering in the visualization.

The Process Book.docx file contains our process book this describes our project from beginning to end documenting how our work on the
visualization proceeded.

The debug.log file can be ignored this is pushed when committing from Visual Studio code and contains no information important to the project

The index.html file sets up the basic HTML layout of the code and also constructs the code so that it calls the necessary javascript files in 
the js folder to compose the entire visualization. This is the file that actually gets called upon to display the visualization on the webpage.

styles.css 
Contians basic styling information used for displaying the visualization. It contains a wide array of classes that are used to properly display
the visualization.
