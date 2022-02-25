import { useContext, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Stats } from "../lib/localStorage";
import { Transition } from "react-transition-group";
import useCheckMobile from "../hooks/useCheckMobile";
import { getPath } from "../util/svg";
import { ThemeContext } from "../context/ThemeContext";
import { today } from "../util/dates";

type Props = {
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

type TransitionState = "entering" | "entered" | "exiting" | "exited";

export default function Statistics({ setShowStats }: Props) {
  // Stats data
  const firstStats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString("en-CA"),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
  };

  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    firstStats
  );
  const { gamesWon, lastWin, currentStreak, maxStreak, usedGuesses } =
    storedStats;

  const sumGuesses = usedGuesses.reduce((a, b) => a + b, 0);
  const avgGuesses = Math.round((sumGuesses / usedGuesses.length) * 100) / 100;
  const showAvgGuesses = usedGuesses.length === 0 ? "--" : avgGuesses;
  const todaysGuesses =
    lastWin === today ? usedGuesses[usedGuesses.length - 1] : "--";

  const showLastWin = lastWin >= "2022-01-01" ? lastWin : "--";

  const avgShorthand = useCheckMobile()
    ? "Avg. guesses"
    : "Average guesses needed";

  const statsTable = [
    { label: "Last win", value: showLastWin },
    { label: "Today's guesses", value: todaysGuesses },
    { label: "Games won", value: gamesWon },
    { label: "Current streak", value: currentStreak },
    { label: "Max streak", value: maxStreak },
    { label: avgShorthand, value: showAvgGuesses },
  ];

  // Closing the modal
  const modalRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function closeModal(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!modalRef.current?.contains(target)) {
        setShowStats(false);
      }
    }
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [setShowStats]);

  // Reset stats
  const [msg, setMsg] = useState("");
  const [showResetMsg, setShowResetMsg] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  function promptReset() {
    setMsg("Are you sure you want to reset your score?");
    setResetComplete(false);
    setShowResetMsg(true);
  }
  function resetStats() {
    storeStats(firstStats);
    setMsg("Stats erased.");
    setResetComplete(true);
    setTimeout(() => setShowResetMsg(false), 2000);
  }

  // Clipboard
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const event = new Date();
  // @ts-ignore
  const unambiguousDate = event.toLocaleDateString("en-CA", options);
  const date = unambiguousDate === "Invalid Date" ? today : unambiguousDate;
  async function copyToClipboard() {
    const shareString = `🌎 ${date} 🌍
Today's guesses: ${todaysGuesses}
Current streak: ${currentStreak}
Average guesses: ${showAvgGuesses}

https://globle-game.com`;
    if ("canShare" in navigator) {
      navigator.share({
        title: "Globle Stats",
        text: shareString,
      });
    } else {
      setMsg("Copied to clipboard!");
      setShowCopyMsg(true);
      setTimeout(() => setShowCopyMsg(false), 2000);
      if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(shareString);
      } else {
        return document.execCommand("copy", true, shareString);
      }
    }
  }

  // Tranisition
  const msgRef = useRef(null!);
  const duration = 3000;

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  // Backgorund style
  const { nightMode } = useContext(ThemeContext).theme;
  const background = nightMode
    ? `radial-gradient(ellipse at top, rgba(22, 1, 82, 0.4), transparent), 
radial-gradient(ellipse at bottom, rgba(125, 48, 116, 0.2), transparent) 
no-repeat fixed black`
    : `radial-gradient(ellipse at top, rgba(63, 201, 255, 0.2), transparent), 
  radial-gradient(ellipse at bottom, rgba(255, 196, 87, 0.2), transparent) 
  no-repeat fixed white`;

  return (
    <div
      className="text-gray-900 dark:text-gray-300 dark:bg-slate-900 
      border-2 border-sky-700 dark:border-slate-700 drop-shadow-xl 
      absolute z-10 top-24 sm:max-w-sm inset-x-0 mx-auto py-2 px-6 rounded-md space-y-2"
      ref={modalRef}
      style={{ background }}
    >
      <button
        className="absolute top-3 right-4"
        onClick={() => setShowStats(false)}
      >
        <svg
          x="0px"
          y="0px"
          viewBox="0 0 460.775 460.775"
          width="12px"
          className=" dark:fill-gray-300"
        >
          <path d={getPath("x")} />
        </svg>
      </button>
      <h2
        className="text-3xl text-center font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        Statistics
      </h2>
      <table cellPadding="4rem" className="mx-auto" width="100%">
        <tbody>
          {statsTable.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="pt-4 border-b-2 border-dotted border-slate-700 text-lg font-medium">
                  {row.label}
                </td>
                <td className="pt-4 border-b-2 border-dotted border-slate-700 text-lg font-medium">
                  {row.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="py-6 flex">
        <button
          className="bg-red-700 text-white rounded-md px-6 py-2 block 
          text-base font-medium hover:bg-red-900 
          focus:outline-none focus:ring-2 focus:ring-red-300 mx-4"
          onClick={promptReset}
        >
          Reset
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-900 dark:bg-purple-800 dark:hover:bg-purple-900
          text-white rounded-md px-8 py-2 block text-base font-medium 
          focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow mx-10"
          onClick={copyToClipboard}
        >
          Share
        </button>
      </div>
      <Transition nodeRef={msgRef} in={showResetMsg} timeout={duration}>
        {(state: TransitionState) => (
          <div
            ref={msgRef}
            className={`transition-opacity ease-in-out delay-${duration} border-4 border-sky-300 dark:border-slate-700 bg-sky-100 dark:bg-slate-900 drop-shadow-xl 
            absolute z-10 top-32 w-fit inset-x-0 mx-auto py-6 px-6 rounded-md space-y-2`}
            style={{
              ...transitionStyles[state],
              background,
            }}
          >
            <div>
              <p className="text-gray-900 dark:text-gray-300  ">{msg}</p>

              <div className="py-6 flex justify-center space-x-8">
                <button
                  className="bg-red-700 text-white rounded-md px-6 py-2 block text-base font-medium hover:bg-red-900 disabled:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={resetStats}
                  disabled={resetComplete}
                >
                  Yes
                </button>
                <button
                  className="bg-blue-700 text-white rounded-md px-6 py-2 block text-base font-medium hover:bg-blue-900 disabled:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setShowResetMsg(false)}
                  disabled={resetComplete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </Transition>
      <Transition nodeRef={msgRef} in={showCopyMsg} timeout={duration}>
        {(state: TransitionState) => (
          <div
            className={`transition-opacity ease-in-out delay-${duration} 
            border-4 border-sky-300 dark:border-slate-700 drop-shadow-xl 
            absolute z-10 top-32 w-fit inset-x-0 mx-auto py-6 px-6 rounded-md space-y-2`}
            style={{
              ...transitionStyles[state],
              background,
            }}
          >
            <p className="text-gray-900 dark:text-gray-300">{msg}</p>
          </div>
        )}
      </Transition>
    </div>
  );
}
