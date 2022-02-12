import symbolPaths from "../data/symbol_svgs.json";
import countryPaths from "../data/country_outlines.json";
import socialPaths from "../data/social_svgs.json";

export function getPath(name: string) {
  const allPaths = [...countryPaths, ...symbolPaths, ...socialPaths];
  const obj = allPaths.find((p) => p.name === name);
  const path = obj?.path || "";
  return path;
}
