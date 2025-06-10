---
title: Label
description: Learn how to create, update, and manage AWS FraudDetector Labels using Alchemy Cloud Control.
---


The Label resource lets you manage [AWS FraudDetector Labels](https://docs.aws.amazon.com/frauddetector/latest/userguide/) for identifying and categorizing events for fraud detection.

## Minimal Example

Create a basic label with just the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const fraudLabel = await AWS.FraudDetector.Label("fraud-label", {
  name: "SuspiciousTransaction",
  description: "Label for transactions flagged as suspicious"
});
```

## Advanced Configuration

Create a label with tags for better organization and management.

```ts
const taggedLabel = await AWS.FraudDetector.Label("tagged-fraud-label", {
  name: "HighRiskTransaction",
  description: "Label for transactions identified as high risk",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "FraudDetection" }
  ]
});
```

## Update Existing Label

Adopt an existing label instead of failing if it already exists.

```ts
const existingLabel = await AWS.FraudDetector.Label("existing-fraud-label", {
  name: "ReturningCustomer",
  description: "Label for transactions from returning customers",
  adopt: true // This will adopt if the label already exists
});
```
