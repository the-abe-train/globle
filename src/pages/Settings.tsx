import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LocaleContext } from "../i18n/LocaleContext";
import LanguagePicker from "../components/LanguagePicker";
import localeList from "../i18n/messages";
import { FormattedMessage } from "react-intl";
import Auxilliary from "../components/Auxilliary";
import { useNavigate } from "react-router-dom";
import { Country } from "../lib/country";
import Toggle from "../components/Toggle";
const countryData: Country[] = require("../data/country_data.json").features;

export default function Settings() {
  const themeContext = useContext(ThemeContext);
  const [toggleTheme, setToggleTheme] = useState(!themeContext.theme.nightMode);
  const [togglePride, setTogglePride] = useState(!themeContext.theme.prideMode);
  const [toggleHighContrast, setToggleHighContrast] = useState(
    !themeContext.theme.highContrast
  );
  const { locale } = useContext(LocaleContext);

  const [toggleScope, setToggleScope] = useState(true);

  const { setTheme } = themeContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (setTheme) {
      setTheme({
        nightMode: !toggleTheme,
        highContrast: !toggleHighContrast,
        prideMode: !togglePride,
      });
    }
  }, [toggleTheme, toggleHighContrast, setTheme, togglePride]);

  function enterPracticeMode() {
    const practiceAnswer =
      countryData[Math.floor(Math.random() * countryData.length)];
    localStorage.setItem("practice", JSON.stringify(practiceAnswer));
    navigate("/game?practice_mode=true");
  }

  const options = [
    {
      name: "theme",
      setToggle: setToggleTheme,
      toggle: toggleTheme,
      on: localeList[locale]["Settings2"],
      off: localeList[locale]["Settings1"],
    },
    {
      name: "pride",
      setToggle: setTogglePride,
      toggle: togglePride,
      on: "Rainbow On",
      off: "Rainbow Off",
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
    <div
      className="flex-col items-center align-middle space-y-8 mx-auto my-10 
    min-w-[300px] sm:min-w-[400px] w-fit text-lg"
    >
      <LanguagePicker />
      {options.map((option) => {
        return <Toggle {...option} key={option.name} />;
      })}
      <button
        onClick={enterPracticeMode}
        className="text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:ring-blue-300 rounded-lg text-sm
        px-4 py-2.5 text-center items-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-32 justify-center self-center mx-auto block"
      >
        <span className="font-medium">
          <FormattedMessage id="Settings9" />
        </span>
      </button>
      {!toggleScope && (
        <p className="text-red-700">
          <FormattedMessage id="Settings8" />
        </p>
      )}
      <Auxilliary screen="Settings" />
    </div>
  );
}
