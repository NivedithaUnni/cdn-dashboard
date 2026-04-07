import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

/* ==============================
   BASE CONFIG
============================== */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //  dynamic
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using cookies (optional)
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
      console.error("Network error or server down");
      return Promise.reject(error);
    }

    const status = error.response.status;

    // 🔴 Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔴 Forbidden
    if (status === 403) {
      console.error("Access denied");
    }

    // 🔴 Server error
    if (status >= 500) {
      console.error("Server error. Try again later.");
    }

    return Promise.reject(error);
  }
);

/* ==============================
   API ENDPOINT FUNCTIONS
============================== */

// 🔹 Summary API
export const getSummary = () => API.get("/summary");

// 🔹 Videos API
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
   EXPORT
============================== */
export default API;