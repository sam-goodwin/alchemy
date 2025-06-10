---
title: NotificationConfiguration
description: Learn how to create, update, and manage AWS Notifications NotificationConfigurations using Alchemy Cloud Control.
---


The NotificationConfiguration resource allows you to manage notification configurations in AWS Notifications. This resource enables you to customize how notifications are delivered and aggregated. For more information, refer to the [AWS Notifications NotificationConfigurations documentation](https://docs.aws.amazon.com/notifications/latest/userguide/).

## Minimal Example

Create a basic notification configuration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const notificationConfig = await AWS.Notifications.NotificationConfiguration("basicNotificationConfig", {
  name: "UserSignUpNotifications",
  description: "Notification configuration for user sign-up events",
  aggregationDuration: "PT5M", // Aggregate notifications for 5 minutes
  tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Set up a notification configuration with multiple tags and a longer aggregation duration.

```ts
const advancedNotificationConfig = await AWS.Notifications.NotificationConfiguration("advancedNotificationConfig", {
  name: "OrderProcessingNotifications",
  description: "Notification configuration for order processing events",
  aggregationDuration: "PT10M", // Aggregate notifications for 10 minutes
  tags: [
    {
      Key: "Service",
      Value: "OrderService"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ]
});
```

## Adoption of Existing Resource

Create a notification configuration while adopting an existing resource if it already exists.

```ts
const adoptNotificationConfig = await AWS.Notifications.NotificationConfiguration("adoptNotificationConfig", {
  name: "InventoryUpdateNotifications",
  description: "Notification configuration for inventory updates",
  adopt: true // Adopt existing resource instead of failing
});
```

## Example with Extended Properties

Define a notification configuration with additional properties like creation time and last update time.

```ts
const detailedNotificationConfig = await AWS.Notifications.NotificationConfiguration("detailedNotificationConfig", {
  name: "UserActivityNotifications",
  description: "Notification for tracking user activities",
  aggregationDuration: "PT15M", // Aggregate notifications for 15 minutes
  tags: [{
    Key: "UserType",
    Value: "Premium"
  }]
});

// Accessing extended properties after creation
console.log(`ARN: ${detailedNotificationConfig.arn}`);
console.log(`Created At: ${detailedNotificationConfig.creationTime}`);
console.log(`Last Updated At: ${detailedNotificationConfig.lastUpdateTime}`);
```
