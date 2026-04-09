// src/services/api.js
import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      // Redirect using React Router compatible URL
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

/* API calls */
export const loginUser = (data) => API.post("/api/auth/login", data);
export const getSummary = () => API.get("/api/summary");
export const getGeo = () => API.get("/api/geo");
export const getVideos = () => API.get("/api/videos");
export const getTrends = (range = "7d") => API.get(`/api/trends?range=${range}`);

export default API;