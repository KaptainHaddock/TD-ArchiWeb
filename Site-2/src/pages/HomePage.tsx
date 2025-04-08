// src/pages/HomePage.tsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Bienvenue !</h1>
      <div className="button-group">
        <Link to="/recipes">
          <button className="recipe-access-button">Voir les Recettes</button>
        </Link>
        <Link to="/favorites">
          <button className="recipe-access-button">Voir mes Favoris</button>
        </Link>
      </div>
    </div>
  );
}
