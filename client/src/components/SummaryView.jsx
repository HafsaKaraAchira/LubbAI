// SummaryView component

// src/components/SummaryView.jsx
import { useState } from 'react';
import { getSummary } from '../api/api';

function wordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function SummaryView({ filePath, originalText }) {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [originalWordCount, setOriginalWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);

  // Try to get original word count from prop if available
  // Otherwise, expect API to return it (or fallback to 0)
  const getOriginalWordCount = () => {
    if (originalText) return wordCount(originalText);
    return originalWordCount;
  };

  const handleGenerateSummary = async () => {
    if (!filePath) {
      setError('No file path provided.');
      return;
    }
    setLoading(true);
    setError('');
    // Don't clear summary immediately; only clear on successful load or explicit error
    try {
      console.log('Requesting summary for filePath:', filePath);
      const res = await getSummary(filePath);
      console.log('Summary API response:', res);
      let summaryData = res.data;
      let summaryText = summaryData;
      let origCount = 0;
      // If API returns { summary, originalWordCount }
      if (summaryData && typeof summaryData === 'object') {
        summaryText = summaryData.summary || '';
        origCount = summaryData.originalWordCount || 0;
      }
      if (!summaryText || typeof summaryText !== 'string') {
        setError('No summary returned from server.');
        setSummary('');
        setLoading(false);
        return;
      }
      setSummary(summaryText);
      const summaryCount = wordCount(summaryText);
      setSummaryWordCount(summaryCount);
      // Prefer prop, fallback to API
      if (originalText) {
        setOriginalWordCount(wordCount(originalText));
      } else {
        setOriginalWordCount(origCount);
      }
      setError('');
    } catch (e) {
      console.error('Summary fetch error:', e);
      setError('Failed to fetch summary: ' + (e?.message || e));
    } finally {
      setLoading(false);
    }
  };


  // Compute reduction percentage
  const origCount = getOriginalWordCount();
  const reduction = origCount > 0 ? (100 - (summaryWordCount / origCount) * 100).toFixed(1) : null;

  if (!filePath) {
    return <div><h3>Document Summary</h3><p>No file uploaded. Please upload a PDF to generate a summary.</p></div>;
  }
  if (error) {
    return <div><h3>Document Summary</h3><p style={{color: 'red'}}>{error}</p></div>;
  }
  return (
    <div>
      <h3>Document Summary</h3>
      <button onClick={handleGenerateSummary} disabled={loading} style={{ marginBottom: '1em' }}>
        {loading ? 'Generating...' : summary ? 'Regenerate Summary' : 'Generate Summary'}
      </button>
      {summary && !loading && (
        <div style={{ marginBottom: '1em' }}>
          <strong>Summary Words:</strong> {summaryWordCount} <br />
          <strong>Original Words:</strong> {origCount} <br />
          {origCount > 0 && (
            <span><strong>Reduction:</strong> {reduction}%</span>
          )}
        </div>
      )}
      <p>{loading ? 'Generating summary...' : summary}</p>
    </div>
  );
}

export default SummaryView;
