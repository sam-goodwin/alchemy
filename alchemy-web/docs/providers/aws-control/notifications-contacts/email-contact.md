---
title: Managing AWS NotificationsContacts EmailContacts with Alchemy
description: Learn how to create, update, and manage AWS NotificationsContacts EmailContacts using Alchemy Cloud Control.
---

# EmailContact

The EmailContact resource allows you to manage email contacts for notifications in AWS. This can be useful for setting up alerts and notifications for various AWS services. For more information, refer to the [AWS NotificationsContacts EmailContacts](https://docs.aws.amazon.com/notificationscontacts/latest/userguide/).

## Minimal Example

Create a basic email contact with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicEmailContact = await AWS.NotificationsContacts.EmailContact("BasicEmailContact", {
  Name: "John Doe",
  EmailAddress: "john.doe@example.com",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Create an email contact with additional options, such as adopting an existing resource:

```ts
const advancedEmailContact = await AWS.NotificationsContacts.EmailContact("AdvancedEmailContact", {
  Name: "Jane Smith",
  EmailAddress: "jane.smith@example.com",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true // Adopts an existing EmailContact if it already exists
});
```

## Updating an Existing Contact

Update an existing email contact to change the email address and add new tags:

```ts
const updatedEmailContact = await AWS.NotificationsContacts.EmailContact("UpdatedEmailContact", {
  Name: "John Doe",
  EmailAddress: "john.doe@newdomain.com",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Support" }
  ],
  adopt: true // Ensure the existing resource is adopted
});
```