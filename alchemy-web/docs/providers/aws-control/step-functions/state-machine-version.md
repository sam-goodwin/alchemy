---
title: Managing AWS StepFunctions StateMachineVersions with Alchemy
description: Learn how to create, update, and manage AWS StepFunctions StateMachineVersions using Alchemy Cloud Control.
---

# StateMachineVersion

The StateMachineVersion resource lets you manage [AWS StepFunctions StateMachineVersions](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) and their configurations, allowing you to define the behavior of your state machine versions effectively.

## Minimal Example

Create a basic state machine version with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicStateMachineVersion = await AWS.StepFunctions.StateMachineVersion("BasicVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine",
  StateMachineRevisionId: "1",
  Description: "Basic version of the state machine"
});
```

## Advanced Configuration

Configure a state machine version with additional options, including a detailed description.

```ts
import AWS from "alchemy/aws/control";

const AdvancedStateMachineVersion = await AWS.StepFunctions.StateMachineVersion("AdvancedVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine",
  StateMachineRevisionId: "2",
  Description: "Advanced version of the state machine with additional features",
  adopt: true // Adopt existing resource instead of failing
});
```

## Version Adoption

Create a version of a state machine while adopting any existing versions.

```ts
import AWS from "alchemy/aws/control";

const AdoptedStateMachineVersion = await AWS.StepFunctions.StateMachineVersion("AdoptedVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine",
  StateMachineRevisionId: "3",
  Description: "Adopting an existing state machine version",
  adopt: true
});
```

## Full Resource Example

A more comprehensive example that demonstrates how to manage a state machine version with all properties.

```ts
import AWS from "alchemy/aws/control";

const FullStateMachineVersion = await AWS.StepFunctions.StateMachineVersion("FullVersion", {
  StateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine",
  StateMachineRevisionId: "4",
  Description: "Full version of the state machine with detailed settings",
  adopt: false // Not adopting existing resources
});
```