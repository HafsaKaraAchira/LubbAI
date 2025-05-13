# Client

React frontend for PDF upload, search, and summarization.

## Structure

client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UploadForm.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ResultsList.jsx
│   │   └── SummaryView.jsx
│   │
│   ├── api/
│   │   └── api.js                # wraps fetch/axios calls
│   │
│   ├── App.jsx
│   └── index.jsx
│
├── package.json
└── README.md


# Server Tier

Node.js REST API that bridges the React client and the Python core.

## Prerequisites

- Node.js ≥16  
- A running Core service (or ability to spawn Python)

## Setup

```bash
cd server
npm install
```

## Usage

```bash
npm start
```

