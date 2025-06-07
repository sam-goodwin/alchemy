---
title: Managing AWS FraudDetector Detectors with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector Detectors using Alchemy Cloud Control.
---

# Detector

The Detector resource lets you create and manage [AWS FraudDetector Detectors](https://docs.aws.amazon.com/frauddetector/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-frauddetector-detector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const detector = await AWS.FraudDetector.Detector("detector-example", {
  EventType: "example-eventtype",
  DetectorId: "example-detectorid",
  Rules: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A detector resource managed by Alchemy",
});
```

## Advanced Configuration

Create a detector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDetector = await AWS.FraudDetector.Detector("advanced-detector", {
  EventType: "example-eventtype",
  DetectorId: "example-detectorid",
  Rules: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A detector resource managed by Alchemy",
});
```

