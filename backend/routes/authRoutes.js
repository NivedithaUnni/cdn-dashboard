import express from "express";
import { login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// login
router.post("/login", login);

// verify
router.get("/verify", protect, (req, res) => {
  res.json({ message: "Valid user" });
});

export default router;