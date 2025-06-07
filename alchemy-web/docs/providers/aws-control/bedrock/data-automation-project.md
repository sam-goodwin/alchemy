---
title: Managing AWS Bedrock DataAutomationProjects with Alchemy
description: Learn how to create, update, and manage AWS Bedrock DataAutomationProjects using Alchemy Cloud Control.
---

# DataAutomationProject

The DataAutomationProject resource lets you create and manage [AWS Bedrock DataAutomationProjects](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-dataautomationproject.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataautomationproject = await AWS.Bedrock.DataAutomationProject(
  "dataautomationproject-example",
  {
    ProjectName: "dataautomationproject-project",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a dataautomationproject with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataAutomationProject = await AWS.Bedrock.DataAutomationProject(
  "advanced-dataautomationproject",
  {
    ProjectName: "dataautomationproject-project",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

