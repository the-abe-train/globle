import { createContext, ReactNode, useState } from "react";

// Use context as follows:
// ThemeProvider > ThemeContext > themeContext > theme & setTheme

type ProviderProps = {
  children: ReactNode;
};

type Theme = {
  nightMode: boolean;
};

type ThemeContext = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>> | null;
};

const initialTheme: Theme = { nightMode: false };
const initialThemeContext: ThemeContext = {
  theme: initialTheme,
  setTheme: null,
};

export const ThemeContext = createContext<ThemeContext>(initialThemeContext);

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState(initialTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
