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
  coords["altitude"] = Math.max(currentAlt, 0.5);
  globeRef.current.pointOfView(coords, 250);
}
