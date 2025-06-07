---
title: Managing AWS CloudWatch AnomalyDetectors with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch AnomalyDetectors using Alchemy Cloud Control.
---

# AnomalyDetector

The AnomalyDetector resource lets you create and manage [AWS CloudWatch AnomalyDetectors](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-anomalydetector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const anomalydetector = await AWS.CloudWatch.AnomalyDetector("anomalydetector-example", {});
```

## Advanced Configuration

Create a anomalydetector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnomalyDetector = await AWS.CloudWatch.AnomalyDetector("advanced-anomalydetector", {
  Configuration: "example-configuration",
});
```

