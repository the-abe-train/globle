import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useCheckMobile from "../hooks/useCheckMobile";
import { getPath } from "../util/svg";

export default function Footer() {
  const iconWidth = 14;
  const { nightMode } = useContext(ThemeContext).theme;
  const isMobile = useCheckMobile();
  return (
    <footer className="pt-8 pb-4 text-xs flex items-end justify-between w-full">
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
      <p className="">
        Enjoying the game? {isMobile && <br />}
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href="https://www.buymeacoffee.com/theabetrain"
        >
          Buy me a coffee!
        </a>{" "}
        ☕
      </p>
    </footer>
  );
}
