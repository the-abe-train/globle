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
import { globeImg } from "../util/globe";
import { FormattedMessage } from "react-intl";
const ReactGlobe = lazy(() => import("react-globe.gl"));

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

  const renderLoader = () => (
    <p>
      <FormattedMessage id="Loading" />
    </p>
  );

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
        className="w-fit flex flex-col justify-center align-middle mx-auto"
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
              globeImageUrl={globeImg(nightMode)}
              width={globeSize}
              height={globeSize}
              backgroundColor="#00000000"
              onGlobeClick={goToGame}
            />
          </Suspense>
        </div>
        <b className="text-center">
          <FormattedMessage
            id="Aux1"
            values={{
              b: (chunks: string) => {
                try {
                  const [click, tap] = JSON.parse(chunks);
                  return isMobile ? <b>{tap}</b> : <b>{click}</b>;
                } catch (e) {
                  return <b>{chunks}</b>;
                }
              },
            }}
          />
        </b>
      </div>
      {(screen === "Help" || screen === "Settings") && (
        <span className="mt-10 mb-4">
          <FormattedMessage id="Aux2" />{" "}
          <button
            className="underline cursor-pointer inline"
            onClick={() => setScreen("Info")}
          >
            <FormattedMessage id="Aux3" />
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
