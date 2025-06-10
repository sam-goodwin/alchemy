---
title: AccountId
description: Learn how to retrieve your Cloudflare Account ID programmatically using Alchemy for use in other resource configurations.
---

The AccountId resource retrieves a Cloudflare [Account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/) for use with other Cloudflare resources.

## Minimal Example

Get the account ID from environment variables or API token:

```ts
import { AccountId } from "alchemy/cloudflare";

const accountId = await AccountId("my-account");
```

## With Explicit API Key

Provide an API key and email directly:

```ts 
import { AccountId } from "alchemy/cloudflare";

const accountId = await AccountId("my-account", {
  apiKey: alchemy.secret(process.env.CF_API_KEY),
  email: "user@example.com"
});
```

## Bind to a Worker

Use the account ID with a Worker:

```ts
import { Worker, AccountId } from "alchemy/cloudflare";

const accountId = await AccountId("my-account");

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  accountId: accountId
});
```