import * as geometry from "spherical-geometry-js";
import {Country, Direction} from "../lib/country";
import {polygonPoints} from "./geometry"

function average(values: number[]) {
    if (values.length === 0) {
        return null;
    }

    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / values.length;
}

// very silly implementation of centroid that's good enough for our purposes
// suggestion: use https://www.npmjs.com/package/geolib
function polygonNaiveCentroid(points: number[][]) {
    const lat = average(points.map(point => point[0]));
    const lng = average(points.map(point => point[1]));
    return [lat, lng] as [number, number];
}

function calcDirection(centroid1: [number, number], centroid2: [number, number]): Direction {
    const heading = geometry.computeHeading(centroid1, centroid2);
    // console.log('heading', heading);
    if (heading > 157.5 || heading < -157.5) {
        return 'S';
    }
    if (heading < -112.5) {
        return 'SW';
    }
    if (heading < -67.5) {
        return 'W';
    }
    if (heading < -22.5) {
        return 'NW';
    }
    if (heading < 22.5) {
        return 'N';
    }
    if (heading < 67.5) {
        return 'NE';
    }
    if (heading < 112.5) {
        return 'E';
    }
    if (heading < 157.5) {
        return 'SE';
    }
    throw new Error('Could not determine direction, expected -180 < heading < 180, got ' + heading);
}

export function polygonDirection(country1: Country, country2: Country): Direction {
    const points1 = polygonPoints(country1);
    const points2 = polygonPoints(country2);
    const centroid1 = polygonNaiveCentroid(points1);
    const centroid2 = polygonNaiveCentroid(points2);
    // console.log('determining direction from', country1.properties.ADMIN, 'to', country2.properties.ADMIN);
    const result = calcDirection(centroid1, centroid2);
    // console.log('direction', result);
    return result;
}
