export type Country = {
  type: string;
  proximity: number;
  properties: {
    scalerank: number;
    featurecla: string;
    LABELRANK: number;
    SOVEREIGNT: string;
    SOV_A3: string; // function pickCountry(name: string) {
    //   const country = countries.find(c => {
    //     return c.properties.NAME === name;
    //   })
    //   return country;
    // }
    ADM0_DIF: //     return c.properties.NAME === name;
    //   })
    //   return country;
    // }
    number;
    LEVEL: number;
    TYPE: string;
    ADMIN: string; //     return c.properties.NAME === name;
    ADM0_A3: string;
    GEOU_DIF: number;
    GEOUNIT: string;
    GU_A3: string;
    SU_DIF: number;
    SUBUNIT: string;
    SU_A3: string;
    BRK_DIFF: number;
    NAME: string;
    NAME_LONG: string;
    BRK_A3: string;
    BRK_NAME: string;
    BRK_GROUP: null;
    ABBREV: string;
    POSTAL: string; // For both, West and South are negative
    FORMAL_EN: string | null;
    FORMAL_FR: string | null;
    NAME_CIAWF: string | null;
    NOTE_ADM0: string | null;
    NOTE_BRK: string | null;
    NAME_SORT: string;
    NAME_ALT: string | null;
    MAPCOLOR7: number;
    MAPCOLOR8: number;
    MAPCOLOR9: number;
    MAPCOLOR13: number;
    POP_EST: number;
    POP_RANK: number;
    GDP_MD_EST: number;
    POP_YEAR: number;
    LASTCENSUS: number;
    GDP_YEAR: number;
    ECONOMY: string;
    INCOME_GRP: string;
    WIKIPEDIA: number;
    FIPS_10_: string;
    ISO_A2: string;
    ISO_A2_EH: string;
    FLAG: string;
    ISO_A3: string;
    ISO_A3_EH: string;
    ISO_N3: string;
    UN_A3: string;
    WB_A2: string;
    WB_A3: string;
    WOE_ID: number;
    WOE_ID_EH: number;
    WOE_NOTE: string;
    ADM0_A3_IS: string;
    ADM0_A3_US: string;
    ADM0_A3_UN: number;
    ADM0_A3_WB: number;
    CONTINENT: string;
    REGION_UN: string;
    SUBREGION: string;
    REGION_WB: string;
    NAME_LEN: number;
    LONG_LEN: number;
    ABBREV_LEN: number;
    TINY: number;
    HOMEPART: number;
    MIN_ZOOM: number;
    MIN_LABEL: number;
    MAX_LABEL: number;
    NAME_AR: string;
    NAME_BN: string;
    NAME_DE: string;
    NAME_EN: string;
    NAME_ES: string;
    NAME_FA: string;
    NAME_FR: string;
    NAME_EL: string;
    NAME_HE: string;
    NAME_HI: string;
    NAME_HU: string;
    NAME_ID: string;
    NAME_IT: string;
    NAME_JA: string;
    NAME_KO: string;
    NAME_NL: string;
    NAME_PL: string;
    NAME_PT: string;
    NAME_RU: string;
    NAME_SV: string;
    NAME_TR: string;
    NAME_UK: string;
    NAME_UR: string;
    NAME_VI: string;
    NAME_ZH: string;
    NAME_ZHT: string;
  };
  bbox: number[];
  geometry:
    | {
        type: "Polygon";
        coordinates: number[][][];
      }
    | {
        type: "MultiPolygon";
        coordinates: number[][][][];
      };
};

type LanguageName =
  | "NAME_AR"
  | "NAME_BN"
  | "NAME_DE"
  | "NAME_EN"
  | "NAME_ES"
  | "NAME_FA"
  | "NAME_FR"
  | "NAME_EL"
  | "NAME_HE"
  | "NAME_HI"
  | "NAME_HU"
  | "NAME_ID"
  | "NAME_IT"
  | "NAME_JA"
  | "NAME_KO"
  | "NAME_NL"
  | "NAME_PL"
  | "NAME_PT"
  | "NAME_RU"
  | "NAME_SV"
  | "NAME_TR"
  | "NAME_UK"
  | "NAME_UR"
  | "NAME_VI"
  | "NAME_ZH"
  | "NAME_ZHT";
