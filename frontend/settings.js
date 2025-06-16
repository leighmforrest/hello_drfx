export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  login: '/accounts/jwt/create/',
  refresh: '/accounts/jwt/refresh/',
  user: '/accounts/users/me/',
  register: '/accounts/users/',
};
