import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
      const token = await loginUser({ email, password });

      set({ status: 'authorized', token });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined });

      throw error;
    }
  },

  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined });
    localStorage.removeItem('AUTH_TOKEN');
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
);
