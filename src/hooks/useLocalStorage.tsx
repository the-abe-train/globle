import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: object) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  } else {
    return defaultValue;
  }
}

export const useLocalStorage = (key: string, defaultValue: object) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
