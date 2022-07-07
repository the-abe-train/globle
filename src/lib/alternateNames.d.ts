import { Locale } from "./locale";

export type AltPair = {
  real: string;
  alternative: string;
};

export type AltNames = Record<Locale, AltPair[]>;
