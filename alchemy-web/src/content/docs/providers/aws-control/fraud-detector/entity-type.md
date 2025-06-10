---
title: EntityType
description: Learn how to create, update, and manage AWS FraudDetector EntityTypes using Alchemy Cloud Control.
---


The EntityType resource lets you manage [AWS FraudDetector EntityTypes](https://docs.aws.amazon.com/frauddetector/latest/userguide/) which are essential for defining the types of entities that can be detected in your fraud detection models.

## Minimal Example

Create a basic EntityType with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const basicEntityType = await AWS.FraudDetector.EntityType("basicEntityType", {
  Name: "Customer",
  Description: "Represents a customer in the fraud detection model"
});
```

## Advanced Configuration

Configure an EntityType with tags for better management and organization.

```ts
const taggedEntityType = await AWS.FraudDetector.EntityType("taggedEntityType", {
  Name: "Transaction",
  Description: "Represents a transaction entity for fraud detection",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "FraudDetection" }
  ]
});
```

## Using Adopt Option

Use the adopt option to ensure that the existing resource is used rather than creating a new one.

```ts
const adoptEntityType = await AWS.FraudDetector.EntityType("adoptEntityType", {
  Name: "User",
  Description: "Represents a user entity for tracking",
  adopt: true
});
```

## Viewing EntityType Properties

Create an EntityType and inspect its properties like ARN and creation time.

```ts
const entityTypeWithProperties = await AWS.FraudDetector.EntityType("propertiesEntityType", {
  Name: "Device",
  Description: "Represents a device entity for fraud detection"
});

console.log(`EntityType ARN: ${entityTypeWithProperties.Arn}`);
console.log(`Created at: ${entityTypeWithProperties.CreationTime}`);
```
