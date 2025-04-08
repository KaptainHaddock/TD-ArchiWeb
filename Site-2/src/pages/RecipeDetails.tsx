// src/pages/RecipeDetails.tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useFavorites, { Recipe } from "../hooks/useFavorites";

type RecipeProps = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

interface RecipeDetailsProps {
  recipes: RecipeProps[];
}

export default function RecipeDetails({ recipes }: RecipeDetailsProps) {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);
  const { favorites, refresh } = useFavorites();

  if (!recipe) return <p>Recette non trouvée.</p>;

  const username = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Détermine si la recette est dans les favoris
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const handleAddFavorite = async () => {
    try {
      const response = await fetch(
        `https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipe.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, application/xml",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            created_at: new Date().toISOString(),
            recipe_id: recipe.id,
            username: username,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout aux favoris");
      }
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipe.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, application/xml",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression des favoris");
      }
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="recipe-details-container">
      <HomeButton />
      <img src={recipe.image_url} alt={recipe.name} className="recipe-details-image" />
      <div className="recipe-details">
        <h2>{recipe.name}</h2>
        <p>{recipe.instructions}</p>
        <div className="favorites-action">
          {isFavorite ? (
            <button onClick={handleRemoveFavorite}>Supprimer des Favoris</button>
          ) : (
            <button onClick={handleAddFavorite}>Ajouter aux Favoris</button>
          )}
        </div>
        <Link to="/recipes">
          <button>Retour</button>
        </Link>
      </div>
    </div>
  );
}
