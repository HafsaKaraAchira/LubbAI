import React from 'react';
import UploadForm from './UploadForm';
import FileInfo from './FileInfo';
import logo from '../assets/LubbAI_logo.svg';

function LeftPanel({ file, filePath, onUpload, onClear }) {
  return (
    <div className="left-panel">
      <div className="left-panel-header">
        <img src={logo} alt="LubbAI Logo" className="left-panel-logo" />
        <span className="left-panel-title">LubbAI</span>
        <span className="vertical-divider mx-3 h-10 border-l border-custom-caf-noir/40"></span>
        <div className="left-panel-desc-container flex flex-col flex-1 min-w-0">
          <span className="left-panel-desc text-xs font-light text-custom-gunmetal/70">Uncover the Lubb: AI Insights at the Heart of Your PDFs</span>
        </div>
      </div>
      <div className="left-panel-content">
        {!filePath ? (
          <UploadForm onUploaded={onUpload} />
        ) : (
          <FileInfo file={file} onClear={onClear} />
        )}
      </div>
    </div>
  );
}

export default LeftPanel;