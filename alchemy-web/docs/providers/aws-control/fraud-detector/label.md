---
title: Managing AWS FraudDetector Labels with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector Labels using Alchemy Cloud Control.
---

# Label

The Label resource lets you create and manage [AWS FraudDetector Labels](https://docs.aws.amazon.com/frauddetector/latest/userguide/) for identifying and categorizing fraudulent activities in your applications.

## Minimal Example

Create a basic FraudDetector Label with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const fraudLabel = await AWS.FraudDetector.Label("FraudLabel", {
  Name: "CreditCardFraud",
  Description: "Label to identify credit card fraud attempts"
});
```

## Advanced Configuration

Create a Label with tags for better resource management and organization.

```ts
const taggedFraudLabel = await AWS.FraudDetector.Label("TaggedFraudLabel", {
  Name: "AccountTakeover",
  Description: "Label to identify account takeover attempts",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing FraudDetector Label if it already exists in the environment.

```ts
const adoptExistingLabel = await AWS.FraudDetector.Label("AdoptLabel", {
  Name: "ReturnFraud",
  Description: "Label to track return fraud cases",
  adopt: true // Adopt existing resource instead of failing
});
```

## Updating an Existing Label

Update the description of an existing FraudDetector Label.

```ts
const updateLabel = await AWS.FraudDetector.Label("UpdateLabel", {
  Name: "GiftCardFraud",
  Description: "Updated label to identify fraudulent gift card transactions",
  adopt: true
});
```