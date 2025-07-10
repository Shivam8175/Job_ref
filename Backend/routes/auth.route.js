import express from "express";
import { login, protect, signup } from "../controllers/auth.controller.js";
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", protect);
export default authRouter;
