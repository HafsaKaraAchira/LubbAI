#!/bin/bash
# Launch server, then React client. Exits if any step fails.

set -e

# Start server
cd server
npm install
echo "Starting server..."
npm start &
SERVER_PID=$!
# cd ..
