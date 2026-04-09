import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Body parser
app.use(express.json());

// Enable CORS for your frontend
app.use(cors({
  origin: ["https://cdn-dashboard-3zrc.vercel.app"], // <-- frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // needed if sending cookies
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));