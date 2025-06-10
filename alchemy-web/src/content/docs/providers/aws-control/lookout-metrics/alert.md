---
title: Alert
description: Learn how to create, update, and manage AWS LookoutMetrics Alerts using Alchemy Cloud Control.
---


The Alert resource allows you to manage [AWS LookoutMetrics Alerts](https://docs.aws.amazon.com/lookoutmetrics/latest/userguide/) for monitoring anomalies in your data. This resource enables you to set up alerts that notify you when anomalies are detected, allowing for proactive measures in data management.

## Minimal Example

Create a basic alert with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicAlert = await AWS.LookoutMetrics.Alert("basicAlert", {
  Action: {
    Sns: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:anomaly-alerts",
      RoleArn: "arn:aws:iam::123456789012:role/LookoutMetricsRole"
    }
  },
  AnomalyDetectorArn: "arn:aws:lookoutmetrics:us-east-1:123456789012:anomalydetector:my-detector",
  AlertSensitivityThreshold: 75,
  AlertDescription: "Alert for monitoring anomalies in sales data"
});
```

## Advanced Configuration

Configure an alert with a custom name and a specific action including an SNS topic and IAM role:

```ts
const advancedAlert = await AWS.LookoutMetrics.Alert("advancedAlert", {
  Action: {
    Sns: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:custom-anomaly-alerts",
      RoleArn: "arn:aws:iam::123456789012:role/CustomLookoutMetricsRole"
    }
  },
  AnomalyDetectorArn: "arn:aws:lookoutmetrics:us-east-1:123456789012:anomalydetector:custom-detector",
  AlertSensitivityThreshold: 90,
  AlertName: "CustomAlertForSalesData",
  AlertDescription: "This alert monitors anomalies in sales data with high sensitivity"
});
```

## Using Adopt Option

Create an alert that adopts an existing resource if it already exists:

```ts
const adoptAlert = await AWS.LookoutMetrics.Alert("adoptAlert", {
  Action: {
    Sns: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:adopt-anomaly-alerts",
      RoleArn: "arn:aws:iam::123456789012:role/AdoptLookoutMetricsRole"
    }
  },
  AnomalyDetectorArn: "arn:aws:lookoutmetrics:us-east-1:123456789012:anomalydetector:adopt-detector",
  AlertSensitivityThreshold: 80,
  adopt: true // Adopts existing resource
});
```
