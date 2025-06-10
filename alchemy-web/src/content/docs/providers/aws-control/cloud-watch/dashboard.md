---
title: Dashboard
description: Learn how to create, update, and manage AWS CloudWatch Dashboards using Alchemy Cloud Control.
---


The Dashboard resource lets you manage [AWS CloudWatch Dashboards](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) for visualizing metrics and logs in AWS. 

## Minimal Example

Create a basic CloudWatch Dashboard with essential properties:

```ts
import AWS from "alchemy/aws/control";

const cloudWatchDashboard = await AWS.CloudWatch.Dashboard("basicDashboard", {
  DashboardName: "MainMetricsDashboard",
  DashboardBody: JSON.stringify({
    widgets: [
      {
        type: "metric",
        x: 0,
        y: 0,
        width: 6,
        height: 6,
        properties: {
          metrics: [
            ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890abcdef0"],
            ["AWS/EC2", "DiskReadOps", "InstanceId", "i-1234567890abcdef0"]
          ],
          view: "timeSeries",
          stacked: false,
          region: "us-east-1",
          title: "EC2 Instance Metrics"
        }
      }
    ]
  })
});
```

## Advanced Configuration

Configure a dashboard with multiple widgets and a custom layout:

```ts
const advancedDashboard = await AWS.CloudWatch.Dashboard("advancedDashboard", {
  DashboardName: "AdvancedMetricsDashboard",
  DashboardBody: JSON.stringify({
    widgets: [
      {
        type: "metric",
        x: 0,
        y: 0,
        width: 4,
        height: 6,
        properties: {
          metrics: [["AWS/S3", "NumberOfObjects", "BucketName", "my-bucket"]],
          view: "timeSeries",
          stacked: false,
          region: "us-west-2",
          title: "S3 Object Count"
        }
      },
      {
        type: "text",
        x: 4,
        y: 0,
        width: 8,
        height: 6,
        properties: {
          markdown: "# Welcome to Your Dashboard\nThis dashboard displays key metrics."
        }
      },
      {
        type: "metric",
        x: 0,
        y: 6,
        width: 12,
        height: 6,
        properties: {
          metrics: [["AWS/Lambda", "Invocations", "FunctionName", "myLambdaFunction"]],
          view: "timeSeries",
          stacked: true,
          region: "us-east-1",
          title: "Lambda Function Invocations"
        }
      }
    ]
  })
});
```

## Updating an Existing Dashboard

Use the `adopt` property to update an existing dashboard without failing if it already exists:

```ts
const updatedDashboard = await AWS.CloudWatch.Dashboard("updatedDashboard", {
  DashboardName: "MainMetricsDashboard",
  DashboardBody: JSON.stringify({
    widgets: [
      {
        type: "metric",
        x: 0,
        y: 0,
        width: 6,
        height: 6,
        properties: {
          metrics: [["AWS/EC2", "NetworkIn", "InstanceId", "i-1234567890abcdef0"]],
          view: "timeSeries",
          stacked: false,
          region: "us-east-1",
          title: "Network In"
        }
      }
    ]
  }),
  adopt: true
});
```
