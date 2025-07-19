---
title: SecretsStore
description: Learn how to add individual secrets to Cloudflare Secrets Store for fine-grained secret management.
---

A [Cloudflare Secret Store](https://developers.cloudflare.com/secrets-store/) is a secure way to manage and distribute Secrets in a centralized location.

## Basic Usage

```ts
import { Secret, SecretsStore } from "alchemy/cloudflare";

const store = await SecretsStore("my-store");
```

Now, you can create a [Secret](/providers/cloudflare/secret) in this Store:

```ts
await Secret("my-secret", {
  store,
  value: process.env.MY_SECRET,
});
```

:::caution
While Cloudflare's API supports creating, updating and deleting Secrets Store resources, it is still in Beta and only allows maximum one per account and the UI does not support displaying more than 1. You should not provide a store and instead rely on [Secret](/providers/cloudflare/secret) to auto-create and use the `default_secrets_store`.
:::
