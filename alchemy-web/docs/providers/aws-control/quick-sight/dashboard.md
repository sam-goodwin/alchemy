---
title: Managing AWS QuickSight Dashboards with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Dashboards using Alchemy Cloud Control.
---

# Dashboard

The Dashboard resource lets you create and manage [AWS QuickSight Dashboards](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-dashboard.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dashboard = await AWS.QuickSight.Dashboard("dashboard-example", {
  DashboardId: "example-dashboardid",
  Name: "dashboard-",
  AwsAccountId: "example-awsaccountid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dashboard with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDashboard = await AWS.QuickSight.Dashboard("advanced-dashboard", {
  DashboardId: "example-dashboardid",
  Name: "dashboard-",
  AwsAccountId: "example-awsaccountid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

