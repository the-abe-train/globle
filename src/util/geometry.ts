import * as geometry from "spherical-geometry-js";
import {Country} from "../lib/country";

export function pointToCoordinates(point: Array<number>) {
    // In the data, coordinates are [E/W (lng), N/S (lat)]
    // In the function, coordinates are [N/S (lat), E/W (lng)]
    // For both, West and South are negative
    const [lng, lat] = point;
    const coord = new geometry.LatLng(lat, lng);
    return coord;
}

export function polygonPoints(country: Country): number[][] {
    const { geometry } = country;
    switch (geometry.type) {
        case "Polygon":
            return geometry.coordinates[0];
        case "MultiPolygon":
            let points: number[][] = [];
            for (const polygon of geometry.coordinates) {
                points = [...points, ...polygon[0]];
            }
            return points;
        default:
            throw new Error("Country data error");
    }
}
