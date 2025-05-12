# LubbAI — PDF Semantic Search & Summarization App

**LubbAI** is a semantic search and summarization tool for PDF documents.  
It extracts the core meaning (*lubb*) of content using AI models (OpenAI/Gemini).

---

A three-tier web application that lets users upload a PDF, search its content semantically, and get concise summaries using OpenAI or Google Gemini (the current version).

## Architecture

- **Client** (`client/`): React frontend  
- **Server** (`server/`): Node.js REST API  
- **Core** (`core/`): Python AI logic (PDF processing, embeddings, search, summarization)

LubbAI/
├── core/      # Python AI logic: extract, chunk, embed, search, summarize
├── server/    # Node.js REST API: upload, search, summarize endpoints
├── client/    # React app: file upload, search bar, results, summary view
└── README.md  # This file


## Prerequisites

- Node.js ≥16  
- Python ≥3.8  
- `pip` and virtualenv

## Setup

1. **Clone repository**  
   ```bash
   git clone https://github.com/HafsaKaraAchira/LubbAI.git
   cd LubbAI

### Core (Python)
cd core
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

### Server (Node)
cd ../server
npm install

### Client (React)
cd ../client
npm install


## Configure environment variables
Create a .env in each tier as needed—see tier README files.

## Running the App

From project root, open three terminals:

### Core

cd core
source venv/bin/activate
python main.py  # Optional: run tests or demo script

### Server

cd server
npm start

### Client

cd client
npm start

Then open http://localhost:3000 in your browser.
