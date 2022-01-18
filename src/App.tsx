import { useState } from "react";
import { Globe } from "./components/Globe";
import { Guesser } from "./components/Guesser";
import { Header } from "./components/Header";
import { List } from "./components/List";

function App() {

  const [guesses, setGuesses] = useState<Array<string>>([]);

  return (
    <div className="max-w-xl my-0 mx-auto">
      <Header />
      <Guesser guesses={guesses} setGuesses={setGuesses} />
      <Globe />
      <List />
    </div>
  );
}

export default App;
