import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country, LanguageName } from "../lib/country";
import { answerName } from "../util/answer";
import { findCentre, turnGlobe } from "../util/globe";
import { LocaleContext } from "../i18n/LocaleContext";
import { Locale } from "../lib/locale";
import { FormattedMessage } from "react-intl";
import Toggle from "./Toggle";

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
  const [miles, setMiles] = useState(false);
  const { locale } = useContext(LocaleContext);
  const langNameMap: Record<Locale, LanguageName> = {
    "pt-BR": "NAME_PT",
    "es-MX": "NAME_ES",
    "en-CA": "NAME_EN",
    "fr-FR": "NAME_FR",
    "de-DE": "NAME_DE",
    "pl-PL": "NAME_PL",
    "it-IT": "NAME_IT",
  };
  const langName = langNameMap[locale];

  useEffect(() => {
    setOrderedGuesses(reorderGuesses(guesses));
  }, [guesses]);

  function formatKm(m: number, miles: boolean) {
    const METERS_PER_MILE = 1609.34;
    const BIN = 50;
    const value = miles ? m / METERS_PER_MILE : m / 1000;
    if (value < 5) return "< 5";

    const min = Math.floor(value / BIN) * BIN;
    const max = min + BIN;
    const format = (num: number) =>
      num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${format(min)} - ${format(max)}`;
  }

  const qualifier = win ? "Answer" : "Closest";

  function turnToCountry(e: SyntheticEvent, idx: number) {
    const clickedCountry = orderedGuesses[idx];
    const { lat, lng, altitude } = findCentre(clickedCountry);
    turnGlobe({ lat, lng, altitude }, globeRef, "zoom");
  }

  const closest = orderedGuesses[0];
  const farthest = orderedGuesses[orderedGuesses.length - 1];

  const [isSortedByDistance, setIsSortedByDistance] = useState(true);
  const guessesToDisplay = isSortedByDistance ? orderedGuesses : guesses;

  return (
    <div className="md:ml-10 md:mr-0 py-8 dark:text-white z-30">
      {orderedGuesses.length > 0 && (
        <p className="my-1">
          {isSortedByDistance ? (
            <b>
              <FormattedMessage id={qualifier} />
            </b>
          ) : (
            <b>Guessed</b>
          )}
        </p>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {guessesToDisplay.map((guess, idx) => {
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
                <span className="ml-2 text-md text-left">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {closest && farthest && (
        <div className="mt-8">
          <div className="flex items-center space-x-1">
            <p>
              <FormattedMessage id="Game8" />
              {isSortedByDistance ? ": " : ` (${closest.properties.NAME}): `}
              {formatKm(closest?.proximity, miles)}
            </p>
            <Toggle
              name="miles"
              setToggle={setMiles}
              toggle={miles}
              on="km"
              off="miles"
            />
          </div>
          <p>
            <button
              onClick={() => setIsSortedByDistance(!isSortedByDistance)}
              className="mt-2"
            >
              <span className="text-md underline">
                {isSortedByDistance
                  ? "Sort by order of guesses"
                  : "Sort by distance"}
              </span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
