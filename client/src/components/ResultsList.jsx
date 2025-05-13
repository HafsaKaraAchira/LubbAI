// ResultsList component
import React from 'react';

import './ResultsList.css';

function ResultsList({ results }) {
  // Support both tuple [chunk, score] and object results
  const parsedResults = Array.isArray(results)
    ? results.map((r) => Array.isArray(r) && r.length === 2 ? { chunk: r[0], score: r[1] } : r)
    : [];

  return (
    <div className="results-list-scrollable">
      {parsedResults && parsedResults.length > 0 ? (
        parsedResults.map((r, i) => (
          <div key={i} className="result-card">
            <div className="result-chunk">{r.chunk}</div>
            <div className="result-score">Score: {(r.score * 100).toFixed(1)}%</div>
          </div>
        ))
      ) : (
        <div className="no-results">No results yet.</div>
      )}
    </div>
  );
}


export default ResultsList;
