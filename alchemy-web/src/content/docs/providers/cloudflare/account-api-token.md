---
title: AccountApiToken
description: Learn how to create and manage Cloudflare Account API Tokens using Alchemy for secure access to the Cloudflare API.
---


Creates a [Cloudflare API Token](https://developers.cloudflare.com/api/tokens/) with specified permissions and access controls.

## Minimal Example

Create a basic API token with read-only permissions.

```ts
import { AccountApiToken } from "alchemy/cloudflare";

const token = await AccountApiToken("readonly-token", {
  name: "Readonly Zone Token",
  policies: [{
    effect: "allow",
    permissionGroups: ["Zone Read", "Analytics Read"],
    resources: {
      "com.cloudflare.api.account.zone.*": "*"
    }
  }]
});
```

## With Time and IP Restrictions

Create a token with time-based and IP address restrictions.

```ts
import { AccountApiToken } from "alchemy/cloudflare";

const restrictedToken = await AccountApiToken("restricted-token", {
  name: "Restricted Access Token", 
  policies: [{
    effect: "allow",
    permissionGroups: ["Worker Routes Edit"],
    resources: {
      "com.cloudflare.api.account.worker.route.*": "*"
    }
  }],
  notBefore: "2024-01-01T00:00:00Z",
  expiresOn: "2024-12-31T23:59:59Z",
  condition: {
    requestIp: {
      in: ["192.168.1.0/24"],
      notIn: ["192.168.1.100/32"]
    }
  }
});
```

## R2 Storage Access Token

Create a token with R2 storage write permissions.

```ts
import { AccountApiToken } from "alchemy/cloudflare";

const storageToken = await AccountApiToken("account-access-token", {
  name: "alchemy-account-access-token",
  policies: [
    {
      effect: "allow",
      permissionGroups: ["Workers R2 Storage Write"],
      resources: {
        "com.cloudflare.api.account": "*",
      },
    },
  ],
});
```

## Bind to a Worker

Use the token in a Worker binding.

```ts
import { Worker, AccountApiToken } from "alchemy/cloudflare";

const token = await AccountApiToken("api-token", {
  name: "Worker API Token",
  policies: [{
    effect: "allow", 
    permissionGroups: ["Zone Read"],
    resources: {
      "com.cloudflare.api.account.zone.*": "*" 
    }
  }]
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    API_TOKEN: token
  }
});
```
