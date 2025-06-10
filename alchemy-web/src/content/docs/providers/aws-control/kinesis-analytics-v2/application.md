---
title: Application
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS KinesisAnalyticsV2 Applications](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) for real-time data analytics on streaming data.

## Minimal Example

Create a basic Kinesis Analytics V2 Application with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicApplication = await AWS.KinesisAnalyticsV2.Application("basicApplication", {
  ApplicationName: "SalesAnalyticsApp",
  RuntimeEnvironment: "SQL-1.0",
  ServiceExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonKinesisAnalyticsRole",
  ApplicationDescription: "An application for analyzing sales data in real-time"
});
```

## Advanced Configuration

Configure an application with a custom run configuration and application mode.

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.KinesisAnalyticsV2.Application("advancedApplication", {
  ApplicationName: "AdvancedSalesAnalyticsApp",
  RuntimeEnvironment: "SQL-1.0",
  ServiceExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonKinesisAnalyticsRole",
  ApplicationMode: "RUNNING",
  RunConfiguration: {
    ApplicationRestoreConfiguration: {
      ApplicationRestoreType: "SKIP_RESTORE",
      SnapshotName: "LatestSnapshot"
    }
  },
  ApplicationDescription: "An advanced application for analyzing sales data with restore capabilities"
});
```

## Application with Maintenance Configuration

Create an application that includes maintenance configuration settings.

```ts
import AWS from "alchemy/aws/control";

const maintenanceApplication = await AWS.KinesisAnalyticsV2.Application("maintenanceApplication", {
  ApplicationName: "MaintenanceSalesAnalyticsApp",
  RuntimeEnvironment: "SQL-1.0",
  ServiceExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonKinesisAnalyticsRole",
  ApplicationMaintenanceConfiguration: {
    ApplicationMaintenanceWindowStartTime: "2023-10-01T00:00:00Z",
    ApplicationMaintenanceWindowEndTime: "2023-10-02T00:00:00Z"
  },
  ApplicationDescription: "An application with maintenance window set for updates"
});
```

## Application with Tags

Create an application that includes tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedApplication = await AWS.KinesisAnalyticsV2.Application("taggedApplication", {
  ApplicationName: "TaggedSalesAnalyticsApp",
  RuntimeEnvironment: "SQL-1.0",
  ServiceExecutionRole: "arn:aws:iam::123456789012:role/service-role/AmazonKinesisAnalyticsRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Analytics" }
  ],
  ApplicationDescription: "An application with resource tags for better management"
});
```
