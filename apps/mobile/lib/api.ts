import axios from 'axios';
import { getString, removeString, STORAGE_KEYS } from './storage';

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiSuccess<T> {
  data: T;
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const jwt = getString(STORAGE_KEYS.JWT);
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
  config.headers['X-Tenant-Id'] = getString(STORAGE_KEYS.TENANT_ID) ?? 'kurmi';
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) removeString(STORAGE_KEYS.JWT);
    return Promise.reject(err);
  },
);

export default api;
