---
title: AstroFile
description: Learn how to use Alchemy's AI provider to create, update, and manage Astro (.astro) files within your projects.
---

The AstroFile resource lets you generate [Astro](https://astro.build) components using AI models.

## Minimal Example

Create a simple Astro component with basic content.

```ts
import { AstroFile } from "alchemy/ai";

const header = await AstroFile("header", {
  path: "./src/components/Header.astro",
  prompt: "Generate an Astro header component with a logo and navigation menu",
});
```

## Generate Component with Data Types

Generate an Astro component that uses TypeScript types.

```ts
import { AstroFile } from "alchemy/ai";

const blogPost = await AstroFile("blog-post", {
  path: "./src/pages/blog/[slug].astro",
  prompt: await alchemy`
    Create an Astro blog post page that:
    - Uses getStaticPaths to generate pages from a CMS
    - Renders markdown content
    - Includes author info and publication date
    
    Use these types:
    ${alchemy.file("src/types/Blog.ts")}
  `,
  temperature: 0.2,
});
```

## Custom System Prompt

Use a custom system prompt to control the AI model's output.

````ts
import { AstroFile } from "alchemy/ai";

const layout = await AstroFile("main-layout", {
  path: "./src/layouts/MainLayout.astro",
  prompt: "Create a main layout with header, footer, and content slots",
  system:
    "You are an expert Astro developer. Create a single Astro layout file inside ```astro fences with no additional text. Follow Astro best practices and include proper typing in the frontmatter section.",
  model: {
    id: "claude-3-opus-20240229",
    provider: "anthropic",
  },
});
````
