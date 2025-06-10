---
title: IdentitySource
description: Learn how to create, update, and manage AWS VerifiedPermissions IdentitySources using Alchemy Cloud Control.
---


The IdentitySource resource allows you to manage [AWS VerifiedPermissions IdentitySources](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) that provide identity information for authorization decisions.

## Minimal Example

Create a basic IdentitySource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicIdentitySource = await AWS.VerifiedPermissions.IdentitySource("basicIdentitySource", {
  PrincipalEntityType: "USER",
  Configuration: {
    // Configuration details here
  },
  PolicyStoreId: "examplePolicyStoreId"
});
```

## Advanced Configuration

Configure an IdentitySource with additional options like adopting an existing resource.

```ts
const advancedIdentitySource = await AWS.VerifiedPermissions.IdentitySource("advancedIdentitySource", {
  PrincipalEntityType: "GROUP",
  Configuration: {
    // Configuration details here
  },
  PolicyStoreId: "examplePolicyStoreId",
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Configuration Example

Demonstrate a specific configuration for an IdentitySource.

```ts
const customIdentitySource = await AWS.VerifiedPermissions.IdentitySource("customIdentitySource", {
  PrincipalEntityType: "USER",
  Configuration: {
    // Example configuration for the IdentitySource
    userAttributes: {
      email: "user@example.com",
      roles: ["admin", "editor"]
    }
  },
  PolicyStoreId: "customPolicyStoreId"
});
```
