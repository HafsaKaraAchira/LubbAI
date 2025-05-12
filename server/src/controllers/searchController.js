/**
 * Handles search and summarization endpoints
 *
 * @module controllers/searchController
 */

const core = require('../services/coreService');

/**
 * Performs semantic search on the uploaded PDF.
 * Expects { filePath, query } in the JSON body.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.search = async (req, res, next) => {
  try {
    const { path: filePath, query = "" } = req.body; // query is optional
    const results = await core.searchPDF(filePath, query);
    res.json({ results });
  } catch (err) {
    next(err);
  }
};

/**
 * Summarizes the entire PDF.
 * Expects { filePath } in the JSON body.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.summarize = async (req, res, next) => {
  try {
    const { path: filePath } = req.body;
    const summary = await core.summarizePDF(filePath);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
};


