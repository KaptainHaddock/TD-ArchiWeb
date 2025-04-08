// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginModal from "./components/login";
import HomePage from "./pages/HomePage";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import FavoritesPage from "./pages/FavoritesPage"; // Import de la nouvelle page
import { useAuth } from "./hooks/useAuth";
import { useRecipes } from "./hooks/useRecipes";

function App() {
  const { user, login, logout } = useAuth();
  const recipes = useRecipes();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="header">
        {user ? (
          <div className="user-info-container">
            <div className="user-info">Connecté en tant que : {user}</div>
            <button className="logout-button" onClick={logout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={() => setShowLogin(true)}>
            Se connecter
          </button>
        )}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={login} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
