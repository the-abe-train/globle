import useCheckMobile from "../hooks/useCheckMobile";
import { answerName } from "../util/answer";

type Props = {
  win: boolean;
  error: string;
  guesses: number;
};

export function Message({ win, error, guesses }: Props) {
  const isMobile = useCheckMobile();
  if (error) {
    return <p className="text-red-700 ">{error}</p>;
  } else if (win) {
    return (
      <p className="text-green-800 dark:text-green-300 ">
        The Mystery Country is {answerName}!
      </p>
    );
  } else if (guesses === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        Enter the name of any country to make your first guess.
      </p>
    );
  } else if (guesses === 1) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        Drag, {isMobile ? "tap" : "click"}, and zoom-in on the globe to help you
        find your next guess.
      </p>
    );
  } else {
    return <p className="text-red-700 "></p>;
  }
}
