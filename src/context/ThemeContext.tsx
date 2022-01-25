import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [storedTheme, storeTheme] = useLocalStorage<Theme>(
    "theme",
    initialTheme,
    "2050-01-01"
  );

  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    storeTheme(theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
