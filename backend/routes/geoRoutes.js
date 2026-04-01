import express from "express";
import { getGeo } from "../controllers/geoController.js";

const router = express.Router();
router.get("/", getGeo);

export default router;