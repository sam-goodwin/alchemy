---
title: Managing AWS VerifiedPermissions Policys with Alchemy
description: Learn how to create, update, and manage AWS VerifiedPermissions Policys using Alchemy Cloud Control.
---

# Policy

The Policy resource lets you create and manage [AWS VerifiedPermissions Policys](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-verifiedpermissions-policy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const policy = await AWS.VerifiedPermissions.Policy("policy-example", {
  Definition: "example-definition",
  PolicyStoreId: "example-policystoreid",
});
```

