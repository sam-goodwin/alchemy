---
title: Managing AWS Cognito IdentityPoolRoleAttachments with Alchemy
description: Learn how to create, update, and manage AWS Cognito IdentityPoolRoleAttachments using Alchemy Cloud Control.
---

# IdentityPoolRoleAttachment

The IdentityPoolRoleAttachment resource allows you to manage role attachments for AWS Cognito Identity Pools. This enables you to set IAM roles for authenticated and unauthenticated users, providing different access levels based on user authentication status. For more details, refer to the [AWS Cognito IdentityPoolRoleAttachments documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic IdentityPoolRoleAttachment with required properties and a common optional role mapping.

```ts
import AWS from "alchemy/aws/control";

const identityPoolRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("MyIdentityPoolRoleAttachment", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  Roles: {
    authenticated: "arn:aws:iam::123456789012:role/Cognito_MyAppAuth_Role",
    unauthenticated: "arn:aws:iam::123456789012:role/Cognito_MyAppUnauth_Role"
  },
  RoleMappings: {
    "Cognito:default": {
      Type: "Token",
      AmbiguousRoleResolution: "AuthenticatedRole",
      RulesConfiguration: {
        Rules: [
          {
            Claim: "cognito:groups",
            MatchType: "contains",
            Value: "Admins",
            RoleARN: "arn:aws:iam::123456789012:role/Cognito_MyAppAdmin_Role"
          }
        ]
      }
    }
  }
});
```

## Advanced Configuration

Configure an IdentityPoolRoleAttachment with additional role mapping rules and the adopt flag.

```ts
const advancedIdentityPoolRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("AdvancedIdentityPoolRoleAttachment", {
  IdentityPoolId: "us-east-1:87654321-4321-4321-4321-210987654321",
  Roles: {
    authenticated: "arn:aws:iam::123456789012:role/Cognito_MyAppAuth_Role"
  },
  RoleMappings: {
    "Cognito:default": {
      Type: "Token",
      AmbiguousRoleResolution: "Deny",
      RulesConfiguration: {
        Rules: [
          {
            Claim: "cognito:groups",
            MatchType: "contains",
            Value: "Users",
            RoleARN: "arn:aws:iam::123456789012:role/Cognito_MyAppUser_Role"
          },
          {
            Claim: "cognito:custom:admin",
            MatchType: "equals",
            Value: "true",
            RoleARN: "arn:aws:iam::123456789012:role/Cognito_MyAppAdmin_Role"
          }
        ]
      }
    }
  },
  adopt: true
});
```

## Using Role Mappings for Custom Claims

Demonstrate how to attach roles based on custom claims in the JWT.

```ts
const customClaimRoleAttachment = await AWS.Cognito.IdentityPoolRoleAttachment("CustomClaimRoleAttachment", {
  IdentityPoolId: "us-east-1:12345678-1234-1234-1234-123456789012",
  RoleMappings: {
    "Cognito:default": {
      Type: "Token",
      AmbiguousRoleResolution: "AuthenticatedRole",
      RulesConfiguration: {
        Rules: [
          {
            Claim: "custom:role",
            MatchType: "equals",
            Value: "manager",
            RoleARN: "arn:aws:iam::123456789012:role/Cognito_MyAppManager_Role"
          }
        ]
      }
    }
  }
});
``` 

This variety of examples showcases how to manage role attachments for AWS Cognito Identity Pools effectively, catering to both basic and advanced use cases.