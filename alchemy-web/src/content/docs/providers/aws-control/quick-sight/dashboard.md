---
title: Dashboard
description: Learn how to create, update, and manage AWS QuickSight Dashboards using Alchemy Cloud Control.
---


The Dashboard resource lets you manage [AWS QuickSight Dashboards](https://docs.aws.amazon.com/quicksight/latest/userguide/) for data visualization and reporting.

## Minimal Example

Create a basic QuickSight dashboard with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const quickSightDashboard = await AWS.QuickSight.Dashboard("simpleDashboard", {
  DashboardId: "salesDashboard",
  Name: "Sales Dashboard",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceAnalysis: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:analysis/salesAnalysis",
      DatasetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/salesData"
    }
  },
  VersionDescription: "Initial version"
});
```

## Advanced Configuration

Configure a dashboard with additional properties such as theme and permissions for enhanced customization.

```ts
import AWS from "alchemy/aws/control";

const advancedDashboard = await AWS.QuickSight.Dashboard("advancedDashboard", {
  DashboardId: "advancedSalesDashboard",
  Name: "Advanced Sales Dashboard",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceAnalysis: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:analysis/advancedSalesAnalysis",
      DatasetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/advancedSalesData"
    }
  },
  ThemeArn: "arn:aws:quicksight:us-east-1:123456789012:theme/defaultTheme",
  Permissions: [{
    Principal: "arn:aws:quicksight:us-east-1:123456789012:user/default/quickUser",
    Actions: ["quicksight:DescribeDashboard", "quicksight:UpdateDashboard"]
  }],
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }],
  VersionDescription: "Version 1 with advanced settings"
});
```

## Sharing Configuration

Implement dashboard sharing options that allow link sharing and set permissions for users.

```ts
import AWS from "alchemy/aws/control";

const sharingConfiguredDashboard = await AWS.QuickSight.Dashboard("sharingDashboard", {
  DashboardId: "sharingSalesDashboard",
  Name: "Sharing Sales Dashboard",
  AwsAccountId: "123456789012",
  SourceEntity: {
    SourceAnalysis: {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:analysis/sharingSalesAnalysis",
      DatasetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/sharingSalesData"
    }
  },
  LinkSharingConfiguration: {
    EnableLinkSharing: true,
    LinkSharingMode: "VIEW"
  },
  Permissions: [{
    Principal: "arn:aws:quicksight:us-east-1:123456789012:user/default/quickUser",
    Actions: ["quicksight:DescribeDashboard", "quicksight:ShareDashboard"]
  }],
  VersionDescription: "Dashboard with sharing options"
});
```
