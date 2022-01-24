import { useState, useEffect } from "react";

export function getStorageValue<T>(key: string, defaultValue?: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw "Local storage error"
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  expiration: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    const today = new Date().toLocaleDateString();
    console.log("today", today)
    console.log("expiration", expiration)
    if (today <= expiration) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key, value]);

  return [value, setValue];
}
