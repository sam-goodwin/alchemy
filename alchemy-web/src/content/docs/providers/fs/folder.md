---
title: Folder
description: Learn how to create, manage, and delete folders (directories) using Alchemy's FS (File System) provider.
---


The Folder resource creates and manages directories in the filesystem with automatic parent directory creation and cleanup on deletion.

## Minimal Example

Create a directory using the ID as the path:

```ts
import { Folder } from "alchemy/fs";

const dir = await Folder("uploads");
```

## Custom Path

Create a directory with an explicit path:

```ts
import { Folder } from "alchemy/fs";

const logs = await Folder("logs", {
  path: "var/log/app"
});
```

## Recursive Creation

Create nested directories with recursive creation enabled (default):

```ts
import { Folder } from "alchemy/fs";

const nested = await Folder("nested", {
  path: "path/to/nested/dir",
  recursive: true 
});
```

## Cleanup Options

Control folder deletion behavior:

```ts
import { Folder } from "alchemy/fs";

const temp = await Folder("temp", {
  path: "temp",
  delete: true, // Delete on destroy (default)
  clean: true // Remove contents on delete
});
```
