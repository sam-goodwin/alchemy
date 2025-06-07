---
title: Managing AWS SageMaker ModelPackageGroups with Alchemy
description: Learn how to create, update, and manage AWS SageMaker ModelPackageGroups using Alchemy Cloud Control.
---

# ModelPackageGroup

The ModelPackageGroup resource lets you manage [AWS SageMaker ModelPackageGroups](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for organizing and managing model packages.

## Minimal Example

Create a basic ModelPackageGroup with required name and description.

```ts
import AWS from "alchemy/aws/control";

const BasicModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("BasicModelPackageGroup", {
  ModelPackageGroupName: "MyModelPackageGroup",
  ModelPackageGroupDescription: "A group for managing my ML models."
});
```

## Advanced Configuration

Configure a ModelPackageGroup with a detailed policy and tags.

```ts
const AdvancedModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("AdvancedModelPackageGroup", {
  ModelPackageGroupName: "AdvancedModelPackageGroup",
  ModelPackageGroupDescription: "An advanced group with a policy and tags.",
  ModelPackageGroupPolicy: JSON.stringify({
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
  }),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Example with Existing Resource Adoption

Create a ModelPackageGroup while adopting an existing resource if it already exists.

```ts
const AdoptModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("AdoptModelPackageGroup", {
  ModelPackageGroupName: "ExistingModelPackageGroup",
  adopt: true // Adopt existing resource instead of failing
});
```

## Example with Custom Tags

Create a ModelPackageGroup with custom tags for better resource management.

```ts
const TaggedModelPackageGroup = await AWS.SageMaker.ModelPackageGroup("TaggedModelPackageGroup", {
  ModelPackageGroupName: "TaggedModelPackageGroup",
  Tags: [
    { Key: "Project", Value: "ModelTraining" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```