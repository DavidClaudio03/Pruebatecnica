import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // valida token al refrescar página
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) setUser({ username: localStorage.getItem("username") });
  }, []);

  async function login({ username, password }) {
    const { data } = await api.post("/auth/", { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("username", username);
    setUser({ username });
  }

  async function register({ username, password }) {
    await api.post("/auth/register/", { username, password });
    // registra y luego logea
    await login({ username, password });
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
