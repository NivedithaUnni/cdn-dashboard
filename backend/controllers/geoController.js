import Video from "../models/Video.js";

export const getGeo = async (req, res) => {
  try {
    const data = await Video.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: "$views" }
        }
      }
    ]);

    const formatted = data.map(d => ({
      country: d._id,
      count: d.count
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};