import { getString, setString, removeString, STORAGE_KEYS } from './storage';

const PASSWORD_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

/** Interim bridge password for the backend's password-auth (Session 6),
 * generated once per device and reused so re-registering after app
 * restart logs back into the same account instead of creating a new one.
 * Not shown to the user, not meant to be memorable or secure on its own —
 * the phone number + backend rate limiting is the real boundary until
 * Session 22 replaces this whole mechanism with real Firebase phone auth. */
export function getOrCreatePassword(): string {
  const existing = getString(STORAGE_KEYS.AUTH_PASSWORD);
  if (existing) return existing;

  let password = '';
  for (let i = 0; i < 20; i++) {
    password += PASSWORD_CHARS[Math.floor(Math.random() * PASSWORD_CHARS.length)];
  }
  setString(STORAGE_KEYS.AUTH_PASSWORD, password);
  return password;
}

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
