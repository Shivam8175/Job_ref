import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import Statrouter from "./routes/state.route.js";
import Candidaterouter from "./routes/candidate.route.js";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./configs/mongodb.config.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/candidates", Candidaterouter);
app.use("/stats", Statrouter);

const PORT = process.env.PORT || 2013;
async function startserver() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("server started successfully");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}
startserver();
