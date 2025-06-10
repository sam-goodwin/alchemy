---
title: PublicRepository
description: Learn how to create, update, and manage AWS ECR PublicRepositorys using Alchemy Cloud Control.
---


The PublicRepository resource allows you to manage [AWS ECR PublicRepositorys](https://docs.aws.amazon.com/ecr/latest/userguide/) for storing and sharing container images publicly.

## Minimal Example

Create a basic public repository with a name and repository policy.

```ts
import AWS from "alchemy/aws/control";

const publicRepository = await AWS.ECR.PublicRepository("myPublicRepo", {
  repositoryName: "my-awesome-public-repo",
  repositoryPolicyText: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: { AWS: "*" },
      Action: "ecr:BatchGetImage"
    }]
  }
});
```

## Advanced Configuration

Configure the public repository with additional catalog data and tags.

```ts
const advancedPublicRepository = await AWS.ECR.PublicRepository("myAdvancedPublicRepo", {
  repositoryName: "my-advanced-public-repo",
  repositoryPolicyText: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: { AWS: "*" },
      Action: ["ecr:BatchGetImage", "ecr:DescribeRepositories"]
    }]
  },
  repositoryCatalogData: {
    description: "This is my advanced public repository for container images.",
    displayName: "Advanced Public Repo",
    logoImageBlob: "base64EncodedImageString"
  },
  tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "ECRIntegration" }
  ]
});
```

## Example with Adoption of Existing Resource

Create a public repository while adopting an existing resource if it already exists.

```ts
const adoptedPublicRepository = await AWS.ECR.PublicRepository("myAdoptedRepo", {
  repositoryName: "existing-public-repo",
  adopt: true
});
```
