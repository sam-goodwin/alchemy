---
title: Managing AWS SageMaker ModelBiasJobDefinitions with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelBiasJobDefinitions using Alchemy Cloud Control.
---

# ModelBiasJobDefinition

The ModelBiasJobDefinition resource lets you create and manage [AWS SageMaker ModelBiasJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelbiasjobdefinition = await AWS.SageMaker.ModelBiasJobDefinition(
  "modelbiasjobdefinition-example",
  {
    ModelBiasJobInput: "example-modelbiasjobinput",
    ModelBiasJobOutputConfig: "example-modelbiasjoboutputconfig",
    JobResources: "example-jobresources",
    ModelBiasAppSpecification: "example-modelbiasappspecification",
    RoleArn: "example-rolearn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a modelbiasjobdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelBiasJobDefinition = await AWS.SageMaker.ModelBiasJobDefinition(
  "advanced-modelbiasjobdefinition",
  {
    ModelBiasJobInput: "example-modelbiasjobinput",
    ModelBiasJobOutputConfig: "example-modelbiasjoboutputconfig",
    JobResources: "example-jobresources",
    ModelBiasAppSpecification: "example-modelbiasappspecification",
    RoleArn: "example-rolearn",
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

