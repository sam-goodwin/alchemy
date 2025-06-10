---
title: Document
description: Learn how to use Alchemy's AI provider to generate document content (like markdown, text) based on prompts.
---


The Document resource lets you generate markdown documentation using [AI models](https://platform.openai.com/docs/models) like GPT-4 and Claude.

## Minimal Example

Creates a markdown document from a prompt.

```ts
import { Document } from "alchemy/ai";

const docs = await Document("api-docs", {
  title: "API Documentation", 
  prompt: "Generate API documentation for a REST API"
});

console.log(docs.content); // Generated markdown content
```

## Generate Documentation from Source Files

Uses alchemy template literals to include file context in the prompt.

```ts
import { Document } from "alchemy/ai";

const apiDocs = await Document("api-docs", {
  title: "API Documentation",
  path: "./docs/api.md",
  prompt: await alchemy`
    Generate API documentation based on these source files:
    ${alchemy.file("src/api.ts")}
    ${alchemy.file("src/types.ts")}
  `,
  model: {
    id: "gpt-4o",
    provider: "openai"
  }
});
```

## Iterative Document Generation

Uses message history for back-and-forth document generation.

```ts
import { Document } from "alchemy/ai";

const apiDocs = await Document("api-docs", {
  title: "API Documentation",
  messages: [
    { role: "user", content: "Create API documentation for these files" },
    { role: "assistant", content: "I'll help you create API documentation. Please provide the files." },
    { role: "user", content: "Here are the files: [file contents]" }
  ],
  system: "You are a technical documentation writer. Generate clear and concise API documentation.",
  temperature: 0.2
});
```
