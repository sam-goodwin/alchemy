---
title: Robot
description: Learn how to create, update, and manage AWS RoboMaker Robots using Alchemy Cloud Control.
---


The Robot resource allows you to create and manage [AWS RoboMaker Robots](https://docs.aws.amazon.com/robomaker/latest/userguide/). RoboMaker provides a platform for developing, testing, and deploying robotics applications at scale.

## Minimal Example

Create a basic Robot with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const myRobot = await AWS.RoboMaker.Robot("myFirstRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "myGreengrassGroup",
  Fleet: "myRobotFleet", // Optional: Specify the fleet this robot belongs to
  Name: "MyRobot"
});
```

## Advanced Configuration

Configure a Robot with additional properties, including tags for better management.

```ts
const advancedRobot = await AWS.RoboMaker.Robot("advancedRobot", {
  Architecture: "ARM64",
  GreengrassGroupId: "myAdvancedGreengrassGroup",
  Tags: {
    Environment: "Production",
    Owner: "RobotTeam"
  },
  Name: "AdvancedRobot"
});
```

## Adoption of Existing Resource

Create a Robot that adopts an existing resource if it already exists.

```ts
const adoptedRobot = await AWS.RoboMaker.Robot("existingRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "myGreengrassGroup",
  adopt: true // Attempt to adopt existing resource
});
```

## Updating a Robot

Update an existing Robot's properties, such as adding tags.

```ts
const updatedRobot = await AWS.RoboMaker.Robot("updateRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "myGreengrassGroup",
  Tags: {
    Project: "RoboProject",
    Status: "Active"
  },
  Name: "UpdatedRobot"
});
```
