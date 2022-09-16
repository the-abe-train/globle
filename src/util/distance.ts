import * as geometry from "spherical-geometry-js";
import { Country } from "../lib/country";
import {polygonPoints, pointToCoordinates} from "./geometry"

function calcProximity(points1: number[][], points2: number[][]) {
  // Find min distance between 2 sets of points
  const EARTH_CIRCUMFERENCE = 40_075_000;
  let distance = EARTH_CIRCUMFERENCE / 2;
  for (let i = 0; i < points1.length; i++) {
    const point1 = points1[i];
    const coord1 = pointToCoordinates(point1);
    for (let j = 0; j < points2.length; j++) {
      const point2 = points2[j];
      const coord2 = pointToCoordinates(point2);
      const pointDistance = geometry.computeDistanceBetween(coord1, coord2);
      distance = Math.min(distance, pointDistance);
    }
  }
  // console.log("Country 1 points:", points1.length);
  // console.log("Country 2 points:", points2.length);
  // console.log("Total paths measured:", points1.length * points2.length);
  // console.log("Proximity is:", distance);
  return distance;
}

export function polygonDistance(country1: Country, country2: Country) {
  // console.log("Country 1:", country1.properties.NAME);
  // console.log("Country 2", country2.properties.NAME);
  const name1 = country1.properties.NAME;
  const name2 = country2.properties.NAME;
  if (name1 === "South Africa" && name2 === "Lesotho") return 0;
  if (name1 === "Lesotho" && name2 === "South Africa") return 0;
  if (name1 === "Italy" && name2 === "Vatican") return 0;
  if (name1 === "Vatican" && name2 === "Italy") return 0;
  if (name1 === "Italy" && name2 === "San Marino") return 0;
  if (name1 === "San Marino" && name2 === "Italy") return 0;
  const points1 = polygonPoints(country1);
  const points2 = polygonPoints(country2);
  return calcProximity(points1, points2);
}
