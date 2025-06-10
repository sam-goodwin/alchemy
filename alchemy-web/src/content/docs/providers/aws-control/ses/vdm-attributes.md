---
title: VdmAttributes
description: Learn how to create, update, and manage AWS SES VdmAttributes using Alchemy Cloud Control.
---


The VdmAttributes resource allows you to manage the [AWS SES VdmAttributes](https://docs.aws.amazon.com/ses/latest/userguide/), which are essential for configuring the Virtual Deliverability Manager (VDM) settings for your Amazon SES sending domains.

## Minimal Example

Create a basic VdmAttributes resource with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const vdmAttributes = await AWS.SES.VdmAttributes("myVdmAttributes", {
  DashboardAttributes: {
    DashboardId: "myDashboardId",
    LastUpdated: new Date().toISOString()
  },
  GuardianAttributes: {
    GuardianId: "myGuardianId",
    IsEnabled: true
  },
  adopt: false // Default is false: Do not adopt existing resource
});
```

## Advanced Configuration

Configure VdmAttributes with additional settings for enhanced deliverability management.

```ts
const advancedVdmAttributes = await AWS.SES.VdmAttributes("advancedVdmAttributes", {
  DashboardAttributes: {
    DashboardId: "advancedDashboardId",
    LastUpdated: new Date().toISOString(),
    NotificationEmail: "notifications@mydomain.com"
  },
  GuardianAttributes: {
    GuardianId: "advancedGuardianId",
    IsEnabled: true,
    AlertThreshold: 10
  },
  adopt: true // Adopt existing resource if it exists
});
```

## Guardian Attributes Configuration

Set up VdmAttributes specifically focusing on Guardian attributes for monitoring.

```ts
const guardianVdmAttributes = await AWS.SES.VdmAttributes("guardianVdmAttributes", {
  GuardianAttributes: {
    GuardianId: "guardianMonitorId",
    IsEnabled: true,
    AlertThreshold: 5,
    NotificationEmail: "guardian-alerts@mydomain.com"
  }
});
```

## Dashboard Attributes Configuration

Create VdmAttributes emphasizing the dashboard settings for monitoring email deliverability.

```ts
const dashboardVdmAttributes = await AWS.SES.VdmAttributes("dashboardVdmAttributes", {
  DashboardAttributes: {
    DashboardId: "dashboardMonitorId",
    LastUpdated: new Date().toISOString(),
    NotificationEmail: "dashboard-notifications@mydomain.com",
    InsightsEnabled: true
  }
});
```
