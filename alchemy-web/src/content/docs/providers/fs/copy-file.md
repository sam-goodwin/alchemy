---
title: CopyFile
description: Learn how to copy files and directories within your project using Alchemy's FS (File System) provider.
---


The CopyFile resource lets you copy files from one location to another in the filesystem.

## Minimal Example

Copy a file to a new location:

```ts
import { CopyFile } from "alchemy/fs";

const copiedFile = await CopyFile("config-copy", {
  src: "config.json", 
  dest: "backup/config.json"
});
```

## Copy Without Overwriting

Copy a file only if the destination doesn't already exist:

```ts
import { CopyFile } from "alchemy/fs";

const safeCopy = await CopyFile("safe-copy", {
  src: "data.json",
  dest: "backup/data.json", 
  overwrite: false
});
```
