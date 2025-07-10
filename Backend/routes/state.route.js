import express from "express";
import { getCandidateStats } from "../controllers/stats.controller.js";
const Statrouter = express.Router();
Statrouter.get("/getstates", getCandidateStats);
export default Statrouter;
