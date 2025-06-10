---
title: RefreshSchedule
description: Learn how to create, update, and manage AWS QuickSight RefreshSchedules using Alchemy Cloud Control.
---


The RefreshSchedule resource allows you to manage the refresh schedules for datasets in AWS QuickSight. With this resource, you can define when your datasets are refreshed to ensure that your reports and dashboards contain the latest data. For more information, see the [AWS QuickSight RefreshSchedules documentation](https://docs.aws.amazon.com/quicksight/latest/userguide/).

## Minimal Example

Create a basic refresh schedule for a QuickSight dataset.

```ts
import AWS from "alchemy/aws/control";

const refreshSchedule = await AWS.QuickSight.RefreshSchedule("dailyRefresh", {
  Schedule: {
    Frequency: "DAILY",
    Time: "08:00" // Refresh at 8 AM UTC
  },
  AwsAccountId: "123456789012", // Your AWS account ID
  DataSetId: "example-dataset-id" // Your QuickSight dataset ID
});
```

## Advanced Configuration

Configure a refresh schedule with a weekly frequency and specify the exact days.

```ts
const weeklyRefreshSchedule = await AWS.QuickSight.RefreshSchedule("weeklyRefresh", {
  Schedule: {
    Frequency: "WEEKLY",
    Days: ["MONDAY", "THURSDAY"], // Refresh on Mondays and Thursdays
    Time: "09:00" // Refresh at 9 AM UTC
  },
  AwsAccountId: "123456789012",
  DataSetId: "example-dataset-id"
});
```

## Conditional Refresh

Create a refresh schedule that only updates the dataset if certain conditions are met.

```ts
const conditionalRefreshSchedule = await AWS.QuickSight.RefreshSchedule("conditionalRefresh", {
  Schedule: {
    Frequency: "HOURLY",
    Time: "00:00" // Refresh at the start of every hour
  },
  AwsAccountId: "123456789012",
  DataSetId: "example-dataset-id",
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Refresh Time

Set a refresh schedule with a custom time for your dataset.

```ts
const customTimeRefreshSchedule = await AWS.QuickSight.RefreshSchedule("customTimeRefresh", {
  Schedule: {
    Frequency: "DAILY",
    Time: "15:30" // Refresh at 3:30 PM UTC
  },
  AwsAccountId: "123456789012",
  DataSetId: "example-dataset-id"
});
```
