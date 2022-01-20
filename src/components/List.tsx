import { Country } from "../lib/country";

// TODO final country should say "answer" beside it, not "closest"
// TODO click on country should rotate globe to centre country.

type Props = {
  guesses: Country[];
};

export function List({ guesses }: Props) {
  const orderedGuesses = [...guesses].sort((a, b) => {
    return a.proximity - b.proximity;
  });


  return (
    <div className="ml-10 my-8">
      <ul className="grid grid-cols-4 gap-3">
        {orderedGuesses.map((guess, idx) => {
          const { NAME_LEN, ABBREV, NAME, WB_A2, ISO_A2 } = guess.properties;
          const name = NAME_LEN > 10 ? ABBREV : NAME;
          const flag =
            ISO_A2.length === 2 ? ISO_A2.toLowerCase() : WB_A2.toLowerCase();
          return (
            <li key={idx} className="flex items-center">
              <img
                src={`https://flagcdn.com/h20/${flag}.png`}
                // width="16"
                // height="12"
                alt={name}
                className=""
              />
              <span className="mx-1 text-md">
                {name} {idx === 0 ? "(Closest)" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
