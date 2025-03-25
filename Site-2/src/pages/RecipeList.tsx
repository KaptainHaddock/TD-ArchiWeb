// pages/RecipeList.tsx
import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="recipes-container">
      <HomeButton />
      <h2>Liste des Recettes</h2>
      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <p>{recipe.name}</p>
              <img src={recipe.image_url} alt={recipe.name} className="recipe-image" />
            </Link>
          ))
        ) : (
          <p>Chargement des recettes...</p>
        )}
      </div>
    </div>
  );
}
