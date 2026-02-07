import { get, post } from './api';

export const login = (payload) => post('/api/auth/login', payload);
export const register = (payload) => post('/api/auth/register', payload);
export const refresh = (payload) => post('/api/auth/refresh', payload);
export const logout = (payload) => post('/api/auth/logout', payload);
export const me = () => get('/api/auth/me');
