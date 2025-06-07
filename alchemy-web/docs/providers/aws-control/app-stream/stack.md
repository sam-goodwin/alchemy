---
title: Managing AWS AppStream Stacks with Alchemy
description: Learn how to create, update, and manage AWS AppStream Stacks using Alchemy Cloud Control.
---

# Stack

The Stack resource lets you create and manage [AWS AppStream Stacks](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const stack = await AWS.AppStream.Stack("stack-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A stack resource managed by Alchemy",
});
```

## Advanced Configuration

Create a stack with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStack = await AWS.AppStream.Stack("advanced-stack", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A stack resource managed by Alchemy",
});
```

