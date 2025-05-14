import React, { useState, useRef, useEffect } from 'react';
import '../pdf-viewer-react-pdf.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Use worker from public directory for compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function PDFPreview({ file }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [pdfAspectRatio, setPdfAspectRatio] = useState(1);

  function onDocumentLoadSuccess({ numPages, _pdfInfo }) {
    setNumPages(numPages);
    setPageNumber(1);
    // Try to get aspect ratio from first page
    if (containerRef.current) {
      const pdf = containerRef.current.querySelector('canvas');
      if (pdf) {
        setPdfAspectRatio(pdf.width / pdf.height);
      }
    }
  }

  if (!file) {
    return (
      <div className="pdf-preview-empty">
        <span className="pdf-preview-empty-label">No PDF selected.</span>
      </div>
    );
  }

  return (
    <div className="pdf-preview-panel">
      <div ref={containerRef} className="pdf-preview-content">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<span className="pdf-preview-loading">Loading PDF...</span>}
          error={<span className="pdf-preview-error">Failed to load PDF.</span>}
        >
          <Page 
            pageNumber={pageNumber} 
            // width={Math.min(containerWidth, containerHeight * pdfAspectRatio) || 1}
            height={Math.min(containerHeight) || 1}
            className="pdf-preview-page"
            style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }}
          />
        </Document>
        {numPages && numPages > 1 && (
          <div className="pdf-preview-nav">
            <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="pdf-nav-btn">
              &#8592;
            </button>
            <span className="pdf-nav-label">{pageNumber} / {numPages}</span>
            <button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages} className="pdf-nav-btn">
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFPreview;
