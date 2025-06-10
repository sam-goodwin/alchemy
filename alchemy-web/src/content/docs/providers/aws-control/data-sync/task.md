---
title: Task
description: Learn how to create, update, and manage AWS DataSync Tasks using Alchemy Cloud Control.
---


The Task resource allows you to manage [AWS DataSync Tasks](https://docs.aws.amazon.com/datasync/latest/userguide/) that automate moving data between on-premises storage and AWS storage services.

## Minimal Example

Create a basic DataSync Task with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const dataSyncTask = await AWS.DataSync.Task("myDataSyncTask", {
  SourceLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-source-location",
  DestinationLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-destination-location",
  Schedule: {
    ScheduleExpression: "rate(1 day)"
  },
  Options: {
    VerifyMode: "POINT_IN_TIME_CONSISTENT",
    Atime: "BEST_EFFORT"
  }
});
```

## Advanced Configuration

Configure a DataSync Task with additional settings, including filtering and logging.

```ts
const advancedDataSyncTask = await AWS.DataSync.Task("advancedDataSyncTask", {
  SourceLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-source-location",
  DestinationLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-destination-location",
  Includes: [
    { FilterType: "SIMPLE_PREFIX", Value: "/data/" }
  ],
  Excludes: [
    { FilterType: "SIMPLE_PREFIX", Value: "/data/exclude/" }
  ],
  CloudWatchLogGroupArn: "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group",
  Options: {
    VerifyMode: "POINT_IN_TIME_CONSISTENT",
    Atime: "BEST_EFFORT",
    Gid: "NONE",
    Mtime: "NONE",
    PreserveDeletedFiles: "PRESERVE", 
    PreserveDevices: "NONE"
  }
});
```

## Task with Custom Reporting

Create a DataSync Task that includes specific reporting configurations.

```ts
const reportingDataSyncTask = await AWS.DataSync.Task("reportingDataSyncTask", {
  SourceLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-source-location",
  DestinationLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-destination-location",
  TaskReportConfig: {
    ReportScope: "ALL",
    ReportFormat: "REPORT_CSV"
  }
});
```

## Adopting Existing Tasks

Demonstrate how to adopt an existing DataSync Task instead of creating a new one.

```ts
const existingTask = await AWS.DataSync.Task("existingTask", {
  SourceLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-source-location",
  DestinationLocationArn: "arn:aws:datasync:us-east-1:123456789012:location/my-destination-location",
  adopt: true
});
```
