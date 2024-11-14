import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const api = axios.create({
  baseURL: VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers)
    config.headers.set("x-token", localStorage.getItem("token"));

  return config;
});

export default api;
