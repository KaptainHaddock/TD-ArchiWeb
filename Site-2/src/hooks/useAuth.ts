// hooks/useAuth.ts
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://gourmet.cours.quimerch.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json, application/xml",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        setUser(username);
        localStorage.setItem("user", username);
        localStorage.setItem("token", token);
        return true;
      } else {
        alert("Échec de la connexion");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur lors de la connexion");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return { user, login, logout };
}
