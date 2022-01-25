import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { answerName } from "../util/answer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Guesses } from "../lib/localStorage";

// import Guesser from "./Guesser";
// import List from "./List";
// import { Globe } from "./Globe";
const Globe = lazy(() => import("./Globe"));
const Guesser = lazy(() => import("./Guesser"));
const List = lazy(() => import("./List"));
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  reSpin: boolean;
};

export default function Game({ reSpin }: Props) {
  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");
  const [storedGuesses] = useLocalStorage<Guesses>(
    "guesses",
    {
      day: today,
      countries: [],
    },
    today
  );

  // Ref
  const globeRef = useRef<GlobeMethods>(null!);

  // Get old guesses and convert to Countries
  const storedCountryNames = storedGuesses.countries;
  useEffect(() => {
    let storedCountries = storedCountryNames.map((guess) => {
      const foundCountry = countryData.find((country) => {
        return country.properties.NAME === guess;
      });
      if (!foundCountry) throw new Error("Country mapping broken");
      return foundCountry;
    });
    setGuesses(storedCountries);
    if (storedCountryNames.includes(answerName)) setWin(true);
  }, [storedCountryNames]);

  const renderLoader = () => <p>Loading</p>
  

  return (
    <Suspense fallback={renderLoader()}>

    
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
    </Suspense>
  );
}
