---
title: Managing AWS StepFunctions StateMachineAliass with Alchemy
description: Learn how to create, update, and manage AWS StepFunctions StateMachineAliass using Alchemy Cloud Control.
---

# StateMachineAlias

The StateMachineAlias resource lets you create and manage [AWS StepFunctions StateMachineAliass](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-stepfunctions-statemachinealias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const statemachinealias = await AWS.StepFunctions.StateMachineAlias("statemachinealias-example", {
  Description: "A statemachinealias resource managed by Alchemy",
});
```

## Advanced Configuration

Create a statemachinealias with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStateMachineAlias = await AWS.StepFunctions.StateMachineAlias(
  "advanced-statemachinealias",
  { Description: "A statemachinealias resource managed by Alchemy" }
);
```

