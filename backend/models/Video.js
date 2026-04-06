import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    country: {
  type: String,
  required: true
},
    views: {
      type: Number,
      required: true,
    },
    bandwidth: {
      type: Number,
      required: true,
    },
    errors: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Paused", "Error"],
      default: "Active",
    },
    date: {
  type: Date,   // ✅ CORRECT
  required: true,
}
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);