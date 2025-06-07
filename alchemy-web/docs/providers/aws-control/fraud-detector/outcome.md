---
title: Managing AWS FraudDetector Outcomes with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector Outcomes using Alchemy Cloud Control.
---

# Outcome

The Outcome resource lets you manage [AWS FraudDetector Outcomes](https://docs.aws.amazon.com/frauddetector/latest/userguide/) which are used to define the result of a fraud detection model, such as whether a transaction is considered fraudulent or legitimate.

## Minimal Example

Create a basic Outcome resource with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const fraudOutcome = await AWS.FraudDetector.Outcome("FraudOutcome", {
  Name: "HighRiskTransaction",
  Description: "Outcome for high risk transactions",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```

## Advanced Configuration

Define an Outcome with additional details such as tags for improved resource management.

```ts
const advancedOutcome = await AWS.FraudDetector.Outcome("AdvancedFraudOutcome", {
  Name: "ModerateRiskTransaction",
  Description: "Outcome for moderate risk transactions",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "FraudDetection" }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Custom Behavior for Multiple Outcomes

Create multiple Outcomes to handle different fraud detection scenarios effectively.

```ts
const lowRiskOutcome = await AWS.FraudDetector.Outcome("LowRiskOutcome", {
  Name: "LowRiskTransaction",
  Description: "Outcome for low risk transactions",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});

const highRiskOutcome = await AWS.FraudDetector.Outcome("HighRiskOutcome", {
  Name: "HighRiskTransaction",
  Description: "Outcome for high risk transactions",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```