---
title: Managing AWS RUM AppMonitors with Alchemy
description: Learn how to create, update, and manage AWS RUM AppMonitors using Alchemy Cloud Control.
---

# AppMonitor

The AppMonitor resource lets you create and manage [AWS RUM AppMonitors](https://docs.aws.amazon.com/rum/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rum-appmonitor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const appmonitor = await AWS.RUM.AppMonitor("appmonitor-example", {
  Name: "appmonitor-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a appmonitor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAppMonitor = await AWS.RUM.AppMonitor("advanced-appmonitor", {
  Name: "appmonitor-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

