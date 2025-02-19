import axios from "axios"
import { applyAuthTokenInterceptor, clearAuthTokens, getBrowserLocalStorage, setAuthTokens } from "axios-jwt"

const BASE_URL = import.meta.env.VITE_BASE_API_URL

const httpService = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
  });

const requestRefresh = async refresh => {
  const { data } = await axios.post(`${BASE_URL}/auth/jwt/refresh`, { refresh })
  return {accessToken: data.access, refreshToken: data.refresh}
}

export const login = async params => {
  const { data } = await httpService.post("/auth/jwt/create/", params)

  setAuthTokens({
    accessToken: data.access,
    refreshToken: data.refresh
  })
}

export const logout = () => clearAuthTokens()

applyAuthTokenInterceptor(httpService, {requestRefresh})
export default httpService;

