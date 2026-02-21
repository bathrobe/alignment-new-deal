#!/bin/bash
# Compile all .ink files in src/story/ to .json

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
INKLECATE="$PROJECT_ROOT/node_modules/inklecate-bin/bin/mac/inklecate"

STORY_DIR="$PROJECT_ROOT/src/story"

# Find all .ink files and compile them
for ink_file in "$STORY_DIR"/*.ink; do
  if [ -f "$ink_file" ]; then
    basename="${ink_file%.ink}"
    output_file="${basename}.json"

    echo "Compiling: $(basename "$ink_file")"
    "$INKLECATE" -o "$output_file" "$ink_file"
    echo "  → $(basename "$output_file")"
  fi
done

echo "Done!"
