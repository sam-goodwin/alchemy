---
title: StaticYamlFile
description: Learn how to create and manage static YAML (.yaml, .yml) files with proper formatting using Alchemy's FS provider.
---


The StaticYamlFile resource creates YAML files with formatted content using the [YAML](https://yaml.org/) format.

## Minimal Example

Creates a simple YAML configuration file.

```ts
import { StaticYamlFile } from "alchemy/fs";

const config = await StaticYamlFile("config.yaml", {
  server: {
    host: "localhost",
    port: 3000
  }
});
```

## Nested Configuration

Creates a YAML file with nested configuration objects.

```ts
import { StaticYamlFile } from "alchemy/fs";

const config = await StaticYamlFile("config.yaml", {
  server: {
    host: "localhost",
    port: 3000
  },
  database: {
    url: "postgresql://localhost:5432/db",
    pool: {
      min: 1, 
      max: 10
    }
  }
});
```

## Custom Path

Creates a YAML file at a specific path.

```ts
import { StaticYamlFile } from "alchemy/fs";

const config = await StaticYamlFile("config", "config/app.yaml", {
  environment: "production",
  features: ["auth", "api", "storage"]
});
```
