---
title: Managing AWS IAM UserPolicys with Alchemy
description: Learn how to create, update, and manage AWS IAM UserPolicys using Alchemy Cloud Control.
---

# UserPolicy

The UserPolicy resource lets you create and manage [AWS IAM UserPolicys](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-userpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpolicy = await AWS.IAM.UserPolicy("userpolicy-example", {
  UserName: "userpolicy-user",
  PolicyName: "userpolicy-policy",
});
```

