---
title: Managing AWS SageMaker ModelPackages with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelPackages using Alchemy Cloud Control.
---

# ModelPackage

The ModelPackage resource lets you create and manage [AWS SageMaker ModelPackages](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackage.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelpackage = await AWS.SageMaker.ModelPackage("modelpackage-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a modelpackage with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelPackage = await AWS.SageMaker.ModelPackage("advanced-modelpackage", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

