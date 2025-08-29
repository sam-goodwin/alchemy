import { defineConfig } from "tsdown";
import pkg from "./package.json";

const entry = Object.values(pkg.exports).map((e) => e.bun);

export default defineConfig([
  {
    entry: ["bin/alchemy.ts"],
    format: ["esm"],
    clean: false,
    shims: true,
    dts: false,
    outDir: "bin",
    outputOptions: {
      inlineDynamicImports: true,
      banner: "#!/usr/bin/env node",
    },
    noExternal: ["execa", "open", "env-paths"],
  },
  {
    entry,
    format: ["esm", "cjs"],
    clean: false, // done in build script to avoid overwriting tsc output
    shims: true,
    unbundle: true,
    dts: false, // generated using tsc to avoid rust memory issues
    skipNodeModulesBundle: true,
    external: [/^bun:/],
    copy: ["src/llms.cloudflare.txt"],
  },
]);
