import Video from "../models/Video.js";

export const getSummary = async (req, res) => {
  const videos = await Video.find();

  const totalViews = videos.reduce((a, b) => a + b.views, 0);
  const totalBandwidth = videos.reduce((a, b) => a + b.bandwidth, 0);
  const totalErrors = videos.reduce((a, b) => a + b.errors, 0);

  res.json({
    totalViews,
    totalBandwidth,
    errorRate: ((totalErrors / totalViews) * 100).toFixed(2)
  });
};