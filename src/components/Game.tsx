import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { Globe } from "./Globe";
import { Guesser } from "./Guesser";
import { List } from "./List";
import Statistics from "./Statistics";
import { answerName } from "../util/answer";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  reSpin: boolean;
  setReSpin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ screen, setScreen, reSpin, setReSpin }: Props) {
  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);

  // Ref
  const globeRef = useRef<GlobeMethods>(null!);

  // Get old guesses and convert to Countries
  useEffect(() => {
    const storage = localStorage.getItem("guesses") || "[]";
    const storedGuesses: string[] = JSON.parse(storage);
    // console.log(storedGuesses, typeof storedGuesses);
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
      {screen === "Statistics" && <Statistics setScreen={setScreen} />}
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
    </div>
  );
}
