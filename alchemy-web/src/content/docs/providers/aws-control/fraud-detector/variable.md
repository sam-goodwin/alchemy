---
title: Variable
description: Learn how to create, update, and manage AWS FraudDetector Variables using Alchemy Cloud Control.
---


The Variable resource lets you manage [AWS FraudDetector Variables](https://docs.aws.amazon.com/frauddetector/latest/userguide/) which are crucial for defining and using customizable data inputs for fraud detection models.

## Minimal Example

Create a basic FraudDetector variable with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const fraudVariable = await AWS.FraudDetector.Variable("userAgeVariable", {
  name: "userAge",
  dataType: "NUMERIC",
  defaultValue: "0",
  description: "Represents the age of the user",
  dataSource: "USER_DEFINED"
});
```

## Advanced Configuration

Configure a variable with additional properties, including tags and variable type.

```ts
const advancedVariable = await AWS.FraudDetector.Variable("transactionAmountVariable", {
  name: "transactionAmount",
  dataType: "NUMERIC",
  defaultValue: "0",
  description: "The amount of the transaction made by the user",
  dataSource: "USER_DEFINED",
  variableType: "EVENT",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Application", value: "PaymentGateway" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing resource instead of failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptedVariable = await AWS.FraudDetector.Variable("existingTransactionVariable", {
  name: "existingTransaction",
  dataType: "NUMERIC",
  defaultValue: "100",
  dataSource: "USER_DEFINED",
  adopt: true
});
```

## Detailed Variable for Fraud Detection

Create a detailed variable specifically for tracking user behavior in a fraud detection scenario.

```ts
const userBehaviorVariable = await AWS.FraudDetector.Variable("userBehaviorVariable", {
  name: "userBehaviorScore",
  dataType: "NUMERIC",
  defaultValue: "0",
  description: "A score representing the user's behavior for fraud detection",
  dataSource: "USER_DEFINED",
  variableType: "EVENT",
  tags: [
    { key: "UserType", value: "Premium" },
    { key: "RiskLevel", value: "High" }
  ]
});
```
