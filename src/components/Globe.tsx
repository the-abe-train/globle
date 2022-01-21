import { useEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

import { scaleSequentialSqrt } from "d3-scale";
import { interpolateRdGy } from "d3-scale-chromatic";
import { addProximity } from "../util/distance";
import { Country } from "../lib/country";
import { findCentre } from "../util/centre";
import { answerName } from "../util/answer";
const countryData: Country[] = require("../country_data.json").features;

// TODO add lines between finished countries
// TODO map is blurry, play with zoom settings
// TODO clip zoomed in globe as circle (maybe nicer?)

type Props = {
  guesses: Country[];
};

export function Globe({ guesses }: Props) {

// Hooks
  const globeRef = useRef<GlobeMethods>(null!);

  // Globe size settings
  const size = 600; // px on one side
  const extraStyle = {
    width: `${size}px`,
  };

  // Answer
  // const answerCountry = countryData.find((country) => {
  //   return country.properties.NAME === answer.name;
  // });

  // Color scale
  const getColour = (guess: Country) => {
    if (guess.properties.NAME === answerName) return "green";
    if (guess.proximity == null) {
      guess = addProximity(guess);
    };
    const colorScale = scaleSequentialSqrt(interpolateRdGy);
    const colour = colorScale(guess.proximity);
    return colour;
  };

  function fixView(coords: { lat: number; lng: number; altitude?: number }) {
    // @ts-ignore
    globeRef.current.controls().autoRotate = false;
    const currentAlt = globeRef.current.pointOfView().altitude;
    coords['altitude'] = Math.max(coords['altitude'] || currentAlt, 1.4)
    globeRef.current.pointOfView(coords);
    // console.log("Click POV", globeRef.current.pointOfView());
  }

  // After each guess
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = false;
    const newGuess = [...guesses].pop();
    if (newGuess) {
      const newSpot = findCentre(newGuess);
      // globeRef.current.pointOfView(newSpot, 0);
      fixView(newSpot)
    }
  }, [guesses]);



  // On first render
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
    globeRef.current.pointOfView({lat: 0, lng: 0, altitude: 1.4});
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
        <b class="text-black">${d.ADMIN}</b> 
        `}
        onGlobeClick={fixView}
        onPolygonClick={(p, e, c) => fixView(c)}
        polygonSideColor="#00000000"
        polygonStrokeColor="#00000000"
      />
    </div>
  );
}
