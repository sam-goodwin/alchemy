---
title: AnomalyDetector
description: Learn how to create, update, and manage AWS LookoutMetrics AnomalyDetectors using Alchemy Cloud Control.
---


The AnomalyDetector resource allows you to create and manage [AWS LookoutMetrics AnomalyDetectors](https://docs.aws.amazon.com/lookoutmetrics/latest/userguide/) for detecting anomalies in your data and improving decision-making.

## Minimal Example

Create a basic anomaly detector with required properties and an optional description:

```ts
import AWS from "alchemy/aws/control";

const anomalyDetector = await AWS.LookoutMetrics.AnomalyDetector("basicAnomalyDetector", {
  AnomalyDetectorName: "SalesAnomalyDetector",
  AnomalyDetectorDescription: "Detects anomalies in sales metrics",
  AnomalyDetectorConfig: {
    // Configuration details would go here
  },
  MetricSetList: [
    {
      // Metric set configuration details would go here
    }
  ]
});
```

## Advanced Configuration

Create an anomaly detector with a KMS key for enhanced security and additional metric sets:

```ts
const advancedAnomalyDetector = await AWS.LookoutMetrics.AnomalyDetector("advancedAnomalyDetector", {
  AnomalyDetectorName: "AdvancedSalesAnomalyDetector",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstuv",
  AnomalyDetectorDescription: "Advanced detection of anomalies in sales metrics with encryption",
  AnomalyDetectorConfig: {
    // Configuration details would go here
  },
  MetricSetList: [
    {
      // First metric set configuration details would go here
    },
    {
      // Second metric set configuration details would go here
    }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing anomaly detector without failing if it already exists, you can set the `adopt` property:

```ts
const adoptExistingAnomalyDetector = await AWS.LookoutMetrics.AnomalyDetector("adoptAnomalyDetector", {
  AnomalyDetectorName: "ExistingSalesAnomalyDetector",
  adopt: true,
  AnomalyDetectorConfig: {
    // Configuration details would go here
  },
  MetricSetList: [
    {
      // Metric set configuration details would go here
    }
  ]
});
```
