---
title: Managing AWS Notifications NotificationHubs with Alchemy
description: Learn how to create, update, and manage AWS Notifications NotificationHubs using Alchemy Cloud Control.
---

# NotificationHub

The NotificationHub resource lets you create and manage [AWS Notifications NotificationHubs](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-notificationhub.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const notificationhub = await AWS.Notifications.NotificationHub("notificationhub-example", {
  Region: "example-region",
});
```

