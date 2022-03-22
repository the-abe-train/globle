import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";

import { FormattedMessage } from "react-intl";

export default function Footer() {
  const iconWidth = 14;
  const { nightMode } = useContext(ThemeContext).theme;

  return (
    <footer className="pt-8 pb-4 text-xs flex items-end justify-between w-full">
      <span className="max-w-[40%] space-x-1">
        <a href="https://the-abe-train.com">
          <FormattedMessage id="Footer1" />
        </a>
        <a
          href="https://twitter.com/theAbeTrain"
          aria-label="Twitter"
          className="inline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            viewBox="0 0 24 24"
            fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
            className="inline"
          >
            <path d={getPath("twitter")} />
          </svg>
        </a>
        <a
          href="https://github.com/the-abe-train"
          aria-label="Github"
          className="inline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            viewBox="0 0 24 24"
            fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
            className="inline"
          >
            <path d={getPath("github")} />
          </svg>
        </a>
      </span>
      <div className="flex flex-col sm:flex-row justify-start">
        <span>
          <FormattedMessage id="Footer2" />
        </span>
        <span className="flex justify-end">
          <a
            className="underline mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://www.buymeacoffee.com/theabetrain"
          >
            <FormattedMessage id="Footer3" />
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            viewBox="0 0 24 24"
            fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
          >
            <path d={getPath("coffee")} />
          </svg>
        </span>
      </div>
    </footer>
  );
}
