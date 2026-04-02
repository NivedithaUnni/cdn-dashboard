import Video from "../models/Video.js";

export const getSummary = async (req, res) => {
  try {
    const videos = await Video.find();

    const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
    const bandwidth = videos.reduce((sum, v) => sum + v.bandwidth, 0);

    const activeStreams = videos.filter(v => v.status === "Active").length;

    res.json({
      totalViews,
      bandwidth: bandwidth + " GB",
      activeStreams,
      errorRate: "2%"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};