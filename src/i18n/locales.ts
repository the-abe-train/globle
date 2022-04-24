import { LanguageName } from "../lib/country";
import { Locale, LocaleMessages } from "../lib/locale";
import { English } from "./messages/en-CA";
import { Spanish } from "./messages/es-MX";
import { German } from "./messages/de-DE";
import { Portuguese } from "./messages/pt-BR";


// export const LOCALES: LocaleList = {
//   English: "English",
//   Spanish: "Spanish",
// };

export const LOCALES = {
  English: English,
  Spanish: Spanish,
  German: German,
  Portuguese: Portuguese,
};

export const langNameMap: Record<Locale, LanguageName> = {
  "es-MX": "NAME_ES",
  "en-CA": "NAME_EN",
  "de-DE": "NAME_DE",
  "pt-BR": "NAME_PT",
};
