import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

// TODO make input focus better for a11y

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
  const [toggleTheme, setToggleTheme] = useState(!themeContext.theme.nightMode);
  const [toggleScope, setToggleScope] = useState(true);

  useEffect(() => {
    if (themeContext.setTheme) {
      if (toggleTheme) {
        themeContext.setTheme({ nightMode: false });
      } else {
        themeContext.setTheme({ nightMode: true });
      }
    }
  }, [toggleTheme, themeContext]);

  function keyPressToggle(
    e: React.KeyboardEvent<HTMLLabelElement>,
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const keys = ["Enter", " ", "Return"];
    if (keys.includes(e.key)) {
      setToggle(!toggle);
    }
  }

  const options = [
    {
      name: "theme",
      setToggle: setToggleTheme,
      toggle: toggleTheme,
      on: "Day Theme",
      off: "Night Theme",
    },
    {
      name: "scope",
      setToggle: setToggleScope,
      toggle: toggleScope,
      on: "Countries",
      off: "Cities",
    },
  ];

  return (
    <div className="flex-col space-y-8 mx-auto my-10 w-72 h-36">
      {options.map((option, idx) => {
        const { name, toggle, setToggle, on, off } = option;
        return (
          <div key={idx} className="flex items-center justify-between">
            <label
              htmlFor={name}
              className="relative cursor-pointer focus-visible:ring"
              onKeyPress={(e) => keyPressToggle(e, toggle, setToggle)}
              tabIndex={0}
            >
              <input
                id={name}
                type="checkbox"
                className="sr-only"
                checked={toggle}
                onChange={() => setToggle(!toggle)}
                tabIndex={-1}
                aria-hidden="true"
              />
              <Toggle checked={toggle} />
            </label>
            <span className="text-lg w-36">{toggle ? on : off}</span>
          </div>
        );
      })}
      {!toggleScope && (
        <p className="text-red-700">Globle: Cities Edition coming soon!</p>
      )}
    </div>
  );
}
