---
title: Managing AWS GuardDuty Detectors with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty Detectors using Alchemy Cloud Control.
---

# Detector

The Detector resource lets you create and manage [AWS GuardDuty Detectors](https://docs.aws.amazon.com/guardduty/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const detector = await AWS.GuardDuty.Detector("detector-example", {
  Enable: true,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a detector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDetector = await AWS.GuardDuty.Detector("advanced-detector", {
  Enable: true,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

