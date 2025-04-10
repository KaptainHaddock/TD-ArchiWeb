// login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import LoginModal from './login'
import { describe, it, expect, vi } from 'vitest'

describe('LoginModal (simple)', () => {
  it('remplit les champs identifiant et mot de passe', () => {
    render(<LoginModal onClose={vi.fn()} onLogin={vi.fn()} />)

    const usernameInput = screen.getByLabelText(/identifiant/i)
    const passwordInput = screen.getByLabelText(/mot de passe/i)

    fireEvent.change(usernameInput, { target: { value: 'vincent' } })
    fireEvent.change(passwordInput, { target: { value: 'secret' } })

    expect(usernameInput).toHaveValue('vincent')
    expect(passwordInput).toHaveValue('secret')
  })
})
