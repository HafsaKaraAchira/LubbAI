/**
 * Handles /upload endpoint
 *
 * @module controllers/pdfController
 */

const core = require('../services/coreService');
const fs = require('fs').promises;
const path = require('path');

require('dotenv').config();

const dataDir = path.resolve(process.env.DATA_DIR || '../_data/');

/**
 * Handles PDF upload. The middleware `upload` saves the file locally
 * and provides `req.file.path`. We then optionally register it in
 * our core (e.g. move to persistent storage).
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.uploadPDF = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a PDF.' });
        }
        const fileName = req.file.filename;
        console.log('File uploaded successfully as: ' + fileName);
        res.json({ message: 'Upload successful', path: `${fileName}` });
    } catch (err) {
        next(err);
    }
  };
    

exports.cleanupPDF = async (req, res, next) => {
    const { path: fileName } = req.body;
    try {
      await fs.unlink(path.join(dataDir, fileName));
      console.log(`File ${path.join(dataDir, fileName)} deleted successfully`);
      res.json({ message: 'File cleaned up' });
    } catch (err) {
      // ignore if already gone
      console.log(`File ${path.join(dataDir, fileName)} not found`);
      console.log(err);
      res.json({ message: 'No file to delete' });
    }
  };
  
  