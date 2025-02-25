import axios from "axios";
import urls from "./urls";

export const localStorageKeys = {
  access: "access",
  refresh: "refresh",
};

const apiClient = axios.create({
  baseURL: urls.base_url,
  timeout: 10000, // optional timeout
});

export default apiClient;