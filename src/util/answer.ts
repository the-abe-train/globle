import { Country } from "../lib/country";

const countryData: Country[] = require("../country_data.json").features;

const validCountries = countryData
  .filter((c) => c.properties.TYPE === "Sovereign country")
  .sort((a, b) => a.properties.WOE_ID - b.properties.WOE_ID)
  .sort((a, b) => a.properties.POP_EST - b.properties.POP_EST)
  .sort((a, b) => a.properties.LABELRANK - b.properties.LABELRANK)
  .sort((a, b) => a.properties.MAPCOLOR7 - b.properties.MAPCOLOR7);
export const answerName = validCountries[7].properties.NAME;

// export const answerName = "Japan";

export const answerCountry = countryData.find(
  (c) => c.properties.NAME === answerName
);
