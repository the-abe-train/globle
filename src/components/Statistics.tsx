import { useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// TODO Make stats page look nice

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

type Stats = {
  gamesWon: number;
  lastWin: string;
  currentStreak: number;
  maxStreak: number;
  usedGuesses: number[];
};

export default function Statistics({ setScreen }: Props) {
  const firstStats: Stats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString(),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
  };

  const modalRef = useRef(null!);

  function closeModal(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.contains(modalRef.current)) {
      setScreen("Game");
      document.removeEventListener("click", closeModal);
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeModal);
  }, []);

  const [storedStats, storeStats] = useLocalStorage("statistics", firstStats);

  const { gamesWon, lastWin, currentStreak, maxStreak, usedGuesses } =
    storedStats;

  return (
    <div
      className="modal w-96 h-96 bg-white absolute z-10 top-56 inset-x-0 mx-auto p-8 rounded-md"
      ref={modalRef}
    >
      <h2 className="text-3xl text-center">Statistics</h2>
      <p className="text-lg font-medium text-gray-800">Games won: {gamesWon}</p>
      <p className="text-lg font-medium text-gray-800">
        Current streak: {currentStreak}
      </p>
      <p className="text-lg font-medium text-gray-800">
        Max streak: {maxStreak}
      </p>

      <button
        className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => setScreen("Game")}
      >
        Close
      </button>
    </div>
  );
}
