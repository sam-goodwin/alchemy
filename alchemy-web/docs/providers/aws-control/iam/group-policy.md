---
title: Managing AWS IAM GroupPolicys with Alchemy
description: Learn how to create, update, and manage AWS IAM GroupPolicys using Alchemy Cloud Control.
---

# GroupPolicy

The GroupPolicy resource lets you create and manage [AWS IAM GroupPolicys](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-grouppolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const grouppolicy = await AWS.IAM.GroupPolicy("grouppolicy-example", {
  GroupName: "grouppolicy-group",
  PolicyName: "grouppolicy-policy",
});
```

