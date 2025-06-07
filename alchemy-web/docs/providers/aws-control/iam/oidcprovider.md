---
title: Managing AWS IAM OIDCProviders with Alchemy
description: Learn how to create, update, and manage AWS IAM OIDCProviders using Alchemy Cloud Control.
---

# OIDCProvider

The OIDCProvider resource allows you to manage [AWS IAM OIDCProviders](https://docs.aws.amazon.com/iam/latest/userguide/) for authentication with OpenID Connect. This resource enables you to link external identity providers with AWS IAM roles.

## Minimal Example

Create a basic OIDCProvider with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicOIDCProvider = await AWS.IAM.OIDCProvider("BasicOIDCProvider", {
  Url: "https://oidc.example.com",
  ClientIdList: ["client-id-1", "client-id-2"],
  ThumbprintList: ["abc123def456ghi789jkl012mno345pqrs678tuv"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Identity" }
  ]
});
```

## Advanced Configuration

Configure an OIDCProvider with additional options, such as specific tags and a thumbprint list.

```ts
const AdvancedOIDCProvider = await AWS.IAM.OIDCProvider("AdvancedOIDCProvider", {
  Url: "https://secure.oidc.example.com",
  ClientIdList: ["advanced-client-id-1", "advanced-client-id-2"],
  ThumbprintList: ["def456ghi789jkl012mno345pqrs678tuvabc123"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" },
    { Key: "Project", Value: "OIDCIntegration" }
  ]
});
```

## Using Existing OIDC Providers

You can adopt an existing OIDCProvider instead of creating a new one.

```ts
const AdoptedOIDCProvider = await AWS.IAM.OIDCProvider("AdoptedOIDCProvider", {
  Url: "https://oidc.existing-provider.com",
  ClientIdList: ["existing-client-id"],
  ThumbprintList: ["123abc456def789ghi012jkl345mno678pqr"],
  adopt: true
});
```