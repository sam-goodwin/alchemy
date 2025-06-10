---
title: StaticJsonFile
description: Learn how to create and manage static JSON (.json) files with proper formatting using Alchemy's FS provider.
---


The StaticJsonFile resource creates formatted JSON files using [Prettier](https://prettier.io/) for consistent formatting.

## Minimal Example

Creates a simple JSON configuration file.

```ts
import { StaticJsonFile } from "alchemy/fs";

const config = await StaticJsonFile("config.json", {
  name: "my-app",
  version: "1.0.0"
});
```

## Custom Path

Creates a JSON file at a specific path.

```ts
import { StaticJsonFile } from "alchemy/fs";

const config = await StaticJsonFile("config", "config/settings.json", {
  api: {
    endpoint: "https://api.example.com",
    version: "v1"
  },
  features: ["auth", "logging"]
});
```

## Complex Configuration

Creates a JSON file with nested configuration.

```ts
import { StaticJsonFile } from "alchemy/fs";

const config = await StaticJsonFile("app-config.json", {
  app: {
    name: "my-app",
    version: "1.0.0",
    settings: {
      theme: "dark",
      notifications: true
    }
  },
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      user: "admin",
      password: "secret"
    }
  },
  features: [
    "authentication",
    "authorization",
    "logging"
  ]
});
```
