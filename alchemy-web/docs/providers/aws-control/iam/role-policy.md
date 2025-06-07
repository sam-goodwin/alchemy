---
title: Managing AWS IAM RolePolicys with Alchemy
description: Learn how to create, update, and manage AWS IAM RolePolicys using Alchemy Cloud Control.
---

# RolePolicy

The RolePolicy resource lets you create and manage [AWS IAM RolePolicys](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-rolepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rolepolicy = await AWS.IAM.RolePolicy("rolepolicy-example", {
  RoleName: "rolepolicy-role",
  PolicyName: "rolepolicy-policy",
});
```

