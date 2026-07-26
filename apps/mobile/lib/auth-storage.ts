import { getString, setString, removeString, STORAGE_KEYS } from './storage';

export function saveSession(jwt: string, userId: string): void {
  setString(STORAGE_KEYS.JWT, jwt);
  setString(STORAGE_KEYS.USER_ID, userId);
}

export function clearSession(): void {
  removeString(STORAGE_KEYS.JWT);
  removeString(STORAGE_KEYS.USER_ID);
}

export function getSession(): { jwt: string; userId: string } | null {
  const jwt = getString(STORAGE_KEYS.JWT);
  const userId = getString(STORAGE_KEYS.USER_ID);
  if (!jwt || !userId) return null;
  return { jwt, userId };
}

export function isLoggedIn(): boolean {
  return !!getString(STORAGE_KEYS.JWT);
}
