---
title: Managing AWS AppFlow Flows with Alchemy
description: Learn how to create, update, and manage AWS AppFlow Flows using Alchemy Cloud Control.
---

# Flow

The Flow resource lets you create and manage [AWS AppFlow Flows](https://docs.aws.amazon.com/appflow/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flow = await AWS.AppFlow.Flow("flow-example", {
  Tasks: [],
  FlowName: "flow-flow",
  TriggerConfig: "example-triggerconfig",
  DestinationFlowConfigList: [],
  SourceFlowConfig: "example-sourceflowconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A flow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a flow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlow = await AWS.AppFlow.Flow("advanced-flow", {
  Tasks: [],
  FlowName: "flow-flow",
  TriggerConfig: "example-triggerconfig",
  DestinationFlowConfigList: [],
  SourceFlowConfig: "example-sourceflowconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A flow resource managed by Alchemy",
});
```

