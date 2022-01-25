import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function BodyStyle() {
  const { nightMode } = useContext(ThemeContext).theme;

  const daySky = {
    background: `radial-gradient(ellipse at top, rgba(63, 201, 255, 0.7), transparent),
      radial-gradient(ellipse at bottom, rgba(255, 196, 87, 0.7), transparent) no-repeat fixed`,
    margin: 0,
  };

  const nightSky = {
    background: `radial-gradient(ellipse at top, #160152, black),
    radial-gradient(ellipse at bottom, #7D3074, black) no-repeat fixed`,
    margin: 0,
  };

  const stars = {
    background:
      "transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat",
    opacity: 0.5,
  };

  const clouds = {
    backgroundImage:
      "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/131045/clouds.png), url(https://assets.codepen.io/557388/clouds.png)",
    backgroundRepeat: "repeat repeat",
    marginTop: "8rem",
    opacity: 0.2
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 ">
      <div
        style={nightMode ? nightSky : daySky}
        className="absolute top-0 bottom-0 left-0 right-0 block z-0 h-full"
      ></div>
      {/* <div style={}></div> */}
      <div
        // style={starsStyle}
        style={nightMode ? stars : clouds}
        className="absolute top-0 bottom-0 left-0 right-0 block z-10"
      ></div>
      {/* <style>{style}</style> */}
    </div>
  );
}
