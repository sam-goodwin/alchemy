#!/usr/bin/env pwsh

$WatchFlag = ""
foreach ($arg in $args) {
    if ($arg -eq "--watch") {
        $WatchFlag = "--watch"
        break
    }
}

$esbuildArgs = @(
    "bin/alchemy.ts",
    "--bundle",
    "--platform=node",
    "--target=node20",
    "--outfile=bin/alchemy.mjs",
    "--format=esm",
    "--external:node:*",
    "--main-fields=module,main",
    "--banner:js=import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);"
)

if ($WatchFlag) {
    $esbuildArgs += $WatchFlag
}

& esbuild $esbuildArgs 