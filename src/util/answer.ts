import { Country } from "../lib/country";

const countryData: Country[] = require("../country_data.json").features;

function generateKey(list: any[]) {
  const now = new Date();
  let [year, month, date] = now.toLocaleDateString().split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const key = dayCode % list.length;
  return key;
}

const validCountries = countryData.filter(
  (c) => c.properties.TYPE === "Sovereign country"
);

const key = generateKey(validCountries);

export const answerCountry = validCountries[key];
export const answerName = answerCountry.properties.NAME;
