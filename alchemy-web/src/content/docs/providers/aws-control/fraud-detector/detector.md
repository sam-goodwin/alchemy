---
title: Detector
description: Learn how to create, update, and manage AWS FraudDetector Detectors using Alchemy Cloud Control.
---


The Detector resource lets you manage [AWS FraudDetector Detectors](https://docs.aws.amazon.com/frauddetector/latest/userguide/) for identifying fraudulent activities based on predefined rules and models.

## Minimal Example

Create a basic FraudDetector Detector with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const fraudDetector = await AWS.FraudDetector.Detector("basic-fraud-detector", {
  DetectorId: "basicDetector",
  EventType: {
    Name: "transactionEvent",
    Description: "A transaction event for fraud detection."
  },
  Rules: [
    {
      RuleId: "rule1",
      Expression: "isFraud = true",
      Outcome: "fraudOutcome"
    }
  ],
  Description: "A basic detector to identify fraudulent transactions."
});
```

## Advanced Configuration

Configure a FraudDetector Detector with associated models and rule execution mode.

```ts
const advancedFraudDetector = await AWS.FraudDetector.Detector("advanced-fraud-detector", {
  DetectorId: "advancedDetector",
  EventType: {
    Name: "transactionEvent",
    Description: "A transaction event for fraud detection."
  },
  Rules: [
    {
      RuleId: "rule2",
      Expression: "isFraud = true OR amount > 1000",
      Outcome: "highRiskOutcome"
    }
  ],
  AssociatedModels: [
    {
      ModelId: "fraudDetectionModel",
      ModelType: "FRAUD",
      Version: "1.0"
    }
  ],
  RuleExecutionMode: "FIRST_MATCH",
  Description: "An advanced detector with model associations."
});
```

## Using Tags for Organization

Create a FraudDetector Detector with tags for better organization and management.

```ts
const taggedFraudDetector = await AWS.FraudDetector.Detector("tagged-fraud-detector", {
  DetectorId: "taggedDetector",
  EventType: {
    Name: "transactionEvent",
    Description: "A transaction event for fraud detection."
  },
  Rules: [
    {
      RuleId: "rule3",
      Expression: "isFraud = true",
      Outcome: "fraudOutcome"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Finance"
    }
  ],
  Description: "A detector with tags for organization."
});
```
