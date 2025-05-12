#!/bin/bash
# Usage: ./upload.sh /full/path/to/your.pdf

if [ -z "$1" ]; then
  echo "Usage: $0 /full/path/to/your.pdf"
  exit 1
fi

curl -X POST http://localhost:3001/api/upload \
  -F "pdf=@$1"
