---
title: Managing AWS Cognito IdentityPoolPrincipalTags with Alchemy
description: Learn how to create, update, and manage AWS Cognito IdentityPoolPrincipalTags using Alchemy Cloud Control.
---

# IdentityPoolPrincipalTag

The IdentityPoolPrincipalTag resource allows you to manage principal tags for AWS Cognito Identity Pools. This resource helps in assigning tags to users based on their identity provider attributes, aiding in user management and access control. For more information, refer to the [AWS Cognito IdentityPoolPrincipalTags documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

This example demonstrates how to create an IdentityPoolPrincipalTag with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const IdentityPoolTag = await AWS.Cognito.IdentityPoolPrincipalTag("UserPrincipalTag", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  IdentityProviderName: "Cognito",
  PrincipalTags: [{ Key: "Role", Value: "Admin" }],
  UseDefaults: true
});
```

## Advanced Configuration

In this example, we configure an IdentityPoolPrincipalTag with multiple principal tags to manage different roles effectively.

```ts
const AdvancedIdentityPoolTag = await AWS.Cognito.IdentityPoolPrincipalTag("AdvancedUserPrincipalTag", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  IdentityProviderName: "Cognito",
  PrincipalTags: [
    { Key: "Role", Value: "User" },
    { Key: "Department", Value: "Engineering" }
  ],
  UseDefaults: false
});
```

## Using Existing Resources

This example shows how to adopt an existing IdentityPoolPrincipalTag resource instead of creating a new one, which is useful for managing existing configurations.

```ts
const ExistingIdentityPoolTag = await AWS.Cognito.IdentityPoolPrincipalTag("AdoptedPrincipalTag", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  IdentityProviderName: "Cognito",
  PrincipalTags: [{ Key: "Project", Value: "Alchemy" }],
  adopt: true
});
```