import axios from "axios";

// Base URL from environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // required if backend uses cookies
});

// ================= REQUEST INTERCEPTOR (JWT) =================
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

// ================= RESPONSE INTERCEPTOR (ERROR HANDLING) =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or server down");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      // Unauthorized → logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (status === 403) {
      console.error("Access denied");
    } else if (status >= 500) {
      console.error("Server error. Try again later.");
    }

    return Promise.reject(error);
  }
);

// ================= API FUNCTIONS =================

// Auth
export const loginUser = (data) => API.post("/auth/login", data);

// Dashboard
export const getSummary = () => API.get("/summary");
export const getVideos = (params) => API.get("/videos", { params });
export const getGeo = () => API.get("/geo");
export const getTrends = (range = "7d") => API.get(`/trends?range=${range}`);

export default API;