// hooks/useAuth.ts
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);

  // Fonction qui vérifie l'authentification en appelant l'API /me
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://gourmet.cours.quimerch.com/me", {
          method: "GET",
          headers: {
            Accept: "application/json, application/xml",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json(); 
          setUser(data.username); 
          localStorage.setItem("user", data.username); 
        } else {
          // Si la réponse n'est pas 200, on considère que le token n'est plus valide
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion :", error);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  };

  // Au montage du composant, vérifie l'authentification en appelant /me
  useEffect(() => {
    checkAuth();
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
        // Pour mettre à jour dynamiquement l'état, on appelle checkAuth après la connexion
        await checkAuth();
        return true;
      } else {
        alert("Échec de la connexion");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
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
