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
import useCheckMobile from "../hooks/useCheckMobile";
import { getPath } from "../util/svg";
const ReactGlobe = lazy(() => import("react-globe.gl"));

type Props = {
  children: ReactChild;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function Auxilliary({ children, setScreen }: Props) {
  // Window size
  const isMobile = useCheckMobile();

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
    if (globeRef.current) {
      // @ts-ignore
      globeRef.current.controls().autoRotate = true;
      //   globeRef.current.camera().zoom = 1.4;
    }
  }, [globeRef]);

  function goToGame() {
    setScreen("Game");
  }

  const renderLoader = () => <p>Loading</p>;

  return (
    <div className="dark:text-gray-300 relative min-h-96 ">
      {children}
      <div className="w-1/2 flex flex-col justify-center align-middle mx-auto">
        <div className="mx-auto cursor-pointer" style={extraStyle}>
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
      <footer className="absolute -bottom-24 md:-bottom-36 left-0 py-4 text-sm">
        <span className="flex space-x-3">
          <a href="https://the-abe-train.com">by The Abe Train</a>
          <a href="https://twitter.com/theAbeTrain">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              viewBox="0 0 24 24"
              fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
            >
              <path d={getPath("twitter")} />
            </svg>
          </a>
          <a href="https://github.com/the-abe-train">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              viewBox="0 0 24 24"
              fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
            >
              <path d={getPath("github")} />
            </svg>
          </a>
        </span>
      </footer>
    </div>
  );
}
