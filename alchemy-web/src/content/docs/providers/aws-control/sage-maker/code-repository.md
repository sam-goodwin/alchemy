---
title: CodeRepository
description: Learn how to create, update, and manage AWS SageMaker CodeRepositorys using Alchemy Cloud Control.
---


The CodeRepository resource allows you to manage [AWS SageMaker CodeRepositorys](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for version control of your machine learning code.

## Minimal Example

Create a basic CodeRepository with essential properties:

```ts
import AWS from "alchemy/aws/control";

const simpleCodeRepository = await AWS.SageMaker.CodeRepository("simpleCodeRepo", {
  CodeRepositoryName: "MyCodeRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-user/my-repo.git",
    Branch: "main",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret"
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a CodeRepository with additional tags and settings:

```ts
const advancedCodeRepository = await AWS.SageMaker.CodeRepository("advancedCodeRepo", {
  CodeRepositoryName: "AdvancedRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-user/advanced-repo.git",
    Branch: "dev",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyAdvancedSecret"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MLResearch" }
  ],
  adopt: true
});
```

## Version Control Integration

Create a CodeRepository that integrates with version control systems effectively:

```ts
const versionControlledRepo = await AWS.SageMaker.CodeRepository("versionedRepo", {
  CodeRepositoryName: "VersionControlledRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-user/versioned-repo.git",
    Branch: "release",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyVersionedSecret"
  },
  Tags: [
    { Key: "Purpose", Value: "Training" }
  ]
});
```

## Using Existing Resources

Adopt an existing CodeRepository instead of failing if it already exists:

```ts
const adoptExistingRepo = await AWS.SageMaker.CodeRepository("existingRepo", {
  CodeRepositoryName: "ExistingRepo",
  GitConfig: {
    RepositoryUrl: "https://github.com/my-user/existing-repo.git",
    Branch: "stable",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:MyExistingSecret"
  },
  adopt: true
});
```
