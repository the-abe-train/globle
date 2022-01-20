import { Country } from "../lib/country";

type Props = {
  guesses: Country[];
};

export function List({ guesses }: Props) {
  return (
    <div className="ml-10 my-8">
      <ul className="grid grid-cols-4 gap-2">
        {guesses.map((guess, idx) => {
          const name = guess.properties.NAME;
          // const isoA2 = guess.properties.ISO_A2.toLowerCase();
          const flag = guess.properties.WB_A2.toLowerCase();
          // const flag = typeof isoA2 === "string" ? isoA2 : wbA2;
          // const flag = wbA2;
          return (
            <li key={idx}>
              <img
                src={`https://flagcdn.com/h20/${flag}.png`}
                width="16"
                height="12"
                alt={name}
                className="inline"
              />
              <span className="mx-1 text-lg">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
