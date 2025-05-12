// SummaryView component

// src/components/SummaryView.jsx
import { useEffect, useState } from 'react';
import { getSummary } from '../api/api';

function SummaryView({ filePath }) {
  const [summary, setSummary] = useState('');
  useEffect(() => {
    getSummary(filePath).then(res => setSummary(res.data.summary));
  }, [filePath]);
  return <div><h3>Document Summary</h3><p>{summary}</p></div>;
}
export default SummaryView;
