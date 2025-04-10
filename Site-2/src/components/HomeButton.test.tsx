import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomeButton from './HomeButton'
import {describe,it,expect} from 'vitest'

describe('HomeButton', () => {
  it('should navigate to the homepage when user clicks on HomeButton', () => {
    render(
      <MemoryRouter>
        <HomeButton />
      </MemoryRouter>
    )
    const linkElement = screen.getByRole('link', { name: /accueil/i })
    expect(linkElement).toHaveAttribute('href', '/')
  })
})
