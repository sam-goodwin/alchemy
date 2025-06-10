---
title: JSONFile
description: Learn how to use Alchemy's AI provider to create, update, and manage JSON (.json) files with schema validation.
---


The JSONFile resource lets you generate JSON files using AI models with optional schema validation.

## Minimal Example

Generate a simple JSON configuration file:

```ts
import { JSONFile } from "alchemy/ai";

const config = await JSONFile("app-config", {
  path: "./config/app.json",
  prompt: "Generate a configuration for a web application with server settings, database connection details, and logging configuration"
});
```

## Schema Validation

Use ArkType schemas to validate and type the generated JSON:

```ts
import { JSONFile } from "alchemy/ai";
import { type } from "arktype";

const userSchema = type({
  users: [{
    id: "string",
    name: "string", 
    email: "string",
    role: "'admin' | 'user' | 'guest'",
    permissions: "string[]"
  }]
});

const userData = await JSONFile("user-data", {
  path: "./data/users.json",
  schema: userSchema,
  prompt: "Generate sample user data with various roles and permissions",
  temperature: 0.2
});

// Type-safe access
console.log(userData.json.users[0].role); // Typed as 'admin' | 'user' | 'guest'
```

## Custom Formatting

Control JSON formatting with pretty-printing options:

```ts
import { JSONFile } from "alchemy/ai";

const apiMock = await JSONFile("api-mock", {
  path: "./mocks/products.json",
  prompt: "Create mock data for a product catalog API with 10 products",
  pretty: true,
  indent: 4
});
```
