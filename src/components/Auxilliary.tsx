import { ReactChild, useContext, useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { ThemeContext } from "../context/ThemeContext";

// TODO Add my personal info to the footer
// TODO add "not all countries included" discalaimer to the footer

type Props = {
  children: ReactChild;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function Auxilliary({ children, setScreen }: Props) {
  const globeSize = 150;
  const globeRef = useRef<GlobeMethods>(null!);

  const { theme } = useContext(ThemeContext);
  const timeOfDay = theme.nightMode ? "night" : "day";

  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
    //   globeRef.current.camera().zoom = 1.4;
  }, []);

  function goToGame() {
    setScreen("Game");
  }

  return (
    <div className="dark:text-gray-300">
      {children}
      <div className="w-1/2 flex flex-col justify-center align-middle mx-auto">
        <div
          className="mx-auto cursor-pointer"
          style={{ width: `${globeSize}px` }}
        >
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
          <b>Click the globe to play!</b>
        </p>
      </div>
    </div>
  );
}
