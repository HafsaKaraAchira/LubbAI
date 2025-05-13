import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const uploadPDF = (file) => {
  const form = new FormData();
  form.append('pdf', file);
  return axios.post(`${API_URL}/upload`, form);
};

export const searchPDF = (filePath, query) =>
  axios.post(`${API_URL}/search`, { path: filePath, query: query });

export const getSummary = (filePath) =>
  axios.post(`${API_URL}/summarize`, { path: filePath });

export const cleanupPDF = async (fileName) => {
  try {
    await axios.delete(`${API_URL}/cleanup`, {
      data: { path: fileName }, // must use 'path' to match server
    });
    console.log(`Successfully cleaned up file: ${fileName}`);
  } catch (error) {
    console.error(`Error cleaning up file: ${fileName}`, error);
  }
};