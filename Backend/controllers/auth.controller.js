import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.model.js";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newUser = await Auth.create({ name, email, password, role });
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: { user: { id: newUser._id, name, email, role: newUser.role } },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email }).select("+password");
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "You are not logged in!" });
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "User no longer exists" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token or error occurred" });
  }
};
