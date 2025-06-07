---
title: Managing AWS IAM Users with Alchemy
description: Learn how to create, update, and manage AWS IAM Users using Alchemy Cloud Control.
---

# User

The User resource lets you create and manage [AWS IAM Users](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-user.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const user = await AWS.IAM.User("user-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a user with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedUser = await AWS.IAM.User("advanced-user", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

