// RightPanel.jsx
import React, { useState } from 'react';
import Tabs from './Tabs';
import ResultsList from './ResultsList';
import SearchBar from './SearchBar';
import SummaryView from './SummaryView';

function RightPanel({ filePath, results, setResults, summaryResetKey }) {
  const [activeTab, setActiveTab] = useState('search');
  return (
    <div className="right-panel">
      <Tabs tabs={['search', 'summarize']} active={activeTab} onChange={setActiveTab} />
      {activeTab === 'search' && (
        <div className="tab-content">
          <div className="tab-header-fixed search-bar-container">
            <SearchBar filePath={filePath} onResults={setResults} />
          </div>
          <ResultsList results={results} />
        </div>
      )}
      {activeTab === 'summarize' && <SummaryView key={summaryResetKey} filePath={filePath} />}
    </div>
  );
}

export default RightPanel;
