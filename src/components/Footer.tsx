import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function Footer({ setScreen }: Props) {
  const iconWidth = 14;
  const { nightMode } = useContext(ThemeContext).theme;
  return (
    <footer className="pt-8 pb-4 text-xs flex justify-between w-full">
      <span className="flex space-x-3">
        <a href="https://the-abe-train.com">by The Abe Train</a>
        <a href="https://twitter.com/theAbeTrain" aria-label="Twitter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            viewBox="0 0 24 24"
            fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
          >
            <path d={getPath("twitter")} />
          </svg>
        </a>
        <a href="https://github.com/the-abe-train" aria-label="Github">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            viewBox="0 0 24 24"
            fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
          >
            <path d={getPath("github")} />
          </svg>
        </a>
      </span>
      {/* <span>
        <button
          className="underline cursor-pointer"
          onClick={() => setScreen("Info")}
        >
          FAQ
        </button>
      </span> */}
    </footer>
  );
}
