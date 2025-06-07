---
title: Managing AWS FraudDetector EventTypes with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector EventTypes using Alchemy Cloud Control.
---

# EventType

The EventType resource lets you create and manage [AWS FraudDetector EventTypes](https://docs.aws.amazon.com/frauddetector/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-frauddetector-eventtype.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventtype = await AWS.FraudDetector.EventType("eventtype-example", {
  EntityTypes: [],
  Labels: [],
  EventVariables: [],
  Name: "eventtype-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A eventtype resource managed by Alchemy",
});
```

## Advanced Configuration

Create a eventtype with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEventType = await AWS.FraudDetector.EventType("advanced-eventtype", {
  EntityTypes: [],
  Labels: [],
  EventVariables: [],
  Name: "eventtype-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A eventtype resource managed by Alchemy",
});
```

