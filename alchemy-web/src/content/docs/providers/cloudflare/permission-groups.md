---
title: PermissionGroups
description: Learn how to retrieve Cloudflare API Permission Groups using Alchemy to help construct API token policies.
---


Lists all permission groups available for a Cloudflare account and returns a typed map of permission names to their IDs. Used when creating API tokens for Cloudflare services like R2.

## Minimal Example

Get all permission groups including those for R2:

```ts
import { PermissionGroups } from "alchemy/cloudflare";

const permissions = await PermissionGroups("cloudflare-permissions");
```

## Create API Token with Permissions

Use with AccountApiToken to create a token with proper permissions:

```ts
import { PermissionGroups, AccountApiToken } from "alchemy/cloudflare";

const permissions = await PermissionGroups("cloudflare-permissions");

const token = await AccountApiToken("r2-token", {
  name: "R2 Read-Only Token", 
  policies: [{
    effect: "allow",
    resources: {
      "com.cloudflare.edge.r2.bucket.abc123_default_my-bucket": "*"
    },
    permissionGroups: [{
      id: permissions["Workers R2 Storage Bucket Item Read"].id
    }]
  }]
});
```
