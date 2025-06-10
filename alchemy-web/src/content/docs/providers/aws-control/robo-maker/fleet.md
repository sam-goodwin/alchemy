---
title: Fleet
description: Learn how to create, update, and manage AWS RoboMaker Fleets using Alchemy Cloud Control.
---


The Fleet resource lets you manage [AWS RoboMaker Fleets](https://docs.aws.amazon.com/robomaker/latest/userguide/) for deploying and running robotics applications in the cloud.

## Minimal Example

Create a basic RoboMaker Fleet with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicFleet = await AWS.RoboMaker.Fleet("basicFleet", {
  name: "MyRoboFleet",
  tags: {
    Environment: "Development",
    Team: "Robotics"
  }
});
```

## Advanced Configuration

Configure a RoboMaker Fleet with a name and set the `adopt` property to true, allowing it to adopt existing resources.

```ts
const advancedFleet = await AWS.RoboMaker.Fleet("advancedFleet", {
  name: "AdvancedRoboFleet",
  adopt: true,
  tags: {
    Environment: "Production",
    Project: "AutonomousVehicles"
  }
});
```

## Adoption of Existing Resources

Demonstrate how to create a fleet that adopts an already existing resource without failing.

```ts
const existingFleet = await AWS.RoboMaker.Fleet("existingFleet", {
  name: "ExistingRoboFleet",
  adopt: true
});
```

## Fleet with Custom Tags

Create a fleet while specifying custom tags for better resource management and tracking.

```ts
const taggedFleet = await AWS.RoboMaker.Fleet("taggedFleet", {
  name: "TaggedRoboFleet",
  tags: {
    Environment: "Staging",
    Owner: "DevTeam",
    Version: "v1.0"
  }
});
```
