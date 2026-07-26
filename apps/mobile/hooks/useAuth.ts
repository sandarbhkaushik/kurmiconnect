import { create } from 'zustand';
import { saveSession, clearSession, getSession, isLoggedIn } from '@/lib/auth-storage';

interface AuthState {
  jwt: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  login: (jwt: string, userId: string) => void;
  logout: () => void;
}

const session = getSession();

export const useAuth = create<AuthState>(set => ({
  jwt: session?.jwt ?? null,
  userId: session?.userId ?? null,
  isLoggedIn: isLoggedIn(),

  login(jwt, userId) {
    saveSession(jwt, userId);
    set({ jwt, userId, isLoggedIn: true });
  },

  logout() {
    clearSession();
    set({ jwt: null, userId: null, isLoggedIn: false });
  },
}));
