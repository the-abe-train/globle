import { FormEvent, useState } from "react";
import { Country } from "../lib/country";
import { answerCountry, answerName } from "../util/answer";
import { Message } from "./Message";
import { polygonDistance } from "../util/distance";
import alternateNames from "../data/alternate_names.json";
const countryData: Country[] = require("../data/country_data.json").features;

type Props = {
  guesses: Country[];
  setGuesses: React.Dispatch<React.SetStateAction<Country[]>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Guesser({ guesses, setGuesses, win, setWin }: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");

  function findCountry(countryName: string, list: Country[]) {
    return list.find((country) => {
      const { NAME, NAME_LONG, ABBREV, ADMIN, BRK_NAME, NAME_SORT, ISO_A2, WB_A2, WB_A3, ISO_A2_EH} =
        country.properties;
      return (
        NAME.toLowerCase() === countryName ||
        NAME_LONG.toLowerCase() === countryName ||
        ADMIN.toLowerCase() === countryName ||
        ABBREV.toLowerCase() === countryName ||
        ABBREV.replace(/\./g, "").toLowerCase() === countryName ||
        NAME.replace(/-/g, " ").toLowerCase() === countryName ||
        BRK_NAME.toLowerCase() === countryName ||
        NAME_SORT.toLowerCase() === countryName ||
        ISO_A2.toLowerCase() === countryName ||
        WB_A2.toLowerCase() === countryName ||
        WB_A3.toLowerCase() === countryName
      );
    });
  }

  // Check territories function
  function runChecks() {
    const trimmedName = guessName
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/^st\s/g, "st. ");
    const oldNamePair = alternateNames.find((pair) => {
      return pair.old === trimmedName;
    });
    const userGuess = oldNamePair ? oldNamePair.real : trimmedName;
    const guessCountry = findCountry(userGuess, countryData);
    const alreadyGuessed = findCountry(userGuess, guesses);
    if (alreadyGuessed) {
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
    if (guessCountry && answerCountry) {
      guessCountry["proximity"] = polygonDistance(guessCountry, answerCountry);
      setGuesses([...guesses, guessCountry]);
      setGuessName("");
    }
  }

  return (
    <div className="mt-10 mb-6 block mx-auto text-center">
      <form
        onSubmit={addGuess}
        className="w-80 flex space-x-4 mx-auto my-2 justify-center"
      >
        <input
          className="shadow px-2 py-1 md:py-0
          text-gray-700 dark:bg-slate-300 focus:outline-none 
          focus:shadow-outline disabled:bg-slate-400
          border rounded disabled:border-slate-400
          w-full"
          type="text"
          name="guesser"
          id="guesser"
          value={guessName}
          onChange={(e) => setGuessName(e.currentTarget.value)}
          disabled={win}
          placeholder={guesses.length === 0 ? "Enter country name here" : ""}
          autoComplete="new-password"
        />
        <button
          className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900 dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
          font-bold py-1 md:py-2 px-4 rounded focus:shadow-outline "
          type="submit"
          disabled={win}
        >
          Enter
        </button>
      </form>
      <Message win={win} error={error} guesses={guesses.length} />
    </div>
  );
}
