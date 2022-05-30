declare module "edit-distance" {
  //Just adding the minimum type declarations for what we use of edit-distance.
  export interface distanceInfo {
    a: string;
    b: string;
    distance: number;
  }

  export type simpleCostFunction = (char: string) => number;
  export type compareCostFunction = (charA: string, charB: string) => number;

  export function levenshtein(
    stringA: string,
    stringB: string,
    insertCb: simpleCostFunction,
    removeCb: simpleCostFunction,
    updateCb: compareCostFunction
  ): distanceInfo;
}
