---
title: StateMachineVersion
description: Learn how to create, update, and manage AWS StepFunctions StateMachineVersions using Alchemy Cloud Control.
---


The StateMachineVersion resource allows you to manage [AWS StepFunctions StateMachineVersions](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) and their configurations, enabling you to create and manage specific versions of state machines effectively.

## Minimal Example

Create a basic StateMachineVersion with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const stateMachineVersion = await AWS.StepFunctions.StateMachineVersion("basicStateMachineVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine",
  Description: "Initial version of the state machine"
});
```

## Advanced Configuration

Configure a StateMachineVersion with an existing resource adoption.

```ts
const advancedStateMachineVersion = await AWS.StepFunctions.StateMachineVersion("advancedStateMachineVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine",
  StateMachineRevisionId: "12345678-1234-1234-1234-123456789012",
  Description: "Adopting an existing version",
  adopt: true
});
```

## Creating Multiple Versions

You can create multiple versions of a state machine to manage different workflows.

```ts
const versionOne = await AWS.StepFunctions.StateMachineVersion("versionOne", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine",
  Description: "Version 1 of the state machine"
});

const versionTwo = await AWS.StepFunctions.StateMachineVersion("versionTwo", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine",
  StateMachineRevisionId: "87654321-4321-4321-4321-210987654321",
  Description: "Version 2 of the state machine",
  adopt: true
});
```
