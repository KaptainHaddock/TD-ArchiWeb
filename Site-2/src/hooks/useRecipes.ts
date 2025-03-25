// hooks/useRecipes.ts
import { useEffect, useState } from "react";

export type Recipe = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gourmet.cours.quimerch.com/recipes", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
      }
    };
    fetchData();
  }, []);

  return recipes;
}
