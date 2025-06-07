---
title: Managing AWS SageMaker ModelCards with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelCards using Alchemy Cloud Control.
---

# ModelCard

The ModelCard resource lets you create and manage [AWS SageMaker ModelCards](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelcard.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelcard = await AWS.SageMaker.ModelCard("modelcard-example", {
  ModelCardName: "modelcard-modelcard",
  ModelCardStatus: "example-modelcardstatus",
  Content: "example-content",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a modelcard with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelCard = await AWS.SageMaker.ModelCard("advanced-modelcard", {
  ModelCardName: "modelcard-modelcard",
  ModelCardStatus: "example-modelcardstatus",
  Content: "example-content",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

