import { SyntheticEvent, useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { answerName } from "../util/answer";
import { findCentre } from "../util/centre";
import { turnGlobe } from "../util/globe";

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

  useEffect(() => {
    setOrderedGuesses(reorderGuesses(guesses));
  }, [guesses]);

  const qualifier = win ? "Answer" : "Closest";

  function turnToCountry(e: SyntheticEvent, idx: number) {
    const clickedCountry = orderedGuesses[idx];
    const coords = findCentre(clickedCountry);
    turnGlobe(coords, globeRef);
  }

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
          const name = NAME_LEN >= 10 ? ABBREV : NAME;
          const flag = (FLAG || "").toLocaleLowerCase();
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
                <span className="mx-1 text-md">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
