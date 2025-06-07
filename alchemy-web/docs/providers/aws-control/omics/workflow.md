---
title: Managing AWS Omics Workflows with Alchemy
description: Learn how to create, update, and manage AWS Omics Workflows using Alchemy Cloud Control.
---

# Workflow

The Workflow resource lets you create and manage [AWS Omics Workflows](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-workflow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workflow = await AWS.Omics.Workflow("workflow-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workflow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workflow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkflow = await AWS.Omics.Workflow("advanced-workflow", {
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

