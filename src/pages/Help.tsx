// import useCheckMobile from "../hooks/useCheckMobile";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ThemeContext } from "../context/ThemeContext";
import Fade from "../transitions/Fade";
import Outline from "../components/Outline";
import { FormattedMessage } from "react-intl";
import useInterval from "../hooks/useInterval";
import Auxilliary from "../components/Auxilliary";

export default function Help() {
  // Theme
  const { nightMode } = useContext(ThemeContext).theme;

  const countrySize = isMobile ? 125 : 150;

  const [outlines, setOutlines] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  useInterval(() => setCount(count + 1), 1000);
  useEffect(() => {
    const countryOutlines = ["France", "Nepal", "Mongolia", "South Korea"];
    setOutlines(countryOutlines.slice(0, count));
  }, [count]);

  return (
    <div className="my-2 space-y-7 dark:text-gray-200">
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
          {outlines.map((country, idx) => {
            return (
              <Fade show={true} background="bg-transparent" key={idx}>
                <Outline key={idx} countryName={country} width={countrySize} />
              </Fade>
            );
          })}
        </div>
      </div>
      <p>
        <FormattedMessage id="help3" />
      </p>
      <Auxilliary screen="Help" />
    </div>
  );
}
