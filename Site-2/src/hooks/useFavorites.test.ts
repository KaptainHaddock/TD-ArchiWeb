// src/hooks/useFavorites.test.ts
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useFavorites from './useFavorites'

describe('useFavorites (simple)', () => {
  it('retourne loading: true au départ', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.loading).toBe(true)
  })
})
