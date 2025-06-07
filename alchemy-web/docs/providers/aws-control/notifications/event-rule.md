---
title: Managing AWS Notifications EventRules with Alchemy
description: Learn how to create, update, and manage AWS Notifications EventRules using Alchemy Cloud Control.
---

# EventRule

The EventRule resource lets you create and manage [AWS Notifications EventRules](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-eventrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventrule = await AWS.Notifications.EventRule("eventrule-example", {
  EventType: "example-eventtype",
  NotificationConfigurationArn: "example-notificationconfigurationarn",
  Regions: ["example-regions-1"],
  Source: "example-source",
});
```

