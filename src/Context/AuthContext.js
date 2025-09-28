import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, registerService, logoutService } from "../Services/authService";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "@organizedscann:auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { id, name, email, role }
  const [token, setToken] = useState(null); // string
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed.user || null);
          setToken(parsed.token || null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email, password) => {
    const res = await loginService({ email, password });
    setUser(res.user); setToken(res.token);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(res));
  };

  const signUp = async (name, email, password) => {
    const res = await registerService({ name, email, password });
    setUser(res.user); setToken(res.token);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    return res;
  };

  const signOut = async () => {
    try { await logoutService(); } catch {}
    setUser(null); setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, token, loading, signIn, signUp, signOut }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
