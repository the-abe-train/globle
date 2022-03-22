import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import LocaleProvider from "./i18n";
import BodyStyle from "./components/BodyStyle";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
        <BodyStyle />
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
