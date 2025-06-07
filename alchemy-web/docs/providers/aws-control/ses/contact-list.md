---
title: Managing AWS SES ContactLists with Alchemy
description: Learn how to create, update, and manage AWS SES ContactLists using Alchemy Cloud Control.
---

# ContactList

The ContactList resource allows you to manage [AWS SES ContactLists](https://docs.aws.amazon.com/ses/latest/userguide/) for organizing and managing email contacts efficiently.

## Minimal Example

This example demonstrates how to create a basic contact list with a name and description.

```ts
import AWS from "alchemy/aws/control";

const basicContactList = await AWS.SES.ContactList("BasicContactList", {
  ContactListName: "CustomerContacts",
  Description: "A list of all customer email addresses",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Marketing" }
  ]
});
```

## Advanced Configuration

Here’s how to create a contact list with topics for managing subscriptions.

```ts
const advancedContactList = await AWS.SES.ContactList("AdvancedContactList", {
  ContactListName: "ProductUpdates",
  Description: "A list for users interested in product updates",
  Topics: [
    {
      TopicName: "ProductNews",
      DisplayName: "Product News",
      DefaultSubscriptionStatus: "OPT_IN"
    },
    {
      TopicName: "Promotions",
      DisplayName: "Promotions",
      DefaultSubscriptionStatus: "OPT_IN"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Sales" }
  ]
});
```

## Adding Existing Resources

If you want to adopt an existing contact list instead of creating a new one, you can specify the adopt property.

```ts
const adoptExistingContactList = await AWS.SES.ContactList("AdoptExistingContactList", {
  ContactListName: "AdoptedCustomerContacts",
  Description: "Adopting an existing contact list",
  adopt: true
});
```

## Updating a ContactList

You can also update an existing contact list by modifying its properties.

```ts
const updatedContactList = await AWS.SES.ContactList("UpdatedContactList", {
  ContactListName: "CustomerContacts",
  Description: "Updated description for customer contacts",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "CustomerSupport" }
  ]
});
```