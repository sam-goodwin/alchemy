---
title: Managing AWS DevOpsGuru NotificationChannels with Alchemy
description: Learn how to create, update, and manage AWS DevOpsGuru NotificationChannels using Alchemy Cloud Control.
---

# NotificationChannel

The NotificationChannel resource lets you create and manage [AWS DevOpsGuru NotificationChannels](https://docs.aws.amazon.com/devopsguru/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-devopsguru-notificationchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const notificationchannel = await AWS.DevOpsGuru.NotificationChannel(
  "notificationchannel-example",
  { Config: "example-config" }
);
```

