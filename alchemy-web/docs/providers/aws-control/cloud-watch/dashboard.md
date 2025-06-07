---
title: Managing AWS CloudWatch Dashboards with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch Dashboards using Alchemy Cloud Control.
---

# Dashboard

The Dashboard resource lets you create and manage [AWS CloudWatch Dashboards](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) for visualizing your AWS resources and application metrics.

## Minimal Example

Create a basic CloudWatch Dashboard with a specified name and a simple widget.

```ts
import AWS from "alchemy/aws/control";

const SimpleDashboard = await AWS.CloudWatch.Dashboard("MySimpleDashboard", {
  DashboardName: "SimpleDashboard",
  DashboardBody: JSON.stringify({
    widgets: [{
      type: "metric",
      properties: {
        metrics: [
          ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890abcdef0"]
        ],
        title: "EC2 CPU Utilization",
        view: "timeSeries",
        region: "us-east-1",
        stacked: false,
        period: 300
      }
    }]
  })
});
```

## Advanced Configuration

Configure a dashboard with multiple widgets and additional layout settings.

```ts
const AdvancedDashboard = await AWS.CloudWatch.Dashboard("MyAdvancedDashboard", {
  DashboardName: "AdvancedDashboard",
  DashboardBody: JSON.stringify({
    widgets: [{
      type: "metric",
      properties: {
        metrics: [
          ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890abcdef0"],
          ["AWS/EC2", "MemoryUtilization", "InstanceId", "i-1234567890abcdef0"]
        ],
        title: "EC2 Metrics Overview",
        view: "timeSeries",
        region: "us-east-1",
        stacked: true,
        period: 300
      }
    }, {
      type: "text",
      properties: {
        markdown: "# Welcome to the Advanced Dashboard"
      }
    }]
  })
});
```

## Dashboard with Multiple Metrics

Demonstrate a dashboard that visualizes metrics from different AWS services.

```ts
const MultiServiceDashboard = await AWS.CloudWatch.Dashboard("MyMultiServiceDashboard", {
  DashboardName: "MultiServiceDashboard",
  DashboardBody: JSON.stringify({
    widgets: [{
      type: "metric",
      properties: {
        metrics: [
          ["AWS/S3", "NumberOfObjects", "BucketName", "my-bucket"],
          ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "my-db-instance"]
        ],
        title: "S3 and RDS Metrics",
        view: "timeSeries",
        region: "us-west-2",
        stacked: false,
        period: 300
      }
    }]
  })
});
```

## Dashboard with Custom Layout

Create a dashboard with a custom layout and specific widths for widgets.

```ts
const CustomLayoutDashboard = await AWS.CloudWatch.Dashboard("MyCustomLayoutDashboard", {
  DashboardName: "CustomLayoutDashboard",
  DashboardBody: JSON.stringify({
    widgets: [{
      width: 6,
      height: 6,
      type: "metric",
      properties: {
        metrics: [
          ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890abcdef0"]
        ],
        title: "EC2 CPU Utilization",
        view: "timeSeries",
        region: "us-east-1",
        stacked: false,
        period: 300
      }
    }, {
      width: 6,
      height: 6,
      type: "metric",
      properties: {
        metrics: [
          ["AWS/S3", "NumberOfObjects", "BucketName", "my-bucket"]
        ],
        title: "S3 Object Count",
        view: "timeSeries",
        region: "us-west-2",
        stacked: false,
        period: 300
      }
    }]
  })
});
```