import ReactGlobe from "react-globe.gl";
import Data from "../sample_data.json";

type Country = {
  properties: {
    NAME: string;
    ISO_A2: string;
    TYPE: string;
  };
};


const countries = Data.features.filter((country: Country) => {
  return country.properties.TYPE === "Sovereign country";
}).slice(6, 17);

export function Globe() {
  // Placeholder
  // TODO replace with actual globe

  const size = 500; // px on one side

  return (
    <div className="mx-auto" style={{ width: `${size}px` }}>
      <ReactGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        width={size}
        height={size}
        backgroundColor="white"
        polygonsData={countries}
      />
    </div>
  );
}
