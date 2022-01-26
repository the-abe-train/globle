import { Country } from "../lib/country";

const countryData: Country[] = require("../country_data.json").features;

function generateKey(list: any[]) {
  const now = new Date();
  const [year, month, date] = now.toLocaleDateString("en-CA").split("-");
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
