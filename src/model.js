import rawData from "./rushing.json";
import _ from "lodash";

const cleansedData = rawData.map(entry => ({
  player: entry.Player,
  team: entry.Team,
  pos: entry.Pos,
  attg: entry["Att/G"],
  att: entry.Att,
  yds:
    typeof entry.Yds === "string"
      ? parseInt(entry.Yds.replace(/,/g, ""))
      : entry.Yds,
  avg: entry.Avg,
  ydsg: entry["Yds/G"],
  td: entry.TD,
  lng: entry.Lng,
  first: entry["1st"],
  firstPercentage: entry["1st%"],
  twentyPlus: entry["20+"],
  fortyPlus: entry["40+"],
  fum: entry.FUM,
  __sort_Lng:
    typeof entry.Lng === "string"
      ? parseInt(entry.Lng.replace(/T/g, ""))
      : entry.Lng
}));

const dataSortedByYds = _.orderBy(cleansedData, "yds", "asc");
const dataSortedByLng = _.orderBy(cleansedData, "__sort_Lng", "asc");
const dataSortedByTD = _.orderBy(cleansedData, "td", "asc");

export const getSortedDataSet = (sortBy = "yds") =>
  sortBy === "yds"
    ? dataSortedByYds
    : sortBy === "lng"
    ? dataSortedByLng
    : sortBy === "td"
    ? dataSortedByTD
    : dataSortedByYds;

export const fieldNames = {
  player: "Player's name",
  team: "Player's team abreviation",
  pos: "Player's postion",
  attg: "Rushing Attempts Per Game Average",
  att: "Rushing Attempts",
  yds: "Total Rushing Yards",
  avg: "Rushing Average Yards Per Attempt",
  ydsg: "Rushing Yards Per Game",
  td: "Total Rushing Touchdowns",
  lng: "Longest Rush",
  first: "Rushing First Downs",
  firstPercentage: "Rushing First Down Percentage",
  twentyPlus: "Rushing 20+ Yards Each",
  fortyPlus: "Rushing 40+ Yards Each",
  fum: "Rushing Fumbles"
};

export const resolveData = ({ data, filter }) => {
  if (!data || !Array.isArray(data)) return [];

  return filter ? data.filter(entry => entry.player.includes(filter)) : data;
};
