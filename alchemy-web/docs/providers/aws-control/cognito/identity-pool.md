---
title: Managing AWS Cognito IdentityPools with Alchemy
description: Learn how to create, update, and manage AWS Cognito IdentityPools using Alchemy Cloud Control.
---

# IdentityPool

The IdentityPool resource allows you to manage [AWS Cognito IdentityPools](https://docs.aws.amazon.com/cognito/latest/userguide/) which provide temporary AWS credentials to users authenticated by social identity providers or your own identity system.

## Minimal Example

Create a basic IdentityPool with minimal required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicIdentityPool = await AWS.Cognito.IdentityPool("BasicIdentityPool", {
  AllowUnauthenticatedIdentities: true,
  IdentityPoolName: "MyIdentityPool",
  SupportedLoginProviders: {
    "graph.facebook.com": "my-facebook-app-id"
  }
});
```

## Advanced Configuration

Configure an IdentityPool with advanced features such as Cognito Events and Push Sync.

```ts
const AdvancedIdentityPool = await AWS.Cognito.IdentityPool("AdvancedIdentityPool", {
  AllowUnauthenticatedIdentities: false,
  IdentityPoolName: "MyAdvancedIdentityPool",
  CognitoEvents: {
    "PreSignUp": "arn:aws:lambda:us-east-1:123456789012:function:PreSignUpFunction"
  },
  PushSync: {
    ApplicationArns: ["arn:aws:sns:us-east-1:123456789012:app/GCM/MyApp"],
    RoleArn: "arn:aws:iam::123456789012:role/Cognito_MyApp"
  }
});
```

## Using Developer Provider Name

Create an IdentityPool with a developer provider name for custom authentication.

```ts
const DeveloperIdentityPool = await AWS.Cognito.IdentityPool("DeveloperIdentityPool", {
  AllowUnauthenticatedIdentities: true,
  IdentityPoolName: "MyDeveloperIdentityPool",
  DeveloperProviderName: "my-developer-provider"
});
```

## Adding Tags

Configure an IdentityPool with tags for better resource management.

```ts
const TaggedIdentityPool = await AWS.Cognito.IdentityPool("TaggedIdentityPool", {
  AllowUnauthenticatedIdentities: true,
  IdentityPoolName: "MyTaggedIdentityPool",
  IdentityPoolTags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Development" }
  ]
});
```