// SearchBar component

// src/components/SearchBar.jsx
import { useState } from 'react';
import { searchPDF } from '../api/api';

function SearchBar({ filePath, onResults }) {
  const [query, setQuery] = useState('');
  const handleSearch = async () => {
    const { data } = await searchPDF(filePath, query);
    onResults(data.results);
  };
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)}
             placeholder="Enter your question…" />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}
export default SearchBar;
