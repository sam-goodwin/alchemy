---
title: Managing AWS IAM Roles with Alchemy
description: Learn how to create, update, and manage AWS IAM Roles using Alchemy Cloud Control.
---

# Role

The Role resource lets you create and manage [AWS IAM Roles](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const role = await AWS.IAM.Role("role-example", {
  AssumeRolePolicyDocument: {},
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A role resource managed by Alchemy",
});
```

## Advanced Configuration

Create a role with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRole = await AWS.IAM.Role("advanced-role", {
  AssumeRolePolicyDocument: {},
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A role resource managed by Alchemy",
});
```

