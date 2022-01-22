import { useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Stats } from "../lib/localStorage";

// TODO Make stats page look nice

type Props = {
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Statistics({ setShowStats }: Props) {
  const firstStats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString(),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
  };

  const modalRef = useRef<HTMLDivElement>(null!);

  function closeModal(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!modalRef.current?.contains(target)) {
      setShowStats(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);

  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    firstStats
  );

  const { gamesWon, lastWin, currentStreak, maxStreak, usedGuesses } =
    storedStats;

  const sumGuesses = usedGuesses.reduce((a, b) => a + b, 0);
  const avgGuesses = Math.round((sumGuesses / usedGuesses.length) * 100) / 100;

  return (
    <div
      className="drop-shadow-xl w-96 h-96 bg-white absolute z-10 top-56 inset-x-0 mx-auto p-8 rounded-md space-y-3"
      ref={modalRef}
    >
      <h2 className="text-3xl text-center pb-2">Statistics</h2>
      <p className="text-lg font-medium text-gray-800">Last win: {lastWin}</p>
      <p className="text-lg font-medium text-gray-800">Games won: {gamesWon}</p>
      <p className="text-lg font-medium text-gray-800">
        Current streak: {currentStreak}
      </p>
      <p className="text-lg font-medium text-gray-800">
        Max streak: {maxStreak}
      </p>
      <p className="text-lg font-medium text-gray-800">
        Average guesses used: {avgGuesses}
      </p>

<div className="py-6">

      <button
        className="bg-green-500 text-white rounded-md px-8 py-2 mx-auto block text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => setShowStats(false)}
      >
        Close
      </button>
</div>
    </div>
  );
}
