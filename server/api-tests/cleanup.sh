#!/bin/bash
# Usage: ./cleanup.sh /full/path/to/server/data/uuid.pdf

if [ -z "$1" ]; then
  echo "Usage: $0 /full/path/to/server/data/uuid.pdf"
  exit 1
fi

curl -X DELETE http://localhost:3001/api/cleanup \
  -H "Content-Type: application/json" \
  -d '{"path":"'$1'"}'
