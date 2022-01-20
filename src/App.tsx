import { useState } from "react";
import { Globe } from "./components/Globe";
import { Guesser } from "./components/Guesser";
import { Header } from "./components/Header";
import Help from "./components/Help";
import { List } from "./components/List";
import { Country } from "./lib/country";

// type Screen = "Help" | "Game";

function App() {
  const [guesses, setGuesses] = useState<Country[]>([]);
  const [win, setWin] = useState(false);
  const [screen, setScreen] = useState("Help");

  if (screen === "Help") {
    return (
      <div className="max-w-xl my-4 mx-auto">
        <Header setScreen={setScreen} />
        <Help setScreen={setScreen} />
      </div>
    );
  } else {
    return (
      <div className="max-w-xl my-4 mx-auto">
        <Header setScreen={setScreen} />
        <Guesser
          guesses={guesses}
          setGuesses={setGuesses}
          win={win}
          setWin={setWin}
        />
        <Globe guesses={guesses} />
        <List guesses={guesses} />
      </div>
    );
  }
}

export default App;
