---
title: ContactList
description: Learn how to create, update, and manage AWS SES ContactLists using Alchemy Cloud Control.
---


The ContactList resource allows you to manage [AWS SES ContactLists](https://docs.aws.amazon.com/ses/latest/userguide/) for organizing email contacts into lists for your email campaigns.

## Minimal Example

Create a basic contact list with a name and description.

```ts
import AWS from "alchemy/aws/control";

const contactList = await AWS.SES.ContactList("myContactList", {
  ContactListName: "Marketing Contacts",
  Description: "A list of contacts for the marketing team."
});
```

## Advanced Configuration

Add topics and tags to your contact list for better categorization and management.

```ts
const advancedContactList = await AWS.SES.ContactList("advancedContactList", {
  ContactListName: "Sales Contacts",
  Description: "A list of contacts for the sales team.",
  Topics: [
    {
      TopicName: "Product Updates",
      DefaultSubscriptionStatus: "OPT_IN"
    },
    {
      TopicName: "Promotions",
      DefaultSubscriptionStatus: "OPT_IN"
    }
  ],
  Tags: [
    {
      Key: "Department",
      Value: "Sales"
    },
    {
      Key: "Region",
      Value: "North America"
    }
  ]
});
```

## Managing Existing Resources

Adopt an existing contact list instead of failing if it already exists.

```ts
const adoptedContactList = await AWS.SES.ContactList("existingContactList", {
  ContactListName: "Customer Feedback",
  Description: "A list of contacts providing feedback.",
  adopt: true
});
```

## Updating a Contact List

Update the description of an existing contact list.

```ts
const updatedContactList = await AWS.SES.ContactList("updateContactList", {
  ContactListName: "Marketing Contacts",
  Description: "Updated list of contacts for the marketing team."
});
```
