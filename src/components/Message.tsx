import useCheckMobile from "../hooks/useCheckMobile";
import { answerName } from "../util/answer";

type Props = {
  win: boolean;
  error: string;
  firstGuess: boolean;
};

export function Message({ win, error, firstGuess }: Props) {
  const isMobile = useCheckMobile();
  if (error) {
    return <p className="text-red-700 ">{error}</p>;
  } else if (win) {
    return (
      <p className="text-green-800 dark:text-green-300 ">
        The Mystery Country is {answerName}!
      </p>
    );
  } else if (firstGuess) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        Drag, {isMobile ? "tap" : "click"}, and zoom-in on the globe to help you
        find your next guess
      </p>
    );
  } else {
    return <p className="text-red-700 "></p>;
  }
}
