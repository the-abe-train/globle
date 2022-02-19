import { FormEvent, useState } from "react";
import { Country } from "../lib/country";
import { answerCountry, answerName } from "../util/answer";
import { Message } from "./Message";
import { polygonDistance } from "../util/distance";
import alternateNames from "../data/alternate_names.json";
const countryData: Country[] = require("../data/country_data.json").features;
const minGuessLength = 2;
const suggestionLimit = 3;

type Props = {
  guesses: Country[];
  setGuesses: React.Dispatch<React.SetStateAction<Country[]>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Guesser({ guesses, setGuesses, win, setWin }: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");

  function getSuggestions(value: string) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    if (inputLength >= minGuessLength) {
      let suggestions: Country[] = [];
      suggestions = countryData.filter(country => {
        const countryName = country.properties.NAME.toLowerCase();
        if (countryName !== inputValue) {
          return countryName.slice(0, inputLength) === inputValue;
        }
        return [];
      });
      return suggestions.slice(0,suggestionLimit);
    }
    return [];
  }

  function findCountry(countryName: string, list: Country[]) {
    return list.find((country) => {
      const { NAME, NAME_LONG, ABBREV, ADMIN, BRK_NAME, NAME_SORT } =
        country.properties;
      return (
        NAME.toLowerCase() === countryName ||
        NAME_LONG.toLowerCase() === countryName ||
        ADMIN.toLowerCase() === countryName ||
        ABBREV.toLowerCase() === countryName ||
        ABBREV.replaceAll(".", "").toLowerCase() === countryName ||
        NAME.replaceAll("-", " ").toLowerCase() === countryName ||
        BRK_NAME.toLowerCase() === countryName ||
        NAME_SORT.toLowerCase() === countryName
      );
    });
  }

  // Check territories function
  function runChecks() {
    const trimmedName = guessName
      .trim()
      .toLowerCase()
      .replaceAll("&", "and")
      .replaceAll(/^st\s/g, "st. ");
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
        className="w-80 flex space-x-4 mx-auto my-2 justify-center flex-wrap"
      >
        <input
          className="shadow px-2 py-1 md:py-0
          text-gray-700 dark:bg-slate-300 focus:outline-none 
          focus:shadow-outline disabled:bg-slate-400
          border rounded disabled:border-slate-400
          w-full flex-1"
          type="text"
          name="guesser"
          id="guesser"
          value={guessName}
          onChange={(e) => setGuessName(e.currentTarget.value)}
          disabled={win}
          placeholder={guesses.length === 0 ? "Enter country name here" : ""}
        />
        
        <button
          className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900 dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
          font-bold py-1 md:py-2 px-4 rounded focus:shadow-outline "
          type="submit"
          disabled={win}
        >
          Enter
        </button>

        <div className="shadow px-2 py-0
          text-gray-700 dark:bg-slate-300 focus:outline-none 
          focus:shadow-outline disabled:bg-slate-400
          rounded disabled:border-slate-400
          w-full bg-white !mx-0"
        >
          {getSuggestions(guessName).map(country => {
            return (
              <div
              className="text-left" 
              key={country.properties.ADMIN}
              onClick={() => {setGuessName(country.properties.NAME)}}
              >{country.properties.NAME}</div>
            )
          })}
        </div>
      </form>
      <Message win={win} error={error} guesses={guesses.length} />
    </div>
  );
}
