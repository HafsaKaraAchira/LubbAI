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

# # Wait for server to be ready (simple check: wait 3s)
# sleep 3

# # Start React client in a new terminal window
# echo "Starting React client in a new terminal..."
# cd client
# npm install
# gnome-terminal -- bash -c "npm start; exec bash"
# cd ..

# # Wait for server process only
# wait $SERVER_PID
