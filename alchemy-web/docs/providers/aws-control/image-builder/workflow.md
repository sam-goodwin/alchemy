---
title: Managing AWS ImageBuilder Workflows with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder Workflows using Alchemy Cloud Control.
---

# Workflow

The Workflow resource lets you create and manage [AWS ImageBuilder Workflows](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-workflow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workflow = await AWS.ImageBuilder.Workflow("workflow-example", {
  Type: "example-type",
  Version: "example-version",
  Name: "workflow-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workflow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workflow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkflow = await AWS.ImageBuilder.Workflow("advanced-workflow", {
  Type: "example-type",
  Version: "example-version",
  Name: "workflow-",
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

