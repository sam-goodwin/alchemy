---
title: Managing AWS GameLift Scripts with Alchemy
description: Learn how to create, update, and manage AWS GameLift Scripts using Alchemy Cloud Control.
---

# Script

The Script resource lets you create and manage [AWS GameLift Scripts](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const script = await AWS.GameLift.Script("script-example", {
  StorageLocation: "example-storagelocation",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a script with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedScript = await AWS.GameLift.Script("advanced-script", {
  StorageLocation: "example-storagelocation",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

