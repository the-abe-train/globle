import { scaleSequentialSqrt } from "d3-scale";
import { interpolateBuPu, interpolateOrRd, interpolateGreys } from "d3-scale-chromatic";
import { Country } from "../lib/country";
import { polygonDistance } from "./distance";

export const getColour = (
  guess: Country,
  answer: Country,
  nightMode: boolean,
  highContrast: boolean
) => {
  if (guess.properties.NAME === answer.properties.NAME) return "green";
  if (guess.proximity == null) {
    guess["proximity"] = polygonDistance(guess, answer);
  }
  const gradient = highContrast ? interpolateGreys : (nightMode ? interpolateBuPu : interpolateOrRd);
  const colorScale = scaleSequentialSqrt(gradient).domain([15_000_000, 0]);
  const colour = colorScale(guess.proximity);
  return colour;
};
