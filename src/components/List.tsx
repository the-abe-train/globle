import Data from "../country_data.json";

const countries = Data.features
  .filter((country) => {
    return country.properties.TYPE === "Sovereign country";
  })
  .map((country) => {
    return {
      name: country.properties.NAME,
      code: country.properties.ISO_A2.toLowerCase(),
    };
  });
const guesses = countries.slice(6, 17);

export function List() {
  return (
    <div className="ml-10 my-8">
      <ul className="grid grid-cols-4 gap-2">
        {guesses.map((guess, idx) => {
          return (
            <li key={idx}>
              <img
                src={`https://flagcdn.com/h20/${guess.code}.png`}
                width="16"
                height="12"
                alt={guess.name}
                className="inline"
              />
              <span className="mx-1 text-base">{guess.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
