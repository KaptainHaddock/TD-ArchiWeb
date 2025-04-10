import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import HomePage from './pages/HomePage'
import RecipeList from './pages/RecipeList'
import RecipeDetails from './pages/RecipeDetails'

// 🔧 données partagées
const mockRecipes = [
  {
    id: '1',
    name: 'Pizza',
    image_url: 'pizza.jpg',
    instructions: 'Cuire au four',
  },
]

// 🔧 mock du hook useFavorites utilisé par RecipeDetails
vi.mock('../hooks/useFavorites', () => ({
  default: () => ({
    favorites: [],
    refresh: vi.fn(),
  }),
}))

describe('Parcours utilisateur - test d’intégration', () => {
  it('navigue de la Home à la recette en passant par la liste', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeList recipes={mockRecipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetails recipes={mockRecipes} />} />
        </Routes>
      </MemoryRouter>
    )

    // Étape 1 : Page d’accueil
    expect(screen.getByText(/bienvenue/i)).toBeInTheDocument()

    // Clique sur "Voir les Recettes"
    fireEvent.click(screen.getByRole('button', { name: /voir les recettes/i }))

    // Étape 2 : Page Liste
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Pizza'))

    // Étape 3 : Page Détails
    expect(screen.getByRole('heading', { name: /pizza/i })).toBeInTheDocument()
    expect(screen.getByText(/cuire au four/i)).toBeInTheDocument()
  })
})
