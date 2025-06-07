---
title: Managing AWS Transfer Workflows with Alchemy
description: Learn how to create, update, and manage AWS Transfer Workflows using Alchemy Cloud Control.
---

# Workflow

The Workflow resource lets you create and manage [AWS Transfer Workflows](https://docs.aws.amazon.com/transfer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workflow = await AWS.Transfer.Workflow("workflow-example", {
  Steps: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workflow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workflow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkflow = await AWS.Transfer.Workflow("advanced-workflow", {
  Steps: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A workflow resource managed by Alchemy",
});
```

