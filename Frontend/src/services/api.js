import axios from "axios";

const API_URL = "http://localhost:2013/";

export const getCandidates = async () => {
  const response = await axios.get(
    "http://localhost:2013/candidates/getcandidate"
  );
  return response.data.data.candidates;
};

export const createCandidate = async (candidateData) => {
  const formData = new FormData();
  Object.entries(candidateData).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  const response = await axios.post(
    "http://localhost:2013/candidates/addcandidate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data.candidate;
};

export const updateCandidateStatus = async (id, status) => {
  const response = await axios.patch(
    `http://localhost:2013/candidates/updatecandidate/${id}/status`,
    {
      status,
    }
  );
  return response.data.data.candidate;
};

export const deleteCandidate = async (id) => {
  await axios.delete(`http://localhost:2013/candidates/deletecandidate/${id}`);
};

export const login = async (email, password) => {
  const response = await axios.post("http://localhost:2013/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post("http://localhost:2013/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};
