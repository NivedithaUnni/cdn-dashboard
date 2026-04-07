import Video from "../models/Video.js";

export const getTrends = async (req, res) => {
  try {
    // Optional query param: range=7d|30d
    const range = req.query.range;
    let filter = {};
    if (range === "7d" || range === "30d") {
      const days = range === "30d" ? 30 : 7;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      filter.date = { $gte: startDate };
    }

    const data = await Video.find(filter).sort({ date: 1 });

    const formatted = data.map(v => ({
      date: v.date.toISOString().split("T")[0],
      views: v.views
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};