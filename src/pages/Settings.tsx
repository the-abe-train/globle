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

  // eslint-disable-next-line
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
      on: localeList[locale]["Settings10"],
      off: localeList[locale]["Settings11"],
    },
    {
      name: "accessibility",
      setToggle: setToggleHighContrast,
      toggle: toggleHighContrast,
      on: localeList[locale]["Settings3"],
      off: localeList[locale]["Settings4"],
    },
  ];

  return (
    <div
      className="flex-col items-center align-middle space-y-8 mx-auto my-10 
    min-w-[300px] sm:min-w-[400px] w-fit text-lg max-w-md"
    >
      <LanguagePicker />
      {options.map((option) => {
        return <Toggle {...option} key={option.name} />;
      })}
      <button
        onClick={enterPracticeMode}
        className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900
         dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
        focus:ring-4 focus:ring-blue-300 rounded-lg text-sm
        px-4 py-2.5 text-center items-center
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
