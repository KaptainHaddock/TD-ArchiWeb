import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams, Link } from "react-router-dom";
import "./index.css";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
  instructions: string;
};

// Composant pour afficher la liste des recettes
function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="recipes-container">
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

// Composant pour afficher une recette en détail
function RecipeDetails({ recipes }: { recipes: Recipe[] }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <p>Recette non trouvée.</p>;

  return (
    <div className="recipe-details-container">
      <img src={recipe.image_url} alt={recipe.name} className="recipe-details-image" />
      <div className="recipe-details">
        <h2>{recipe.name}</h2>
        <p>{recipe.instructions}</p>
        <Link to="/">
          <button>Retour</button>
        </Link>
      </div>
    </div>
  );
}

// Composant principal
function App() {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
      </Routes>
    </Router>
  );
}

export default App;