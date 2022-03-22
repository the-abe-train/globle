// import useCheckMobile from "../hooks/useCheckMobile";
import { isMobile } from "react-device-detect";
import { answerCountry, answerName } from "../util/answer";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { LocaleContext } from "../i18n/LocaleContext";
import { langNameMap } from "../i18n/locales";

type Props = {
  win: boolean;
  error: any;
  guesses: number;
};

export function Message({ win, error, guesses }: Props) {
  const { locale } = useContext(LocaleContext);

  let name = answerName;
  if (locale !== "en-CA") {
    const langName = langNameMap[locale];
    name = answerCountry["properties"][langName];
  }

  if (error) {
    return <p className="text-red-700 ">{error}</p>;
  } else if (win) {
    return (
      <p className="text-green-800 dark:text-green-300 font-bold ">
        <FormattedMessage id="Game7" values={{ answer: name }} />
      </p>
    );
  } else if (guesses === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        <FormattedMessage id="Game3" />
      </p>
    );
  } else if (guesses === 1) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        <FormattedMessage
          id="Game4"
          values={{ click: isMobile ? "tap" : "click" }}
        />
      </p>
    );
  } else {
    return <p className="text-red-700 "></p>;
  }
}
