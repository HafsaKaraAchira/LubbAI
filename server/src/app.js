/**
 * This file sets up an Express server for the LubbAI API.
 * It exports an Express app with a single route, /api, which accepts
 * a POST request with a single PDF file as a multipart/form-data attachment.
 * The route calls the upload middleware to process the
 * file and returns the processed data as JSON.
 */

const express = require('express');
const cors = require('cors');  // Import the cors package
const apiRoutes = require('./routes/api');
const upload = require('./middleware/upload');

require('dotenv').config();

const app = express();

app.use(cors());  // Enable CORS for all routes

// Enable JSON parsing for Express
app.use(express.json());

// Set up the /api route
// This route accepts a POST request with a single PDF file as a multipart/form-data attachment
// The route calls the upload middleware to process the file and returns the processed data as JSON
app.use('/api', apiRoutes);

// Export the app so it can be used in the main server file
module.exports = app;
