import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Globe } from "./components/Globe";
import { Guesser } from "./components/Guesser";
import { Header } from "./components/Header";
import Help from "./components/Help";
import { List } from "./components/List";
import Statistics from "./components/Statistics";
import { Country } from "./lib/country";
import { answerName } from "./util/answer";
const countryData: Country[] = require("./country_data.json").features;

function App() {
  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);
  const [screen, setScreen] = useState("Help");
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

  if (screen === "Help") {
    return (
      <div className="max-w-2xl my-4 mx-auto">
        <Header setScreen={setScreen} />
        <Help setScreen={setScreen} />
      </div>
    );
  } else {
    return (
      <div>
        {screen === "Statistics" && <Statistics setScreen={setScreen} />}
        <div className="max-w-2xl my-4 mx-auto">
          <Header setScreen={setScreen} />
          <Guesser
            guesses={guesses}
            setGuesses={setGuesses}
            win={win}
            setWin={setWin}
          />
          <Globe guesses={guesses} globeRef={globeRef} />
          <List guesses={guesses} win={win} globeRef={globeRef} />
        </div>
      </div>
    );
  }
}

export default App;
