---
title: ModelPackageGroup
description: Learn how to create, update, and manage AWS SageMaker ModelPackageGroups using Alchemy Cloud Control.
---


The ModelPackageGroup resource allows you to manage [AWS SageMaker ModelPackageGroups](https://docs.aws.amazon.com/sagemaker/latest/userguide/) and their associated model packages. This resource is essential for organizing and managing multiple model packages as a single entity.

## Minimal Example

This example demonstrates how to create a basic ModelPackageGroup with the required properties.

```ts
import AWS from "alchemy/aws/control";

const modelPackageGroup = await AWS.SageMaker.ModelPackageGroup("basicModelPackageGroup", {
  ModelPackageGroupName: "MyModelPackageGroup",
  ModelPackageGroupDescription: "This group contains my model packages for project X"
});
```

## Advanced Configuration

In this example, we configure a ModelPackageGroup with a policy and tags for finer access control and organization.

```ts
const advancedModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("advancedModelPackageGroup", {
  ModelPackageGroupName: "AdvancedModelPackageGroup",
  ModelPackageGroupDescription: "This group contains advanced model packages with specific policies",
  ModelPackageGroupPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "sagemaker.amazonaws.com"
        },
        Action: "sagemaker:CreateModelPackage",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Project", Value: "ProjectX" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Creating with Existing Resource Adoption

This example illustrates how to create a ModelPackageGroup while adopting an existing resource if it already exists.

```ts
const adoptModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("adoptModelPackageGroup", {
  ModelPackageGroupName: "AdoptedModelPackageGroup",
  adopt: true // Adopt existing resource if it already exists
});
```
