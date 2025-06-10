---
title: StateMachineAlias
description: Learn how to create, update, and manage AWS StepFunctions StateMachineAliases using Alchemy Cloud Control.
---


The StateMachineAlias resource lets you create and manage [AWS StepFunctions StateMachineAliases](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) for routing requests to specific versions of your state machines.

## Minimal Example

Create a basic StateMachineAlias with a description and a routing configuration.

```ts
import AWS from "alchemy/aws/control";

const stateMachineAlias = await AWS.StepFunctions.StateMachineAlias("myStateMachineAlias", {
  description: "Alias for my state machine version",
  routingConfiguration: [
    {
      stateMachineVersionArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine:1",
      weight: 100
    }
  ],
  name: "MyStateMachineAlias",
  deployPreference: {
    type: "ALL_AT_ONCE"
  }
});
```

## Advanced Configuration

Configure a StateMachineAlias with multiple routing configurations and deployment preferences.

```ts
const advancedStateMachineAlias = await AWS.StepFunctions.StateMachineAlias("advancedStateMachineAlias", {
  description: "Advanced alias for my state machine versions",
  routingConfiguration: [
    {
      stateMachineVersionArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine:1",
      weight: 70
    },
    {
      stateMachineVersionArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine:2",
      weight: 30
    }
  ],
  name: "AdvancedStateMachineAlias",
  deploymentPreference: {
    type: "CANARY",
    percentage: 20,
    interval: 5
  }
});
```

## Adoption of Existing Resource

Create a StateMachineAlias that adopts an existing resource instead of failing if it already exists.

```ts
const adoptStateMachineAlias = await AWS.StepFunctions.StateMachineAlias("adoptStateMachineAlias", {
  description: "Adopting existing state machine alias",
  routingConfiguration: [
    {
      stateMachineVersionArn: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine:1",
      weight: 100
    }
  ],
  name: "AdoptedStateMachineAlias",
  adopt: true // Adopt existing resource if it exists
});
```
