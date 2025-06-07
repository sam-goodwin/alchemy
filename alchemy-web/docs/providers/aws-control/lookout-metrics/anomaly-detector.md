---
title: Managing AWS LookoutMetrics AnomalyDetectors with Alchemy
description: Learn how to create, update, and manage AWS LookoutMetrics AnomalyDetectors using Alchemy Cloud Control.
---

# AnomalyDetector

The AnomalyDetector resource lets you create and manage [AWS LookoutMetrics AnomalyDetectors](https://docs.aws.amazon.com/lookoutmetrics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutmetrics-anomalydetector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const anomalydetector = await AWS.LookoutMetrics.AnomalyDetector("anomalydetector-example", {
  AnomalyDetectorConfig: "example-anomalydetectorconfig",
  MetricSetList: [],
});
```

