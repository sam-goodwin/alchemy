---
title: Managing AWS ARCZonalShift AutoshiftObserverNotificationStatuss with Alchemy
description: Learn how to create, update, and manage AWS ARCZonalShift AutoshiftObserverNotificationStatuss using Alchemy Cloud Control.
---

# AutoshiftObserverNotificationStatus

The AutoshiftObserverNotificationStatus resource allows you to manage the notification status for automatic shifts in AWS ARC Zonal Shift. For more detailed information, refer to the [AWS ARCZonalShift AutoshiftObserverNotificationStatus documentation](https://docs.aws.amazon.com/arczonalshift/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic AutoshiftObserverNotificationStatus with required properties.

```ts
import AWS from "alchemy/aws/control";

const NotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("BasicNotificationStatus", {
  Status: "ACTIVE",
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Advanced Configuration

In this example, we configure the AutoshiftObserverNotificationStatus with a different status value, showcasing a more advanced setup.

```ts
const AdvancedNotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("AdvancedNotificationStatus", {
  Status: "INACTIVE",
  adopt: false // Optional: Do not adopt existing resource
});
```

## Monitoring and Updates

This example shows how to create a notification status and monitor its creation time and last update time.

```ts
const MonitorNotificationStatus = await AWS.ARCZonalShift.AutoshiftObserverNotificationStatus("MonitorNotificationStatus", {
  Status: "ACTIVE"
});

// Log creation and update times
console.log(`Created at: ${MonitorNotificationStatus.CreationTime}`);
console.log(`Last updated at: ${MonitorNotificationStatus.LastUpdateTime}`);
```