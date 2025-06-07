---
title: Managing AWS RoboMaker SimulationApplications with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker SimulationApplications using Alchemy Cloud Control.
---

# SimulationApplication

The SimulationApplication resource lets you create and manage [AWS RoboMaker SimulationApplications](https://docs.aws.amazon.com/robomaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-robomaker-simulationapplication.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const simulationapplication = await AWS.RoboMaker.SimulationApplication(
  "simulationapplication-example",
  {
    SimulationSoftwareSuite: "example-simulationsoftwaresuite",
    RobotSoftwareSuite: "example-robotsoftwaresuite",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a simulationapplication with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSimulationApplication = await AWS.RoboMaker.SimulationApplication(
  "advanced-simulationapplication",
  {
    SimulationSoftwareSuite: "example-simulationsoftwaresuite",
    RobotSoftwareSuite: "example-robotsoftwaresuite",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

