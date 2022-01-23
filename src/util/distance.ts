import * as geometry from "spherical-geometry-js";
import { Country } from "../lib/country";
import { answerCountry } from "./answer";

function pointToCoordinates(point: Array<number>) {
  // In the data, coordinates are [E/W (lng), N/S (lat)]
  // In the function, coordinates are [N/S (lat), E/W (lng)]
  // For both, West and South are negative
  const [lng, lat] = point;
  const coord = new geometry.LatLng(lat, lng);
  return coord;
}

function polygonPoints(country: Country): number[][] {
  const { geometry } = country;
  const { type } = geometry;
  let points: number[][] = [];
  switch (type) {
    case "Polygon":
      points = geometry.coordinates[0];
      return points;
    case "MultiPolygon":
      for (const polygon of geometry.coordinates[0]) {
        points = [...points, ...polygon];
      }
      return points;
  }
}

function calcProximity(points1: number[][], points2: number[][]) {
  // Find min distance between 2 sets of points
  let proximity = 40_075_000 / 2;
  for (let i = 0; i < points1.length; i++) {
    const point1 = points1[i];
    const coord1 = pointToCoordinates(point1);
    for (let j = 0; j < points2.length; j++) {
      const point2 = points2[j];
      const coord2 = pointToCoordinates(point2);
      const distance = geometry.computeDistanceBetween(coord1, coord2);
      proximity = Math.min(proximity, distance);
    }
  }
  return proximity;
}

function polygonDistance(country1: Country, country2: Country) {
  const points1 = polygonPoints(country1);
  const points2 = polygonPoints(country2);
  return calcProximity(points1, points2);
}

export function addProximity(guessCountry: Country) {
  // TODO it may not be wise to have proximity in the state in case the
  // user can see it.
  if (!answerCountry) throw "Answer country not found";
  const distance = polygonDistance(guessCountry, answerCountry);
  // const maxDistance = 40_075_000 / 2; // Half of circumference of Earth
  const maxDistance = 40_000_000;  // 
  const proximity = 1 - Math.min(distance / maxDistance, 1);
  guessCountry["proximity"] = proximity;
  return guessCountry;
}
