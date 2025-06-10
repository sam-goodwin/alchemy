---
title: EmailContact
description: Learn how to create, update, and manage AWS NotificationsContacts EmailContacts using Alchemy Cloud Control.
---


The EmailContact resource allows you to manage email contacts for AWS Notifications. This resource can be utilized to create, update, and manage email contacts for notification purposes. For more information, refer to the [AWS NotificationsContacts EmailContacts documentation](https://docs.aws.amazon.com/notificationscontacts/latest/userguide/).

## Minimal Example

Create a basic email contact with the required properties.

```ts
import AWS from "alchemy/aws/control";

const emailContact = await AWS.NotificationsContacts.EmailContact("primaryEmailContact", {
  Name: "Primary Contact",
  EmailAddress: "primary.contact@example.com",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Role", Value: "Developer" }
  ]
});
```

## Advanced Configuration

Create an email contact with additional properties, including tags.

```ts
const advancedEmailContact = await AWS.NotificationsContacts.EmailContact("advancedEmailContact", {
  Name: "Advanced Contact",
  EmailAddress: "advanced.contact@example.com",
  Tags: [
    { Key: "Department", Value: "Marketing" },
    { Key: "Role", Value: "Manager" }
  ],
  adopt: true // Allow adoption of existing resources
});
```

## Updating an Existing Contact

Update an existing email contact to change its name and tags.

```ts
const updatedEmailContact = await AWS.NotificationsContacts.EmailContact("existingEmailContact", {
  Name: "Updated Contact Name",
  EmailAddress: "updated.contact@example.com",
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Role", Value: "Sales Associate" }
  ]
});
```

## Deleting an Email Contact

Delete an existing email contact by using the resource ID.

```ts
const deleteEmailContact = await AWS.NotificationsContacts.EmailContact("deleteEmailContact", {
  Name: "Delete This Contact",
  EmailAddress: "delete.contact@example.com"
});

// Perform delete operation
await deleteEmailContact.delete();
```
