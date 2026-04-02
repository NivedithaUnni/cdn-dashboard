import axios from "axios";

/* ==============================
   BASE CONFIG
============================== */
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
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
    // Handle unauthorized (token expired)
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* ==============================
   API ENDPOINT FUNCTIONS
============================== */

// 🔹 Summary API
export const getSummary = () => API.get("/summary");

// 🔹 Videos API (pagination, filter, sort)
export const getVideos = (params) =>
  API.get("/videos", { params });

// 🔹 Geo API
export const getGeo = () => API.get("/geo");

// 🔹 Trends API
export const getTrends = (range = "7d") =>
  API.get(`/trends?range=${range}`);

// 🔹 Auth API
export const loginUser = (data) =>
  API.post("/auth/login", data);

/* ==============================
   EXPORT DEFAULT
============================== */
export default API;