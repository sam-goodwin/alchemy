---
title: ManagedNotificationAccountContactAssociation
description: Learn how to create, update, and manage AWS Notifications ManagedNotificationAccountContactAssociations using Alchemy Cloud Control.
---


The ManagedNotificationAccountContactAssociation resource lets you manage associations between AWS notifications and account contacts for notifications. For more information, refer to the [AWS Notifications ManagedNotificationAccountContactAssociations documentation](https://docs.aws.amazon.com/notifications/latest/userguide/).

## Minimal Example

Create a basic managed notification account contact association with required properties.

```ts
import AWS from "alchemy/aws/control";

const notificationAssociation = await AWS.Notifications.ManagedNotificationAccountContactAssociation("contactAssociation1", {
  ContactIdentifier: "contact@example.com",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:configuration:example-configuration",
  adopt: true // Optional: adopt existing resource if it exists
});
```

## Advanced Configuration

This example demonstrates how to create an association with additional properties, such as adopting an existing resource.

```ts
const advancedNotificationAssociation = await AWS.Notifications.ManagedNotificationAccountContactAssociation("contactAssociation2", {
  ContactIdentifier: "alert@example.com",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-east-1:123456789012:configuration:another-configuration",
  adopt: true // Optional: allows adoption of existing resource
});
```

## Use Case: Updating an Existing Association

Here’s how to update an existing managed notification account contact association by specifying the same resource ID.

```ts
const updatedNotificationAssociation = await AWS.Notifications.ManagedNotificationAccountContactAssociation("contactAssociation1", {
  ContactIdentifier: "updated_contact@example.com", // Updating the contact identifier
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:configuration:updated-configuration",
  adopt: true // Optional: ensures it adopts if already exists
});
```

## Use Case: Creating Multiple Associations

This example shows how to create multiple managed notification account contact associations in a single script.

```ts
const contact1 = await AWS.Notifications.ManagedNotificationAccountContactAssociation("contactAssociation3", {
  ContactIdentifier: "first_contact@example.com",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:configuration:config1"
});

const contact2 = await AWS.Notifications.ManagedNotificationAccountContactAssociation("contactAssociation4", {
  ContactIdentifier: "second_contact@example.com",
  ManagedNotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:configuration:config2"
});
```
