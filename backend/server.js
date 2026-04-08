// ================= CORS SETUP =================
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const FRONTEND_URL = "https://cdn-dashboard-3zrc.vercel.app";

const corsOptions = {
  origin: FRONTEND_URL, // exact frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // required for cookies/JWT
};

// Apply CORS middleware globally, before any route
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests for all routes
app.options("*", cors(corsOptions));

// ================= MIDDLEWARE =================
app.use(express.json());