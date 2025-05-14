// SearchBar component

// src/components/SearchBar.jsx
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { searchPDF } from '../api/api';

function SearchBar({ filePath, onResults, onLoadingChange, query, setQuery, setLastQuery }) {
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    console.log('[SearchBar] handleSearch called');
    console.log('[SearchBar] filePath:', filePath);
    console.log('[SearchBar] query:', query);
    setLoading(true);
    if (onLoadingChange) onLoadingChange(true);
    try {
      console.log('[SearchBar] Calling searchPDF...');
      const { data } = await searchPDF(filePath, query);
      console.log('[SearchBar] searchPDF response:', data);
      onResults(data.results);
      if (setLastQuery) setLastQuery(query); // backup input for label
      setQuery(''); // clear input after search
    } catch (err) {
      console.error('[SearchBar] searchPDF error:', err);
    } finally {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
      <InputBase
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter your question…"
        className="search-bar-input"
        inputProps={{
          'aria-label': 'search pdf',
          className: 'search-bar-input-inner',
          as: 'textarea',
          rows: 1,
          style: {
            resize: 'none',
            overflow: 'auto',
            minHeight: '2.5rem',
            maxHeight: '4.2rem', // ~2 lines
            paddingRight: '2.5rem', // space for button
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
          }
        }}
        multiline
        minRows={1}
        maxRows={2}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSearch();
          }
        }}
        fullWidth
      />
      <IconButton
        type="submit"
        className="search-bar-btn"
        aria-label="search"
        size="large"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </form>
  );
}
export default SearchBar;
