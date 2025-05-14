// UploadForm component

// src/components/UploadForm.jsx
import { useState } from 'react';
import { uploadPDF } from '../api/api';

function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await uploadPDF(file);
      onUploaded(data.path, file);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setFile(null);
    setUploading(false);
  };

  // Dropzone classes
  let dropzoneClass = 'upload-dropzone';
  if (dragActive) dropzoneClass += ' dragover';

  // File name label classes
  let labelClass = 'upload-dropzone-label';
  if (file) labelClass += ' selected';
  else labelClass += ' pre-upload';

  // Button classes
  let btnClass = 'upload-btn';
  if (file) btnClass += ' selected';
  else btnClass += ' default';

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-8">
      <label
        htmlFor="upload-input"
        className={dropzoneClass}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        aria-label="Upload PDF dropzone"
      >
        <div className="upload-icon-label flex flex-col items-center justify-center mb-2">
          <span className="upload-zone-icon">
            {/* Expressive upload icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-custom-caf-noir" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
          </span>
          <span className="upload-zone-label font-bold text-custom-caf-noir text-lg mt-2">Click or drag a PDF file here to upload</span>
        </div>
        {/* File name or prompt label */}
        <span className={labelClass}>{file ? file.name : 'Add a PDF to upload'}</span>
        {/* Upload button only after file is selected */}
        {file && (
          <button
            type="submit"
            className={btnClass}
            disabled={!file || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </button>
        )}
        <span className="upload-dropzone-desc">
          {!file ? 'Only PDF files are supported' : ''}
        </span>
        <input
          id="upload-input"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          tabIndex={-1}
          disabled={uploading}
        />
      </label>
    </form>
  );
}

export default UploadForm;
