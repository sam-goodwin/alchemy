---
title: Bundle
description: Learn how to use Alchemy's esbuild provider to bundle JavaScript and TypeScript code for your serverless functions and web applications.
---


The Bundle resource uses [esbuild](https://esbuild.github.io/) to bundle JavaScript and TypeScript files into optimized output.

## Minimal Example

Bundle a TypeScript file into ESM format:

```ts
import { Bundle } from "alchemy/esbuild";

const bundle = await Bundle("handler", {
  entryPoint: "src/handler.ts",
  format: "esm"
});
```

## Bundle with Output Directory

Specify an output directory and additional build options:

```ts
const bundle = await Bundle("api", {
  entryPoint: "src/api.ts", 
  outdir: ".build",
  format: "esm",
  platform: "node",
  target: "node18",
  minify: true,
  sourcemap: true
});
```

## Bundle with External Dependencies

Exclude packages from the bundle:

```ts
const bundle = await Bundle("app", {
  entryPoint: "src/app.ts",
  format: "esm",
  external: ["aws-sdk", "lodash"],
  platform: "node"
});
```

## Bundle for Browser

Create a browser-compatible IIFE bundle:

```ts
const bundle = await Bundle("web", {
  entryPoint: "src/main.ts",
  outfile: "dist/bundle.js",
  format: "iife", 
  platform: "browser",
  minify: true,
  sourcemap: "external"
});
```
