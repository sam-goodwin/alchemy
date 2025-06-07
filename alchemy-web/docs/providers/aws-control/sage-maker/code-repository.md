---
title: Managing AWS SageMaker CodeRepositorys with Alchemy
description: Learn how to create, update, and manage AWS SageMaker CodeRepositorys using Alchemy Cloud Control.
---

# CodeRepository

The CodeRepository resource lets you manage [AWS SageMaker CodeRepositorys](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for collaborating on code and version control in machine learning projects.

## Minimal Example

Create a basic CodeRepository with essential properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const basicCodeRepo = await AWS.SageMaker.CodeRepository("BasicCodeRepo", {
  CodeRepositoryName: "MyMLCodeRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-org/my-ml-project.git",
    Branch: "main",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Advanced Configuration

Configure a CodeRepository with additional options, including specific Git settings.

```ts
const advancedCodeRepo = await AWS.SageMaker.CodeRepository("AdvancedCodeRepo", {
  CodeRepositoryName: "AdvancedMLRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-org/advanced-ml-project.git",
    Branch: "develop",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "ML" }
  ],
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Using Existing Code Repositories

This example demonstrates how to adopt an existing CodeRepository without creating a new one.

```ts
const existingCodeRepo = await AWS.SageMaker.CodeRepository("ExistingCodeRepo", {
  CodeRepositoryName: "ExistingMLRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-org/existing-ml-project.git",
    Branch: "master",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret"
  },
  adopt: true // Use the existing resource
});
```

## Tagging for Resource Management

Demonstrating how to tag a CodeRepository for better organization and resource management.

```ts
const taggedCodeRepo = await AWS.SageMaker.CodeRepository("TaggedCodeRepo", {
  CodeRepositoryName: "TaggedMLRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-org/tagged-ml-project.git",
    Branch: "feature-branch",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecret"
  },
  Tags: [
    { Key: "Project", Value: "MLResearch" },
    { Key: "Status", Value: "active" }
  ]
});
```