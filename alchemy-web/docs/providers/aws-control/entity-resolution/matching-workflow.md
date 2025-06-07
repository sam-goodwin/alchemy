---
title: Managing AWS EntityResolution MatchingWorkflows with Alchemy
description: Learn how to create, update, and manage AWS EntityResolution MatchingWorkflows using Alchemy Cloud Control.
---

# MatchingWorkflow

The MatchingWorkflow resource lets you create and manage [AWS EntityResolution MatchingWorkflows](https://docs.aws.amazon.com/entityresolution/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-entityresolution-matchingworkflow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const matchingworkflow = await AWS.EntityResolution.MatchingWorkflow("matchingworkflow-example", {
  ResolutionTechniques: "example-resolutiontechniques",
  InputSourceConfig: [],
  WorkflowName: "matchingworkflow-workflow",
  OutputSourceConfig: [],
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A matchingworkflow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a matchingworkflow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMatchingWorkflow = await AWS.EntityResolution.MatchingWorkflow(
  "advanced-matchingworkflow",
  {
    ResolutionTechniques: "example-resolutiontechniques",
    InputSourceConfig: [],
    WorkflowName: "matchingworkflow-workflow",
    OutputSourceConfig: [],
    RoleArn: "example-rolearn",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A matchingworkflow resource managed by Alchemy",
  }
);
```

