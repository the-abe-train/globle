import { useContext, useEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { findCentre } from "../util/centre";
import { answerCountry } from "../util/answer";
import { globeImg, turnGlobe } from "../util/globe";
import { ThemeContext } from "../context/ThemeContext";
import { getColour } from "../util/colour";
import { isMobile } from "react-device-detect";
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
      const foundTerritories = territoryData.filter((territory) => {
        return guess.properties.NAME === territory.properties.SOVEREIGNT;
      });
      if (foundTerritories) territories.push(...foundTerritories);
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
    const dayColour = prox < 750_000 ? "gray-300" : "gray-900";
    const nightColour = "gray-300";
    const label = `<b class="text-${dayColour} dark:text-${nightColour}">${name}</b>`;
    return label;
  }

  // Polygon altitude
  function getAltitude(country: Country) {
    if (!highContrast || country.properties.TYPE === "Territory") return 0.01;
    const prox = country.proximity;
    let proxFraction = prox / 2_000_000;
    proxFraction = Math.min(Math.max(proxFraction, 0.01), 0.95);
    let alt = (1 - proxFraction) / 10;
    return alt;
  }

  function zoom(z: number) {
    const controls: any = globeRef.current.controls();
    controls.autoRotate = false;
    const coords = globeRef.current.pointOfView();
    const { altitude } = globeRef.current.pointOfView();
    coords["altitude"] = Math.max(altitude + z, 0.05);
    globeRef.current.pointOfView(coords, 250);
  }

  const btnFill = nightMode ? "bg-[#582679]" : "bg-[#F3BC63]";
  const btnBorder = nightMode ? "border-[#350a46]" : "border-[#FF8E57]";
  const btnText = nightMode ? "text-white font-bold" : "";

  return (
    <div>
      <div
        ref={containerRef}
        className="globe mx-auto cursor-grab text-center select-none"
        style={extraStyle}
      >
        <ReactGlobe
          className="select-none decoration-transparent cursor-grab "
          style={{ "-webkit-tap-highlight-color": "transparent" }}
          ref={globeRef}
          // globeImageUrl={`images/earth-${nightMode ? "night" : "day"}.webp`}
          globeImageUrl={globeImg(nightMode)}
          width={size}
          height={size}
          backgroundColor="#00000000"
          polygonsData={places}
          polygonCapColor={(c) =>
            // @ts-ignore
            getColour(c, answerCountry, nightMode, highContrast)
          }
          // @ts-ignore
          polygonLabel={getLabel}
          // @ts-ignore
          polygonAltitude={getAltitude}
          polygonSideColor="blue"
          onGlobeClick={(d) => turnGlobe(d, globeRef)}
          onPolygonClick={(p, e, c) => turnGlobe(c, globeRef)}
          polygonStrokeColor="#00000000"
          atmosphereColor={nightMode ? "rgba(63, 201, 255)" : "lightskyblue"}
        />
      </div>
      {isMobile && (
        <div className="w-full flex justify-between text-md ">
          <button
            className={`border-[1px] rounded-md select-none ${btnText} ${btnFill} px-4 ${btnBorder}`}
            onTouchStart={() => zoom(0.2)}
          >
            -
          </button>
          <button
            className={`border-[1px] rounded-md select-none ${btnText} ${btnFill} px-4 ${btnBorder}`}
            onTouchStart={() => zoom(-0.2)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
