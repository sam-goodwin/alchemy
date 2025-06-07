---
title: Managing AWS AppIntegrations EventIntegrations with Alchemy
description: Learn how to create, update, and manage AWS AppIntegrations EventIntegrations using Alchemy Cloud Control.
---

# EventIntegration

The EventIntegration resource lets you create and manage [AWS AppIntegrations EventIntegrations](https://docs.aws.amazon.com/appintegrations/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appintegrations-eventintegration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventintegration = await AWS.AppIntegrations.EventIntegration("eventintegration-example", {
  EventBridgeBus: "example-eventbridgebus",
  EventFilter: "example-eventfilter",
  Name: "eventintegration-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A eventintegration resource managed by Alchemy",
});
```

## Advanced Configuration

Create a eventintegration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEventIntegration = await AWS.AppIntegrations.EventIntegration(
  "advanced-eventintegration",
  {
    EventBridgeBus: "example-eventbridgebus",
    EventFilter: "example-eventfilter",
    Name: "eventintegration-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A eventintegration resource managed by Alchemy",
  }
);
```

