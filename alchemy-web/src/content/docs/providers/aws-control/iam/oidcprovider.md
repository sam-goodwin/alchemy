---
title: OIDCProvider
description: Learn how to create, update, and manage AWS IAM OIDCProviders using Alchemy Cloud Control.
---


The OIDCProvider resource allows you to create and manage [AWS IAM OIDCProviders](https://docs.aws.amazon.com/iam/latest/userguide/), enabling identity federation and access management for applications that use OpenID Connect (OIDC) authentication.

## Minimal Example

Create a basic OIDC provider with required properties and a couple of optional settings:

```ts
import AWS from "alchemy/aws/control";

const oidcProvider = await AWS.IAM.OIDCProvider("myOIDCProvider", {
  Url: "https://example-oidc-provider.com",
  ClientIdList: ["myClientId"],
  ThumbprintList: ["abcd1234abcd1234abcd1234abcd1234abcd1234"] // Example thumbprint
});
```

## Advanced Configuration

Configure an OIDC provider with additional tags and multiple client IDs:

```ts
const advancedOIDCProvider = await AWS.IAM.OIDCProvider("advancedOIDCProvider", {
  Url: "https://advanced-oidc-provider.com",
  ClientIdList: ["myClientId1", "myClientId2"],
  ThumbprintList: ["abcd1234abcd1234abcd1234abcd1234abcd1234"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IdentityManagement" }
  ]
});
```

## Adoption of Existing OIDC Provider

If an OIDC provider already exists and you want to adopt it instead of creating a new one, you can set the `adopt` property to true:

```ts
const existingOIDCProvider = await AWS.IAM.OIDCProvider("existingOIDCProvider", {
  Url: "https://existing-oidc-provider.com",
  ClientIdList: ["existingClientId"],
  ThumbprintList: ["abcd1234abcd1234abcd1234abcd1234abcd1234"],
  adopt: true
});
```

## Updating an OIDC Provider

To update an existing OIDC provider, you can modify its properties. Here’s how to add a new client ID:

```ts
const updatedOIDCProvider = await AWS.IAM.OIDCProvider("updatedOIDCProvider", {
  Url: "https://updated-oidc-provider.com",
  ClientIdList: ["myClientId", "newClientId"], // Adding a new client ID
  ThumbprintList: ["abcd1234abcd1234abcd1234abcd1234abcd1234"]
});
```
