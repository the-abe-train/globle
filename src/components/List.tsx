type Props = {
  guesses: Array<string>;
};

// TODO display list as grid
// TODO add flags to country grid

export function List({ guesses }: Props) {
  return (
    <div>
      <h3 className="text-xl">Previous guesses</h3>
      <ul>
        {guesses.map((guess, idx) => {
          return <li key={idx}>{guess}</li>;
        })}
      </ul>
    </div>
  );
}
