import axios from "axios";

//  Make sure your VITE_API_BASE_URL does NOT include /api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*  Attach token */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*  Handle errors */
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

/* =======================
   API ENDPOINT FUNCTIONS
======================= */

//  Auth
export const loginUser = (data) =>
  API.post("/auth/login", data); i

//  Summary
export const getSummary = () =>
  API.get("/summary");

//  Geo
export const getGeo = () =>
  API.get("/geo");

//  Videos
export const getVideos = () =>
  API.get("/videos");

//  Trends
export const getTrends = (range = "7d") =>
  API.get(`/trends?range=${range}`);

export default API;