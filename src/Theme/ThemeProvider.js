import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dark, light } from "./theme";

const KEY = "@organizedscann:theme";
const ThemeCtx = createContext({ theme: dark, toggle: () => {}, mode: "dark" });
export const useThemeOS = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") {
        setMode(saved);
      } else {
        const sys = Appearance.getColorScheme();
        setMode(sys === "light" ? "light" : "dark");
      }
    })();
  }, []);

  const theme = mode === "light" ? light : dark;
  const toggle = async () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    await AsyncStorage.setItem(KEY, next);
  };

  const value = useMemo(() => ({ theme, toggle, mode }), [theme, mode]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
