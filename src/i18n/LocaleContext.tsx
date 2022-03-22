import messages from "./messages";

import { Locale } from "../lib/locale";

import { IntlProvider } from "react-intl";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";

type Props = {
  children: any;
  locale?: Locale;
};

type LocaleContextType = {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>> | null;
};

const initialLocale: Locale = "en-CA";

const initialLocaleContext: LocaleContextType = {
  locale: initialLocale,
  setLocale: null,
};

export const LocaleContext =
  createContext<LocaleContextType>(initialLocaleContext);

export default function LocaleProvider({ children }: Props) {
  const [storedLocale, storeLocale] = useLocalStorage<Locale>(
    "locale",
    initialLocale
  );

  const [locale, setLocale] = useState(storedLocale);

  useEffect(() => {
    storeLocale(locale);
  }, [storeLocale, locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
}
