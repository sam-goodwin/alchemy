---
title: HTMLFile
description: Learn how to use Alchemy's AI provider to create, update, and manage HTML (.html) files within your projects.
---


The HTMLFile resource lets you generate HTML files using AI models like [OpenAI GPT-4](https://platform.openai.com/docs/models/gpt-4) or [Anthropic Claude](https://www.anthropic.com/claude).

## Minimal Example

Creates a basic HTML file with AI-generated content.

```ts
import { HTMLFile } from "alchemy/ai";

const page = await HTMLFile("landing", {
  path: "./public/index.html",
  prompt: "Generate a simple landing page with a hero section, features list, and contact form"
});
```

## Generate with Context

Uses file context to generate HTML that matches existing code.

```ts
import { HTMLFile } from "alchemy/ai";

const component = await HTMLFile("card", {
  path: "./components/card.html", 
  prompt: await alchemy`
    Create an HTML card component that matches the style of:
    ${alchemy.file("components/button.html")}
  `
});
```

## Custom Model Configuration

Specifies a custom model and temperature for more controlled generation.

```ts
import { HTMLFile } from "alchemy/ai";

const form = await HTMLFile("contact-form", {
  path: "./components/form.html",
  prompt: "Generate an accessible contact form with validation",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic"
  },
  temperature: 0.2
});
```
