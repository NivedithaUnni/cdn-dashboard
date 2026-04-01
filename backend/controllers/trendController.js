import Video from "../models/Video.js";

export const getTrends = async (req, res) => {
  const data = await Video.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        views: { $sum: "$views" }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  res.json(data);
};