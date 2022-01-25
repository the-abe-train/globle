import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Stats } from "../lib/localStorage";
import { Transition } from "react-transition-group";

// TODO Test: Check that the scoring day by day actually works

type Props = {
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

type TransitionState = "entering" | "entered" | "exiting" | "exited";

export default function Statistics({ setShowStats }: Props) {
  // Stats data
  const firstStats = {
    gamesWon: 0,
    lastWin: new Date(0).toLocaleDateString(),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
  };

  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    firstStats,
    new Date().toLocaleDateString()
  );

  const { gamesWon, lastWin, currentStreak, maxStreak, usedGuesses } =
    storedStats;

  const sumGuesses = usedGuesses.reduce((a, b) => a + b, 0);
  const avgGuesses = Math.round((sumGuesses / usedGuesses.length) * 100) / 100;
  const showAvgGuesses = usedGuesses.length === 0 ? "--" : avgGuesses;

  const showLastWin = lastWin >= "2022-01-01" ? lastWin : "--";

  const statsTable = [
    { label: "Last win", value: showLastWin },
    { label: "Games won", value: gamesWon },
    { label: "Current streak", value: currentStreak },
    { label: "Max streak", value: maxStreak },
    { label: "Average guesses used", value: showAvgGuesses },
  ];

  // Closing the modal
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
    console.log(showResetMsg)
  }

  // Clipboard
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  async function copyToClipboard() {
    const shareString = `My GLOBLE Stats
Last win	${showLastWin}
Games won	${gamesWon}
Current streak	${currentStreak}
Max streak	${maxStreak}
Average guesses used	${showAvgGuesses}`;
    setMsg("Copied to clipboard!");
    setShowCopyMsg(true);
    setTimeout(() => setShowCopyMsg(false), 2000);
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(shareString);
    } else {
      return document.execCommand("copy", true, shareString);
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

  return (
    <div
      className="text-gray-900 dark:text-gray-300  border-2 border-sky-700 dark:border-slate-700 drop-shadow-xl bg-sky-100 dark:bg-slate-900 
      absolute z-10 top-24 w-96 inset-x-0 mx-auto py-2 px-6 rounded-md space-y-2"
      ref={modalRef}
    >
      <button
        className="absolute top-3 right-4"
        onClick={() => setShowStats(false)}
      >
        <svg x="0px" y="0px" viewBox="0 0 460.775 460.775" width="12px" className=" dark:fill-gray-300">
          <path
            d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
          />
        </svg>
      </button>
      <h2 className="text-3xl text-center">Statistics</h2>
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
          className="bg-red-700 text-white rounded-md px-6 py-2 block text-base font-medium hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-300 mx-4"
          onClick={promptReset}
        >
          Reset
        </button>
        <button
          className="bg-blue-700 text-white rounded-md px-8 py-2 block text-base font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow mx-10"
          onClick={copyToClipboard}
        >
          Share
        </button>
      </div>
      <Transition nodeRef={msgRef} in={showResetMsg} timeout={duration}>
        {(state: TransitionState) => (
          <div ref={msgRef} 
            className={`transition-opacity ease-in-out delay-${duration} border-4 border-sky-300 dark:border-slate-700 bg-sky-100 dark:bg-slate-900 drop-shadow-xl 
            absolute z-10 top-32 w-fit inset-x-0 mx-auto py-6 px-6 rounded-md space-y-2`}
            style={{ ...transitionStyles[state] }}
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
            border-4 border-sky-300 dark:border-slate-700 bg-sky-100 dark:bg-slate-900 drop-shadow-xl 
            absolute z-10 top-32 w-fit inset-x-0 mx-auto py-6 px-6 rounded-md space-y-2`}
            style={{
              ...transitionStyles[state],
            }}
          >
            <p className="text-gray-900 dark:text-gray-300">{msg}</p>
          </div>
        )}
      </Transition>
    </div>
  );
}
