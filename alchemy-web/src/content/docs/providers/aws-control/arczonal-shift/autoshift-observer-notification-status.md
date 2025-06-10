---
title: AutoshiftObserverNotificationStatus
description: Learn how to create, update, and manage AWS ARCZonalShift AutoshiftObserverNotificationStatuss using Alchemy Cloud Control.
---


The AutoshiftObserverNotificationStatus resource allows you to manage the status of Auto Shift Observer notifications in the AWS ARC Zonal Shift service. This resource can be used to track the operational status of the shift notification process within your AWS environment. For more detailed information, refer to the [AWS ARCZonalShift AutoshiftObserverNotificationStatus documentation](https://docs.aws.amazon.com/arczonalshift/latest/userguide/).

## Minimal Example

Create a basic Auto Shift Observer Notification Status with the required status property.

```ts
import AWS from "alchemy/aws/control";

const notificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("basicNotificationStatus", {
  Status: "ACTIVE",
  adopt: true // Set to true to adopt existing resources if they already exist
});
```

## Advanced Configuration

Configure an Auto Shift Observer Notification Status with a different status and enable resource adoption.

```ts
const advancedNotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("advancedNotificationStatus", {
  Status: "PENDING",
  adopt: true // Adopt existing resource instead of failing
});
```

## Status Update Example

Update the status of an existing Auto Shift Observer Notification Status to a new state.

```ts
const updatedNotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("updatedNotificationStatus", {
  Status: "COMPLETED",
  adopt: false // Do not adopt if resource already exists
});
```

## Status with Time Information

Create an Auto Shift Observer Notification Status and retrieve additional properties such as creation and last update times.

```ts
const timeAwareNotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("timeAwareNotificationStatus", {
  Status: "ACTIVE",
  adopt: true
});

console.log(`ARN: ${timeAwareNotificationStatus.Arn}`);
console.log(`Creation Time: ${timeAwareNotificationStatus.CreationTime}`);
console.log(`Last Update Time: ${timeAwareNotificationStatus.LastUpdateTime}`);
```
