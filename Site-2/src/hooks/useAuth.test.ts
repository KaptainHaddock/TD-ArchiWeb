// hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should call login and update user', async () => {
    const mockToken = '12345';
    const mockUser = { username: 'vincent' };

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: mockToken }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const success = await result.current.login('vincent', 'pass');
      expect(success).toBe(true);
    });

    expect(result.current.user).toBe('vincent');
    expect(localStorage.getItem('token')).toBe(mockToken);
  });
});
