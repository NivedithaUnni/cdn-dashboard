import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import { getSummary } from "../controllers/summaryController.js";
import { getTrends } from "../controllers/trendController.js";
import { getGeo } from "../controllers/geoController.js";
import { getVideos } from "../controllers/videoController.js";

const router = express.Router();

//  Apply auth to ALL routes
router.use(protect);

router.get("/summary", getSummary);
router.get("/trends", getTrends);
router.get("/geo", getGeo);
router.get("/videos", getVideos);

export default router;