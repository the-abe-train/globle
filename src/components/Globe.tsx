import { useContext, useEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { findCentre } from "../util/centre";
import { answerCountry } from "../util/answer";
import { turnGlobe } from "../util/turnGlobe";
import { ThemeContext } from "../context/ThemeContext";
import { getColour } from "../util/colour";
import useCheckMobile from "../hooks/useCheckMobile";
const territoryData: Country[] = require("../data/territories.json").features;

type Props = {
  guesses: Country[];
  globeRef: React.MutableRefObject<GlobeMethods>;
};

export default function Globe({ guesses, globeRef }: Props) {
  // State
  const [places, setPlaces] = useState(guesses);

  // Theme
  const { nightMode, highContrast } = useContext(ThemeContext).theme;

  // Check device
  const isMobile = useCheckMobile();

  // Globe size settings
  const size = isMobile ? 320 : 600; // px on one side
  const extraStyle = {
    width: `${size}px`,
    clipPath: `circle(${size / 2}px at ${size / 2}px ${size / 2}px)`,
  };

  // After each guess
  useEffect(() => {
    // Add territories to guesses to make shapes
    const territories: Country[] = [];
    guesses.forEach((guess) => {
      const territory = territoryData.find((territory) => {
        return guess.properties.NAME === territory.properties.SOVEREIGNT;
      });
      if (territory) territories.push(territory);
    });
    setPlaces(guesses.concat(territories));

    // Turn globe to new spot
    const controls: any = globeRef.current.controls();
    controls.autoRotate = false;
    const newGuess = [...guesses].pop();
    if (newGuess) {
      const newSpot = findCentre(newGuess);
      turnGlobe(newSpot, globeRef);
    }
  }, [guesses, globeRef]);

  // On first render
  useEffect(() => {
    const controls: any = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    setTimeout(() => {
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.5 });
    }, 400);
  }, [globeRef]);

  // Stop rotate on drag
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const controls: any = globeRef.current.controls();
    containerRef.current.addEventListener("mouseup", () => {
      controls.autoRotate = false;
    });
    containerRef.current.addEventListener("touchend", () => {
      controls.autoRotate = false;
    });
  }, [globeRef]);

  // Label colour


  function getLabel(country: Country) {
    const name = country.properties.ADMIN;
    const prox = country.proximity;
    const dayColour = prox < 500_000 ? "gray-300" : "gray-900";
    const nightColour = "gray-300";
    const label = `<b class="text-${dayColour} dark:text-${nightColour}">${name}</b>`;
    return label;
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto cursor-grab text-center"
      style={extraStyle}
    >
      <ReactGlobe
        ref={globeRef}
        globeImageUrl={`images/earth-${nightMode ? "night" : "day"}.webp`}
        width={size}
        height={size}
        backgroundColor="#00000000"
        polygonsData={places}
        polygonCapColor={(c) =>
          // @ts-ignore
          getColour(c, answerCountry, nightMode)
        }
        // @ts-ignore
        polygonLabel={getLabel}
        onGlobeClick={(d) => turnGlobe(d, globeRef)}
        onPolygonClick={(p, e, c) => turnGlobe(c, globeRef)}
        polygonSideColor="#00000000"
        polygonStrokeColor="#00000000"
        atmosphereColor={nightMode ? "rgba(63, 201, 255)" : "lightskyblue"}
      />
    </div>
  );
}
