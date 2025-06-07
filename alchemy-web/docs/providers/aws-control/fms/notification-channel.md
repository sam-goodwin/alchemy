---
title: Managing AWS FMS NotificationChannels with Alchemy
description: Learn how to create, update, and manage AWS FMS NotificationChannels using Alchemy Cloud Control.
---

# NotificationChannel

The NotificationChannel resource lets you create and manage [AWS FMS NotificationChannels](https://docs.aws.amazon.com/fms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fms-notificationchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const notificationchannel = await AWS.FMS.NotificationChannel("notificationchannel-example", {
  SnsTopicArn: "example-snstopicarn",
  SnsRoleName: "notificationchannel-snsrole",
});
```

