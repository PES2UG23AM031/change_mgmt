import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("cms_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // MOCK LOGIN: accepts any valid email + secure password rules
  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 300));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!emailRegex.test(email)) throw new Error("Invalid email format");
    if (!passwordRegex.test(password)) throw new Error("Password must be 8+ chars and include uppercase, lowercase, number and special char.");

    // assign Admin role if email contains "admin"
    const userData = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      role: email.toLowerCase().includes("admin") ? "Admin" : "User"
    };

    localStorage.setItem("cms_user", JSON.stringify(userData));
    setUser(userData);
    return userData;

    /* WHEN BACKEND IS READY replace above with:
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("cms_token", res.data.token);
    localStorage.setItem("cms_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
    */
  };

  const logout = () => {
    localStorage.removeItem("cms_token");
    localStorage.removeItem("cms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
