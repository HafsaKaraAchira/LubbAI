// ResultsList component
import React from 'react';
import Paper from '@mui/material/Paper';



function ResultsList({ results, loading, query, lastQuery }) {
  // Support both tuple [chunk, score] and object results
  const parsedResults = Array.isArray(results)
    ? results.map((r) => Array.isArray(r) && r.length === 2 ? { chunk: r[0], score: r[1] } : (typeof r === 'object' && r !== null ? r : { chunk: String(r), score: null }))
    : [];

  return (
    <div className="results-list-scrollable">
      {(loading ? query : lastQuery) && (
        <div className="results-list-label mb-4 px-2 py-2 rounded-lg bg-custom-baby-powder/70 text-custom-caf-noir font-semibold text-base shadow">
          {loading ? (
            <>Searching: <span className="font-bold">{query}</span>…</>
          ) : (
            <>Results for: <span className="font-bold">{lastQuery}</span> ({parsedResults.length})</>
          )}
        </div>
      )}
      {loading ? (
        <div className="no-results">Searching…</div>
      ) : parsedResults && parsedResults.length > 0 ? (
        parsedResults.map((r, i) => (
          <Paper key={i} className="result-card result-paper" elevation={3}>
            <div className="result-header flex items-center justify-between mb-1">
              <div className="result-title">Result: {i + 1}</div>
              <span className="result-score ml-2">
                Score: {typeof r.score === 'number' ? `${(r.score * 100).toFixed(1)}%` : 'N/A'}
              </span>
            </div>
            <div className="result-body">{r.chunk}</div>
          </Paper>
        ))
      ) : (
        <div className="no-results">No results yet.</div>
      )}
    </div>
  );
}


export default ResultsList;
