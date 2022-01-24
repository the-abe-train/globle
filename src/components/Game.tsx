import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { Globe } from "./Globe";
import { Guesser } from "./Guesser";
import { List } from "./List";
import { answerName } from "../util/answer";
import { getStorageValue } from "../hooks/useLocalStorage";
import { Guesses } from "../lib/localStorage";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  reSpin: boolean;
};

export default function Game({ reSpin }: Props) {
  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);

  // Ref
  const globeRef = useRef<GlobeMethods>(null!);

  // Get old guesses and convert to Countries
  useEffect(() => {
    const storedGuesses = getStorageValue<Guesses>("guesses").countries;
    let storedCountries = storedGuesses.map((guess) => {
      const foundCountry = countryData.find((country) => {
        return country.properties.NAME === guess;
      });
      if (!foundCountry) throw "Country mapping broken";
      return foundCountry;
    });
    setGuesses(storedCountries);
    if (storedGuesses.includes(answerName)) setWin(true);
  }, []);

  return (
    <div>
      <Guesser
        guesses={guesses}
        setGuesses={setGuesses}
        win={win}
        setWin={setWin}
      />
      {!reSpin && (
        <div>
          <Globe guesses={guesses} globeRef={globeRef} />
          <List guesses={guesses} win={win} globeRef={globeRef} />
        </div>
      )}
    </div>
  );
}
