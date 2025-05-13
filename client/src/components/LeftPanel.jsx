import React from 'react';
import UploadForm from './UploadForm';
import PDFPreview from './PDFPreview';

function LeftPanel({ file, filePath, onUpload, onClear }) {
  return (
    <div className="left-panel">
      {!filePath ? (
        <UploadForm onUploaded={onUpload} />
      ) : (
        <div className="file-info">
          <span>{file ? (file.name ?? 'file_name') : 'No file selected'}</span>
          <button onClick={onClear}>Clear File</button>
          <PDFPreview file={file} />
        </div>
      )}
    </div>
  );
}

export default LeftPanel;