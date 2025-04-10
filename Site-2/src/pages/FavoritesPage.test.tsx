import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FavoritesPage from './FavoritesPage'

vi.mock('../hooks/useFavorites', () => ({
  default: () => ({
    favorites: [
      {
        id: '1',
        name: 'Pizza',
        image_url: 'pizza.jpg',
        instructions: 'Faire cuire',
      },
    ],
    loading: false,
    error: null,
  }),
}))

describe('FavoritesPage', () => {
  it('affiche une recette favorite mockée', () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/mes recettes favorites/i)).toBeInTheDocument()
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByAltText('Pizza')).toBeInTheDocument()
  })
})
