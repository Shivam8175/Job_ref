import express from "express";
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  updateCandidateStatus,
} from "../controllers/candidate.controller.js";
import { protect } from "../controllers/auth.controller.js";
import { Roleaccess } from "../middlewares/auth.middleware.js";

const Candidaterouter = express.Router();
Candidaterouter.post(
  "/addcandidate",
  protect,
  Roleaccess("admin"),
  createCandidate
);
Candidaterouter.get("/getcandidate", getAllCandidates);
Candidaterouter.patch("updatecandidate/:id/status", updateCandidateStatus);
Candidaterouter.delete("deletecandidate/:id", deleteCandidate);
export default Candidaterouter;
