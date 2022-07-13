import { Country } from "../lib/country";
import { today } from "./dates";

const countryData: Country[] = require("../data/country_data.json").features;

countryData.sort((a, b) => {
  return a.properties.FLAG[1].localeCompare(b.properties.FLAG[1]);
});

const shuffleAdjust = today < "2022-08-01" ? "5" : "6";

function generateKeyNew(list: any[], day: string) {
  const [year, month, date] = day.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1";
  const key =
    Math.floor(dayCode / parseInt(SHUFFLE_KEY + shuffleAdjust)) % list.length;
  return key;
}

const key = generateKeyNew(countryData, today);

export const answerCountry = countryData[key];
export const answerName = answerCountry.properties.NAME;
