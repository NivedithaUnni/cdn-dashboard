import express from "express";
import { getSummary } from "../controllers/summaryController.js";
import { getTrends } from "../controllers/trendController.js";
import { getGeo } from "../controllers/geoController.js";
import { getVideos } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protected routes
router.get("/summary", protect, getSummary);
router.get("/trends", protect, getTrends);
router.get("/geo", protect, getGeo);
router.get("/videos", protect, getVideos);

export default router;