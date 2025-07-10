import mongoose from "mongoose";
const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});
export const Auth = mongoose.model("User", AuthSchema);
