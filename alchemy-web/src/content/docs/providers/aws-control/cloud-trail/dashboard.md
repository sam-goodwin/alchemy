---
title: Dashboard
description: Learn how to create, update, and manage AWS CloudTrail Dashboards using Alchemy Cloud Control.
---


The Dashboard resource lets you manage [AWS CloudTrail Dashboards](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) which provide a customizable view of CloudTrail event data. You can visualize your AWS account activity and gain insights into your resources.

## Minimal Example

Create a basic dashboard with a simple widget to display event counts.

```ts
import AWS from "alchemy/aws/control";

const basicDashboard = await AWS.CloudTrail.Dashboard("basicDashboard", {
  name: "Basic CloudTrail Dashboard",
  widgets: [
    {
      type: "line",
      title: "Event Count",
      xAxis: "time",
      yAxis: "count",
      data: "eventCountData"
    }
  ],
  terminationProtectionEnabled: true
});
```

## Advanced Configuration

Configure a dashboard with multiple widgets and a refresh schedule for dynamic updates.

```ts
const advancedDashboard = await AWS.CloudTrail.Dashboard("advancedDashboard", {
  name: "Advanced CloudTrail Dashboard",
  widgets: [
    {
      type: "bar",
      title: "API Call Count",
      xAxis: "API",
      yAxis: "count",
      data: "apiCallCountData"
    },
    {
      type: "pie",
      title: "Event Source Distribution",
      data: "eventSourceDistributionData"
    }
  ],
  refreshSchedule: {
    frequency: "5 minutes" // Refresh every 5 minutes
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "Monitoring" }
  ]
});
```

## Custom Widget Configuration

Create a dashboard with custom widgets to visualize specific event types.

```ts
const customWidgetDashboard = await AWS.CloudTrail.Dashboard("customWidgetDashboard", {
  name: "Custom Widget CloudTrail Dashboard",
  widgets: [
    {
      type: "line",
      title: "S3 Event Count",
      xAxis: "time",
      yAxis: "count",
      data: "s3EventCountData"
    },
    {
      type: "bar",
      title: "IAM Events",
      xAxis: "action",
      yAxis: "count",
      data: "iamEventCountData"
    }
  ],
  terminationProtectionEnabled: true,
  refreshSchedule: {
    frequency: "10 minutes" // Refresh every 10 minutes
  }
});
```

## Dashboard with Tags and Protection

Set up a dashboard with termination protection and custom tags for organizational purposes.

```ts
const taggedDashboard = await AWS.CloudTrail.Dashboard("taggedDashboard", {
  name: "Tagged CloudTrail Dashboard",
  widgets: [
    {
      type: "bar",
      title: "Lambda Invocation Count",
      xAxis: "function",
      yAxis: "count",
      data: "lambdaInvocationCountData"
    }
  ],
  terminationProtectionEnabled: true,
  tags: [
    { key: "Owner", value: "DevOps" },
    { key: "CostCenter", value: "CloudOps" }
  ]
});
```
