import { LocaleMessages } from "../../lib/locale";
import { German } from "./de-DE";
import { English } from "./en-CA";
import { Spanish } from "./es-MX";
import { French } from "./fr-FR";
import { Portuguese } from "./pt-BR";
import { Swedish } from "./sv-SE";

const localeList: LocaleMessages = {
  "en-CA": English,
  "es-MX": Spanish,
  "fr-FR": French,
  "de-DE": German,
  "pt-BR": Portuguese,
  "sv-SE": Swedish
};

export default localeList;
