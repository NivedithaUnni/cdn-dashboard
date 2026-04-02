import Video from "../models/Video.js";

export const getTrends = async (req, res) => {
  try {
    const data = await Video.find().sort({ date: 1 });

    const formatted = data.map(v => ({
      date: v.date.toISOString().split("T")[0],
      views: v.views
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};