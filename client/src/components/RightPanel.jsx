// RightPanel.jsx
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
// import OperationsTabs from './OperationsTabs'; // If you still use your custom Tabs elsewhere
import SearchBar from './SearchBar';
import SummaryView from './SummaryView';
import ResultsList from './ResultsList';

function RightPanel({ filePath, results, setResults }) {
  // Helper to clear results and search label state
  const clearResultsAndSearchLabel = () => {
    setResults([]);
    setQuery('');
    setLastQuery('');
  };

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryError, setSummaryError] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [originalWordCount, setOriginalWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleGenerateSummary = async () => {
    if (!filePath) {
      setSummaryError('No file path provided.');
      return;
    }
    setSummaryLoading(true);
    setSummaryError('');
    try {
      const res = await import('../api/api').then(m => m.getSummary(filePath));
      let summaryData = res.data;
      let summaryText = summaryData;
      let origCount = 0;
      if (summaryData && typeof summaryData === 'object') {
        summaryText = summaryData.summary || '';
        origCount = summaryData.originalWordCount || 0;
      }
      if (!summaryText || typeof summaryText !== 'string') {
        setSummaryError('No summary returned from server.');
        setSummary('');
        setSummaryLoading(false);
        return;
      }
      setSummary(summaryText);
      setSummaryWordCount(summaryText.trim().split(/\s+/).length);
      setOriginalWordCount(origCount);
      setSummaryError('');
    } catch (e) {
      setSummaryError('Failed to fetch summary: ' + (e?.message || e));
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <Paper elevation={2} className="right-panel">
      <MuiTabs
        value={activeTab}
        onChange={handleTabChange}
        className="right-panel-tabs w-3/4 mx-auto"
        TabIndicatorProps={{ style: { height: 0 } }}
        variant="standard"
        sx={{ minHeight: 0 }}
      >
        <MuiTab label="Search" className="right-panel-tab" disableRipple disableFocusRipple sx={{ flex: 1, minWidth: 0, minHeight: 0 }} />
        <MuiTab label="Summarize" className="right-panel-tab" disableRipple disableFocusRipple sx={{ flex: 1, minWidth: 0, minHeight: 0 }} />
      </MuiTabs>
      <div className="right-panel-tab-content">
        {activeTab === 0 && (
          <div className="right-panel-search">
            <div className="right-panel-tab-header">
              <SearchBar filePath={filePath} onResults={setResults} onLoadingChange={setLoading} query={query} setQuery={setQuery} setLastQuery={setLastQuery} />
            </div>
            <div className="right-panel-results">
              <ResultsList results={results} loading={loading} query={query} lastQuery={lastQuery} />
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="right-panel-summary">
            <SummaryView
              filePath={filePath}
              summary={summary}
              error={summaryError}
              loading={summaryLoading}
              originalWordCount={originalWordCount}
              summaryWordCount={summaryWordCount}
              handleGenerateSummary={handleGenerateSummary}
            />
          </div>
        )}
      </div>
    </Paper>
  );
}

export default RightPanel;
