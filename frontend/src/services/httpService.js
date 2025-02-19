import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_API_URL

const httpService = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
  });


export default httpService;