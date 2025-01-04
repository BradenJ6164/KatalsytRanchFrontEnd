import axios from "axios";
import {useCookies} from "@vueuse/integrations/useCookies";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  // console.log("Fetch Cookie")
  config.headers.Authorization = `Bearer ${useCookies(["baja-security"]).get("baja-security")}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});
