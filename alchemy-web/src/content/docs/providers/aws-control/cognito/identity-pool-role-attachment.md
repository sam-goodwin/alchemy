---
title: IdentityPoolRoleAttachment
description: Learn how to create, update, and manage AWS Cognito IdentityPoolRoleAttachments using Alchemy Cloud Control.
---


The IdentityPoolRoleAttachment resource allows you to manage role attachments for Amazon Cognito Identity Pools, enabling you to assign roles to authenticated and unauthenticated users. For more information, visit the [AWS Cognito IdentityPoolRoleAttachments](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic IdentityPoolRoleAttachment with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const identityPoolRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("basicAttachment", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  Roles: {
    authenticated: "arn:aws:iam::123456789012:role/Cognito_Authenticated",
    unauthenticated: "arn:aws:iam::123456789012:role/Cognito_Unauthenticated"
  }
});
```

## Advanced Configuration

Configure an IdentityPoolRoleAttachment with role mappings for specific user pools.

```ts
const advancedIdentityPoolRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("advancedAttachment", {
  IdentityPoolId: "us-east-1:87654321-4321-4321-4321-210987654321",
  Roles: {
    authenticated: "arn:aws:iam::123456789012:role/Cognito_Authenticated",
    unauthenticated: "arn:aws:iam::123456789012:role/Cognito_Unauthenticated"
  },
  RoleMappings: {
    "CustomProvider": {
      "Type": "Token",
      "AmbiguousRoleResolution": "AuthenticatedRole",
      "RulesConfiguration": {
        "Rules": [{
          "Claim": "cognito:groups",
          "MatchType": "Contains",
          "MatchValue": "Admins",
          "RoleARN": "arn:aws:iam::123456789012:role/AdminRole"
        }]
      }
    }
  }
});
```

## Using Adopt Property

Create an IdentityPoolRoleAttachment while adopting an existing resource if it already exists.

```ts
const adoptIdentityPoolRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("adoptAttachment", {
  IdentityPoolId: "us-east-1:abcdef12-3456-7890-abcd-ef1234567890",
  Roles: {
    authenticated: "arn:aws:iam::123456789012:role/Cognito_Authenticated",
    unauthenticated: "arn:aws:iam::123456789012:role/Cognito_Unauthenticated"
  },
  adopt: true
});
```
