import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { answerName } from "../util/answer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Guesses, Stats } from "../lib/localStorage";

const Globe = lazy(() => import("./Globe"));
const Guesser = lazy(() => import("./Guesser"));
const List = lazy(() => import("./List"));
const countryData: Country[] = require("../country_data.json").features;

type Props = {
  reSpin: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ reSpin, setShowStats }: Props) {
  // Get data from local storage
  const today = new Date().toLocaleDateString("en-CA");
  const [storedGuesses, storeGuesses] = useLocalStorage<Guesses>(
    "guesses",
    {
      day: today,
      countries: [],
    },
    today
  );

  const firstStats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString("en-CA"),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
  };
  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    firstStats,
    "9999-99-99"
  );

  // Stored guesses to state, as countries
  // If it's a new day though, start with a blank slate
  const storedCountryNames = storedGuesses.countries;
  const storedCountries = storedCountryNames.map((guess) => {
    const foundCountry = countryData.find((country) => {
      return country.properties.NAME === guess;
    });
    if (!foundCountry) throw new Error("Country mapping broken");
    return foundCountry;
  });

  // Stored stats to state
  const previousStats: Stats = { ...storedStats };

  // Check if win condition already met
  const alreadyWon = storedCountryNames.includes(answerName);

  // Now we're ready to start the game! Set up the game states with the data we
  // already know from the stored info.
  const [guesses, setGuesses] = useState<Country[]>(storedCountries);
  const [win, setWin] = useState(alreadyWon);
  const globeRef = useRef<GlobeMethods>(null!);

  useEffect(() => {
    const guessNames = guesses.map((country) => country.properties.NAME);
    const today = new Date().toLocaleDateString("en-CA");
    storeGuesses({
      day: today,
      countries: guessNames,
    });
  }, [guesses, storeGuesses]);

  // When the player wins!
  useEffect(() => {
    if (win && previousStats.lastWin < today) {
      // Store new stats in local storage
      const gamesWon =
        today === previousStats.lastWin ? previousStats.gamesWon + 1 : 1;
      const elapsed = Date.parse(today) - Date.parse(previousStats.lastWin);
      const streakBroken = elapsed / 3600 / 1000 >= 24 ? true : false;
      const currentStreak = streakBroken ? 1 : previousStats.currentStreak + 1;
      const maxStreak =
        currentStreak > previousStats.maxStreak
          ? currentStreak
          : previousStats.maxStreak;
      const newStats = {
        gamesWon,
        lastWin: today,
        currentStreak,
        maxStreak,
        usedGuesses: [...previousStats.usedGuesses, guesses.length],
      };
      storeStats(newStats);

      // Show stats
      setTimeout(() => setShowStats(true), 3000);
    }

    // Previous stats must NOT be in the dependency array or there will be an
    // infinite loop
  }, [win, guesses, setShowStats, storeStats]);

  // Fallback while loading
  const renderLoader = () => <p>Loading</p>;

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
