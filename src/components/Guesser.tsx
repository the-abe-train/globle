import { FormEvent, useEffect, useState } from "react";
import { Country } from "../lib/country";
import { answerName } from "../util/answer";
import { Message } from "./Message";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { addProximity } from "../util/distance";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  guesses: Country[];
  setGuesses: React.Dispatch<React.SetStateAction<Country[]>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Guesser({ guesses, setGuesses, win, setWin }: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");

  const oldGuesses = localStorage.getItem("guesses") || "";
  const [, setStoredGuesses] = useLocalStorage("guesses", oldGuesses);

  function findCountry(countryName: string) {
    let country = countryData.find((country) => {
      const { NAME, NAME_LONG, ABBREV, ADMIN } = country.properties;
      return (
        NAME.toLowerCase() === countryName.toLowerCase() ||
        NAME_LONG.toLowerCase() === countryName.toLowerCase() ||
        ADMIN.toLowerCase() === countryName.toLowerCase() ||
        ABBREV.toLowerCase() === countryName.toLowerCase() ||
        ABBREV.replaceAll(".", "").toLowerCase() === countryName.toLowerCase()
      );
    });
    return country;
  }

  function runChecks() {
    const guessCountry = findCountry(guessName);
    if (
      guesses.find((c) => {
        return c.properties.NAME.toLowerCase() === guessName.toLowerCase();
      })
    ) {
      setError("Country already guessed");
      return;
    }
    if (!guessCountry) {
      setError("Invalid country name");
      return;
    }
    if (guessCountry.properties.NAME === answerName) {
      setWin(true);
    }
    return guessCountry;
  }

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let guessCountry = runChecks();
    if (guessCountry) {
      guessCountry = addProximity(guessCountry);
      setGuesses([...guesses, guessCountry]);
      setGuessName("");
    }
  }

  useEffect(() => {
    const guessNames = guesses.map((country) => country.properties.NAME);
    console.log(guessNames);
    setStoredGuesses(guessNames);
  }, [guesses]);

  return (
    <form
      onSubmit={addGuess}
      className="space-y-3 space-x-2 my-6 mx-auto block text-center"
    >
      {/* <label className="block text-lg" htmlFor="guesser">
        Guess the Mystery Country
      </label> */}
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="guesser"
        id="guesser"
        value={guessName}
        onChange={(e) => setGuessName(e.currentTarget.value)}
      />
      <button
        className="bg-blue-700 hover:bg-blue-900  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-green-800 disabled:text-gray-300 "
        type="submit"
        disabled={win}
      >
        Enter
      </button>
      <Message win={win} error={error} />
    </form>
  );
}
