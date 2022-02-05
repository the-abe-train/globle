import { Country } from "../lib/country";
import { today } from "./dates";

const countryData: Country[] = require("../country_data.json").features;

const sortData = countryData.sort((a, b) => {
  return a.properties.FLAG[1].localeCompare(b.properties.FLAG[1]);
});

function generateKey(list: any[]) {
  const [year, month, date] = today.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1";
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY)) % list.length;
  return key;
}

const key = generateKey(sortData);

export const answerCountry = sortData[key];
export const answerName = answerCountry.properties.NAME;
