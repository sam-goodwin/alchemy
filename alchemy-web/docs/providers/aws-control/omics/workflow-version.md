---
title: Managing AWS Omics WorkflowVersions with Alchemy
description: Learn how to create, update, and manage AWS Omics WorkflowVersions using Alchemy Cloud Control.
---

# WorkflowVersion

The WorkflowVersion resource lets you create and manage [AWS Omics WorkflowVersions](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-workflowversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workflowversion = await AWS.Omics.WorkflowVersion("workflowversion-example", {
  VersionName: "workflowversion-version",
  WorkflowId: "example-workflowid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workflowversion resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workflowversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkflowVersion = await AWS.Omics.WorkflowVersion("advanced-workflowversion", {
  VersionName: "workflowversion-version",
  WorkflowId: "example-workflowid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A workflowversion resource managed by Alchemy",
});
```

