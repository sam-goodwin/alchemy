---
title: Contact
description: Learn how to create, update, and manage AWS SSMContacts Contacts using Alchemy Cloud Control.
---


The Contact resource lets you manage [AWS SSMContacts Contacts](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) for incident management and on-call scheduling.

## Minimal Example

Create a basic contact with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicContact = await AWS.SSMContacts.Contact("basic-contact", {
  Type: "PERSON",
  Alias: "john-doe",
  DisplayName: "John Doe",
  Plan: [{
    Type: "ON_CALL",
    Stages: [{
      DurationInMinutes: 60,
      Targets: [{
        Type: "PERSON",
        Id: "john-doe"
      }]
    }]
  }]
});
```

## Advanced Configuration

Configure a contact with a more complex on-call plan including multiple stages:

```ts
const advancedContact = await AWS.SSMContacts.Contact("advanced-contact", {
  Type: "PERSON",
  Alias: "jane-doe",
  DisplayName: "Jane Doe",
  Plan: [{
    Type: "ON_CALL",
    Stages: [{
      DurationInMinutes: 120,
      Targets: [{
        Type: "PERSON",
        Id: "jane-doe"
      }]
    }, {
      DurationInMinutes: 30,
      Targets: [{
        Type: "PERSON",
        Id: "john-doe"
      }]
    }]
  }],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using an Existing Contact

Adopt an existing contact if it already exists, preventing failure during resource creation:

```ts
const existingContact = await AWS.SSMContacts.Contact("existing-contact", {
  Type: "PERSON",
  Alias: "existing-alias",
  DisplayName: "Existing Contact",
  adopt: true // This will ensure that the operation does not fail if the contact already exists
});
```
