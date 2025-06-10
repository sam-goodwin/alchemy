---
title: StateMachine
description: Learn how to create, update, and manage AWS StepFunctions StateMachines using Alchemy Cloud Control.
---


The StateMachine resource allows you to define and manage [AWS StepFunctions StateMachines](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) for orchestrating complex workflows in your applications.

## Minimal Example

Create a basic StateMachine with required properties and a simple definition.

```ts
import AWS from "alchemy/aws/control";

const basicStateMachine = await AWS.StepFunctions.StateMachine("BasicStateMachine", {
  roleArn: "arn:aws:iam::123456789012:role/service-role/MyRole",
  definitionString: JSON.stringify({
    StartAt: "HelloWorld",
    States: {
      HelloWorld: {
        Type: "Pass",
        Result: "Hello, World!",
        End: true
      }
    }
  }),
  stateMachineName: "BasicHelloWorldStateMachine"
});
```

## Advanced Configuration

Configure a StateMachine with enhanced logging and tracing settings to monitor execution.

```ts
const advancedStateMachine = await AWS.StepFunctions.StateMachine("AdvancedStateMachine", {
  roleArn: "arn:aws:iam::123456789012:role/service-role/MyRole",
  definitionString: JSON.stringify({
    StartAt: "ProcessOrder",
    States: {
      ProcessOrder: {
        Type: "Task",
        Resource: "arn:aws:lambda:us-east-1:123456789012:function:ProcessOrderFunction",
        End: true
      }
    }
  }),
  loggingConfiguration: {
    level: "ALL",
    includeExecutionData: true,
    destinations: [{
      cloudWatchLogsLogGroupArn: "arn:aws:logs:us-east-1:123456789012:log-group:/aws/vendedlogs/StepFunctions/my-log-group"
    }]
  },
  tracingConfiguration: {
    enabled: true
  }
});
```

## Definition with S3 Location

Create a StateMachine that retrieves its definition from an S3 location.

```ts
const stateMachineFromS3 = await AWS.StepFunctions.StateMachine("StateMachineFromS3", {
  roleArn: "arn:aws:iam::123456789012:role/service-role/MyRole",
  definitionS3Location: {
    bucket: "my-bucket",
    key: "state-machine-definition.json"
  },
  stateMachineName: "StateMachineFromS3"
});
```

## Using Tags

Define a StateMachine with tags for better resource management and cost tracking.

```ts
const taggedStateMachine = await AWS.StepFunctions.StateMachine("TaggedStateMachine", {
  roleArn: "arn:aws:iam::123456789012:role/service-role/MyRole",
  definitionString: JSON.stringify({
    StartAt: "StartProcess",
    States: {
      StartProcess: {
        Type: "Task",
        Resource: "arn:aws:lambda:us-east-1:123456789012:function:StartProcessFunction",
        End: true
      }
    }
  }),
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "OrderProcessing" }
  ]
});
```
