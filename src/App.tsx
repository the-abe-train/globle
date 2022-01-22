import { useContext, useEffect, useState } from "react";
import Game from "./components/Game";
import { Header } from "./components/Header";
import Help from "./components/Help";
import Statistics from "./components/Statistics";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  // State
  const [screen, setScreen] = useState("Help");
  const [reSpin, setReSpin] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Context
  const theme = useContext(ThemeContext);

  // Re-render globe
  useEffect(() => {
    if (screen === "Game") setReSpin(true);
  }, [screen]);
  useEffect(() => {
    if (reSpin) setTimeout(() => setReSpin(false), 1);
  }, [reSpin]);

  const pickScreen = () => {
    if (screen === "Help") {
      return <Help setScreen={setScreen} />;
    } else {
      return <Game reSpin={reSpin} />;
    }
  };

  return (
    <div className="max-w-2xl my-4 mx-auto">
      <Header
        screen={screen}
        setScreen={setScreen}
        reSpin={reSpin}
        setReSpin={setReSpin}
        showStats={showStats}
        setShowStats={setShowStats}
      />
      {showStats && <Statistics setShowStats={setShowStats} />}
      {pickScreen()}
    </div>
  );
}

export default App;
