import { Candidate } from "../models/candidate.model.js";
export const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;
    const exists = await Candidate.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Candidate already exists" });
    const newCandidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
    });
    res
      .status(201)
      .json({ status: "success", data: { candidate: newCandidate } });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const totalCandidates = await Candidate.countDocuments();
    res
      .status(200)
      .json({ status: "success", data: { totalCandidates, candidates } });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};
export const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(req.body);
    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json({ status: "success", data: { candidate } });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ message: "Internal error occurred" });
  }
};
