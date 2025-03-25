// pages/RecipeDetails.tsx
import { Link, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

interface RecipeDetailsProps {
  recipes: Recipe[];
}

export default function RecipeDetails({ recipes }: RecipeDetailsProps) {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <p>Recette non trouvée.</p>;

  return (
    <div className="recipe-details-container">
      <HomeButton />
      <img src={recipe.image_url} alt={recipe.name} className="recipe-details-image" />
      <div className="recipe-details">
        <h2>{recipe.name}</h2>
        <p>{recipe.instructions}</p>
        <Link to="/recipes">
          <button>Retour</button>
        </Link>
      </div>
    </div>
  );
}
