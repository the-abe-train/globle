import { useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

import { scaleSequentialSqrt } from "d3-scale";
import { interpolateRdGy } from "d3-scale-chromatic";
import { polygonDistance } from "../util/distance";
import Data from "../country_data.json";

const guesses = Data.features.filter((country) => {
  return (
    country.properties.TYPE === "Sovereign country" ||
    country.properties.TYPE === "Country"
  );
});
// .slice(6, 37);

export function Globe() {
  // Globe size settings
  const size = 500; // px on one side
  const extraStyle = {
    width: `${size}px`,
  };

  const answer = Data.features.find((country) => {
    return country.properties.NAME === "Mexico";
  });

  // Color scale
  const getColour = (guess: any, answer: any) => {
    // Typescript wasn't playing nice here so removed typing
    if (!answer) throw "e";
    if (guess.properties.NAME === answer.properties.NAME) return "green";
    const colorScale = scaleSequentialSqrt(interpolateRdGy);
    const distance = polygonDistance(guess, answer);
    const maxDistance = 40_075_000 / 2; // Half of circumference of Earth
    const fraction = distance / maxDistance;
    const colour = colorScale(fraction);
    return colour;
  };

  const globeRef = useRef<GlobeMethods>(null!);
  useEffect(() => {
    // @ts-ignore
    // globeRef.current.controls().autoRotate = true;
    // console.log(globeRef.current);
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
        polygonCapColor={(d) => getColour(d, answer)}
        // onPolygonHover={(d) => console.log(d)}
      />
    </div>
  );
}
