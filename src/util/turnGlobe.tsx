import { useRef } from "react";
import { GlobeMethods } from "react-globe.gl";

export function turnGlobe(
  coords: {
    lat: number;
    lng: number;
    altitude?: number;
  },
  globeRef: React.MutableRefObject<GlobeMethods>
) {
  // const globeRef = useRef<GlobeMethods>(null!);
  // @ts-ignore
  globeRef.current.controls().autoRotate = false;
  const currentAlt = globeRef.current.pointOfView().altitude;
  coords["altitude"] = Math.max(currentAlt, 1.4);
  globeRef.current.pointOfView(coords);
  
}
