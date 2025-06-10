---
title: StaticAstroFile
description: Learn how to create and manage static Astro (.astro) files with proper formatting using Alchemy's FS provider.
---


The StaticAstroFile resource lets you create [Astro](https://astro.build) component files with automatic formatting and directory creation.

## Minimal Example

Creates a basic Astro component file:

```ts
import { StaticAstroFile } from "alchemy/fs";

const component = await StaticAstroFile("Header.astro", `
---
const title = "Hello World";
---

<h1>{title}</h1>
`);
```

## Custom Path

Creates an Astro component in a specific directory:

```ts
import { StaticAstroFile } from "alchemy/fs";

const component = await StaticAstroFile("header", 
  "src/components/Header.astro",
  `---
  import Logo from '../components/Logo.astro';
  const navItems = ['Home', 'About', 'Contact'];
  ---
  
  <header>
    <Logo />
    <nav>
      {navItems.map(item => (
        <li><a href={item}>{item}</a></li>
      ))}
    </nav>
  </header>
`);
```

## Full Component Example

Creates a complete Astro component with styles:

```ts
import { StaticAstroFile } from "alchemy/fs";

const component = await StaticAstroFile("Header.astro", `
---
import Logo from '../components/Logo.astro';
const navItems = ['Home', 'About', 'Contact'];
---

<header class="header">
  <Logo />
  <nav>
    <ul>
      {navItems.map(item => (
        <li><a href={item}>{item}</a></li>
      ))}
    </ul>
  </nav>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
</style>
`);
```
