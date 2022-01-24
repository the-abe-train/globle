import { Country } from "../lib/country";
import outlinePaths from "../country_outlines.json";
import { polygonDistance } from "../util/distance";
import { getColour } from "../util/colour";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  countryName: string;
  width: number;
};

export default function Outline({ countryName, width }: Props) {
  const { nightMode } = useContext(ThemeContext).theme;
  
  const country = countryData.find((p) => p.properties.NAME === countryName);
  if (!country) throw "Country in Help screen not found in Country Data";

  const sampleAnswerName = "Japan";
  const sampleAnswer = countryData.find(
    (p) => p.properties.NAME === sampleAnswerName
  );
  if (!sampleAnswer) throw "Country in Help screen not found in Country Data";

  country["proximity"] = polygonDistance(country, sampleAnswer);

  const outline = outlinePaths.find((p) => p.country === countryName);
  if (!outline) throw "Country in Help screen not found in Outline Data";

  const colour = getColour(country, sampleAnswer, nightMode);

  return (
    <figure>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 800 600"
        width={width}
      >
        <g id={countryName}>
          <path fill={colour} d={outline.path} />
        </g>
      </svg>
      <figcaption className="text-center font-bold">{countryName}</figcaption>
    </figure>
  );
}
