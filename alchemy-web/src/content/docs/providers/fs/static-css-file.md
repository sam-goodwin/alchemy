---
title: StaticCSSFile
description: Learn how to create and manage static CSS (.css) files with proper formatting using Alchemy's FS provider.
---


The StaticCSSFile resource creates and manages static CSS files in your project using [Alchemy's File System](https://alchemy.run/docs/concepts/fs) capabilities.

## Minimal Example

Creates a basic CSS file with styles:

```ts
import { StaticCSSFile } from "alchemy/fs";

const styles = await StaticCSSFile("styles.css", `
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`);
```

## Custom Path

Creates a CSS file at a specific path:

```ts
import { StaticCSSFile } from "alchemy/fs";

const styles = await StaticCSSFile("main", 
  "src/styles/main.css",
  `.button {
    background-color: #0062ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }`
);
```
