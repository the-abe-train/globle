import { FormEvent, useState } from "react";

type Props = {
  guesses: Array<string>;
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
};

// TODO only accept guesses that are valid countries

export function Guesser({ guesses, setGuesses }: Props) {
  const [guess, setGuess] = useState("");

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuesses([...guesses, guess]);
  }

  return (
    <form
      onSubmit={addGuess}
      className="space-y-3 space-x-2 my-5 mx-auto block text-center"
    >
      <label className="block" htmlFor="guesser">
        Guess the Mystery Country
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="guesser"
        id="guesser"
        onChange={(e) => setGuess(e.currentTarget.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}
