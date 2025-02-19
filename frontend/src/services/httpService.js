import axios from "axios"
import {applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens} from 'axios-jwt'

const BASE_URL = import.meta.env.VITE_BASE_API_URL

const httpService = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
  });

const requestRefresh = async refreshToken => {
  const {data} =  axios.post(`${BASE_URL}/auth/jwt/refresh`, { refresh: refreshToken});
  return data.access
}

export const login = async (params) => {
  try {
    console.log(params)
    const response  = await httpService.post("/auth/jwt/create", params)
    const { access, refresh} = response.data
    setAuthTokens({
      accessToken: access,
      refreshToken: refresh
    })
  } catch (error) {
    console.log("ERROR", error)
  }
  
  // setAuthTokens({
  //   accessToken: data.access,
  //   refreshToken: data.refresh
  // })

}

export const logout = async () => clearAuthTokens()

applyAuthTokenInterceptor(httpService, { requestRefresh})

export default httpService;

