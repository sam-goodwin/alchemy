---
title: Managing AWS SimSpaceWeaver Simulations with Alchemy
description: Learn how to create, update, and manage AWS SimSpaceWeaver Simulations using Alchemy Cloud Control.
---

# Simulation

The Simulation resource lets you create and manage [AWS SimSpaceWeaver Simulations](https://docs.aws.amazon.com/simspaceweaver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-simspaceweaver-simulation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const simulation = await AWS.SimSpaceWeaver.Simulation("simulation-example", {
  RoleArn: "example-rolearn",
  Name: "simulation-",
});
```

