import { answerName } from "../util/answer";

type Props = {
  win: boolean;
  error: string;
};

export function Message({ win, error }: Props) {
  if (error) {
    return <p className="text-red-700 h-1">{error}</p>;
  } else if (win) {
    return (
      <p className="text-green-800 h-1">
        The mystery country was {answerName()}!
      </p>
    );
  } else {
    return <p className="text-red-700 h-1"></p>;
  }
}
