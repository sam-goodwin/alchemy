---
title: StaticVueFile
description: Learn how to create and manage static Vue (.vue) single-file components with proper formatting using Alchemy's FS provider.
---


The StaticVueFile resource creates [Vue.js](https://vuejs.org/) single-file component files (.vue) with template, script and style sections.

## Minimal Example

Creates a basic Vue component file with template, script and style sections.

```ts
import { StaticVueFile } from "alchemy/fs";

const button = await StaticVueFile("Button.vue", `
<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style>
.btn {
  padding: 0.5rem 1rem;
}
</style>
`);
```

## Custom Path

Creates a Vue component file at a specific path.

```ts
import { StaticVueFile } from "alchemy/fs";

const header = await StaticVueFile("Header", 
  "components/Header.vue",
  `<template>
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <slot></slot>
      </nav>
    </header>
  </template>

  <script>
  export default {
    props: {
      title: String
    }
  }
  </script>
`);
```
