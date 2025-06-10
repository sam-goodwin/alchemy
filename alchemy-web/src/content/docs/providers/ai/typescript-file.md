---
title: TypeScriptFile
description: Learn how to use Alchemy's AI provider to create, update, and manage TypeScript (.ts, .tsx) files within your projects.
---


The TypeScriptFile resource lets you generate TypeScript code files using AI models like [OpenAI GPT-4](https://platform.openai.com/docs/models/gpt-4) or [Anthropic Claude](https://www.anthropic.com/claude).

## Minimal Example

Generate a simple TypeScript utility file:

```ts
import { TypeScriptFile } from "alchemy/ai";

const utils = await TypeScriptFile("string-utils", {
  path: "./src/utils/string-utils.ts",
  prompt: "Generate TypeScript utility functions for string manipulation (capitalize, truncate, camelCase, kebabCase)"
});
```

## Generate with Context

Use alchemy template literals to include file context:

```ts
import { TypeScriptFile } from "alchemy/ai";

const service = await TypeScriptFile("user-service", {
  path: "./src/services/UserService.ts",
  prompt: await alchemy`
    Create a UserService class using the types from:
    ${alchemy.file("src/types/User.ts")}
  `,
  temperature: 0.2
});
```

## Custom Formatting

Configure Prettier formatting options:

```ts
import { TypeScriptFile } from "alchemy/ai";

const component = await TypeScriptFile("button", {
  path: "./src/components/Button.tsx",
  prompt: "Generate a reusable React button component with variants and sizes",
  prettierConfig: {
    semi: false,
    singleQuote: true,
    printWidth: 120
  }
});
```

## Custom Model

Use a specific AI model and provider:

```ts
import { TypeScriptFile } from "alchemy/ai";

const hook = await TypeScriptFile("use-form", {
  path: "./src/hooks/useForm.ts", 
  prompt: "Create a React form hook with validation and submission handling",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic"
  }
});
```
