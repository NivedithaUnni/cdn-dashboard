import Video from "../models/Video.js";

export const getGeo = async (req, res) => {
  const data = await Video.aggregate([
    {
      $group: {
        _id: "$country",
        viewers: { $sum: "$views" }
      }
    }
  ]);

  res.json(data);
};