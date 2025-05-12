/**
 * Defines Express routes for the API
 *
 * @module routes/api
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const pdfController = require('../controllers/pdfController');
const searchController = require('../controllers/searchController');

// Upload endpoint
// POST /upload
// Upload a PDF file. The file is expected to be sent as a multipart/form-data
// attachment with the key 'pdf'.
router.post('/upload', upload.single('pdf'), pdfController.uploadPDF);

// Search endpoint
// POST /search
// Search a PDF file by query. The query is expected to be sent as a JSON body
// with the key 'query'.
router.post('/search', express.json(), searchController.search);

// Summarize endpoint
// POST /summarize
// Summarize a PDF file. The PDF file path is expected to be sent as a JSON body
// with the key 'filePath'.
router.post('/summarize', express.json(), searchController.summarize);


// Cleanup endpoint
// DELETE /cleanup
// Clean up temporary files. The PDF file path is expected to be sent as a JSON body
// with the key 'filePath'.
router.delete('/cleanup', express.json(), pdfController.cleanupPDF);


module.exports = router;
