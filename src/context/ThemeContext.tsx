import { createContext, useReducer } from "react";

type State = {
  darkMode: boolean;
  toggleDark?: () => void;
};

type Action = {
  type: "LIGHTMODE" | "DARKMODE";
};

type Props = {
  children: any;
};

export const ThemeContext = createContext<State>({ darkMode: false });

const initialState = { darkMode: false };

const themeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    default:
      return state;
  }
};

export function ThemeProvider({ children }: Props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider
      value={{ darkMode: false, toggleDark: () => console.log("toggle") }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
