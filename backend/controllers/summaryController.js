import Video from "../models/Video.js";

export const getSummary = async (req, res) => {
  try {
    const videos = await Video.find();

    const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
    const totalErrors = videos.reduce((sum, v) => sum + (v.errors || 0), 0);
    const bandwidth = videos.reduce((sum, v) => sum + v.bandwidth, 0);

    const activeStreams = videos.filter(v => v.status === "Active").length;

    //  Calculate error rate
    const errorRate =
      totalViews > 0
        ? ((totalErrors / totalViews) * 100).toFixed(2) + "%"
        : "0%";

    res.json({
      totalViews,
      bandwidth: bandwidth.toFixed(2) + " GB",
      activeStreams,
      errorRate
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};