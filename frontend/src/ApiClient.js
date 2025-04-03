import axios from "axios";
import { applyAuthTokenInterceptor } from "axios-jwt";
import { endpoints, BASE_URL } from "./settings";

const ApiClient = axios.create({
  baseURL: BASE_URL,
});

const requestRefresh = async (refresh) => {
    try {
      const { data } = await axios.post(endpoints.refresh, { refresh });
      return {
        accessToken: data.access,
        refreshToken: data.refresh,
      };
    } catch (error) {
      console.error("Refresh token failed", error);
      throw error;
    }
  };
  

// Apply JWT interceptor
applyAuthTokenInterceptor(ApiClient, { requestRefresh });

export default ApiClient;
