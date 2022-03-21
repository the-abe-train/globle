import { useContext, useState } from "react";

import { FormattedMessage } from "react-intl";
import { LocaleContext } from "../i18n/LocaleContext";
import messages from "../i18n/messages";

import { Locale } from "../lib/locale";

const langMap = {
  "en-CA": "English",
  "es-MX": "Español",
};

const languages = Object.keys(messages) as Locale[];

export default function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const localeContext = useContext(LocaleContext);

  function changeLocale(locale: Locale) {
    if (localeContext.setLocale) {
      localeContext.setLocale(locale);
    }
  }

  return (
    <label className="flex justify-between items-center">
      <span className="text-lg">
        <FormattedMessage id="Settings7" />
      </span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-white bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
        px-4 py-2.5 text-center inline-flex items-center 
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-32 justify-between
        "
          type="button"
        >
          <span>
            <FormattedMessage id="name" />
          </span>
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {open && (
          <div
            className="z-10 w-32 text-base list-none bg-white rounded divide-y 
        divide-gray-100 shadow dark:bg-gray-700
        absolute top-full
        transition "
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              {languages.map((lang, idx) => {
                const locale = lang;
                return (
                  <li
                    className="block py-2 px-4 text-sm text-gray-700 
                  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 
                  dark:hover:text-white"
                    onClick={() => changeLocale(locale)}
                    key={idx}
                  >
                    {langMap[lang]}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </label>
  );
}
