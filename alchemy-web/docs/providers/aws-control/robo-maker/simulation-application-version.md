---
title: Managing AWS RoboMaker SimulationApplicationVersions with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker SimulationApplicationVersions using Alchemy Cloud Control.
---

# SimulationApplicationVersion

The SimulationApplicationVersion resource lets you create and manage [AWS RoboMaker SimulationApplicationVersions](https://docs.aws.amazon.com/robomaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-robomaker-simulationapplicationversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const simulationapplicationversion = await AWS.RoboMaker.SimulationApplicationVersion(
  "simulationapplicationversion-example",
  { Application: "example-application" }
);
```

