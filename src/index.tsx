import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import BodyStyle from "./components/BodyStyle";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <BodyStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
