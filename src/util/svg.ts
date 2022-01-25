import symbolPaths from "../symbol_svgs.json";
import countryPaths from "../country_outlines.json";
import socialPaths from "../social_svgs.json";

export function getPath(name: string) {
  const allPaths = [...countryPaths, ...symbolPaths, ...socialPaths];
  const obj = allPaths.find((p) => p.name === name);
  const path = obj?.path || "";
  return path;
}
