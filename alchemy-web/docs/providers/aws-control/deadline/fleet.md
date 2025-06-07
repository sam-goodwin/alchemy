---
title: Managing AWS Deadline Fleets with Alchemy
description: Learn how to create, update, and manage AWS Deadline Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you create and manage [AWS Deadline Fleets](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-fleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fleet = await AWS.Deadline.Fleet("fleet-example", {
  Configuration: "example-configuration",
  MaxWorkerCount: 1,
  DisplayName: "fleet-display",
  FarmId: "example-farmid",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A fleet resource managed by Alchemy",
});
```

## Advanced Configuration

Create a fleet with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFleet = await AWS.Deadline.Fleet("advanced-fleet", {
  Configuration: "example-configuration",
  MaxWorkerCount: 1,
  DisplayName: "fleet-display",
  FarmId: "example-farmid",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A fleet resource managed by Alchemy",
});
```

