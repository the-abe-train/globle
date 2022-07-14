import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "../i18n/LocaleContext";
import messages from "../i18n/messages";
import { Locale } from "../lib/locale";

const langMap = {
  "en-CA": "English",
  "de-DE": "Deutsch",
  "es-MX": "Español",
  "fr-FR": "Français",
  "it-IT": "Italiano",
  "hu-HU": "Magyar",
  "pl-PL": "Polski",
  "pt-BR": "Português",
  "sv-SE": "Swedish",
};

const languages = Object.keys(messages) as Locale[];

export default function LanguagePicker() {
  const localeContext = useContext(LocaleContext);
  const [selected, setSelected] = useState<Locale>(localeContext.locale);

  useEffect(() => {
    if (localeContext.setLocale) {
      localeContext.setLocale(selected);
    }
  }, [selected, localeContext]);

  return (
    <label className="flex justify-between items-center" htmlFor="language">
      <span className="text-lg dark:text-gray-200">
        <FormattedMessage id="Settings7" />
      </span>
      <select
        name="language"
        id="language"
        className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900
         dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
        px-4 py-2.5 text-center inline-flex items-center
        justify-between rounded-lg text-sm font-medium
        "
        value={selected}
        onChange={(e) => setSelected(e.target.value as Locale)}
      >
        {languages.map((lang, idx) => {
          return (
            <option
              className="py-2 px-4 text-sm text-gray-700 text-left
                  hover:bg-gray-100 dark:hover:bg-gray-600 
                  dark:hover:text-white bg-white"
              key={idx}
              value={lang}
            >
              {langMap[lang]}
            </option>
          );
        })}
      </select>
    </label>
  );
}
