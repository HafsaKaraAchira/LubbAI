# Server Tier

The server tier is a Node.js REST API that bridges the React client and the Python core.

## File Structure

The server tier is organized as follows:

* `server/`: root directory
	+ `app.js`: entry point for the server
	+ `routes/`: directory containing route handlers
		- `api.js`: API route handlers (e.g. `/upload`, `/search`, `/summarize`)
	+ `services/`: directory containing service implementations
		- `coreService.js`: service that interfaces with the Python core
	+ `middleware/`: directory containing middleware implementations
		- `upload.js`: middleware for handling PDF uploads
	+ `package.json`: package metadata and dependencies

## Setup

### Prerequisites

* Node.js ≥16  
* A running Core service (or ability to spawn Python)

### Installation

1. Clone the repository
2. Install dependencies: `cd server && npm install`

### Configuration

Copy `.env.example` to `.env` and edit the file to set the following environment variables:

* `PORT=3001`: the port number to listen on
* `PYTHON_PATH=python3`: the path to the Python executable
* `CORE_SCRIPT=../core/main.py`: the path to the Python script to run

### Available Endpoints

#### POST /api/upload

* Form-data: pdf file
* Response: { message, path }

#### POST /api/search

* JSON: { filePath, query }
* Response: { results: [ { chunk, score }, ... ] }

#### POST /api/summarize

* JSON: { filePath }
* Response: { summary }

### Running

1. Start the server: `npm start`
