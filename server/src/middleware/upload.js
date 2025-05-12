/**
 * PDF upload middleware
 * 
 * - Saves uploaded PDF in ./data directory using UUID filename
 * - Files are temporary (not persisted in DB or core)
 * - Should be deleted manually by frontend on refresh/close
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dataDir = process.env.DATA_DIR || '../../../_data/';

// Ensure data directory exists
const uploadDir = path.join(__dirname, dataDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer to use UUIDs and store in data/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

module.exports = multer({ storage });
