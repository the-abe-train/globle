import { FormEvent, useContext, useState, useRef, useEffect } from "react";
import { Country } from "../lib/country";
import { answerCountry, answerName } from "../util/answer";
import { Message } from "./Message";
import { polygonDistance } from "../util/distance";
// import alternateNames from "../data/alternate_names.json";
import { LocaleContext } from "../i18n/LocaleContext";
import localeList from "../i18n/messages";
import { FormattedMessage } from "react-intl";
import { langNameMap } from "../i18n/locales";
import { AltNames } from "../lib/alternateNames";
const countryData: Country[] = require("../data/country_data.json").features;
const alternateNames: AltNames = require("../data/alternate_names.json");

type Props = {
  guesses: Country[];
  setGuesses: React.Dispatch<React.SetStateAction<Country[]>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  practiceMode: boolean;
};

export default function Guesser({
  guesses,
  setGuesses,
  win,
  setWin,
  practiceMode,
}: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const { locale } = useContext(LocaleContext);

  const langName = langNameMap[locale];

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  function findCountry(countryName: string, list: Country[]) {
    return list.find((country) => {
      const { NAME, NAME_LONG, ABBREV, ADMIN, BRK_NAME, NAME_SORT } =
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
        country.properties[langName].toLowerCase() === countryName
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

    const oldNamePair = alternateNames[locale].find((pair) => {
      return pair.alternative === trimmedName;
    });
    const userGuess = oldNamePair ? oldNamePair.real : trimmedName;
    const alreadyGuessed = findCountry(userGuess, guesses);
    if (alreadyGuessed) {
      setError(localeList[locale]["Game6"]);
      ref.current?.select();
      return;
    }
    const guessCountry = findCountry(userGuess, countryData);
    if (!guessCountry) {
      setError(localeList[locale]["Game5"]);
      ref.current?.select();
      return;
    }
    if (practiceMode) {
      const answerCountry = JSON.parse(
        localStorage.getItem("practice") as string
      ) as Country;
      const answerName = answerCountry.properties.NAME;
      if (guessCountry.properties.NAME === answerName) {
        setWin(true);
      }
    } else if (guessCountry.properties.NAME === answerName) {
      setWin(true);
    }
    return guessCountry;
  }

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let guessCountry = runChecks();
    if (practiceMode) {
      const answerCountry = JSON.parse(
        localStorage.getItem("practice") as string
      );
      if (guessCountry && answerCountry) {
        guessCountry["proximity"] = polygonDistance(
          guessCountry,
          answerCountry
        );
        setGuesses([...guesses, guessCountry]);
        setGuessName("");
        return;
      }
    }
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
          text-gray-700 dark:bg-slate-200 dark:text-gray-900
          focus:outline-none 
          focus:shadow-outline disabled:bg-slate-400
          border rounded disabled:border-slate-400
          w-full"
          type="text"
          name="guesser"
          id="guesser"
          value={guessName}
          onChange={(e) => setGuessName(e.currentTarget.value)}
          ref={ref}
          disabled={win}
          placeholder={guesses.length === 0 ? localeList[locale]["Game1"] : ""}
          autoComplete="new-password"
        />
        <button
          className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900 
          dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
          font-bold py-1 md:py-2 px-4 rounded focus:shadow-outline "
          type="submit"
          disabled={win}
        >
          <FormattedMessage id="Game2" />
        </button>
      </form>
      <Message
        win={win}
        error={error}
        guesses={guesses.length}
        practiceMode={practiceMode}
      />
    </div>
  );
}
