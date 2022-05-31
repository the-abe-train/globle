import { scaleSequentialSqrt } from "d3-scale";
import {
  interpolateBuPu,
  interpolateOrRd,
  interpolateGreys,
  interpolateTurbo,
} from "d3-scale-chromatic";
import { Country } from "../lib/country";
import { polygonDistance } from "./distance";

const GREEN_SQUARE = "🟩";
const ORANGE_SQUARE = "🟧";
const RED_SQUARE = "🟥";
const WHITE_SQUARE = "⬜";
const YELLOW_SQUARE = "🟨";

const MAX_DISTANCE = 15_000_000;

export const getColour = (
  guess: Country,
  answer: Country,
  nightMode: boolean,
  highContrast: boolean,
  prideMode: boolean
) => {
  if (guess.properties?.TYPE === "Territory") {
    if (highContrast) return "white";
    return "#BBBBBB";
  }
  if (guess.properties.NAME === answer.properties.NAME) return "green";
  if (guess.proximity == null) {
    guess["proximity"] = polygonDistance(guess, answer);
  }
  const gradient = highContrast
    ? interpolateGreys
    : prideMode
    ? interpolateTurbo
    : nightMode
    ? interpolateBuPu
    : interpolateOrRd;
  const colorScale = scaleSequentialSqrt(gradient).domain([MAX_DISTANCE, 0]);
  const colour = colorScale(guess.proximity);
  return colour;
};

export const getColourEmoji = (guess: Country, answer: Country) => {
  if (guess.properties.NAME === answer.properties.NAME) return GREEN_SQUARE;
  if (guess.proximity == null) {
    guess["proximity"] = polygonDistance(guess, answer);
  }
  const scale = guess.proximity / MAX_DISTANCE;
  if (scale < 0.1) {
    return RED_SQUARE;
  } else if (scale < 0.25) {
    return ORANGE_SQUARE;
  } else if (scale < 0.5) {
    return YELLOW_SQUARE;
  } else {
    return WHITE_SQUARE;
  }
};
