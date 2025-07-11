import esbuild from "esbuild";
import path from "node:path";

console.log(`Building CLI...`)

await esbuild.build({
  entryPoints: ["bin/alchemy.ts"],
  absWorkingDir: path.join(__dirname, ".."),
  outfile: "bin/alchemy.mjs",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  external: ["node:*"],
  banner: {
    js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);",
  },
  mainFields: ["module", "main"],
});