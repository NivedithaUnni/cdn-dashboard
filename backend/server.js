import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // load env

// connect database
connectDB();

const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);