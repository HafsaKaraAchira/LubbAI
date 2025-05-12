#!/bin/bash
# Usage: ./search.sh <filename> [query]

if [ -z "$1" ]; then
  echo "Usage: $0 <filename> [query]"
  exit 1
fi

if [ -z "$2" ]; then
  curl -X POST http://localhost:3001/api/search \
    -H "Content-Type: application/json" \
    -d '{"path":"'$1'"}'
else
  curl -X POST http://localhost:3001/api/search \
    -H "Content-Type: application/json" \
    -d '{"path":"'$1'", "query":"'$2'"}'
fi
