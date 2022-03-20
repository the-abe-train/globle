// import useCheckMobile from "../hooks/useCheckMobile";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ThemeContext } from "../context/ThemeContext";
import Fade from "../transitions/Fade";
import Outline from "./Outline";

export default function Help() {
  // Theme
  const { nightMode } = useContext(ThemeContext).theme;

  const [showCountry1, setShowCountry1] = useState(false);
  const [showCountry2, setShowCountry2] = useState(false);
  const [showCountry3, setShowCountry3] = useState(false);
  const [showCountry4, setShowCountry4] = useState(false);
  const countrySize = isMobile ? 125 : 150;

  const timeGap = 1000;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCountry1(true), timeGap * 1);
    const timer2 = setTimeout(() => setShowCountry2(true), timeGap * 2);
    const timer3 = setTimeout(() => setShowCountry3(true), timeGap * 3);
    const timer4 = setTimeout(() => setShowCountry4(true), timeGap * 4);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const countries = [
    { name: "France", show: showCountry1 },
    { name: "Nepal", show: showCountry2 },
    { name: "Mongolia", show: showCountry3 },
    { name: "South Korea", show: showCountry4 },
  ];

  return (
    <div className="my-2 space-y-7">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        How to play
      </h2>
      <p>
        Every day, there is a new Mystery Country. Your goal is to guess the
        mystery country using the fewest number of guesses. Each incorrect guess
        will appear on the globe with a colour indicating how close it is to the
        Mystery Country. The{" "}
        <b className={nightMode ? "text-purple-400" : "text-red-800"}>hotter</b>{" "}
        the colour, the closer you are to the answer.
      </p>
      <p>
        For example, if the Mystery Country is <b>Japan</b>, then the following
        countries would appear with these colours if guessed:
      </p>
      <div className="block mx-4">
        <div
          className="flex flex-col md:flex-row justify-start items-center space-x-3"
          style={{
            minHeight: isMobile ? countrySize * 3 : countrySize,
          }}
        >
          {countries.map((country, idx) => {
            return (
              <Fade
                show={country.show}
                background="bg-transparent"
                key={idx}
                // preexist={true}
              >
                <Outline
                  key={idx}
                  countryName={country.name}
                  width={countrySize}
                />
              </Fade>
            );
          })}
        </div>
      </div>
      <p>A new Mystery Country will be available every day!</p>
    </div>
  );
}
