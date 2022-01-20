import { useEffect, useRef } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function Help({ setScreen }: Props) {
  const countrySize = 150;
  const globeSize = 150;

  const globeRef = useRef<GlobeMethods>(null!);

  useEffect(() => {
    // @ts-ignore
    globeRef.current.controls().autoRotate = true;
    globeRef.current.camera().zoom = 1.4;
  }, []);

  function goToGame() {
    setScreen("Game");
  }

  return (
    <div className="my-4 space-y-6">
      <h2 className="text-center text-2xl my-5">How to play</h2>
      <p>
        Every day, there is a new Mystery Country. Your goal is to guess the
        mystery country using the fewest number of guesses. Each incorrect guess
        will appear on the globe with a colour indicating how close to the
        Mystery Country.
      </p>
      <p>
        For example, if the Mystery Country was Japan, each of the following
        countries would appear with the colour codes seen here:
      </p>
      <div className="flex">
        <figure>
          <img src="images/fr-01.svg" width={countrySize} alt="France" />
          <figcaption className="text-center">France</figcaption>
        </figure>
        <figure>
          <img src="images/ir-01.svg" width={countrySize} alt="Iran" />
          <figcaption className="text-center">Iran</figcaption>
        </figure>
        <figure>
          <img src="images/cn-01.svg" width={countrySize} alt="China" />
          <figcaption className="text-center">China</figcaption>
        </figure>
        <figure>
          <img src="images/kr-01.svg" width={countrySize} alt="South Korea" />
          <figcaption className="text-center">South Korea</figcaption>
        </figure>
      </div>
      <p>A new Mystery Country will be available every day!</p>
      <div
        className="mx-auto cursor-pointer"
        style={{ width: `${globeSize}px` }}
      >
        <ReactGlobe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          width={globeSize}
          height={globeSize}
          backgroundColor="#00000000"
          onGlobeClick={goToGame}
        />
        <p className="text-center">

        <b >Click to play!</b>
        </p>
      </div>
    </div>
  );
}
