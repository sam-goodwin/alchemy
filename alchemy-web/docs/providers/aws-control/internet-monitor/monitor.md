---
title: Managing AWS InternetMonitor Monitors with Alchemy
description: Learn how to create, update, and manage AWS InternetMonitor Monitors using Alchemy Cloud Control.
---

# Monitor

The Monitor resource lets you create and manage [AWS InternetMonitor Monitors](https://docs.aws.amazon.com/internetmonitor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-internetmonitor-monitor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const monitor = await AWS.InternetMonitor.Monitor("monitor-example", {
  MonitorName: "monitor-monitor",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a monitor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMonitor = await AWS.InternetMonitor.Monitor("advanced-monitor", {
  MonitorName: "monitor-monitor",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

