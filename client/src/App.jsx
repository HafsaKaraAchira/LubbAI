import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';
import axios from 'axios';
import { cleanupPDF } from './api/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [results, setResults] = useState([]); // for search results
  const [summaryResetKey, setSummaryResetKey] = useState(0); // for summary reset

  useEffect(() => {
    function handleBeforeUnload() {
      if (filePath) cleanupPDF(filePath);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [filePath]);

  const handleUpload = (path, uploadedFile) => {
    setFilePath(path);
    setFile(uploadedFile);
  };

  const handleClear = () => {
    if (filePath) cleanupPDF(filePath);
    setFile(null);
    setFilePath('');
    setResults([]); // reset search results
    setSummaryResetKey(k => k + 1); // bump key to reset summary
  };

  return (
    <div>
      <h1>Hello World</h1>
      <div className="app-container">
        <LeftPanel file={file} filePath={filePath} onUpload={handleUpload} onClear={handleClear} />
        <RightPanel filePath={filePath} results={results} setResults={setResults} summaryResetKey={summaryResetKey} />
      </div>
    </div>
  );
}

export default App;