import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";

export default function Footer() {
  const iconWidth = 14;
  const { nightMode } = useContext(ThemeContext).theme;
  return (
    <footer className="absolute -bottom-24 md:-bottom-36 left-0 py-4 text-xs">
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
      <span>
        Learn the what qualifies as a &nbsp;
        <a
          className="underline"
          href="https://www.sporcle.com/blog/2013/01/what-is-a-country/"
        >
          valid country
        </a>
        &nbsp; in this game.
      </span>
    </footer>
  );
}
