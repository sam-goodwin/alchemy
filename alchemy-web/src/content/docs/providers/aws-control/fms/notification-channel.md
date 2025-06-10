---
title: NotificationChannel
description: Learn how to create, update, and manage AWS FMS NotificationChannels using Alchemy Cloud Control.
---


The NotificationChannel resource lets you manage [AWS FMS NotificationChannels](https://docs.aws.amazon.com/fms/latest/userguide/) that are used to send notifications about AWS Firewall Manager policy violations.

## Minimal Example

Create a basic notification channel with the required properties.

```ts
import AWS from "alchemy/aws/control";

const notificationChannel = await AWS.FMS.NotificationChannel("MyNotificationChannel", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  SnsRoleName: "MyFmsRole"
});
```

## Advanced Configuration

If you want to adopt an existing notification channel without failing, you can set the `adopt` property to true.

```ts
const adoptedChannel = await AWS.FMS.NotificationChannel("AdoptedNotificationChannel", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MyExistingTopic",
  SnsRoleName: "MyExistingFmsRole",
  adopt: true
});
```

## Updating Notification Channel

You can update an existing notification channel to change its SNS topic or role name.

```ts
const updatedChannel = await AWS.FMS.NotificationChannel("UpdatedNotificationChannel", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:UpdatedTopic",
  SnsRoleName: "UpdatedFmsRole"
});
```

## Auditing and Monitoring

To monitor changes to your notification channel, AWS automatically tracks the creation and last update times.

```ts
const channelDetails = await AWS.FMS.NotificationChannel("ChannelDetails", {
  SnsTopicArn: "arn:aws:sns:us-east-1:123456789012:MonitoringTopic",
  SnsRoleName: "MonitoringFmsRole"
});

// Access the creation and last update time
console.log(`Channel Created At: ${channelDetails.CreationTime}`);
console.log(`Last Updated At: ${channelDetails.LastUpdateTime}`);
```
