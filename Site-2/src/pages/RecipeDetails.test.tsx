import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RecipeDetails from './RecipeDetails'
import { describe, it, expect, vi } from 'vitest'

// Mock du hook useFavorites
vi.mock('../hooks/useFavorites', () => ({
  default: () => ({
    favorites: [], // on part du principe que ce n'est PAS un favori
    refresh: vi.fn(),
  }),
}))

describe('RecipeDetails', () => {
  it('affiche les détails de la recette et le bouton pour ajouter aux favoris', () => {
    const mockRecipes = [
      {
        id: '1',
        name: 'Pizza',
        image_url: 'pizza.jpg',
        instructions: 'Cuire au four',
      },
    ]

    // simulate localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => {
        if (key === 'user') return 'vincent'
        if (key === 'token') return 'fake-token'
        return null
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={['/recipes/1']}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetails recipes={mockRecipes} />} />
        </Routes>
      </MemoryRouter>
    )

    // On vérifie les éléments principaux
    expect(screen.getByRole('heading', { name: /pizza/i })).toBeInTheDocument()
    expect(screen.getByText(/cuire au four/i)).toBeInTheDocument()
    expect(screen.getByAltText(/pizza/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ajouter aux favoris/i })).toBeInTheDocument()
  })
})
