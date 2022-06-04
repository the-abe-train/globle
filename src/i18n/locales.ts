import { LanguageName } from "../lib/country";
import { Locale } from "../lib/locale";
import { German } from "./messages/de-DE";
import { English } from "./messages/en-CA";
import { Spanish } from "./messages/es-MX";
import { French } from "./messages/fr-FR";
import { Portuguese } from "./messages/pt-BR";
import { Swedish } from "./messages/sv-SE";

// export const LOCALES: LocaleList = {
//   English: "English",
//   Spanish: "Spanish",
// };

export const LOCALES = {
  English: English,
  Spanish: Spanish,
  French: French,
  German: German,
  Portuguese: Portuguese,
  Swedish: Swedish
};

export const langNameMap: Record<Locale, LanguageName> = {
  "es-MX": "NAME_ES",
  "en-CA": "NAME_EN",
  "fr-FR": "NAME_FR",
  "de-DE": "NAME_DE",
  "pt-BR": "NAME_PT",
  "sv-SE": "NAME_SV"
};
