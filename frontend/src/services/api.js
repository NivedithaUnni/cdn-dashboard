import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ==============================
   REQUEST INTERCEPTOR (JWT)
============================== */
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

/* ==============================
   RESPONSE INTERCEPTOR (ERROR)
============================== */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      console.error("Unauthorized - redirecting");

      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (status === 403) {
      console.error("Access denied");
    }

    if (status >= 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

/* ==============================
   API FUNCTIONS
============================== */

export const getSummary = () => API.get("/api/summary");

export const getVideos = (params) =>
  API.get("/api/videos", { params });

export const getGeo = () => API.get("/api/geo");

export const getTrends = (range = "7d") =>
  API.get(`/api/trends?range=${range}`);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

export default API;