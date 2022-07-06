import { LanguageName } from "../lib/country";
import { Locale } from "../lib/locale";
import { German } from "./messages/de-DE";
import { English } from "./messages/en-CA";
import { Spanish } from "./messages/es-MX";
import { French } from "./messages/fr-FR";
import { Hungarian } from "./messages/hu-HU";
import { Polish } from "./messages/pl-PL";
import { Portuguese } from "./messages/pt-BR";
import { Swedish } from "./messages/sv-SE";

export const LOCALES = {
  English: English,
  Spanish: Spanish,
  French: French,
  German: German,
  Hungarian: Hungarian,
  Portuguese: Portuguese,
  Polish: Polish,
  Swedish: Swedish,
};

export const langNameMap: Record<Locale, LanguageName> = {
  "es-MX": "NAME_ES",
  "en-CA": "NAME_EN",
  "fr-FR": "NAME_FR",
  "de-DE": "NAME_DE",
  "hu-HU": "NAME_HU",
  "pt-BR": "NAME_PT",
  "pl-PL": "NAME_PL",
  "it-IT": "NAME_IT",
  "sv-SE": "NAME_SV",
};
