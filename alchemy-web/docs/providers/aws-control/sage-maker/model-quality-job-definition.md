---
title: Managing AWS SageMaker ModelQualityJobDefinitions with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelQualityJobDefinitions using Alchemy Cloud Control.
---

# ModelQualityJobDefinition

The ModelQualityJobDefinition resource lets you create and manage [AWS SageMaker ModelQualityJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelqualityjobdefinition = await AWS.SageMaker.ModelQualityJobDefinition(
  "modelqualityjobdefinition-example",
  {
    ModelQualityAppSpecification: "example-modelqualityappspecification",
    ModelQualityJobInput: "example-modelqualityjobinput",
    JobResources: "example-jobresources",
    ModelQualityJobOutputConfig: "example-modelqualityjoboutputconfig",
    RoleArn: "example-rolearn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a modelqualityjobdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelQualityJobDefinition = await AWS.SageMaker.ModelQualityJobDefinition(
  "advanced-modelqualityjobdefinition",
  {
    ModelQualityAppSpecification: "example-modelqualityappspecification",
    ModelQualityJobInput: "example-modelqualityjobinput",
    JobResources: "example-jobresources",
    ModelQualityJobOutputConfig: "example-modelqualityjoboutputconfig",
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

