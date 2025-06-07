---
title: Managing AWS SageMaker ModelExplainabilityJobDefinitions with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelExplainabilityJobDefinitions using Alchemy Cloud Control.
---

# ModelExplainabilityJobDefinition

The ModelExplainabilityJobDefinition resource lets you create and manage [AWS SageMaker ModelExplainabilityJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelexplainabilityjobdefinition = await AWS.SageMaker.ModelExplainabilityJobDefinition(
  "modelexplainabilityjobdefinition-example",
  {
    ModelExplainabilityJobOutputConfig: "example-modelexplainabilityjoboutputconfig",
    JobResources: "example-jobresources",
    RoleArn: "example-rolearn",
    ModelExplainabilityJobInput: "example-modelexplainabilityjobinput",
    ModelExplainabilityAppSpecification: "example-modelexplainabilityappspecification",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a modelexplainabilityjobdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelExplainabilityJobDefinition =
  await AWS.SageMaker.ModelExplainabilityJobDefinition(
    "advanced-modelexplainabilityjobdefinition",
    {
      ModelExplainabilityJobOutputConfig: "example-modelexplainabilityjoboutputconfig",
      JobResources: "example-jobresources",
      RoleArn: "example-rolearn",
      ModelExplainabilityJobInput: "example-modelexplainabilityjobinput",
      ModelExplainabilityAppSpecification: "example-modelexplainabilityappspecification",
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

