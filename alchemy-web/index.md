---
layout: home
title: Alchemy
description: TypeScript-native Infrastructure-as-Code without the dead weight. Create, Update, Delete resources with pure async TypeScript.

# Custom hero component instead of the default hero
---

<CodeSnippetHero 
  name="Alchemy" 
  text="Create, Update, Delete" 
  tagline="Infrastructure-as-Code without the dead weight. Written in pure TypeScript, optimized for Gen-AI."
  :actions="[
    { theme: 'brand', text: 'Get Started', link: '/docs/getting-started' },
    { theme: 'alt', text: 'Star on GitHub ⭐️', link: 'https://github.com/sam-goodwin/alchemy' }
  ]">
<template #code>

```typescript
const database = await D1Database("my-app-db", {
  name: "my-application-db"
});

const site = await Worker("website", {
  name: "my-app",
  bindings: {
    DB: database
  }
});

const product = await Product("pro-plan", {
  name: "Pro Plan",
  description: "Professional subscription tier"
});
```

</template>
</CodeSnippetHero>
