---
title: NotificationHub
description: Learn how to create, update, and manage AWS Notifications NotificationHubs using Alchemy Cloud Control.
---


The NotificationHub resource lets you manage [AWS Notifications NotificationHubs](https://docs.aws.amazon.com/notifications/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic NotificationHub with required properties and an optional adoption parameter.

```ts
import AWS from "alchemy/aws/control";

const notificationHub = await AWS.Notifications.NotificationHub("basicNotificationHub", {
  Region: "us-west-2",
  adopt: true // Allow adopting existing resource
});
```

## Advanced Configuration

Configure a NotificationHub with additional properties for monitoring and logging.

```ts
import AWS from "alchemy/aws/control";

const advancedNotificationHub = await AWS.Notifications.NotificationHub("advancedNotificationHub", {
  Region: "us-east-1",
  adopt: false // Default is false: will fail if resource exists
});
```

## Adoption of Existing Resource

Demonstrate the adoption of an existing NotificationHub resource without creating a new one.

```ts
import AWS from "alchemy/aws/control";

const existingNotificationHub = await AWS.Notifications.NotificationHub("existingNotificationHub", {
  Region: "eu-central-1",
  adopt: true // This will adopt an existing hub if it exists
});
```

## Resource Metadata

Retrieve metadata about a NotificationHub such as ARN, creation time, and last update time.

```ts
import AWS from "alchemy/aws/control";

const metadataNotificationHub = await AWS.Notifications.NotificationHub("metadataNotificationHub", {
  Region: "ap-south-1",
  adopt: true
});

// Accessing the metadata
console.log("ARN:", metadataNotificationHub.Arn);
console.log("Created At:", metadataNotificationHub.CreationTime);
console.log("Last Updated At:", metadataNotificationHub.LastUpdateTime);
```
