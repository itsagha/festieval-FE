import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: 'buyer' | 'organizer' | 'superadmin' | 'screeningadmin';
  avatar?: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuth: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;

  isAuthenticated: () => boolean;
  getRole: () => string | undefined;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,

      setToken: (token) => set({ token }),

      setRefreshToken: (refreshToken) => set({ refreshToken }),

      setUser: (user) => set({ user }),

      setAuth: (token, refreshToken, user) =>
        set({ token, refreshToken, user }),

      logout: () =>
        set({ token: null, refreshToken: null, user: null, }),

      isAuthenticated: () => !!get().token,

      getRole: () => get().user?.role,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

export function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
