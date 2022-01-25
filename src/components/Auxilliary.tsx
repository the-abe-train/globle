import { ReactChild, useContext, useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { ThemeContext } from "../context/ThemeContext";
import useCheckMobile from "../hooks/useCheckMobile";

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
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
    //   globeRef.current.camera().zoom = 1.4;
  }, []);

  function goToGame() {
    setScreen("Game");
  }

  return (
    <div className="dark:text-gray-300 relative min-h-96 ">
      {children}
      <div className="w-1/2 flex flex-col justify-center align-middle mx-auto">
        <div className="mx-auto cursor-pointer" style={extraStyle}>
          <ReactGlobe
            ref={globeRef}
            globeImageUrl={`images/earth-${timeOfDay}.jpg`}
            width={globeSize}
            height={globeSize}
            backgroundColor="#00000000"
            onGlobeClick={goToGame}
          />
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
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="https://github.com/the-abe-train">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              viewBox="0 0 24 24"
              fill={nightMode ? "rgb(209 213 219)" : "rgb(17 24 39)"}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </span>
      </footer>
    </div>
  );
}
