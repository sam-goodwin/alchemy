---
title: Managing AWS Notifications ManagedNotificationAdditionalChannelAssociations with Alchemy
description: Learn how to create, update, and manage AWS Notifications ManagedNotificationAdditionalChannelAssociations using Alchemy Cloud Control.
---

# ManagedNotificationAdditionalChannelAssociation

The ManagedNotificationAdditionalChannelAssociation resource lets you create and manage [AWS Notifications ManagedNotificationAdditionalChannelAssociations](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-managednotificationadditionalchannelassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const managednotificationadditionalchannelassociation =
  await AWS.Notifications.ManagedNotificationAdditionalChannelAssociation(
    "managednotificationadditionalchannelassociation-example",
    {
      ChannelArn: "example-channelarn",
      ManagedNotificationConfigurationArn: "example-managednotificationconfigurationarn",
    }
  );
```

