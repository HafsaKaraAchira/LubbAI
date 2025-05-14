import PDFPreview from './PDFPreview';

function FileInfo({ file, onClear }) {
  return (
    <div className="left-panel-fileinfo">
      <div className="left-panel-fileinfo-row">
        <span className="left-panel-filename">{file ? (file.name ?? 'file_name') : 'No file selected'}</span>
        <button
          onClick={onClear}
          className="clear-btn"
          type="button"
          aria-label="Clear File"
        >
          Clear File
        </button>
      </div>
      <PDFPreview file={file} />
    </div>
  );
}

export default FileInfo;
