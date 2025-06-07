---
title: Managing AWS Notifications NotificationConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Notifications NotificationConfigurations using Alchemy Cloud Control.
---

# NotificationConfiguration

The NotificationConfiguration resource lets you create and manage [AWS Notifications NotificationConfigurations](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-notificationconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const notificationconfiguration = await AWS.Notifications.NotificationConfiguration(
  "notificationconfiguration-example",
  {
    Description: "A notificationconfiguration resource managed by Alchemy",
    Name: "notificationconfiguration-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a notificationconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNotificationConfiguration = await AWS.Notifications.NotificationConfiguration(
  "advanced-notificationconfiguration",
  {
    Description: "A notificationconfiguration resource managed by Alchemy",
    Name: "notificationconfiguration-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

