import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

// TODO add cities version of the game

function Toggle({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div>
        <div className="block bg-gray-100 w-14 h-8 rounded-full border-solid border-2 border-gray-500"></div>
        <div className="dot absolute left-1 top-1 bg-blue-800 w-6 h-6 rounded-full transition"></div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="block bg-gray-600 w-14 h-8 rounded-full border-1 border-gray-500"></div>
        <div className="dot absolute left-1 top-1 bg-blue-100 w-6 h-6 rounded-full transition translate-x-full"></div>
      </div>
    );
  }
}

export default function Settings() {
  const themeContext = useContext(ThemeContext);
  const [checked, setChecked] = useState(!themeContext.theme.nightMode);

  function changeTheme(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.checked);
    if (themeContext.setTheme) {
      if (checked) {
        themeContext.setTheme({ nightMode: true });
      } else {
        themeContext.setTheme({ nightMode: false });
      }
    }
  }

  return (
    <div className="block mx-auto my-10 w-72 ">
      <div className="flex items-center justify-between">
        <label htmlFor="toggleB" className="relative cursor-pointer">
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            checked={checked}
            onChange={changeTheme}
          />
          <Toggle checked={checked} />
        </label>
        <span className=" text-lg w-36">{checked ? "Day" : "Night"} Theme</span>
      </div>
    </div>
  );
}
