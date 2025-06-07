---
title: Managing AWS GameLift ContainerFleets with Alchemy
description: Learn how to create, update, and manage AWS GameLift ContainerFleets using Alchemy Cloud Control.
---

# ContainerFleet

The ContainerFleet resource lets you create and manage [AWS GameLift ContainerFleets](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-containerfleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const containerfleet = await AWS.GameLift.ContainerFleet("containerfleet-example", {
  FleetRoleArn: "example-fleetrolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A containerfleet resource managed by Alchemy",
});
```

## Advanced Configuration

Create a containerfleet with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedContainerFleet = await AWS.GameLift.ContainerFleet("advanced-containerfleet", {
  FleetRoleArn: "example-fleetrolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A containerfleet resource managed by Alchemy",
});
```

