// UploadForm component

// src/components/UploadForm.jsx
import { useState } from 'react';
import { uploadPDF } from '../api/api';

function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await uploadPDF(file);
    onUploaded(data.path);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="application/pdf"
             onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload PDF</button>
    </form>
  );
}

export default UploadForm;
