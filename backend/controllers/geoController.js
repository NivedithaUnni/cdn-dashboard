import Video from "../models/Video.js";

export const getGeo = async (req, res) => {
  try {
    const data = await Video.aggregate([
      {
        $group: {
          _id: "$country", // ✅ use country
          viewers: { $sum: "$views" } // ✅ rename
        }
      }
    ]);

    // 🌍 Coordinates
    const coordsMap = {
      India: [20.59, 78.96],
      USA: [37.09, -95.71],
      Germany: [51.16, 10.45],
      UK: [55.37, -3.43],
      Brazil: [-14.23, -51.92]
    };

    const formatted = data.map(d => ({
      country: d._id,
      viewers: d.viewers,
      coords: coordsMap[d._id] || [0, 0]
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};