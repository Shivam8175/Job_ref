import { Candidate } from "../models/candidate.model.js";
export const getCandidateStats = async (req, res) => {
  try {
    const stats = await Candidate.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { status: "$_id", count: 1, _id: 0 } },
    ]);
    const totalCandidates = await Candidate.countDocuments();
    res
      .status(200)
      .json({ status: "success", data: { totalCandidates, stats } });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
