import { browserVersion, isSafari } from "react-device-detect";
import { GlobeMethods } from "react-globe.gl";

export function turnGlobe(
  coords: {
    lat: number;
    lng: number;
    altitude?: number;
  },
  globeRef: React.MutableRefObject<GlobeMethods>
) {
  const controls: any = globeRef.current.controls();
  controls.autoRotate = false;
  const currentAlt = globeRef.current.pointOfView().altitude;
  coords["altitude"] = Math.max(currentAlt, 0.05);
  globeRef.current.pointOfView(coords, 250);
}

export const globeImg = (nightMode: boolean) => {
  const time = nightMode ? "night" : "day";
  if (isSafari && browserVersion < "14") {
    return `images/safari-14-earth-${time}.jpg`;
  } else {
    return `images/earth-${time}.webp`;
  }
};
