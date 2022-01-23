import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function BodyStyle() {
  const { nightMode } = useContext(ThemeContext).theme;

  useEffect(() => {
    console.log("mode changed");
  });

  const endColour = nightMode ? "black" : "transparent";
  const topColour = nightMode ? "rgb(24, 24, 65)" : "rgba(63, 201, 255, 0.7)";
  const btmColour = nightMode ? "purple" : "rgba(255, 196, 87, 0.7)";

  const style = `
  body {
    background: radial-gradient(ellipse at top, ${topColour}, ${endColour}),
      radial-gradient(ellipse at bottom, ${btmColour}, ${endColour});
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;
  }
  `;

  return <style>{style}</style>;
}
