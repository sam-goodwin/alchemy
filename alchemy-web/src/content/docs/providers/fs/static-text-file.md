---
title: StaticTextFile
description: Learn how to create and manage static text (.txt) files using Alchemy's FS provider.
---


The StaticTextFile resource creates and manages plain text files in the filesystem using [Alchemy's File System](https://alchemy.run/docs/concepts/fs) capabilities.

## Minimal Example

Creates a simple text file with content:

```ts
import { StaticTextFile } from "alchemy/fs";

const readme = await StaticTextFile("README.md", 
  "# Project Name\n\nProject description goes here."
);
```

## Custom Path

Creates a text file at a specific path:

```ts
import { StaticTextFile } from "alchemy/fs";

const changelog = await StaticTextFile("CHANGELOG.md",
  "docs/CHANGELOG.md",
  "# Changelog\n\n## v1.0.0\n\n- Initial release"
);
```

## Nested Directory

Creates a text file in a nested directory structure (directories are created automatically):

```ts
import { StaticTextFile } from "alchemy/fs";

const log = await StaticTextFile("app.log",
  "logs/app/app.log", 
  "Application started successfully"
);
```
