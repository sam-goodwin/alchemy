#!/usr/bin/env sh

WATCH_FLAG=""
for arg in "$@"; do
  if [ "$arg" = "--watch" ]; then
    WATCH_FLAG="--watch"
    break
  fi
done

esbuild bin/alchemy.ts \
  --bundle \
  --platform=node \
  --target=node20 \
  --outfile=bin/alchemy.mjs \
  --format=esm \
  --external:node:* \
  --main-fields=module,main \
  --banner:js="import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" \
  $WATCH_FLAG
