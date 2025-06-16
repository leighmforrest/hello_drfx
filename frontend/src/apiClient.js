import axios from 'axios';

import { BASE_URL, endpoints } from '../settings';
import { applyAuthTokenInterceptor } from 'axios-jwt';

const api = axios.create({
  baseURL: BASE_URL,
});

const requestRefresh = async (refresh) => {
  try {
    const { data } = await axios.post(`${BASE_URL}${endpoints.refresh}`, {
      refresh,
    });

    return {
      accessToken: data.access,
      refreshToken: data.refresh,
    };
  } catch (error) {
    console.error('Refresh token failed.', error);
    throw error;
  }
};

applyAuthTokenInterceptor(api, {
  requestRefresh,
  headerPrefix: 'JWT ',
});

export default api;
