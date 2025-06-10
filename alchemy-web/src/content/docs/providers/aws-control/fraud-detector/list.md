---
title: List
description: Learn how to create, update, and manage AWS FraudDetector Lists using Alchemy Cloud Control.
---


The List resource lets you manage [AWS FraudDetector Lists](https://docs.aws.amazon.com/frauddetector/latest/userguide/) which are used to store and manage sets of variables for fraud detection.

## Minimal Example

Create a basic FraudDetector List with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const fraudDetectorList = await AWS.FraudDetector.List("myFraudDetectorList", {
  name: "customer_ids",
  description: "A list of customer IDs for fraud detection",
  variableType: "STRING",
  elements: ["12345", "67890", "abcde"]
});
```

## Advanced Configuration

Configure a FraudDetector List with tags for better organization and management.

```ts
const taggedFraudDetectorList = await AWS.FraudDetector.List("taggedFraudDetectorList", {
  name: "transaction_ids",
  description: "A list of transaction IDs for fraud detection",
  variableType: "STRING",
  elements: ["tx-1001", "tx-1002", "tx-1003"],
  tags: [
    { key: "environment", value: "production" },
    { key: "team", value: "fraud-prevention" }
  ]
});
```

## Using Existing Lists

You can adopt an existing FraudDetector List instead of creating a new one if it already exists.

```ts
const existingFraudDetectorList = await AWS.FraudDetector.List("adoptedFraudDetectorList", {
  name: "user_emails",
  description: "A list of user email addresses for fraud detection",
  variableType: "STRING",
  elements: ["user@example.com", "admin@example.com"],
  adopt: true
});
```
