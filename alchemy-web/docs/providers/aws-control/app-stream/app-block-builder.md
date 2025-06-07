---
title: Managing AWS AppStream AppBlockBuilders with Alchemy
description: Learn how to create, update, and manage AWS AppStream AppBlockBuilders using Alchemy Cloud Control.
---

# AppBlockBuilder

The AppBlockBuilder resource lets you create and manage [AWS AppStream AppBlockBuilders](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblockbuilder.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const appblockbuilder = await AWS.AppStream.AppBlockBuilder("appblockbuilder-example", {
  Platform: "example-platform",
  VpcConfig: "example-vpcconfig",
  InstanceType: "example-instancetype",
  Name: "appblockbuilder-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A appblockbuilder resource managed by Alchemy",
});
```

## Advanced Configuration

Create a appblockbuilder with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAppBlockBuilder = await AWS.AppStream.AppBlockBuilder("advanced-appblockbuilder", {
  Platform: "example-platform",
  VpcConfig: "example-vpcconfig",
  InstanceType: "example-instancetype",
  Name: "appblockbuilder-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A appblockbuilder resource managed by Alchemy",
});
```

