import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, registerService, logoutService } from "../Services/authService";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "@organizedscann:auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { id, name, email }
  const [token, setToken] = useState(null); // string JWT
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
    const tok = res.token;
    const usr = res.user || { id: res.id, name: res.name, email: res.email };
    setUser(usr); setToken(tok);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: usr, token: tok }));
  };

  const signUp = async (name, email, password) => {
    const res = await registerService({ name, email, password });
    if (res.token) {
      const tok = res.token;
      const usr = res.user || { id: res.id, name: res.name, email: res.email };
      setUser(usr); setToken(tok);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: usr, token: tok }));
    }
    return res;
  };

  const signOut = async () => {
    try { await logoutService(token); } catch {}
    setUser(null); setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, token, loading, signIn, signUp, signOut }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
