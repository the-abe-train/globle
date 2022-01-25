import { Country } from "../lib/country";
import { polygonDistance } from "../util/distance";
import { getColour } from "../util/colour";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  countryName: string;
  width: number;
};

export default function Outline({ countryName, width }: Props) {
  const { nightMode } = useContext(ThemeContext).theme;

  const country = countryData.find((p) => p.properties.NAME === countryName);
  if (!country) throw new Error("Country in Help screen not found in Country Data");

  const sampleAnswerName = "Japan";
  const sampleAnswer = countryData.find(
    (p) => p.properties.NAME === sampleAnswerName
  );
  if (!sampleAnswer) throw new Error("Country in Help screen not found in Country Data");

  country["proximity"] = polygonDistance(country, sampleAnswer);

  const outline = getPath(countryName);

  const colour = getColour(country, sampleAnswer, nightMode);

  return (
    <figure className="flex md:flex-col justify-left space-x-8 md:space-x-0">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 800 600"
        width={width}
      >
        <g id={countryName}>
          <path fill={colour} d={outline} />
        </g>
      </svg>
      <figcaption className="text-left md:text-center font-bold my-auto">
        {countryName}
      </figcaption>
    </figure>
  );
}
