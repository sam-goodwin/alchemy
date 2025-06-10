---
title: ManagedNotificationAdditionalChannelAssociation
description: Learn how to create, update, and manage AWS Notifications ManagedNotificationAdditionalChannelAssociations using Alchemy Cloud Control.
---


The ManagedNotificationAdditionalChannelAssociation resource allows you to associate additional channels with a managed notification configuration in AWS. This is useful for enhancing notification delivery across different channels. For more information, refer to the [AWS Notifications ManagedNotificationAdditionalChannelAssociations](https://docs.aws.amazon.com/notifications/latest/userguide/) documentation.

## Minimal Example

Create a basic ManagedNotificationAdditionalChannelAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const notificationChannelAssociation = await AWS.Notifications.ManagedNotificationAdditionalChannelAssociation("MyNotificationChannel", {
  ChannelArn: "arn:aws:notifications:us-east-1:123456789012:channel/my-channel",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-east-1:123456789012:configuration/my-configuration"
});
```

## Advanced Configuration

This example demonstrates how to adopt an existing resource instead of failing when the resource already exists.

```ts
const existingChannelAssociation = await AWS.Notifications.ManagedNotificationAdditionalChannelAssociation("ExistingChannel", {
  ChannelArn: "arn:aws:notifications:us-west-2:123456789012:channel/existing-channel",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:configuration/existing-configuration",
  adopt: true
});
```

## Using with Additional Properties

In this example, we create a ManagedNotificationAdditionalChannelAssociation and utilize additional properties like `Arn`, `CreationTime`, and `LastUpdateTime` to track the association.

```ts
const detailedChannelAssociation = await AWS.Notifications.ManagedNotificationAdditionalChannelAssociation("DetailedChannel", {
  ChannelArn: "arn:aws:notifications:us-west-1:123456789012:channel/detailed-channel",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-1:123456789012:configuration/detailed-configuration"
});

// Accessing additional properties
console.log(`Resource ARN: ${detailedChannelAssociation.Arn}`);
console.log(`Created at: ${detailedChannelAssociation.CreationTime}`);
console.log(`Last updated at: ${detailedChannelAssociation.LastUpdateTime}`);
```
