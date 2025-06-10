---
title: IdentityPoolPrincipalTag
description: Learn how to create, update, and manage AWS Cognito IdentityPoolPrincipalTags using Alchemy Cloud Control.
---


The IdentityPoolPrincipalTag resource allows you to manage principal tags for AWS Cognito Identity Pools. These tags are used to control access to resources in AWS based on user attributes. For more information, refer to the [AWS Cognito IdentityPoolPrincipalTags documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic IdentityPoolPrincipalTag with required properties.

```ts
import AWS from "alchemy/aws/control";

const identityPoolPrincipalTag = await AWS.Cognito.IdentityPoolPrincipalTag("exampleIdentityPoolTag", {
  PrincipalTags: {
    "Role": "User",
    "Department": "Engineering"
  },
  IdentityProviderName: "Cognito",
  IdentityPoolId: "us-east-1:example-pool-id"
});
```

## Advanced Configuration

Configure an IdentityPoolPrincipalTag using defaults and additional principal tags.

```ts
const advancedIdentityPoolPrincipalTag = await AWS.Cognito.IdentityPoolPrincipalTag("advancedIdentityPoolTag", {
  PrincipalTags: {
    "Role": "Admin",
    "Project": "Alpha"
  },
  UseDefaults: true, // Use default tags
  IdentityProviderName: "Cognito",
  IdentityPoolId: "us-east-1:example-pool-id"
});
```

## Adopting Existing Resources

If you want to adopt an existing IdentityPoolPrincipalTag without failing when it already exists, you can set the adopt property to true.

```ts
const adoptExistingIdentityPoolPrincipalTag = await AWS.Cognito.IdentityPoolPrincipalTag("existingIdentityPoolTag", {
  PrincipalTags: {
    "Role": "Viewer"
  },
  IdentityProviderName: "Cognito",
  IdentityPoolId: "us-east-1:example-pool-id",
  adopt: true // Adopt existing resource
});
```
