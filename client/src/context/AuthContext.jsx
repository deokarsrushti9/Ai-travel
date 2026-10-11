import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tripora_user") || "null"); }
    catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("tripora_token"));

  useEffect(() => {
    const restore = async () => {
      const savedToken = localStorage.getItem("tripora_token");
      if (!savedToken) return;
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
        localStorage.setItem("tripora_user", JSON.stringify(response.data.user));
      } catch {
        localStorage.removeItem("tripora_token");
        localStorage.removeItem("tripora_user");
        setToken(null);
        setUser(null);
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("tripora_token", data.token);
    localStorage.setItem("tripora_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("tripora_token", data.token);
    localStorage.setItem("tripora_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("tripora_token");
    localStorage.removeItem("tripora_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
