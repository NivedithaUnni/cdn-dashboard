import Video from "../models/Video.js";

export const getTrends = async (req, res) => {
  try {
    //  get range from query
    const range = req.query.range || "7d";

    let days = 7;
    if (range === "30d") days = 30;

    // calculate start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    //aggregate
    const trends = await Video.aggregate([
      {
        $match: {
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          views: { $sum: "$views" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    //  format response
    const formatted = trends.map(t => ({
      date: t._id,
      views: t.views
    }));

    res.json(formatted);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching trends" });
  }
};