---
title: Managing AWS CloudTrail Dashboards with Alchemy
description: Learn how to create, update, and manage AWS CloudTrail Dashboards using Alchemy Cloud Control.
---

# Dashboard

The Dashboard resource lets you create and manage [AWS CloudTrail Dashboards](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-dashboard.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dashboard = await AWS.CloudTrail.Dashboard("dashboard-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dashboard with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDashboard = await AWS.CloudTrail.Dashboard("advanced-dashboard", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

