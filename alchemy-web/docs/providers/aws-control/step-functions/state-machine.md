---
title: Managing AWS StepFunctions StateMachines with Alchemy
description: Learn how to create, update, and manage AWS StepFunctions StateMachines using Alchemy Cloud Control.
---

# StateMachine

The StateMachine resource lets you create and manage [AWS StepFunctions StateMachines](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-stepfunctions-statemachine.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const statemachine = await AWS.StepFunctions.StateMachine("statemachine-example", {
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a statemachine with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStateMachine = await AWS.StepFunctions.StateMachine("advanced-statemachine", {
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

