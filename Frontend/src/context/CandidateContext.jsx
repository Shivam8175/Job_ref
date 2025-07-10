import { createContext, useEffect, useState } from "react";
import {
  getCandidates,
  createCandidate,
  updateCandidateStatus,
} from "../services/api";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobTitle: "",
    status: "",
  });

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const data = await getCandidates(filters);
      setCandidates(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (candidateData) => {
    try {
      const newCandidate = await createCandidate(candidateData);
      setCandidates([newCandidate, ...candidates]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const updatedCandidate = await updateCandidateStatus(id, status);
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === id ? updatedCandidate : candidate
        )
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        error,
        filters,
        setFilters,
        addCandidate,
        updateStatus,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
