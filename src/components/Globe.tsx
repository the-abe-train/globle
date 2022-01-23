import { useContext, useEffect } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

import { scaleSequentialSqrt } from "d3-scale";
import {
  interpolateBlues,
  interpolateRdGy,
  interpolateReds,
} from "d3-scale-chromatic";
import { addProximity } from "../util/distance";
import { Country } from "../lib/country";
import { findCentre } from "../util/centre";
import { answerName } from "../util/answer";
import { turnGlobe } from "../util/turnGlobe";
import { ThemeContext } from "../context/ThemeContext";
// import { ThemeContext } from "../context/ThemeContext";
const countryData: Country[] = require("../country_data.json").features;

// TODO add lines between finished countries
// TODO map is blurry, play with zoom settings

type Props = {
  guesses: Country[];
  globeRef: React.MutableRefObject<GlobeMethods>;
};

export function Globe({ guesses, globeRef }: Props) {
  // Theme
  const { theme } = useContext(ThemeContext);
  const timeOfDay = theme.nightMode ? "night" : "day";

  // Globe size settings
  const size = 600; // px on one side
  const extraStyle = {
    width: `${size}px`,
    clipPath: `circle(${size / 2}px at ${size / 2}px ${size / 2}px)`,
  };

  // Color scale
  const getColour = (guess: Country) => {
    if (guess.properties.NAME === answerName) return "green";
    if (guess.proximity == null) {
      guess = addProximity(guess);
    }
    const gradient = theme.nightMode ? interpolateBlues : interpolateReds;
    const colorScale = scaleSequentialSqrt(gradient);
    console.log(guess.proximity);
    const colour = colorScale(guess.proximity);
    return colour;
  };

  // After each guess
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = false;
    const newGuess = [...guesses].pop();
    if (newGuess) {
      const newSpot = findCentre(newGuess);
      turnGlobe(newSpot, globeRef);
    }
  }, [guesses]);

  // On first render
  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
    globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.75 });
  }, []);

  return (
    <div className="mx-auto" style={extraStyle}>
      <ReactGlobe
        ref={globeRef}
        globeImageUrl={`//unpkg.com/three-globe/example/img/earth-${timeOfDay}.jpg`}
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
        onGlobeClick={(d) => turnGlobe(d, globeRef)}
        onPolygonClick={(p, e, c) => turnGlobe(c, globeRef)}
        polygonSideColor="#00000000"
        polygonStrokeColor="#00000000"
      />
    </div>
  );
}
