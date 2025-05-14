#!/bin/bash

# This script clears all files in the _data folder

data_folder="./_data"

# Check if the directory exists
if [ -d "$data_folder" ]; then
    echo "Clearing files in $data_folder"
    count=$(ls -1 "$data_folder" | wc -l)
    rm -rf "$data_folder"/*
    
    echo "Removed $count files."
else
    echo "Directory $data_folder does not exist."
fi
