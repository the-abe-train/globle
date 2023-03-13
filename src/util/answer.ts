import { Country } from "../lib/country";
import { today } from "./dates";

const countryData: Country[] = require("../data/country_data.json").features;

countryData.sort((a, b) => {
  return a.properties.FLAG[1].localeCompare(b.properties.FLAG[1]);
});

function generateKeyNew(list: any[], day: string) {
  const [year, month, date] = day.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  return Math.floor(list.length * mulberry32(dayCode));
}

/**
 * Mulberry32 PRNG (JS)
 * @link https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
 * 
 * Ported from the original C implementation
 * @author Tommy Ettinger
 * @link https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * @license Public Domain 
 */
function mulberry32(a: number) {
  a |= 0; a = a + 0x6D2B79F5 | 0;
  var t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const key = generateKeyNew(countryData, today);

export const answerCountry = countryData[key];
export const answerName = answerCountry.properties.NAME;
