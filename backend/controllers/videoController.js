import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  const { page = 1, limit = 10, sortBy = "views" } = req.query;

  const videos = await Video.find()
    .sort({ [sortBy]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Video.countDocuments();

  res.json({ total, videos });
};