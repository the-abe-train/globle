import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Toggle({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div>
        <div className="block bg-gray-100 w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div className="dot absolute left-1 top-1 bg-blue-800 w-6 h-6 rounded-full transition"></div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="block bg-gray-100  w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div className="dot absolute left-1 top-1 bg-blue-800 w-6 h-6 rounded-full transition translate-x-full"></div>
      </div>
    );
  }
}

export default function Settings() {
  const themeContext = useContext(ThemeContext);
  const [themeToggle, setThemeToggle] = useState(!themeContext.theme.nightMode);
  const [scopeToggle, setScopeToggle] = useState(true);

  function changeTheme(e: React.ChangeEvent<HTMLInputElement>) {
    setThemeToggle(e.currentTarget.checked);
    if (themeContext.setTheme) {
      if (themeToggle) {
        themeContext.setTheme({ nightMode: true });
      } else {
        themeContext.setTheme({ nightMode: false });
      }
    }
  }

  function changeScope(e: React.ChangeEvent<HTMLInputElement>) {
    setScopeToggle(e.currentTarget.checked);
    // if (scopeToggle) {
    //   if (themeToggle) {
    //     scopeToggle({ nightMode: true });
    //   } else {
    //     scopeToggle({ nightMode: false });
    //   }
    // }
  }

  return (
    <div className="flex-col space-y-8 mx-auto my-10 w-72 h-36">
      <div className="flex items-center justify-between">
        <label htmlFor="theme" className="relative cursor-pointer">
          <input
            id="theme"
            type="checkbox"
            className="sr-only"
            checked={themeToggle}
            onChange={changeTheme}
          />
          <Toggle checked={themeToggle} />
        </label>
        <span className=" text-lg w-36">
          {themeToggle ? "Day" : "Night"} Theme
        </span>
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="scope" className="relative cursor-pointer">
          <input
            id="scope"
            type="checkbox"
            className="sr-only"
            checked={scopeToggle}
            onChange={changeScope}
          />
          <Toggle checked={scopeToggle} />
        </label>
        <span className=" text-lg w-36">
          {scopeToggle ? "Countries" : "Cities"}
        </span>
      </div>
      {!scopeToggle && (
        <p className="text-red-700">Globle: Cities Edition coming soon!</p>
      )}
    </div>
  );
}
