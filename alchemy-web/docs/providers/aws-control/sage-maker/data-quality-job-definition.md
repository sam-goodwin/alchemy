---
title: Managing AWS SageMaker DataQualityJobDefinitions with Alchemy
description: Learn how to create, update, and manage AWS SageMaker DataQualityJobDefinitions using Alchemy Cloud Control.
---

# DataQualityJobDefinition

The DataQualityJobDefinition resource lets you create and manage [AWS SageMaker DataQualityJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataqualityjobdefinition = await AWS.SageMaker.DataQualityJobDefinition(
  "dataqualityjobdefinition-example",
  {
    DataQualityJobInput: "example-dataqualityjobinput",
    DataQualityAppSpecification: "example-dataqualityappspecification",
    JobResources: "example-jobresources",
    DataQualityJobOutputConfig: "example-dataqualityjoboutputconfig",
    RoleArn: "example-rolearn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a dataqualityjobdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataQualityJobDefinition = await AWS.SageMaker.DataQualityJobDefinition(
  "advanced-dataqualityjobdefinition",
  {
    DataQualityJobInput: "example-dataqualityjobinput",
    DataQualityAppSpecification: "example-dataqualityappspecification",
    JobResources: "example-jobresources",
    DataQualityJobOutputConfig: "example-dataqualityjoboutputconfig",
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

