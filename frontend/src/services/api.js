import axios from "axios";

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

/* APIs */
export const loginUser = (data) =>
  API.post("/api/auth/login", data);

export const getSummary = () =>
  API.get("/api/summary");

export const getGeo = () =>
  API.get("/api/geo");

export const getVideos = () =>
  API.get("/api/videos");

export const getTrends = (range = "7d") =>
  API.get(`/api/trends?range=${range}`);

export default API;