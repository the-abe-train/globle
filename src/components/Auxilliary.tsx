import {
  lazy,
  ReactChild,
  Suspense,
  useContext,
  useEffect,
  useRef,
} from "react";
import { GlobeMethods } from "react-globe.gl";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "./Footer";
import { isMobile } from "react-device-detect";
const ReactGlobe = lazy(() => import("react-globe.gl"));
// import useCheckMobile from "../hooks/useCheckMobile";

type Props = {
  children: ReactChild;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  screen: string;
};

export default function Auxilliary({ children, setScreen, screen }: Props) {
  // Window size
  // isMobile

  // Globe size settings
  const globeSize = 150;
  const extraStyle = {
    width: `${globeSize}px`,
    clipPath: `circle(${globeSize / 2}px at ${globeSize / 2}px ${
      globeSize / 2
    }px)`,
  };
  const globeRef = useRef<GlobeMethods>(null!);

  const { nightMode } = useContext(ThemeContext).theme;
  const timeOfDay = nightMode ? "night" : "day";

  useEffect(() => {
    setTimeout(() => {
      if (globeRef.current) {
        const controls: any = globeRef.current.controls();
        controls.autoRotate = true;
      }
    }, 500);
  }, [globeRef]);

  function goToGame() {
    setScreen("Game");
  }

  const renderLoader = () => <p>Loading</p>;

  function keyPressToggle(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["Enter", " ", "Return"];
    if (keys.includes(e.key)) {
      goToGame();
    }
  }

  return (
    <div className="dark:text-gray-300 flex flex-col">
      {children}
      <div
        className="w-2/3 flex flex-col justify-center align-middle mx-auto"
        tabIndex={0}
        onKeyPress={keyPressToggle}
      >
        <div
          className="mx-auto cursor-pointer"
          style={extraStyle}
          onClick={goToGame}
          onTouchStart={goToGame}
        >
          <Suspense fallback={renderLoader()}>
            <ReactGlobe
              ref={globeRef}
              globeImageUrl={`images/earth-${timeOfDay}.webp`}
              width={globeSize}
              height={globeSize}
              backgroundColor="#00000000"
              onGlobeClick={goToGame}
            />
          </Suspense>
        </div>
        <p className="text-center">
          <b>{isMobile ? "Tap" : "Click"} the globe to play!</b>
        </p>
      </div>
      {(screen === "Help" || screen === "Settings") && (
        <span>
          Have a question?{" "}
          <button
            className="underline cursor-pointer text-left pt-12"
            onClick={() => setScreen("Info")}
          >
            Check out the FAQ.
          </button>
        </span>
      )}
      {(screen === "Help" || screen === "Info") && (
        <div className="flex-grow flex items-end">
          <Footer />
        </div>
      )}
    </div>
  );
}
