import { Country } from "../lib/country";
import { today } from "./dates";

const countryData: Country[] = require("../data/country_data.json").features;

const sortData = countryData.sort((a, b) => {
  return a.properties.FLAG[1].localeCompare(b.properties.FLAG[1]);
});

function generateKeyOld(list: any[]) {
  const [year, month, date] = today.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1";
  console.log(SHUFFLE_KEY);
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY)) % list.length;
  return key;
}

function generateKeyNew(list: any[]) {
  const [year, month, date] = today.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1";
  console.log(SHUFFLE_KEY);
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY + "5")) % list.length;
  return key;
}

let key: number;
if (today <= "2022-02-16") {
  key = generateKeyOld(sortData);
} else {
  key = generateKeyNew(countryData);
}

export const answerCountry = countryData[key];
export const answerName = answerCountry.properties.NAME;

console.log(today, key, answerName);
