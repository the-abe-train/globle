import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country, LanguageName } from "../lib/country";
import { answerName } from "../util/answer";
import { findCentre } from "../util/centre";
import { turnGlobe } from "../util/globe";
import { LocaleContext } from "../i18n/LocaleContext";
import { Locale } from "../lib/locale";
import { FormattedMessage } from "react-intl";

type Props = {
  guesses: Country[];
  win: boolean;
  globeRef: React.MutableRefObject<GlobeMethods>;
};

function reorderGuesses(guessList: Country[]) {
  return [...guessList].sort((a, b) => {
    if (a.properties.NAME === answerName) {
      return -1;
    } else if (b.properties.NAME === answerName) {
      return 1;
    } else {
      return a.proximity - b.proximity;
    }
  });
}

export default function List({ guesses, win, globeRef }: Props) {
  const [orderedGuesses, setOrderedGuesses] = useState(reorderGuesses(guesses));
  const { locale } = useContext(LocaleContext);
  const langNameMap: Record<Locale, LanguageName> = {
    "es-MX": "NAME_ES",
    "en-CA": "NAME_EN",
  };
  const langName = langNameMap[locale];

  useEffect(() => {
    setOrderedGuesses(reorderGuesses(guesses));
  }, [guesses]);

  function formatKm(m: number) {
    const km = m / 1000;
    return km.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const qualifier = win ? "Answer" : "Closest";

  function turnToCountry(e: SyntheticEvent, idx: number) {
    const clickedCountry = orderedGuesses[idx];
    const coords = findCentre(clickedCountry);
    turnGlobe(coords, globeRef);
  }

  const closest = orderedGuesses[0];
  const farthest = orderedGuesses[orderedGuesses.length - 1];

  return (
    <div className="md:ml-10 md:mr-0 py-8 dark:text-white z-30">
      {orderedGuesses.length > 0 && (
        <p className="my-1">
          <b>{qualifier}</b>
        </p>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {orderedGuesses.map((guess, idx) => {
          const { NAME_LEN, ABBREV, NAME, FLAG } = guess.properties;
          const flag = (FLAG || "").toLocaleLowerCase();
          let name = NAME_LEN >= 10 ? ABBREV : NAME;
          if (locale !== "en-CA") {
            name = guess.properties[langName];
          }

          return (
            <li key={idx}>
              <button
                onClick={(e) => turnToCountry(e, idx)}
                className="flex items-center cursor-pointer"
              >
                <img
                  src={`https://flagcdn.com/w20/${flag.toLowerCase()}.png`}
                  alt={name}
                  className=""
                />
                <span className="ml-2 text-md">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {closest && farthest && (
        <div className="mt-8">
          <p>
            <FormattedMessage id="Game8" />: {formatKm(closest?.proximity)} km
          </p>
        </div>
      )}
    </div>
  );
}
