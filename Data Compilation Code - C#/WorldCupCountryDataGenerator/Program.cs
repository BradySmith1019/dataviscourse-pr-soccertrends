using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using LumenWorks.Framework.IO.Csv;

namespace WorldCupCountryDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var csvTable = new DataTable();
            Dictionary<string, CsvTableRow> countryData = new Dictionary<string, CsvTableRow>();
            using (var csvReader = new CsvReader(new StreamReader(System.IO.File.OpenRead(@"WorldCupMatches.csv")), true))
            {
                csvTable.Load(csvReader);
            }

            for (int i = 0; i < csvTable.Rows.Count; i++)
            {
                if (!countryData.ContainsKey(csvTable.Rows[i][5].ToString())) 
                    countryData.Add(csvTable.Rows[i][5].ToString(), new CsvTableRow(csvTable.Rows[i][5].ToString()));
                if (!countryData.ContainsKey(csvTable.Rows[i][8].ToString()))
                    countryData.Add(csvTable.Rows[i][8].ToString(), new CsvTableRow(csvTable.Rows[i][8].ToString()));
            }

            for (int i = 0; i < csvTable.Rows.Count; i++)
            {
                int year = int.Parse(csvTable.Rows[i][0].ToString());
                string stage = csvTable.Rows[i][2].ToString();
                if (stage.StartsWith("Group"))
                    stage = "Group Stage";
                if (stage == "Quarter-finals")
                    stage = "Quarterfinalists";
                if (stage == "Semi-finals")
                    stage = "Semifinalists";
                string homeTeam = csvTable.Rows[i][5].ToString();
                string homeTeamGoalsString = csvTable.Rows[i][6].ToString();
                string awayTeamGoalsString = csvTable.Rows[i][7].ToString();
                string awayTeam = csvTable.Rows[i][8].ToString();

                int homeGoals = 0;
                int homePenalties = 0;
                int awayGoals = 0;
                int awayPenalties = 0; ;
                if(homeTeamGoalsString.Length > 2)
                {
                    homeGoals = int.Parse(homeTeamGoalsString[0].ToString());
                    homePenalties = int.Parse(homeTeamGoalsString[3].ToString());
                    awayGoals = int.Parse(awayTeamGoalsString[0].ToString());
                    awayPenalties = int.Parse(homeTeamGoalsString[3].ToString());
                }
                else
                {
                    homeGoals = int.Parse(homeTeamGoalsString);
                    awayGoals = int.Parse(awayTeamGoalsString);
                }

                bool homeWin = false;
                CsvTableRow homeTeamData = countryData[homeTeam];
                CsvTableRow awayTeamData = countryData[awayTeam];

                homeTeamData.GamesPlayed++;
                awayTeamData.GamesPlayed++;

                homeTeamData.GoalsScored += homeGoals;
                homeTeamData.GoalsConceded += awayGoals;

                awayTeamData.GoalsScored += awayGoals;
                awayTeamData.GoalsConceded += homeGoals;

                if (homeGoals > awayGoals)
                {
                    homeWin = true;
                    homeTeamData.Wins++;
                    awayTeamData.Losses++;
                }
                else if (homeGoals < awayGoals)
                {
                    homeWin = false;
                    awayTeamData.Wins++;
                    homeTeamData.Losses++;
                }
                else
                {
                    if(homePenalties == 0 && awayPenalties == 0)
                    {
                        homeWin = false;
                        homeTeamData.Draws++;
                        awayTeamData.Draws++;
                    }
                    else if(homePenalties > awayPenalties)
                    {
                        homeWin = true;
                        homeTeamData.Wins++;
                        awayTeamData.Losses++;
                    }
                    else
                    {
                        homeWin = false;
                        awayTeamData.Wins++;
                        homeTeamData.Losses++;
                    }
                }

                if (year == 1930)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1930 = "Third Place";
                        else
                            awayTeamData.Finish1930 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1930 = "Winners";
                            awayTeamData.Finish1930 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1930 = "Winners";
                            homeTeamData.Finish1930 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1930 = stage;
                        awayTeamData.Finish1930 = stage;
                    }
                }

                if (year == 1934)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1934 = "Third Place";
                        else
                            awayTeamData.Finish1934 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1934 = "Winners";
                            awayTeamData.Finish1934 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1934 = "Winners";
                            homeTeamData.Finish1934 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1934 = stage;
                        awayTeamData.Finish1934 = stage;
                    }
                }

                if (year == 1938)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1938 = "Third Place";
                        else
                            awayTeamData.Finish1938 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1938 = "Winners";
                            awayTeamData.Finish1938 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1938 = "Winners";
                            homeTeamData.Finish1938 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1938 = stage;
                        awayTeamData.Finish1938 = stage;
                    }
                }

                if (year == 1950)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1950 = "Third Place";
                        else
                            awayTeamData.Finish1950 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1950 = "Winners";
                            awayTeamData.Finish1950 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1950 = "Winners";
                            homeTeamData.Finish1950 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1950 = stage;
                        awayTeamData.Finish1950 = stage;
                    }
                }

                if (year == 1954)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1954 = "Third Place";
                        else
                            awayTeamData.Finish1954 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1954 = "Winners";
                            awayTeamData.Finish1954 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1954 = "Winners";
                            homeTeamData.Finish1954 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1954 = stage;
                        awayTeamData.Finish1954 = stage;
                    }
                }

                if (year == 1958)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1958 = "Third Place";
                        else
                            awayTeamData.Finish1958 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1958 = "Winners";
                            awayTeamData.Finish1958 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1958 = "Winners";
                            homeTeamData.Finish1958 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1958 = stage;
                        awayTeamData.Finish1958 = stage;
                    }
                }


                if (year == 1962)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1962 = "Third Place";
                        else
                            awayTeamData.Finish1962 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1962 = "Winners";
                            awayTeamData.Finish1962 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1962 = "Winners";
                            homeTeamData.Finish1962 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1962 = stage;
                        awayTeamData.Finish1962 = stage;
                    }
                }

                if (year == 1966)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1966 = "Third Place";
                        else
                            awayTeamData.Finish1966 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1966 = "Winners";
                            awayTeamData.Finish1966 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1966 = "Winners";
                            homeTeamData.Finish1966 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1966 = stage;
                        awayTeamData.Finish1966 = stage;
                    }
                }

                if (year == 1970)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1970 = "Third Place";
                        else
                            awayTeamData.Finish1970 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1970 = "Winners";
                            awayTeamData.Finish1970 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1970 = "Winners";
                            homeTeamData.Finish1970 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1970 = stage;
                        awayTeamData.Finish1970 = stage;
                    }
                }

                if (year == 1974)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1974 = "Third Place";
                        else
                            awayTeamData.Finish1974 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1974 = "Winners";
                            awayTeamData.Finish1974 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1974 = "Winners";
                            homeTeamData.Finish1974 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1974 = stage;
                        awayTeamData.Finish1974 = stage;
                    }
                }

                if (year == 1978)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1978 = "Third Place";
                        else
                            awayTeamData.Finish1978 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1978 = "Winners";
                            awayTeamData.Finish1978 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1978 = "Winners";
                            homeTeamData.Finish1978 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1978 = stage;
                        awayTeamData.Finish1978 = stage;
                    }
                }

                if (year == 1982)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1982 = "Third Place";
                        else
                            awayTeamData.Finish1982 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1982 = "Winners";
                            awayTeamData.Finish1982 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1982 = "Winners";
                            homeTeamData.Finish1982 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1982 = stage;
                        awayTeamData.Finish1982 = stage;
                    }
                }

                if (year == 1986)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1986 = "Third Place";
                        else
                            awayTeamData.Finish1986 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1986 = "Winners";
                            awayTeamData.Finish1986 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1986 = "Winners";
                            homeTeamData.Finish1986 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1986 = stage;
                        awayTeamData.Finish1986 = stage;
                    }
                }

                if (year == 1990)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1990 = "Third Place";
                        else
                            awayTeamData.Finish1990 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1990 = "Winners";
                            awayTeamData.Finish1990 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1990 = "Winners";
                            homeTeamData.Finish1990 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1990 = stage;
                        awayTeamData.Finish1990 = stage;
                    }
                }

                if (year == 1994)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1994 = "Third Place";
                        else
                            awayTeamData.Finish1994 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1994 = "Winners";
                            awayTeamData.Finish1994 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1994 = "Winners";
                            homeTeamData.Finish1994 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1994 = stage;
                        awayTeamData.Finish1994 = stage;
                    }
                }

                if (year == 1998)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish1998 = "Third Place";
                        else
                            awayTeamData.Finish1998 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish1998 = "Winners";
                            awayTeamData.Finish1998 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish1998 = "Winners";
                            homeTeamData.Finish1998 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish1998 = stage;
                        awayTeamData.Finish1998 = stage;
                    }
                }

                if (year == 2002)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish2002 = "Third Place";
                        else
                            awayTeamData.Finish2002 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish2002 = "Winners";
                            awayTeamData.Finish2002 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish2002 = "Winners";
                            homeTeamData.Finish2002 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish2002 = stage;
                        awayTeamData.Finish2002 = stage;
                    }
                }

                if (year == 2006)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish2006 = "Third Place";
                        else
                            awayTeamData.Finish2006 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish2006 = "Winners";
                            awayTeamData.Finish2006 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish2006 = "Winners";
                            homeTeamData.Finish2006 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish2006 = stage;
                        awayTeamData.Finish2006 = stage;
                    }
                }

                if (year == 2010)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish2010 = "Third Place";
                        else
                            awayTeamData.Finish2010 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish2010 = "Winners";
                            awayTeamData.Finish2010 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish2010 = "Winners";
                            homeTeamData.Finish2010 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish2010 = stage;
                        awayTeamData.Finish2010 = stage;
                    }
                }

                if (year == 2014)
                {
                    if (stage.Contains("third") || stage.Contains("Third"))
                    {
                        if (homeWin)
                            homeTeamData.Finish2014 = "Third Place";
                        else
                            awayTeamData.Finish2014 = "Third Place";
                    }
                    else if (stage == "Final")
                    {
                        if (homeWin)
                        {
                            homeTeamData.Finish2014 = "Winners";
                            awayTeamData.Finish2014 = "Runners-Up";
                            homeTeamData.WorldCupWins++;
                        }
                        else
                        {
                            awayTeamData.Finish2014 = "Winners";
                            homeTeamData.Finish2014 = "Runners-Up";
                            awayTeamData.WorldCupWins++;
                        }
                    }
                    else
                    {
                        homeTeamData.Finish2014 = stage;
                        awayTeamData.Finish2014 = stage;
                    }
                }
            }

            foreach (CsvTableRow countryRow in countryData.Values)
            {
                countryRow.AllTimeRecordString = countryRow.Wins.ToString() + "-" + countryRow.Losses.ToString() + "-" + countryRow.Draws.ToString();
                countryRow.GoalsConcededPerGame = (double)countryRow.GoalsConceded / (double)countryRow.GamesPlayed;
                countryRow.GoalsPerGame = (double)countryRow.GoalsScored / (double)countryRow.GamesPlayed;
                string[] placementStrings = new string[]{"Winners", "Runners-Up", "Third Place", "Semifinalists", "Quarterfinalists", "Round of 16", "Group Stage"};
                foreach(string s in placementStrings)
                {
                    if(countryRow.Finish2014 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "2014";
                        break;
                    }

                    else if (countryRow.Finish2010 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "2010";
                        break;
                    }

                    else if (countryRow.Finish2006 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "2006";
                        break;
                    }

                    else if (countryRow.Finish2002 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "2002";
                        break;
                    }

                    else if (countryRow.Finish1998 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1998";
                        break;
                    }

                    else if (countryRow.Finish1994 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1994";
                        break;
                    }

                    else if (countryRow.Finish1990 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1990";
                        break;
                    }

                    else if (countryRow.Finish1986 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1986";
                        break;
                    }

                    else if (countryRow.Finish1982 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1982";
                        break;
                    }

                    else if (countryRow.Finish1978 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1978";
                        break;
                    }

                    else if (countryRow.Finish1974 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1974";
                        break;
                    }

                    else if (countryRow.Finish1970 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1970";
                        break;
                    }

                    else if (countryRow.Finish1966 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1966";
                        break;
                    }

                    else if (countryRow.Finish1962 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1962";
                        break;
                    }

                    else if (countryRow.Finish1958 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1958";
                        break;
                    }

                    else if (countryRow.Finish1954 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1954";
                        break;
                    }

                    else if (countryRow.Finish1950 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1950";
                        break;
                    }

                    else if (countryRow.Finish1938 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1938";
                        break;
                    }

                    else if (countryRow.Finish1934 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1934";
                        break;
                    }

                    else if (countryRow.Finish1930 == s)
                    {
                        countryRow.HighestEverFinish = s + "-" + "1930";
                        break;
                    }

                    else { }
                }
            }

            using(var w = new StreamWriter(@"WorldCupCountries.csv"))
            {
                w.WriteLine("Country,1930Finish,1934Finish,1938Finish,1950Finish,1954Finish,1958Finish,1962Finish,1966Finish,1970Finish,1974Finish,1978Finish,1982Finish,1986Finish,1990Finish,1994Finish,1998Finish" +
                    ",2002Finish,2006Finish,2010Finish,2014Finish,GoalsScored,AllTimeRecord,HighestEverFinish,WorldCupWins,GoalsPerGame,GoalsConceded,GoalsConcededPerGame");
                w.Flush();
                foreach(CsvTableRow row in countryData.Values)
                {
                    w.WriteLine(row.country + "," + row.Finish1930 + "," + row.Finish1934 + "," + row.Finish1938 + "," + row.Finish1950 + "," + row.Finish1954 + "," + row.Finish1958 + "," + row.Finish1962 + ","
                        + row.Finish1966 + "," + row.Finish1970 + "," + row.Finish1974 + "," + row.Finish1978 + "," + row.Finish1982 + "," + row.Finish1986 + "," + row.Finish1990 + "," + row.Finish1994 + ","
                        + row.Finish1998 + "," + row.Finish2002 + "," + row.Finish2006 + "," + row.Finish2010 + "," + row.Finish2014 + "," + row.GoalsScored + "," + row.AllTimeRecordString + "," +
                        row.HighestEverFinish + "," + row.WorldCupWins + "," + row.GoalsPerGame + "," + row.GoalsConceded + "," + row.GoalsConcededPerGame);
                    w.Flush();
                }
            }
        }

        private class CsvTableRow
        {
            public string country;
            public string Finish1930;
            public string Finish1934;
            public string Finish1938;
            public string Finish1950;
            public string Finish1954;
            public string Finish1958;
            public string Finish1962;
            public string Finish1966;
            public string Finish1970;
            public string Finish1974;
            public string Finish1978;
            public string Finish1982;
            public string Finish1986;
            public string Finish1990;
            public string Finish1994;
            public string Finish1998;
            public string Finish2002;
            public string Finish2006;
            public string Finish2010;
            public string Finish2014;
            public int GamesPlayed;
            public int GoalsScored;
            public int Wins;
            public int Losses;
            public int Draws;
            public string AllTimeRecordString;
            public string HighestEverFinish;
            public int WorldCupWins;
            public double GoalsPerGame;
            public int GoalsConceded;
            public double GoalsConcededPerGame;

            public CsvTableRow(string country)
            {
                this.country = country;
                Finish1930 = "Did Not Qualify";
                Finish1934 = "Did Not Qualify";
                Finish1938 = "Did Not Qualify";
                Finish1950 = "Did Not Qualify";
                Finish1954 = "Did Not Qualify";
                Finish1958 = "Did Not Qualify";
                Finish1962 = "Did Not Qualify";
                Finish1966 = "Did Not Qualify";
                Finish1970 = "Did Not Qualify";
                Finish1974 = "Did Not Qualify";
                Finish1978 = "Did Not Qualify";
                Finish1982 = "Did Not Qualify";
                Finish1986 = "Did Not Qualify";
                Finish1990 = "Did Not Qualify";
                Finish1994 = "Did Not Qualify";
                Finish1998 = "Did Not Qualify";
                Finish2002 = "Did Not Qualify";
                Finish2006 = "Did Not Qualify";
                Finish2010 = "Did Not Qualify";
                Finish2014 = "Did Not Qualify";
                AllTimeRecordString = "";
                HighestEverFinish = "Did Not Qualify";
                GamesPlayed = 0;
                GoalsScored = 0;
                Wins = 0;
                Losses = 0;
                Draws = 0;
                WorldCupWins = 0;
                GoalsPerGame = 0;
                GoalsConceded = 0;
                GoalsConcededPerGame = 0;
            }
        }
    }
}
