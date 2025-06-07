---
title: Managing AWS EntityResolution IdMappingWorkflows with Alchemy
description: Learn how to create, update, and manage AWS EntityResolution IdMappingWorkflows using Alchemy Cloud Control.
---

# IdMappingWorkflow

The IdMappingWorkflow resource lets you create and manage [AWS EntityResolution IdMappingWorkflows](https://docs.aws.amazon.com/entityresolution/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-entityresolution-idmappingworkflow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const idmappingworkflow = await AWS.EntityResolution.IdMappingWorkflow(
  "idmappingworkflow-example",
  {
    InputSourceConfig: [],
    IdMappingTechniques: "example-idmappingtechniques",
    WorkflowName: "idmappingworkflow-workflow",
    RoleArn: "example-rolearn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A idmappingworkflow resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a idmappingworkflow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIdMappingWorkflow = await AWS.EntityResolution.IdMappingWorkflow(
  "advanced-idmappingworkflow",
  {
    InputSourceConfig: [],
    IdMappingTechniques: "example-idmappingtechniques",
    WorkflowName: "idmappingworkflow-workflow",
    RoleArn: "example-rolearn",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A idmappingworkflow resource managed by Alchemy",
  }
);
```

