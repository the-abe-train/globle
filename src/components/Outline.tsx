import { Country } from "../lib/country";
import { polygonDistance } from "../util/distance";
import { getColour } from "../util/colour";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";
import { FormattedMessage } from "react-intl";
const countryData: Country[] = require("../data/country_data.json").features;

type Props = {
  countryName: string;
  width: number;
};

export default function Outline({ countryName, width }: Props) {
  const { nightMode, highContrast, prideMode } = useContext(ThemeContext).theme;

  const country = countryData.find((p) => p.properties.NAME === countryName);
  if (!country)
    throw new Error("Country in Help screen not found in Country Data");
  const countryCopy: Country = { ...country };

  const sampleAnswerName = "Japan";
  const sampleAnswer = countryData.find(
    (p) => p.properties.NAME === sampleAnswerName
  );
  if (!sampleAnswer)
    throw new Error("Country in Help screen not found in Country Data");

  countryCopy["proximity"] = polygonDistance(countryCopy, sampleAnswer);

  const outline = getPath(countryName);

  const colour = getColour(
    countryCopy,
    sampleAnswer,
    nightMode,
    highContrast,
    prideMode
  );

  return (
    <figure
      className={`flex space-x-6 md:flex-col md:justify-left md:space-x-0 bg-transparent`}
      // style={{ width: isDesktop ? width : "" }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 800 600"
        width={width}
        height={width * 0.75}
      >
        <g id={countryName}>
          <path fill={colour} d={outline} stroke="black" />
        </g>
      </svg>
      <figcaption className="text-left sm:text-center font-bold my-auto">
        <FormattedMessage id={countryName} />
      </figcaption>
    </figure>
  );
}
