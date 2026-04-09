// src/services/api.js
import axios from "axios";

// ------------------------------
// Base API Config
// ------------------------------
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., https://cdn-dashboard.onrender.com/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if backend uses cookies
});

// ------------------------------
// Request Interceptor (attach JWT)
// ------------------------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------------
// Response Interceptor (handle errors)
// ------------------------------
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or server down");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      console.error("Unauthorized - removing token");
      localStorage.removeItem("token");
    }

    if (status === 403) console.error("Access denied");
    if (status >= 500) console.error("Server error. Try again later.");

    return Promise.reject(error);
  }
);

// ------------------------------
// API Functions
// ------------------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const getSummary = () => API.get("/summary");
export const getVideos = (params) => API.get("/videos", { params });
export const getGeo = () => API.get("/geo");
export const getTrends = (range = "7d") => API.get(`/trends?range=${range}`);

export default API;