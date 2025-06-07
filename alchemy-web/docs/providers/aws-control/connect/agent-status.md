---
title: Managing AWS Connect AgentStatuss with Alchemy
description: Learn how to create, update, and manage AWS Connect AgentStatuss using Alchemy Cloud Control.
---

# AgentStatus

The AgentStatus resource lets you create and manage [AWS Connect AgentStatuss](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-agentstatus.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const agentstatus = await AWS.Connect.AgentStatus("agentstatus-example", {
  State: "example-state",
  InstanceArn: "example-instancearn",
  Name: "agentstatus-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A agentstatus resource managed by Alchemy",
});
```

## Advanced Configuration

Create a agentstatus with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAgentStatus = await AWS.Connect.AgentStatus("advanced-agentstatus", {
  State: "example-state",
  InstanceArn: "example-instancearn",
  Name: "agentstatus-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A agentstatus resource managed by Alchemy",
});
```

