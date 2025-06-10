---
title: LogAnomalyDetector
description: Learn how to create, update, and manage AWS Logs LogAnomalyDetectors using Alchemy Cloud Control.
---


The LogAnomalyDetector resource allows you to create and manage [AWS Logs LogAnomalyDetectors](https://docs.aws.amazon.com/logs/latest/userguide/), which help identify unusual patterns in your CloudWatch Logs data.

## Minimal Example

Create a basic log anomaly detector with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const logAnomalyDetector = await AWS.Logs.LogAnomalyDetector("myLogAnomalyDetector", {
  DetectorName: "MyFirstAnomalyDetector",
  FilterPattern: "{ $.statusCode = 500 }",
  EvaluationFrequency: "PT5M", // Evaluate every 5 minutes
  AnomalyVisibilityTime: 60 // Anomaly visible for 60 minutes
});
```

## Advanced Configuration

Configure a log anomaly detector with additional options, including specifying a KMS key for encryption and a list of log groups.

```ts
const advancedLogAnomalyDetector = await AWS.Logs.LogAnomalyDetector("advancedLogAnomalyDetector", {
  DetectorName: "AdvancedAnomalyDetector",
  FilterPattern: "{ $.statusCode = 503 }",
  EvaluationFrequency: "PT1H", // Evaluate every hour
  AnomalyVisibilityTime: 120, // Anomaly visible for 120 minutes
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  LogGroupArnList: [
    "arn:aws:logs:us-west-2:123456789012:log-group:/aws/lambda/myLambdaFunction",
    "arn:aws:logs:us-west-2:123456789012:log-group:/aws/ec2/myEC2Instance"
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing log anomaly detector instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptExistingDetector = await AWS.Logs.LogAnomalyDetector("adoptExistingDetector", {
  DetectorName: "ExistingAnomalyDetector",
  adopt: true // Adopt existing resource if present
});
```
