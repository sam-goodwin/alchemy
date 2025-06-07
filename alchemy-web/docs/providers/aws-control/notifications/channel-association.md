---
title: Managing AWS Notifications ChannelAssociations with Alchemy
description: Learn how to create, update, and manage AWS Notifications ChannelAssociations using Alchemy Cloud Control.
---

# ChannelAssociation

The ChannelAssociation resource lets you create and manage [AWS Notifications ChannelAssociations](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-channelassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channelassociation = await AWS.Notifications.ChannelAssociation(
  "channelassociation-example",
  { NotificationConfigurationArn: "example-notificationconfigurationarn", Arn: "example-arn" }
);
```

