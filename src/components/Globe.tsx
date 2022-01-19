// @ts-nocheck
import { useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import Data from "../sample_data.json";

import { scaleSequentialSqrt } from "d3-scale";
import { interpolateRdGy } from "d3-scale-chromatic";

type Country = {
  properties: {
    NAME: string;
    ISO_A2: string;
    TYPE: string;
  };
};

const guesses = Data.features
  .filter((country: Country) => {
    return country.properties.TYPE === "Sovereign country";
  })
  .slice(6, 37);

const answer = Data.features.find((country: Country) => {
  return country.properties.NAME === "Bulgaria";
});

export function Globe() {
  // Globe size settings
  const size = 400; // px on one side
  const extraStyle = {
    width: `${size}px`,
  };

  const globeRef = useRef<GlobeMethods>(null!);

  // Color scale
  const colorScale = scaleSequentialSqrt(interpolateRdGy);
  const getDistance = (guess: Country, answer: Country) => {
    // guess.properties.
    
    return 1
  }
  const getVal = (feat) => {
    return feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  };

  useEffect(() => {
    // @ts-ignore
    // globeRef.current.controls().autoRotate = true;
    console.log(globeRef.current);
    globeRef.current.camera().zoom = 1.4;
  }, []);

  return (
    <div className="mx-auto" style={extraStyle}>
      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        width={size}
        height={size}
        backgroundColor="#00000000"
        polygonsData={guesses}
        polygonCapColor={(d: Country) =>
          d.properties.NAME === "Bulgaria" ? "green" : colorScale(getVal(d))
        }
        onPolygonHover={(d) => console.log(d)}
      />
    </div>
  );
}
