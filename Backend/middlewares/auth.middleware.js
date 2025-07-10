import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.model.js";
import { config } from "dotenv";
config();
export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in! Please log in to get access.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await Auth.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "User no longer exists.",
      });
    }
    req.user = currentUser;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export const Roleaccess = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};
