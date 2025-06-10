---
title: Outcome
description: Learn how to create, update, and manage AWS FraudDetector Outcomes using Alchemy Cloud Control.
---


The Outcome resource lets you manage [AWS FraudDetector Outcomes](https://docs.aws.amazon.com/frauddetector/latest/userguide/) that define the results of fraud detection predictions. These outcomes can be used to take actions based on the predictions made by the FraudDetector.

## Minimal Example

Create a basic Outcome with a name and description.

```ts
import AWS from "alchemy/aws/control";

const fraudOutcome = await AWS.FraudDetector.Outcome("fraudOutcome", {
  Name: "HighRiskTransaction",
  Description: "Outcome for transactions deemed high risk."
});
```

## Advanced Configuration

Configure an Outcome with additional tags for better resource categorization.

```ts
const taggedOutcome = await AWS.FraudDetector.Outcome("taggedOutcome", {
  Name: "LowRiskTransaction",
  Description: "Outcome for transactions deemed low risk.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "FraudDetection" }
  ]
});
```

## Adoption of Existing Resource

Create an Outcome that adopts an existing resource instead of failing if it already exists.

```ts
const existingOutcome = await AWS.FraudDetector.Outcome("existingOutcome", {
  Name: "ExistingTransactionOutcome",
  Description: "Outcome for transactions that already exist.",
  adopt: true
});
```
