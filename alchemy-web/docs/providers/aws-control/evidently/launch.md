---
title: Managing AWS Evidently Launchs with Alchemy
description: Learn how to create, update, and manage AWS Evidently Launchs using Alchemy Cloud Control.
---

# Launch

The Launch resource lets you create and manage [AWS Evidently Launchs](https://docs.aws.amazon.com/evidently/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const launch = await AWS.Evidently.Launch("launch-example", {
  Project: "example-project",
  Groups: [],
  ScheduledSplitsConfig: [],
  Name: "launch-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A launch resource managed by Alchemy",
});
```

## Advanced Configuration

Create a launch with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLaunch = await AWS.Evidently.Launch("advanced-launch", {
  Project: "example-project",
  Groups: [],
  ScheduledSplitsConfig: [],
  Name: "launch-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A launch resource managed by Alchemy",
});
```

