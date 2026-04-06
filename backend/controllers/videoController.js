import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 4,
      search = "",
      region = "",
      date = "",
      sortBy = "",
      order = "",
    } = req.query;

    /* ================= QUERY ================= */
    let query = {};

    // 🔍 Search (by name)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 🌍 Region filter
    if (region) {
      query.region = region;
    }

    // 📅 Date filter (FIXED for MongoDB Date)
    if (date) {
  const selected = new Date(date);

  const start = new Date(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate()
  );

  const end = new Date(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate() + 1
  );

  query.date = {
    $gte: start,
    $lt: end,
  };
}

    /* ================= SORT ================= */
    let sort = {};

    if (sortBy) {
      sort[sortBy] = order === "desc" ? -1 : 1;
    } else {
      sort.date = -1; // default latest first
    }

    /* ================= FETCH ================= */
    const videos = await Video.find(query)
      .sort(sort) // ✅ correct sorting
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Video.countDocuments(query);

    /* ================= RESPONSE ================= */
    res.json({
      data: videos,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("❌ Error in getVideos:", error);
    res.status(500).json({ message: "Server Error" });
  }
};