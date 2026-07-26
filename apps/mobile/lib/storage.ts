import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'kc-storage' });

export const STORAGE_KEYS = {
  LANGUAGE: 'language',
  JWT: 'jwt',
  PHONE: 'phone',
  ONBOARDING_STATE: 'onboarding_state',
  USER_ID: 'user_id',
  TENANT_ID: 'tenant_id',
} as const;

export function getString(key: string): string | undefined {
  return storage.getString(key);
}

export function setString(key: string, value: string): void {
  storage.set(key, value);
}

export function removeString(key: string): void {
  storage.remove(key);
}

export function getObject<T>(key: string): T | null {
  const raw = storage.getString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setObject<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export function getBoolean(key: string): boolean {
  return storage.getBoolean(key) ?? false;
}

export function setBoolean(key: string, value: boolean): void {
  storage.set(key, value);
}
