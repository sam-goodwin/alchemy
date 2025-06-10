---
title: File
description: Learn how to create, read, update, and delete files using Alchemy's FS (File System) provider in your projects.
---


The File resource lets you create, update and delete files in the filesystem with automatic directory creation and cleanup.

## Minimal Example

Create a simple text file:

```ts
import { File } from "alchemy/fs";

const config = await File("config.txt", {
  path: "config.txt", 
  content: "some configuration data"
});
```

## Create File in Nested Directory

The File resource will automatically create parent directories as needed:

```ts
import { File } from "alchemy/fs";

const log = await File("logs/app.log", {
  path: "logs/app.log",
  content: "application log entry"
});
```

## Update File Path and Content

When updating a file's path, the old file is automatically removed:

```ts
import { File } from "alchemy/fs";

let file = await File("config.json", {
  path: "config.json",
  content: '{ "version": "1.0.0" }'
});

// Later, update path and content (old file will be removed)
file = await File("config.json", {
  path: "config/config.json", 
  content: '{ "version": "1.0.1" }'
});
```

## Static File Types

The fs service provides specialized file types for common formats:

```ts
import { StaticJsonFile, StaticTypeScriptFile, StaticYamlFile } from "alchemy/fs";

// Create formatted JSON file
const config = await StaticJsonFile("config.json", {
  api: { endpoint: "https://api.example.com" }
});

// Create formatted TypeScript file 
const component = await StaticTypeScriptFile("Component.ts", `
  export function Component() {
    return <div>Hello</div>
  }
`);

// Create YAML file
const deployment = await StaticYamlFile("deploy.yaml", {
  service: { replicas: 3 }
});
```
