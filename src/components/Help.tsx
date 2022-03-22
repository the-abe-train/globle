// import useCheckMobile from "../hooks/useCheckMobile";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ThemeContext } from "../context/ThemeContext";
import Fade from "../transitions/Fade";
import Outline from "./Outline";
import { FormattedMessage } from "react-intl";

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
        <FormattedMessage id="helpTitle" />
      </h2>
      <p>
        <FormattedMessage
          id="help1"
          values={{
            b: (chunks: string) => (
              <b className={nightMode ? "text-purple-400" : "text-red-800"}>
                {chunks}
              </b>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="help2"
          values={{ b: (chunks: string) => <b>{chunks}</b> }}
        />
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
              <Fade show={country.show} background="bg-transparent" key={idx}>
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
      <p>
        <FormattedMessage id="help3" />
      </p>
    </div>
  );
}
