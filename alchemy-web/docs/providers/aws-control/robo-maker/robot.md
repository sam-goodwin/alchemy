---
title: Managing AWS RoboMaker Robots with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker Robots using Alchemy Cloud Control.
---

# Robot

The Robot resource allows you to create and manage [AWS RoboMaker Robots](https://docs.aws.amazon.com/robomaker/latest/userguide/) for simulation and deployment of robotic applications.

## Minimal Example

Create a basic RoboMaker Robot with essential properties such as architecture and Greengrass group ID.

```ts
import AWS from "alchemy/aws/control";

const BasicRobot = await AWS.RoboMaker.Robot("BasicRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "my-greengrass-group",
  Fleet: "my-robot-fleet", // Optional property
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Robotics" }
  ]
});
```

## Advanced Configuration

Create a RoboMaker Robot with additional configurations including a specific fleet and a name.

```ts
const AdvancedRobot = await AWS.RoboMaker.Robot("AdvancedRobot", {
  Architecture: "ARM64",
  GreengrassGroupId: "my-greengrass-group",
  Fleet: "my-robot-fleet",
  Name: "AdvancedRobotInstance", // Optional property
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Robotics" }
  ]
});
```

## Using Existing Resources

Configure a RoboMaker Robot to adopt an existing resource if it already exists.

```ts
const AdoptExistingRobot = await AWS.RoboMaker.Robot("AdoptExistingRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "my-greengrass-group",
  Fleet: "my-robot-fleet",
  adopt: true // Adopt existing resource
});
```

## Adding Tags for Management

Create a RoboMaker Robot while adding tags for better resource management.

```ts
const TaggedRobot = await AWS.RoboMaker.Robot("TaggedRobot", {
  Architecture: "X86_64",
  GreengrassGroupId: "my-greengrass-group",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```