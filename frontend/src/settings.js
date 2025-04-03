export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const endpoints = {
    // refresh endpoint uses the global axios, not the custom one
    refresh: `${BASE_URL}/accounts/jwt/refresh`,
    login: `/accounts/jwt/create`,
    user: `/accounts/users/me`
}