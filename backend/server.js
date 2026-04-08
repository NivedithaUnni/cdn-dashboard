// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();

/* ================= CORS SETUP ================= */
const FRONTEND_URL = "https://cdn-dashboard-3zrc.vercel.app";

const corsOptions = {
  origin: FRONTEND_URL,          // Only allow your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true              // Required if using cookies / JWT auth
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options("*", cors(corsOptions));

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= DATABASE ================= */
connectDB();

/* ================= ROUTES ================= */

// Root route (test)
app.get("/", (req, res) => {
  res.send("🚀 CDN Analytics API is running...");
});

// API routes
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

/* ================= ERROR HANDLING ================= */

// 400 handler
app.use((err, req, res, next) => {
  if (err.status === 400 || err.name === "ValidationError") {
    return res.status(400).json({ message: "⚠️ Bad Request", error: err.message });
  }
  next(err);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Server Error" });
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});