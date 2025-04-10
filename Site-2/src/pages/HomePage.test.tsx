import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { describe, it, expect } from 'vitest'

describe('HomePage', () => {
  it('affiche le titre et les liens vers recettes et favoris', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    // Titre
    expect(screen.getByRole('heading', { name: /bienvenue/i })).toBeInTheDocument()

    // Bouton "Voir les Recettes"
    const recipesButton = screen.getByRole('button', { name: /voir les recettes/i })
    expect(recipesButton).toBeInTheDocument()

    // Bouton "Voir mes Favoris"
    const favoritesButton = screen.getByRole('button', { name: /voir mes favoris/i })
    expect(favoritesButton).toBeInTheDocument()

    // Vérifie les liens
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/recipes')
    expect(links[1]).toHaveAttribute('href', '/favorites')
  })
})
