---
title: Repository
description: Learn how to create, update, and manage AWS ECR Repositorys using Alchemy Cloud Control.
---


The Repository resource lets you manage [AWS ECR Repositories](https://docs.aws.amazon.com/ecr/latest/userguide/) for storing and managing Docker container images.

## Minimal Example

Create a basic ECR repository with default settings:

```ts
import AWS from "alchemy/aws/control";

const ecrRepository = await AWS.ECR.Repository("myEcrRepository", {
  repositoryName: "my-docker-repo",
  imageTagMutability: "MUTABLE",
  tags: [
    { key: "Environment", value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an ECR repository with image scanning and encryption settings:

```ts
const secureEcrRepository = await AWS.ECR.Repository("secureEcrRepository", {
  repositoryName: "secure-docker-repo",
  imageTagMutability: "IMMUTABLE",
  imageScanningConfiguration: {
    scanOnPush: true
  },
  encryptionConfiguration: {
    encryptionType: "AES256"
  },
  lifecyclePolicy: {
    rules: [
      {
        rulePriority: 1,
        selectionTag: { key: "Environment", value: "Staging" },
        action: { type: "expire" },
        expirationInDays: 30
      }
    ]
  },
  tags: [
    { key: "Environment", value: "Staging" }
  ]
});
```

## Repository Policy

Set a repository policy to control access permissions:

```ts
const policyEcrRepository = await AWS.ECR.Repository("policyEcrRepository", {
  repositoryName: "policy-docker-repo",
  repositoryPolicyText: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::123456789012:role/myECRRole" },
        Action: "ecr:BatchCheckLayerAvailability"
      }
    ]
  }
});
```

## Empty on Delete

Create a repository that empties its contents upon deletion:

```ts
const emptyOnDeleteEcrRepository = await AWS.ECR.Repository("emptyOnDeleteEcrRepository", {
  repositoryName: "empty-repo",
  emptyOnDelete: true,
  tags: [
    { key: "Environment", value: "Production" }
  ]
});
```
