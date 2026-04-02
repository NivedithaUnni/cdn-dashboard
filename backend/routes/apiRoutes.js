import express from "express";
import { getSummary } from "../controllers/summaryController.js";
import { getTrends } from "../controllers/trendController.js";
import { getGeo } from "../controllers/geoController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/trends", getTrends);
router.get("/geo", getGeo);

export default router;