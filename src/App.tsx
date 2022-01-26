import { useContext, useEffect, useState } from "react";
import Auxilliary from "./components/Auxilliary";
import Game from "./components/Game";
import Header from "./components/Header";
import Help from "./components/Help";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  // State
  const [screen, setScreen] = useState("Help");
  const [reSpin, setReSpin] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Context
  const themeContext = useContext(ThemeContext);

  // Re-render globe
  useEffect(() => {
    if (screen === "Game") setReSpin(true);
  }, [screen]);
  useEffect(() => {
    if (reSpin) setTimeout(() => setReSpin(false), 1);
  }, [reSpin]);

  const pickScreen = () => {
    if (screen === "Help") {
      return (
        <Auxilliary setScreen={setScreen}>
          <Help />
        </Auxilliary>
      );
    } else if (screen === "Settings") {
      return (
        <Auxilliary setScreen={setScreen}>
          <Settings />
        </Auxilliary>
      );
    } else {
      return <Game reSpin={reSpin} setShowStats={setShowStats} />;
    }
  };

  const dark = themeContext.theme.nightMode ? "dark" : "";

  return (
    <div
      className={`max-w-xs sm:max-w-md md:max-w-2xl mx-auto 
      z-20 absolute top-0 bottom-0 left-0 right-0 block ${dark}`}
    >
      <Header
        setScreen={setScreen}
        setReSpin={setReSpin}
        setShowStats={setShowStats}
      />
      {showStats && <Statistics setShowStats={setShowStats} />}
      {pickScreen()}
    </div>
  );
}

export default App;
