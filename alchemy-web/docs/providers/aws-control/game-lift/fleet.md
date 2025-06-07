---
title: Managing AWS GameLift Fleets with Alchemy
description: Learn how to create, update, and manage AWS GameLift Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you create and manage [AWS GameLift Fleets](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fleet = await AWS.GameLift.Fleet("fleet-example", {
  Name: "fleet-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A fleet resource managed by Alchemy",
});
```

## Advanced Configuration

Create a fleet with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFleet = await AWS.GameLift.Fleet("advanced-fleet", {
  Name: "fleet-",
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

