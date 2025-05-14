#!/bin/bash
# Launch server, then React client. Exits if any step fails.

set -e

# Start React client in a new terminal window
echo "Starting React client in a new terminal..."
cd client
npm install
npm start
# cd ..

# Wait for server process only
# wait $SERVER_PID
