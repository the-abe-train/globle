import { useState } from "react";
import { Globe } from "./components/Globe";
import { Guesser } from "./components/Guesser";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Country } from "./lib/country";

function App() {

  const [guesses, setGuesses] = useState<Country[]>([]);
  

  return (
    <div className="max-w-xl my-4 mx-auto">
      <Header />
      <Guesser guesses={guesses} setGuesses={setGuesses} />
      <Globe guesses={guesses}  />
      <List guesses={guesses}  />
    </div>
  );
}

export default App;
