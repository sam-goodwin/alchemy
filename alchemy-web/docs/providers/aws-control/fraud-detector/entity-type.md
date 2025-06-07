---
title: Managing AWS FraudDetector EntityTypes with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector EntityTypes using Alchemy Cloud Control.
---

# EntityType

The EntityType resource allows you to define and manage entity types in AWS FraudDetector. An entity type is a category of entities, such as users or devices, that you want to monitor for fraud detection. For more details, refer to the [AWS FraudDetector EntityTypes documentation](https://docs.aws.amazon.com/frauddetector/latest/userguide/).

## Minimal Example

Create a basic entity type with a name and description.

```ts
import AWS from "alchemy/aws/control";

const BasicEntityType = await AWS.FraudDetector.EntityType("BasicEntityType", {
  Name: "UserAccount",
  Description: "Represents user accounts for fraud detection",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```

## Advanced Configuration

Configure an entity type with additional properties, including adoption of an existing resource.

```ts
const AdvancedEntityType = await AWS.FraudDetector.EntityType("AdvancedEntityType", {
  Name: "Device",
  Description: "Represents devices used by users",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataScience" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Entity Type for Transactions

Define an entity type specifically for transactions to monitor fraud patterns.

```ts
const TransactionEntityType = await AWS.FraudDetector.EntityType("TransactionEntityType", {
  Name: "Transaction",
  Description: "Represents financial transactions for fraud detection",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Finance" }
  ]
});
```

## Use Case: Entity Type for Sessions

Create an entity type to track user sessions, which can help identify suspicious activity.

```ts
const SessionEntityType = await AWS.FraudDetector.EntityType("SessionEntityType", {
  Name: "UserSession",
  Description: "Represents user sessions for monitoring",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Monitoring" }
  ]
});
```