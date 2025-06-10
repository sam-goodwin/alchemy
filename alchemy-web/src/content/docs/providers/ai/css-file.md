---
title: CSS File
description: Learn how to use Alchemy's AI provider to create, update, and manage CSS (.css) files within your projects.
---


The CSSFile resource lets you generate CSS files using AI models like [OpenAI GPT-4](https://platform.openai.com/docs/models/gpt-4) or [Anthropic Claude](https://www.anthropic.com/claude).

## Minimal Example

Generate a simple CSS file with basic styles.

```ts
import { CSSFile } from "alchemy/ai";

const styles = await CSSFile("main-styles", {
  path: "./public/css/main.css",
  prompt: "Generate modern CSS styles for a company website with primary color #0062ff and responsive layout"
});
```

## Generate CSS Based on HTML

Generate CSS styles by referencing existing HTML components.

```ts
import { CSSFile } from "alchemy/ai";

const componentStyles = await CSSFile("component-styles", {
  path: "./src/styles/component.css", 
  prompt: await alchemy`
    Create CSS styles for this HTML component:
    ${alchemy.file("src/components/Card.html")}
    
    Include hover effects and dark/light theme support
  `,
  temperature: 0.2
});
```

## Generate CSS Animations

Generate reusable CSS animations with a custom system prompt.

```ts
import { CSSFile } from "alchemy/ai";

const animations = await CSSFile("animations", {
  path: "./src/styles/animations.css",
  prompt: "Create CSS animations for fade, slide, pulse, bounce, scale and rotate effects",
  system: "You are an expert CSS animator. Create animations with vendor prefixes for browser compatibility.",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic"
  }
});
```
