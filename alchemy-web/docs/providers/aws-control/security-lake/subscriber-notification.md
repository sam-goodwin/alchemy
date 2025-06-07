---
title: Managing AWS SecurityLake SubscriberNotifications with Alchemy
description: Learn how to create, update, and manage AWS SecurityLake SubscriberNotifications using Alchemy Cloud Control.
---

# SubscriberNotification

The SubscriberNotification resource lets you create and manage [AWS SecurityLake SubscriberNotifications](https://docs.aws.amazon.com/securitylake/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securitylake-subscribernotification.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subscribernotification = await AWS.SecurityLake.SubscriberNotification(
  "subscribernotification-example",
  {
    SubscriberArn: "example-subscriberarn",
    NotificationConfiguration: "example-notificationconfiguration",
  }
);
```

