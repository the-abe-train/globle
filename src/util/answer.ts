import { Country } from "../lib/country";
import { today } from "./dates";

const countryData: Country[] = require("../country_data.json").features;

function generateKey(list: any[]) {
  const [year, month, date] = today.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const SHUFFLE_KEY = process.env.REACT_APP_SHUFFLE_KEY || "1";
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY)) % list.length;
  return key;
}

const validCountries = countryData.filter(
  (c) => c.properties.TYPE === "Sovereign country"
);

const key = generateKey(validCountries);

export const answerCountry = validCountries[key];
export const answerName = answerCountry.properties.NAME;
