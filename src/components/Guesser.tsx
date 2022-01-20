import { FormEvent, useState } from "react";
import { Country } from "../lib/country";
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  guesses: Country[];
  setGuesses: React.Dispatch<React.SetStateAction<Country[]>>;
};

export function Guesser({ guesses, setGuesses }: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");

  async function runChecks() {
    const guessCountry = countryData.find((country) => {
      return country.properties.NAME.toLowerCase() === guessName.toLowerCase();
    });
    if (guesses.find(c => {
      return c.properties.NAME.toLowerCase() === guessName.toLowerCase()
    })) {
      setError("Country already guessed");
      return 
    }
    if (!guessCountry) {
      setError("Invalid country name");
      return 
    }
    return guessCountry;
  }
  
  async function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const guessCountry = await runChecks();
    if (guessCountry) {
      setGuessName("");
      setGuesses([...guesses, guessCountry])
    }
  }

  return (
    <form
      onSubmit={addGuess}
      className="space-y-3 space-x-2 my-8 mx-auto block text-center"
    >
      <label className="block text-lg" htmlFor="guesser">
        Guess the Mystery Country
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="guesser"
        id="guesser"
        value={guessName}
        onChange={(e) => setGuessName(e.currentTarget.value)}
      />
      <button
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Enter
      </button>
      <p className="text-red-700 h-1">{error}</p>
    </form>
  );
}
