import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  name: String,
  region: String,
  country: String,
  views: Number,
  bandwidth: Number,
  errors: Number,
  date: Date
});

export default mongoose.model("Video", videoSchema);