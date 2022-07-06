import { LanguageName } from "../lib/country";
import { Locale } from "../lib/locale";
import { English } from "./messages/en-CA";
import { Spanish } from "./messages/es-MX";
import { French } from "./messages/fr-FR";
import { German } from "./messages/de-DE";
import { Hungarian } from "./messages/hu-HU";
import { Portuguese } from "./messages/pt-BR";
import { Polish } from "./messages/pl-PL";

export const LOCALES = {
  English: English,
  Spanish: Spanish,
  French: French,
  German: German,
  Hungarian: Hungarian,
  Portuguese: Portuguese,
  Polish: Polish,
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
};
