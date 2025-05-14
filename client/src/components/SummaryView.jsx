// SummaryView component

// src/components/SummaryView.jsx
import { useState } from 'react';
import { getSummary } from '../api/api';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SummarizeIcon from '@mui/icons-material/Notes';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';

function wordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function SummaryView({ filePath, summary, error, loading, originalWordCount, summaryWordCount, handleGenerateSummary }) {
  // Compute reduction percentage from props
  const origCount = originalWordCount;
  const reduction = origCount > 0 ? (100 - (summaryWordCount / origCount) * 100).toFixed(1) : null;

  if (!filePath) {
    return (
      <Paper className="summary-paper" elevation={3}>
        <div className="summary-header">
          <SummarizeIcon className="summary-icon" />
          <span>Document Summary</span>
        </div>
        <div className="summary-error">No file uploaded. Please upload a PDF to generate a summary.</div>
      </Paper>
    );
  }

  return (
    <Paper className="summary-paper" elevation={4}>
      <div className="flex items-center justify-between mb-6">
        <div className="summary-header">
          <SummarizeIcon className="summary-icon" />
          <span>Document Summary</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          className="summary-btn"
          onClick={handleGenerateSummary}
          disabled={loading}
        >
          {loading ? 'Generating...' : summary ? 'Regenerate' : 'Generate'}
        </Button>
      </div>
      <Paper className="summary-stats-paper" elevation={2}>
        <div className="summary-stats">
          <div className="summary-stat">
            <FormatListNumberedIcon className="summary-stat-icon" />
            <span className="summary-stat-label">Original</span>
            <span className="summary-stat-value">{origCount}</span>
          </div>
          <div className="summary-stat">
            <SummarizeIcon className="summary-stat-icon" />
            <span className="summary-stat-label">Summary</span>
            <span className="summary-stat-value">{summaryWordCount}</span>
          </div>
          {reduction && (
            <div className="summary-stat">
              <TrendingDownIcon className="summary-stat-icon" />
              <span className="summary-stat-label">Reduction</span>
              <span className="summary-stat-value">{reduction}%</span>
            </div>
          )}
        </div>
      </Paper>
      {error && <div className="summary-error">{error}</div>}
      {loading ? (
        <div className="summary-loading">Generating summary...</div>
      ) : (
        summary && (
          <Paper className="summary-content-paper" elevation={1}>
            <div className="summary-content">{summary}</div>
          </Paper>
        )
      )}
    </Paper>
  );
}

export default SummaryView;
