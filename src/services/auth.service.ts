import api from './api';
import type { User } from '../types/auth';

export const login = (email: string, password: string) =>
  api.post<{ token: string; user: User }>('/auth/login', { email, password });

export const refreshToken = () => api.post<{ token: string }>('/auth/refresh');
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get<User>('/auth/me');