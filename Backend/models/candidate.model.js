import mongoose from "mongoose";
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
  },
  jobTitle: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Hired"],
    default: "Pending",
  },
  resumeUrl: { type: String, match: /.pdf$/i },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const Candidate = mongoose.model("Candidate", candidateSchema);
