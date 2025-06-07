---
title: Managing AWS CE AnomalyMonitors with Alchemy
description: Learn how to create, update, and manage AWS CE AnomalyMonitors using Alchemy Cloud Control.
---

# AnomalyMonitor

The AnomalyMonitor resource lets you create and manage [AWS CE AnomalyMonitors](https://docs.aws.amazon.com/ce/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ce-anomalymonitor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const anomalymonitor = await AWS.CE.AnomalyMonitor("anomalymonitor-example", {
  MonitorType: "example-monitortype",
  MonitorName: "anomalymonitor-monitor",
});
```

