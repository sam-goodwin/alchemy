---
title: Managing AWS Logs LogAnomalyDetectors with Alchemy
description: Learn how to create, update, and manage AWS Logs LogAnomalyDetectors using Alchemy Cloud Control.
---

# LogAnomalyDetector

The LogAnomalyDetector resource allows you to create and manage anomaly detection capabilities for your AWS Logs, enabling you to identify unusual patterns in your log data. For more information, visit the [AWS Logs LogAnomalyDetectors documentation](https://docs.aws.amazon.com/logs/latest/userguide/).

## Minimal Example

Create a basic LogAnomalyDetector with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAnomalyDetector = await AWS.Logs.LogAnomalyDetector("BasicAnomalyDetector", {
  DetectorName: "MyAnomalyDetector",
  EvaluationFrequency: "PT5M",
  LogGroupArnList: [
    "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group"
  ],
  FilterPattern: "{ $.statusCode = 500 }"
});
```

## Advanced Configuration

Configure a LogAnomalyDetector with additional properties such as KMS Key ID and Anomaly Visibility Time.

```ts
const advancedAnomalyDetector = await AWS.Logs.LogAnomalyDetector("AdvancedAnomalyDetector", {
  DetectorName: "AdvancedAnomalyDetector",
  EvaluationFrequency: "PT1H",
  LogGroupArnList: [
    "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group"
  ],
  FilterPattern: "{ $.statusCode = 500 }",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcdefg-0123-4567-89ab-cdef01234567",
  AnomalyVisibilityTime: 300 // Time in seconds
});
```

## Adoption of Existing Resources

If you want to adopt an existing LogAnomalyDetector instead of creating a new one, you can specify the `adopt` property.

```ts
const adoptedAnomalyDetector = await AWS.Logs.LogAnomalyDetector("AdoptedAnomalyDetector", {
  DetectorName: "ExistingAnomalyDetector",
  LogGroupArnList: [
    "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group"
  ],
  adopt: true
});
```