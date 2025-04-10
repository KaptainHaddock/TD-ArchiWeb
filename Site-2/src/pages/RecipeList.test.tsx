import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RecipeList from './RecipeList'
import { describe, it, expect } from 'vitest'

describe('RecipeList', () => {
  it('affiche la liste des recettes avec liens et images', () => {
    const recipes = [
      {
        id: '1',
        name: 'Pizza',
        image_url: 'pizza.jpg',
        instructions: 'Cuire au four',
      },
      {
        id: '2',
        name: 'Tarte',
        image_url: 'tarte.jpg',
        instructions: 'Manger chaud',
      },
    ]

    render(
      <MemoryRouter>
        <RecipeList recipes={recipes} />
      </MemoryRouter>
    )

    // Titre
    expect(screen.getByRole('heading', { name: /liste des recettes/i })).toBeInTheDocument()

    // Recettes
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByAltText('Pizza')).toBeInTheDocument()
    expect(screen.getByText('Tarte')).toBeInTheDocument()
    expect(screen.getByAltText('Tarte')).toBeInTheDocument()

    // Liens
    expect(screen.getByRole('link', { name: /pizza/i })).toHaveAttribute('href', '/recipe/1')
    expect(screen.getByRole('link', { name: /tarte/i })).toHaveAttribute('href', '/recipe/2')
  })

  it('affiche le message de chargement si aucune recette', () => {
    render(
      <MemoryRouter>
        <RecipeList recipes={[]} />
      </MemoryRouter>
    )

    expect(screen.getByText(/chargement des recettes/i)).toBeInTheDocument()
  })
})
