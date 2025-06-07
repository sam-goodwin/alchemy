---
title: Managing AWS FraudDetector Lists with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector Lists using Alchemy Cloud Control.
---

# List

The List resource allows you to manage [AWS FraudDetector Lists](https://docs.aws.amazon.com/frauddetector/latest/userguide/) which can be used to store data used in fraud detection models.

## Minimal Example

This example demonstrates how to create a basic FraudDetector List with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicList = await AWS.FraudDetector.List("BasicList", {
  Name: "UserEmails",
  Description: "A list of user email addresses for fraud detection.",
  VariableType: "STRING",
  Elements: ["user1@example.com", "user2@example.com"],
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

In this example, we configure a FraudDetector List with additional properties and multiple elements.

```ts
const advancedList = await AWS.FraudDetector.List("AdvancedList", {
  Name: "TransactionIDs",
  Description: "A list of transaction IDs flagged for review.",
  VariableType: "STRING",
  Elements: [
    "TX123456",
    "TX654321",
    "TX987654",
    "TX456789"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```

## Updating an Existing List

This example shows how to update an existing FraudDetector List by adding new elements.

```ts
const updatedList = await AWS.FraudDetector.List("UpdateList", {
  Name: "UserEmails",
  Description: "Updated list of user email addresses.",
  VariableType: "STRING",
  Elements: [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com" // New element added
  ],
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Adopting an Existing List

This example demonstrates how to adopt an existing FraudDetector List if it already exists.

```ts
const adoptedList = await AWS.FraudDetector.List("AdoptedList", {
  Name: "ExistingUserEmails",
  Description: "Adopting an existing list of user email addresses.",
  VariableType: "STRING",
  Elements: [
    "user1@example.com",
    "user2@example.com"
  ],
  adopt: true // Adopt existing resource instead of failing
});
```