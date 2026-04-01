import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "../models/Video.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const regions = ["Asia", "Europe", "US"];
const countries = ["India", "Germany", "USA", "UK"];

const generateData = () => {
  let data = [];

  for (let i = 0; i < 120; i++) {
    data.push({
      name: "Video " + i,
      region: regions[Math.floor(Math.random() * regions.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      views: Math.floor(Math.random() * 5000),
      bandwidth: Math.random() * 100,
      errors: Math.floor(Math.random() * 10),
      date: new Date(2025, Math.floor(Math.random() * 12), 1)
    });
  }

  return data;
};

const seed = async () => {
  await Video.deleteMany();
  await Video.insertMany(generateData());
  console.log("Data Seeded");
  process.exit();
};

seed();