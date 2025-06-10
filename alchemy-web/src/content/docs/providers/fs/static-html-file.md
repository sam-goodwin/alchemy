---
title: StaticHTMLFile
description: Learn how to create and manage static HTML (.html) files with proper formatting using Alchemy's FS provider.
---


The StaticHTMLFile resource creates static HTML files with automatic directory creation and cleanup.

## Minimal Example

Creates a basic HTML file:

```ts
import { StaticHTMLFile } from "alchemy/fs";

const page = await StaticHTMLFile("index.html", `
  <!DOCTYPE html>
  <html>
    <head><title>My Page</title></head>
    <body>Hello World</body>
  </html>
`);
```

## Custom Path

Creates an HTML file at a specific path:

```ts
import { StaticHTMLFile } from "alchemy/fs";

const page = await StaticHTMLFile("home", "pages/index.html", `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Home</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>Welcome</h1>
      <p>This is my homepage.</p>
    </body>
  </html>
`);
```
