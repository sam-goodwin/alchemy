---
title: VueFile
description: Learn how to use Alchemy's AI provider to create, update, and manage Vue (.vue) single-file components.
---


The VueFile resource lets you generate [Vue.js](https://vuejs.org/) single-file components using AI models.

## Minimal Example

Creates a basic Vue component file with the specified content.

```ts
import { VueFile } from "alchemy/ai";

const button = await VueFile("button", {
  path: "./src/components/Button.vue",
  prompt: "Generate a reusable button component with primary and secondary variants"
});
```

## Generate Component with Context

Uses existing files as reference to generate a component that matches your codebase style.

```ts
import { VueFile } from "alchemy/ai";

const userCard = await VueFile("user-card", {
  path: "./src/components/UserCard.vue",
  prompt: await alchemy`
    Create a UserCard component that follows the styling from:
    ${alchemy.file("src/components/Card.vue")}
    
    Using the user type from:
    ${alchemy.file("src/types/User.ts")}
  `,
  temperature: 0.2
});
```

## Custom System Prompt

Provides specific instructions to the AI model about component generation.

```ts
import { VueFile } from "alchemy/ai";

const form = await VueFile("registration-form", {
  path: "./src/components/RegistrationForm.vue",
  prompt: "Generate a registration form with email, password validation and submit handler",
  system: "You are an expert Vue developer specializing in form components. Create a single Vue component inside ```vue fences with no additional text.",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic"
  }
});
```
