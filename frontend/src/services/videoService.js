import API from "./api";

export const getVideos = (params) => {
  return API.get("/videos", { params });
};

export const getGeo = () => API.get("/geo");