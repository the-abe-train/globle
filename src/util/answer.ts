import { Country } from "../lib/country";

const countryData: Country[] = require("../country_data.json").features;

// TODO and environment variable encryption key so people don't know the answer by looking at the code!

function generateKey(list: any[]) {
  const now = new Date();
  let [year, month, date] = now.toLocaleDateString().split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  // const key = dayCode % list.length;
  const key = (54654654) % list.length
  return key
}

const validCountries = countryData.filter(
  (c) => c.properties.TYPE === "Sovereign country"
);

const key = generateKey(validCountries);

export const answerCountry = validCountries[key];
export const answerName = answerCountry.properties.NAME;

// export const answerName = "Japan";
// export const answerCountry = countryData.find((c) => {
//   return c.properties.NAME === "Japan"
// })