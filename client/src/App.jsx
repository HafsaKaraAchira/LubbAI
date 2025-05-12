// Main React App component

useEffect(() => {
    function handleBeforeUnload() {
      if (!filePath) return;
      fetch(`${API_URL}/cleanup`, {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ path: filePath })
      });
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [filePath]);
  