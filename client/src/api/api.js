// Wraps fetch/axios calls to backend

// src/api/api.js
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const uploadPDF = (file) => {
  const form = new FormData();
  form.append('pdf', file);
  return axios.post(`${API_URL}/upload`, form);
};

export const searchPDF = (filePath, query) =>
  axios.post(`${API_URL}/search`, { filePath, query });

export const getSummary = (filePath) =>
  axios.post(`${API_URL}/summarize`, { filePath });

// export const cleanupPDF = (fileName) =>
//   axios.post(`${API_URL}/cleanup`, { fileName });
