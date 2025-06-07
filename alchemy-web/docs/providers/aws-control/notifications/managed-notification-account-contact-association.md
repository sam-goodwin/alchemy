---
title: Managing AWS Notifications ManagedNotificationAccountContactAssociations with Alchemy
description: Learn how to create, update, and manage AWS Notifications ManagedNotificationAccountContactAssociations using Alchemy Cloud Control.
---

# ManagedNotificationAccountContactAssociation

The ManagedNotificationAccountContactAssociation resource lets you create and manage [AWS Notifications ManagedNotificationAccountContactAssociations](https://docs.aws.amazon.com/notifications/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-notifications-managednotificationaccountcontactassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const managednotificationaccountcontactassociation =
  await AWS.Notifications.ManagedNotificationAccountContactAssociation(
    "managednotificationaccountcontactassociation-example",
    {
      ContactIdentifier: "example-contactidentifier",
      ManagedNotificationConfigurationArn: "example-managednotificationconfigurationarn",
    }
  );
```

