---
title: Managing AWS SSMContacts Contacts with Alchemy
description: Learn how to create, update, and manage AWS SSMContacts Contacts using Alchemy Cloud Control.
---

# Contact

The Contact resource lets you create and manage [AWS SSMContacts Contacts](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmcontacts-contact.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const contact = await AWS.SSMContacts.Contact("contact-example", {
  Type: "example-type",
  Alias: "example-alias",
  DisplayName: "contact-display",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a contact with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedContact = await AWS.SSMContacts.Contact("advanced-contact", {
  Type: "example-type",
  Alias: "example-alias",
  DisplayName: "contact-display",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

