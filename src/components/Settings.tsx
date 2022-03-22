import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LocaleContext } from "../i18n/LocaleContext";
import LanguagePicker from "./LanguagePicker";
import localeList from "../i18n/messages";
import { FormattedMessage } from "react-intl";

function Toggle({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className="relative cursor-pointer ">
        <div className="block bg-gray-100 w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div
          className="dot absolute left-1 top-1 
        bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-6 h-6 rounded-full transition"
        ></div>
      </div>
    );
  } else {
    return (
      <div className="relative cursor-pointer ">
        <div className="block bg-gray-100  w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div
          className="dot absolute left-1 top-1 
        bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-6 h-6 rounded-full transition translate-x-full"
        ></div>
      </div>
    );
  }
}

export default function Settings() {
  const themeContext = useContext(ThemeContext);
  const [toggleTheme, setToggleTheme] = useState(!themeContext.theme.nightMode);
  const [toggleHighContrast, setToggleHighContrast] = useState(
    !themeContext.theme.highContrast
  );
  const { locale } = useContext(LocaleContext);

  const [toggleScope, setToggleScope] = useState(true);

  const { setTheme } = themeContext;

  useEffect(() => {
    if (setTheme) {
      setTheme({ nightMode: !toggleTheme, highContrast: !toggleHighContrast });
    }
  }, [toggleTheme, toggleHighContrast, setTheme]);

  function keyPressToggle(
    e: React.KeyboardEvent<HTMLLabelElement>,
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const keys = ["Enter", " ", "Return"];
    if (keys.includes(e.key)) {
      setToggle(!toggle);
    }
  }

  const options = [
    {
      name: "theme",
      setToggle: setToggleTheme,
      toggle: toggleTheme,
      on: localeList[locale]["Settings1"],
      off: localeList[locale]["Settings2"],
    },
    {
      name: "accessibility",
      setToggle: setToggleHighContrast,
      toggle: toggleHighContrast,
      on: localeList[locale]["Settings3"],
      off: localeList[locale]["Settings4"],
    },
    {
      name: "scope",
      setToggle: setToggleScope,
      toggle: toggleScope,
      on: localeList[locale]["Settings5"],
      off: localeList[locale]["Settings6"],
    },
  ];

  return (
    <div className="flex-col space-y-8 mx-auto my-10 w-fit">
      <LanguagePicker />
      {options.map((option, idx) => {
        const { name, toggle, setToggle, on, off } = option;
        return (
          <label
            htmlFor={name}
            key={idx}
            className="flex items-center justify-between space-x-8"
            onKeyPress={(e) => keyPressToggle(e, toggle, setToggle)}
            tabIndex={0}
          >
            <span className="text-lg">{toggle ? on : off}</span>
            <input
              id={name}
              type="checkbox"
              className="sr-only relative focus-visible:ring"
              checked={toggle}
              onChange={() => setToggle(!toggle)}
              tabIndex={-1}
              aria-hidden="true"
            />
            <Toggle checked={toggle} />
          </label>
        );
      })}
      {!toggleScope && (
        <p className="text-red-700">
          <FormattedMessage id="Settings8" />
        </p>
      )}
    </div>
  );
}
