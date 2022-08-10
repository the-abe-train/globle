import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { answerCountry, answerName } from "../util/answer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Guesses, Stats } from "../lib/localStorage";
import { dateDiffInDays, today } from "../util/dates";
import { polygonDistance } from "../util/distance";
import { getColourEmoji } from "../util/colour";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Globe = lazy(() => import("../components/Globe"));
const Guesser = lazy(() => import("../components/Guesser"));
const List = lazy(() => import("../components/List"));
const countryData: Country[] = require("../data/country_data.json").features;

type Props = {
  reSpin: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ reSpin, setShowStats }: Props) {
  // Get data from local storage
  const [storedGuesses, storeGuesses] = useLocalStorage<Guesses>("guesses", {
    day: today,
    countries: [],
  });

  const firstStats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString("en-CA"),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
    emojiGuesses: "",
  };
  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    firstStats
  );

  // Set up practice mode
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const practiceMode = !!params.get("practice_mode");

  function enterPracticeMode() {
    const practiceAnswer =
      countryData[Math.floor(Math.random() * countryData.length)];
    localStorage.setItem("practice", JSON.stringify(practiceAnswer));
    navigate("/game?practice_mode=true");
    setGuesses([]);
    setWin(false);
  }

  const storedCountries = useMemo(() => {
    if (today <= storedGuesses.day && !practiceMode) {
      const names = storedGuesses.countries;
      return names.map((guess) => {
        const foundCountry = countryData.find((country) => {
          return country.properties.NAME === guess;
        });
        if (!foundCountry) throw new Error("Country mapping broken");
        foundCountry["proximity"] = polygonDistance(
          foundCountry,
          answerCountry
        );
        return foundCountry;
      });
    }
    return [];
    // eslint-disable-next-line
  }, [practiceMode]);

  // Check if win condition already met
  const alreadyWon = practiceMode
    ? false
    : storedCountries?.map((c) => c.properties.NAME).includes(answerName);

  // Now we're ready to start the game! Set up the game states with the data we
  // already know from the stored info.
  const [guesses, setGuesses] = useState<Country[]>(
    practiceMode ? [] : storedCountries
  );
  const [win, setWin] = useState(alreadyWon);
  const globeRef = useRef<GlobeMethods>(null!);

  // Whenever there's a new guess
  useEffect(() => {
    if (!practiceMode) {
      const guessNames = guesses.map((country) => country.properties.NAME);
      storeGuesses({
        day: today,
        countries: guessNames,
      });
    }
  }, [guesses, storeGuesses, practiceMode]);

  // When the player wins!
  useEffect(() => {
    if (win && storedStats.lastWin !== today && !practiceMode) {
      // Store new stats in local storage
      const lastWin = today;
      const gamesWon = storedStats.gamesWon + 1;
      const streakBroken = dateDiffInDays(storedStats.lastWin, lastWin) > 1;
      const currentStreak = streakBroken ? 1 : storedStats.currentStreak + 1;
      const maxStreak =
        currentStreak > storedStats.maxStreak
          ? currentStreak
          : storedStats.maxStreak;
      const usedGuesses = [...storedStats.usedGuesses, guesses.length];
      const chunks = [];
      for (let i = 0; i < guesses.length; i += 8) {
        chunks.push(guesses.slice(i, i + 8));
      }
      const emojiGuesses = chunks
        .map((each) =>
          each
            .map((guess) => getColourEmoji(guess, guesses[guesses.length - 1]))
            .join("")
        )
        .join("\n");
      const newStats = {
        lastWin,
        gamesWon,
        currentStreak,
        maxStreak,
        usedGuesses,
        emojiGuesses,
      };
      storeStats(newStats);

      // Show stats
      setTimeout(() => setShowStats(true), 3000);
    }
  }, [win, guesses, setShowStats, storeStats, storedStats, practiceMode]);

  // Practice mode

  // Fallback while loading
  const renderLoader = () => (
    <p className="dark:text-gray-200">
      <FormattedMessage id="Loading" />
    </p>
  );

  return (
    <Suspense fallback={renderLoader()}>
      <Guesser
        guesses={guesses}
        setGuesses={setGuesses}
        win={win}
        setWin={setWin}
        practiceMode={practiceMode}
      />
      {!reSpin && (
        <div className="pb-4 mb-5">
          <Globe
            guesses={guesses}
            globeRef={globeRef}
            practiceMode={practiceMode}
          />
          <List
            guesses={guesses}
            win={win}
            globeRef={globeRef}
            practiceMode={practiceMode}
          />
          {practiceMode && (
            <div className="my-4 flex flex-wrap gap-3 items-center">
              <span className="dark:text-gray-200">
                <FormattedMessage id="PracticeMode" />
              </span>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:ring-blue-300 rounded-lg text-sm
        px-4 py-2.5 text-center items-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/")}
              >
                {" "}
                <FormattedMessage id="PracticeExit" />
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:ring-blue-300 rounded-lg text-sm
        px-4 py-2.5 text-center items-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={enterPracticeMode}
              >
                <FormattedMessage id="PracticeNew" />
              </button>
            </div>
          )}
        </div>
      )}
    </Suspense>
  );
}
