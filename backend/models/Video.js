import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoName: String,
  region: String,
  views: Number,
  bandwidth: Number,
  status: String, // Active / Paused / Error
  date: Date
});

export default mongoose.model("Video", videoSchema);