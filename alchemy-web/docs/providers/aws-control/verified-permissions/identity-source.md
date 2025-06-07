---
title: Managing AWS VerifiedPermissions IdentitySources with Alchemy
description: Learn how to create, update, and manage AWS VerifiedPermissions IdentitySources using Alchemy Cloud Control.
---

# IdentitySource

The IdentitySource resource lets you create and manage [AWS VerifiedPermissions IdentitySources](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-verifiedpermissions-identitysource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const identitysource = await AWS.VerifiedPermissions.IdentitySource("identitysource-example", {
  Configuration: "example-configuration",
  PolicyStoreId: "example-policystoreid",
});
```

