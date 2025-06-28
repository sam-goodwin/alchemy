---
title: Secret
description: Learn how to add individual secrets to Cloudflare Secrets Store for fine-grained secret management.
---

A [Cloudflare Secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/) creates an individual secret stored in a [Secrets Store](./secrets-store.md).

## Basic Usage

```ts
import { Secret } from "alchemy/cloudflare";

const mySecret = await Secret("my-secret", {
  value: alchemy.secret(process.env.MY_SECRET),
});
```

:::tip
This will auto-create a Secrets Store, `default_secrets_store` if one does not exist. Cloudflare's UI does the same.
:::

Then bind the Secret to your Worker:

```ts
export const worker = await Worker("worker", {
  bindings: {
    MY_SECRET: mySecret,
  },
});
```

And use it at runtime:

```ts
import type { worker } from "../alchemy.run.ts";

export default {
  async fetch(request, env: typeof worker.Env) {
    const secret = await env.MY_SECRET.get();

    // ..
  },
};
```

## Custom Secrets Store

By default, the `default_secrets_store` will be used, but you can also specify your own store.

```ts
import { Secret, SecretsStore } from "alchemy/cloudflare";

const store = await SecretsStore("my-store");

const mySecret = await Secret("my-secret", {
  store,
  value: alchemy.secret(process.env.MY_SECRET),
});
```

:::caution
During the Beta, Cloudflare does not support more than one [SecretsStore](./secrets-store.md) per account, so you should instead rely on the default behavior until then.
:::
