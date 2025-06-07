---
title: Managing AWS RoboMaker Fleets with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you manage [AWS RoboMaker Fleets](https://docs.aws.amazon.com/robomaker/latest/userguide/) which are collections of robot applications that can be deployed and managed together.

## Minimal Example

Create a basic RoboMaker Fleet with a specified name and tags.

```ts
import AWS from "alchemy/aws/control";

const MyFleet = await AWS.RoboMaker.Fleet("MyFleet", {
  Name: "MyFirstFleet",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Robotics" }
  ]
});
```

## Advanced Configuration

Configure a fleet with an existing resource adoption and additional tags.

```ts
const AdvancedFleet = await AWS.RoboMaker.Fleet("AdvancedFleet", {
  Name: "MyAdvancedFleet",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopts existing fleet if it already exists
});
```

## Fleet Management and Updates

Demonstrate how to update an existing fleet by modifying its name and tags.

```ts
const UpdatedFleet = await AWS.RoboMaker.Fleet("UpdatedFleet", {
  Name: "MyUpdatedFleet",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Robotics" }
  ],
  adopt: true // Ensures existing resources are adopted
});
```