import { useEffect, useState } from "react";
import { Country } from "../lib/country";

// TODO final country should say "answer" beside it, not "closest"
// TODO Fix order of countries in list when pulled from local storage

type Props = {
  guesses: Country[];
};

export function List({ guesses }: Props) {
  const [orderedGuesses, setOrderedGuesses] = useState<Country[]>([]);

  useEffect(() => {
    const newOrder = [...guesses].sort((a, b) => {
      return a.proximity - b.proximity;
    });
    setOrderedGuesses(newOrder);
  }, [guesses]);

  return (
    <div className="ml-10 my-8">
      <ul className="grid grid-cols-4 gap-3">
        {orderedGuesses.map((guess, idx) => {
          const { NAME_LEN, ABBREV, NAME, WB_A2, ISO_A2 } = guess.properties;
          const name = NAME_LEN > 10 ? ABBREV : NAME;
          const flag =
            ISO_A2.length === 2 ? ISO_A2.toLowerCase() : WB_A2.toLowerCase();
          return (
            <li key={idx} className="flex items-center">
              <img
                src={`https://flagcdn.com/w20/${flag}.png`}
                // width="16"
                // height="12"
                alt={name}
                className=""
              />
              <span className="mx-1 text-md">
                {name} {idx === 0 ? "(Closest)" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
