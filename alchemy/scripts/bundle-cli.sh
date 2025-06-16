#!/usr/bin/env sh

esbuild bin/alchemy.ts \
  --bundle \
  --platform=node \
  --target=node20 \
  --outfile=bin/alchemy.mjs \
  --format=esm \
  --external:node:* \
  --main-fields=module,main \
  --banner:js="import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);"