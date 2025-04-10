import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useRecipes } from './useRecipes'

// 💡 Patch pour éviter l'erreur MutationObserver
globalThis.MutationObserver = class {
  observe() {}
  disconnect() {}
  takeRecords() { return [] }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useRecipes', () => {
  it('récupère et retourne les recettes depuis l’API', async () => {
    const fakeRecipes = [
      { id: '1', name: 'Pizza', image_url: 'pizza.jpg', instructions: 'Cuire au four' },
      { id: '2', name: 'Tarte', image_url: 'tarte.jpg', instructions: 'Manger chaud' },
    ]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeRecipes),
      } as Response)
    )

    const { result } = renderHook(() => useRecipes())

    await waitFor(() => {
      expect(result.current).toHaveLength(2)
    })

    expect(result.current[0].name).toBe('Pizza')
    expect(result.current[1].name).toBe('Tarte')
  })
})
 