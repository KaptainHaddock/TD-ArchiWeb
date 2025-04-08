import { useState, useEffect, useCallback } from "react";

export type Recipe = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const token = localStorage.getItem("token");

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    let isMounted = true;
    try {
      const response = await fetch("https://gourmet.cours.quimerch.com/favorites", {
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des favoris, êtes vous bien connecté(e) ?");
      }
      const data = await response.json();
      if (isMounted) {
        // Extraction de la propriété "recipe" de chaque élément de la réponse
        const recipes = Array.isArray(data) ? data.map((item: {recipe : Recipe}) => item.recipe) : [];
        setFavorites(recipes);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    const cleanup = fetchFavorites();
    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [fetchFavorites]);

  return { favorites, loading, error, refresh: fetchFavorites };
}
