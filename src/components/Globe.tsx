import { useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

import { scaleSequentialSqrt } from "d3-scale";
import { interpolateRdGy } from "d3-scale-chromatic";
import { polygonDistance } from "../util/distance";
import { Country } from "../lib/country";
import { findCentre } from "../util/centre";
import answer from "../answer.json";
import { answerName } from "../util/answer";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  guesses: Country[];
};

export function Globe({ guesses }: Props) {
  // Globe size settings
  const size = 500; // px on one side
  const extraStyle = {
    width: `${size}px`,
  };

  // Answer
  // const answerCountry = countryData.find((country) => {
  //   return country.properties.NAME === answer.name;
  // });

  // Color scale
  const getColour = (guess: Country) => {
    if (guess.properties.NAME === answerName()) return "green";
    if (guess.proximity == null) throw "e";
    const colorScale = scaleSequentialSqrt(interpolateRdGy);
    const colour = colorScale(guess.proximity);
    return colour;
  };

  const globeRef = useRef<GlobeMethods>(null!);

  // After each guess
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = false;
    const newGuess = [...guesses].pop();
    if (newGuess) {
      const newSpot = findCentre(newGuess);
      globeRef.current.pointOfView(newSpot, 0);
    }
  }, [guesses]);

  function changeView(coords: { lat: number; lng: number }) {
    // @ts-ignore
    globeRef.current.controls().autoRotate = false;
    globeRef.current.pointOfView(coords);
    // console.log("Click POV", globeRef.current.pointOfView());
  }

  // On first render
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
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
        // @ts-ignore
        polygonCapColor={getColour}
        // @ts-ignore
        polygonLabel={({ properties: d }) => `
        <b class="text-red-500">${d.ADMIN}</b> 
      `}
        onGlobeClick={changeView}

        // onPolygonHover={(d) => console.log(d)}
      />
    </div>
  );
}
