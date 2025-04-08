import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useFavorites from "../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, loading, error } = useFavorites();

  return (
    <div className="recipes-container">
      <HomeButton />
      <h2>Mes Recettes Favorites</h2>
      {loading && <p>Chargement des recettes favorites...</p>}
      {error && <p>Erreur : {error}</p>}
      <div className="recipes-grid">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <p>{recipe.name}</p>
              <img src={recipe.image_url} alt={recipe.name} className="recipe-image" />
            </Link>
          ))
        ) : (
          <p>Aucune recette favorite trouvée.</p>
        )}
      </div>
    </div>
  );
}
