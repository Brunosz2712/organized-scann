import React, { createContext, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "./theme";

const TContext = createContext(null);
export const useThemeApp = () => useContext(TContext);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark"); // padrão: dark
  const theme = mode === "dark" ? DarkTheme : LightTheme;

  const toggleTheme = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const value = useMemo(() => ({ mode, theme, toggleTheme }), [mode, theme]);

  return <TContext.Provider value={value}>{children}</TContext.Provider>;
}
