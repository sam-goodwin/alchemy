---
title: YAMLFile
description: Learn how to use Alchemy's AI provider to create, update, and manage YAML (.yaml, .yml) files with schema validation.
---


The YAMLFile resource lets you generate [YAML](https://yaml.org/) files using AI models with optional schema validation.

## Minimal Example

Generate a simple YAML configuration file:

```ts
import { YAMLFile } from "alchemy/ai";

const config = await YAMLFile("config", {
  path: "./config.yml",
  prompt: "Generate a basic nginx configuration with server name and port"
});
```

## Schema Validation

Use a schema to validate and type the generated YAML:

```ts
import { YAMLFile } from "alchemy/ai";
import { type } from "arktype";

const configSchema = type({
  server: {
    name: "string",
    port: "number",
    ssl: "boolean"
  }
});

const config = await YAMLFile("config", {
  path: "./config.yml",
  schema: configSchema,
  prompt: "Generate an nginx configuration with SSL enabled"
});

// Type-safe access to the generated YAML
console.log(config.yaml.server.port); // number
```

## Custom System Prompt

Customize the AI's behavior with a system prompt:

```ts
import { YAMLFile } from "alchemy/ai";

const workflow = await YAMLFile("github-workflow", {
  path: "./.github/workflows/ci.yml",
  prompt: "Create a GitHub Actions workflow for a Node.js project with testing and deployment",
  system: "You are a DevOps expert specializing in GitHub Actions. Create a single YAML file with proper syntax.",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic"
  }
});
```
