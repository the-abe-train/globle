import { Country } from '../lib/country';

export function findCentre(country: Country) {
  const { bbox } = country;
  const [lng1, lat1, lng2, lat2] = bbox;
  let latitude = (lat1 + lat2) / 2;
  const longitude = (lng1 + lng2) / 2;
  return {lat: latitude, lng: longitude};
}


