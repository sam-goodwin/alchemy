---
title: Managing AWS ECR Repositories with Alchemy
description: Learn how to create, update, and manage AWS ECR Repositories using Alchemy Cloud Control.
---

# Repository

The Repository resource lets you manage [AWS ECR Repositories](https://docs.aws.amazon.com/ecr/latest/userguide/) for storing, managing, and deploying Docker container images.

## Minimal Example

Create a basic ECR repository with a name and enable image scanning.

```ts
import AWS from "alchemy/aws/control";

const MyEcrRepository = await AWS.ECR.Repository("MyEcrRepository", {
  RepositoryName: "my-app-repo",
  ImageScanningConfiguration: {
    ScanOnPush: true
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an ECR repository with lifecycle policies and encryption settings.

```ts
const SecureEcrRepository = await AWS.ECR.Repository("SecureEcrRepository", {
  RepositoryName: "secure-app-repo",
  ImageTagMutability: "MUTABLE",
  LifecyclePolicy: {
    LifecyclePolicyText: JSON.stringify({
      Rules: [
        {
          RulePriority: 1,
          SelectionCriteria: {
            TagStatus: "untagged"
          },
          Action: {
            Type: "expire"
          }
        }
      ]
    })
  },
  EncryptionConfiguration: {
    EncryptionType: "AES256"
  }
});
```

## Repository Policy Example

Set a repository policy to control access to the ECR repository.

```ts
const RepositoryPolicy = await AWS.ECR.Repository("RepositoryPolicy", {
  RepositoryName: "my-secure-repo",
  RepositoryPolicyText: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "codebuild.amazonaws.com"
        },
        Action: "ecr:BatchGetImage"
      }
    ]
  }
});
```

## Empty on Delete Example

Create an ECR repository that will be emptied before deletion.

```ts
const EmptyOnDeleteEcrRepository = await AWS.ECR.Repository("EmptyOnDeleteEcrRepository", {
  RepositoryName: "empty-on-delete-repo",
  EmptyOnDelete: true
});
```