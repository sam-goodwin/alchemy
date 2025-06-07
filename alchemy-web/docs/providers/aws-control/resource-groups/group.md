---
title: Managing AWS ResourceGroups Groups with Alchemy
description: Learn how to create, update, and manage AWS ResourceGroups Groups using Alchemy Cloud Control.
---

# Group

The Group resource lets you create and manage [AWS ResourceGroups Groups](https://docs.aws.amazon.com/resourcegroups/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const group = await AWS.ResourceGroups.Group("group-example", {
  Name: "group-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A group resource managed by Alchemy",
});
```

## Advanced Configuration

Create a group with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGroup = await AWS.ResourceGroups.Group("advanced-group", {
  Name: "group-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A group resource managed by Alchemy",
  Configuration: [],
});
```

