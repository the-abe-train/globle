import { useEffect, useState } from "react";
import { Globe } from "./components/Globe";
import { Guesser } from "./components/Guesser";
import { Header } from "./components/Header";
import Help from "./components/Help";
import { List } from "./components/List";
import { Country } from "./lib/country";
import { answerName } from "./util/answer";
const countryData: Country[] = require("./country_data.json").features;

function App() {

  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);
  const [screen, setScreen] = useState("Help");

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
  }, [])


  if (screen === "Help") {
    return (
      <div className="max-w-2xl my-4 mx-auto">
        <Header setScreen={setScreen} />
        <Help setScreen={setScreen} />
      </div>
    );
  } else {
    return (
      <div className="max-w-2xl my-4 mx-auto">
        <Header setScreen={setScreen} />
        <Guesser
          guesses={guesses}
          setGuesses={setGuesses}
          win={win}
          setWin={setWin}
        />
        <Globe guesses={guesses} />
        <List guesses={guesses} />
      </div>
    );
  }
}

export default App;
