/**
 * Services layer - calls Python core (via child_process or HTTP)
 *
 * @module services/coreService
 */

const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

require('dotenv').config();

const PYTHON_PATH = process.env.PYTHON_PATH || '/usr/bin/python3.12';
const SCRIPT = path.resolve(process.env.SCRIPT || '../core/main.py');

const dataDir = path.resolve(process.env.DATA_DIR || '../_data/');

/**
 * Run Python script with given arguments
 * @param {string[]} args - arguments to pass to Python script
 * @returns {Promise<object>} - Promise resolving with JSON-parsed output
 */
function runPython(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(PYTHON_PATH, [SCRIPT, ...args]);
    let data = '';
    // pipe stdout chunks to data variable
    proc.stdout.on('data', chunk => data += chunk);
    // pipe stderr chunks to console.error
    proc.stderr.on('data', err => console.error(err.toString()));
    // on process exit, resolve promise with parsed data
    proc.on('close', () => resolve(JSON.parse(data)));
  });
}

/**
 * Search PDF by given query
 * @param {string} filePath - path to PDF file
 * @param {string} query - query to search
 * @returns {Promise<object>} - Promise resolving with search results
 */
exports.searchPDF = (filePath, query) =>
  // run Python script with search argument
  runPython([path.join(dataDir, filePath), 'search', query]);

/**
 * Summarize PDF
 * @param {string} filePath - path to PDF file
 * @returns {Promise<object>} - Promise resolving with summary
 */
exports.summarizePDF = (filePath) =>
  // run Python script with summarize argument
  runPython([path.join(dataDir, filePath), 'summarise']);


/**
 * Store PDF in persistent storage
 * @param {string} filePath - path to PDF file
 * @returns {Promise<string>} - Promise resolving with path to stored file
 */
// exports.storePDF = async (filePath) => {
//   const dest = path.join(__dirname, '../../../_data/', path.basename(filePath));
//   await fs.rename(filePath, dest);
//   // Optionally write to an index.json here
//   return dest;
// };