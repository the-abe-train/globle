import { useContext, useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Game from "./pages/Game";
import Header from "./components/Header";
import Help from "./pages/Help";
import Info from "./pages/Info";
import Settings from "./pages/Settings";
import Statistics from "./components/Statistics";
import { ThemeContext } from "./context/ThemeContext";
import Fade from "./transitions/Fade";
import { MobileOnlyView, TabletView, BrowserView } from "react-device-detect";
import SnackAdUnit from "./components/SnackAdUnit";

function App() {
  // State
  const [reSpin, setReSpin] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [params] = useSearchParams();
  const practiceMode = Boolean(params.get("practice_mode"));

  // Context
  const themeContext = useContext(ThemeContext);

  // Re-render globe
  useEffect(() => {
    if (reSpin) setTimeout(() => setReSpin(false), 1);
  }, [reSpin]);

  const dark = themeContext.theme.nightMode ? "dark" : "";

  return (
    <div
      className={`max-w-xs sm:max-w-md md:max-w-2xl mx-auto 
      z-20 absolute top-0 bottom-0 left-0 right-0 block ${dark}`}
    >
      <Header setReSpin={setReSpin} setShowStats={setShowStats} />

      <Fade
        show={showStats}
        background="border-4 border-sky-300 dark:border-slate-700 bg-sky-100 
        dark:bg-slate-900 drop-shadow-xl 
      absolute z-10 w-full sm:w-fit inset-x-0 mx-auto py-6 px-6 rounded-md 
      space-y-2"
      >
        <Statistics setShowStats={setShowStats} />
      </Fade>
      <Routes>
        <Route path="/" element={<Help />} />
        <Route
          path="/game"
          element={<Game reSpin={reSpin} setShowStats={setShowStats} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
      </Routes>
      {!practiceMode && (
        <div className="sm:py-4">
          <MobileOnlyView>
            <SnackAdUnit unitName="snack_mex1" siteId="2902" />
          </MobileOnlyView>
          <BrowserView>
            <SnackAdUnit unitName="snack_dex1" siteId="2902" />
          </BrowserView>
          <TabletView>
            <SnackAdUnit unitName="snack_dex1" siteId="2902" />
          </TabletView>
        </div>
      )}
    </div>
  );
}

export default App;
