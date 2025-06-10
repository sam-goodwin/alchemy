---
title: SimulationApplication
description: Learn how to create, update, and manage AWS RoboMaker SimulationApplications using Alchemy Cloud Control.
---


The SimulationApplication resource lets you create and manage [AWS RoboMaker SimulationApplications](https://docs.aws.amazon.com/robomaker/latest/userguide/) for running simulations of robotic applications.

## Minimal Example

Create a basic simulation application with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const simulationApp = await AWS.RoboMaker.SimulationApplication("basicSimulationApp", {
  simulationSoftwareSuite: {
    name: "Gazebo",
    version: "9"
  },
  robotSoftwareSuite: {
    name: "ROS",
    version: "Melodic"
  },
  renderingEngine: {
    name: "OGRE",
    version: "1.12"
  },
  name: "BasicSimulationApp"
});
```

## Advanced Configuration

Configure a simulation application with additional properties like environment variables and source configuration.

```ts
const advancedSimulationApp = await AWS.RoboMaker.SimulationApplication("advancedSimulationApp", {
  simulationSoftwareSuite: {
    name: "Gazebo",
    version: "9"
  },
  robotSoftwareSuite: {
    name: "ROS",
    version: "Melodic"
  },
  environment: "MY_ENV_VAR=myValue",
  sources: [{
    s3Bucket: "my-robot-app-bucket",
    s3Key: "my-robot-app.zip"
  }],
  tags: {
    Project: "RoboticsSimulation",
    Environment: "Development"
  },
  name: "AdvancedSimulationApp"
});
```

## Using an Existing Resource

If you want to adopt an existing simulation application instead of creating a new one, you can specify the `adopt` property.

```ts
const existingSimulationApp = await AWS.RoboMaker.SimulationApplication("existingSimulationApp", {
  simulationSoftwareSuite: {
    name: "Gazebo",
    version: "9"
  },
  robotSoftwareSuite: {
    name: "ROS",
    version: "Melodic"
  },
  adopt: true, // Adopting existing resource
  name: "ExistingSimulationApp"
});
```
