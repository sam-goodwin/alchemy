---
title: Managing AWS Greengrass Groups with Alchemy
description: Learn how to create, update, and manage AWS Greengrass Groups using Alchemy Cloud Control.
---

# Group

The Group resource lets you create and manage [AWS Greengrass Groups](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-group.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const group = await AWS.Greengrass.Group("group-example", {
  Name: "group-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a group with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGroup = await AWS.Greengrass.Group("advanced-group", {
  Name: "group-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

