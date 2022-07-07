import { LocaleMessages } from "../../lib/locale";
import { English } from "./en-CA";
import { Spanish } from "./es-MX";
import { French } from "./fr-FR";
import { German } from "./de-DE";
import { Hungarian } from "./hu-HU";
import { Portuguese } from "./pt-BR";
import { Italian } from "./it_IT";
import { Polish } from "./pl-PL";
import { Swedish } from "./sv-SE";

const localeList: LocaleMessages = {
  "en-CA": English,
  "de-DE": German,
  "es-MX": Spanish,
  "fr-FR": French,
  "hu-HU": Hungarian,
  "it-IT": Italian,
  "pl-PL": Polish,
  "pt-BR": Portuguese,
  "sv-SE": Swedish,
};

export default localeList;
