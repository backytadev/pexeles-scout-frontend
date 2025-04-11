import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { loginUser } from '@/api/AuthAPI';
import { type AuthStatus } from '@/types/auth-status.type';

export interface AuthState {
  status: AuthStatus;
  token?: string;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });

      if (!response) {
        throw new Error('Login failed: No response from server');
      }

      const { token } = response;

      set({ status: 'authorized', token });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined });

      throw error;
    }
  },

  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined });
    sessionStorage.removeItem('AUTH_TOKEN');
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
