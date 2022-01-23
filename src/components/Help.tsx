export default function Help() {
  const countrySize = 150;

  return (
    <div className="my-4 space-y-6">
      <h2 className="text-center text-2xl my-5">How to play</h2>
      <p>
        Every day, there is a new Mystery Country. Your goal is to guess the
        mystery country using the fewest number of guesses. Each incorrect guess
        will appear on the globe with a colour indicating how close it is to the
        Mystery Country.
      </p>
      <p>
        For example, if the Mystery Country is Japan, then the following
        countries would appear with these colours if guessed:
      </p>
      <div className="flex justify-between">
        <figure>
          <img src="images/fr-01.svg" width={countrySize} alt="France" />
          <figcaption className="text-center">France</figcaption>
        </figure>
        <figure>
          <img src="images/ir-01.svg" width={countrySize} alt="Iran" />
          <figcaption className="text-center">Iran</figcaption>
        </figure>
        <figure>
          <img src="images/cn-01.svg" width={countrySize} alt="China" />
          <figcaption className="text-center">China</figcaption>
        </figure>
        <figure>
          <img src="images/kr-01.svg" width={countrySize} alt="South Korea" />
          <figcaption className="text-center">South Korea</figcaption>
        </figure>
      </div>
      <p>A new Mystery Country will be available every day!</p>
    </div>
  );
}
