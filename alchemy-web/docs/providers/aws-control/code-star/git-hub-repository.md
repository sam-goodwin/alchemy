---
title: Managing AWS CodeStar GitHubRepositorys with Alchemy
description: Learn how to create, update, and manage AWS CodeStar GitHubRepositorys using Alchemy Cloud Control.
---

# GitHubRepository

The GitHubRepository resource allows you to create and manage [AWS CodeStar GitHub repositories](https://docs.aws.amazon.com/codestar/latest/userguide/) within your AWS environment.

## Minimal Example

Create a basic GitHub repository with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicGitHubRepo = await AWS.CodeStar.GitHubRepository("MyGitHubRepo", {
  RepositoryName: "MyProjectRepo",
  RepositoryOwner: "my-github-username",
  IsPrivate: true,
  EnableIssues: true
});
```

## Advanced Configuration

Configure a GitHub repository with additional options including a description and access token.

```ts
const advancedGitHubRepo = await AWS.CodeStar.GitHubRepository("AdvancedGitHubRepo", {
  RepositoryName: "AdvancedProjectRepo",
  RepositoryOwner: "my-github-username",
  IsPrivate: false,
  RepositoryDescription: "This repository is for advanced project management.",
  RepositoryAccessToken: "my-secret-token",
  EnableIssues: true,
  ConnectionArn: "arn:aws:codestar-connections:us-west-2:123456789012:connection/abcd1234-efgh-5678-ijkl-90mnopqrst"
});
```

## Adoption of Existing Repository

Adopt an existing GitHub repository rather than creating a new one if it already exists.

```ts
const adoptExistingRepo = await AWS.CodeStar.GitHubRepository("AdoptedGitHubRepo", {
  RepositoryName: "ExistingRepoName",
  RepositoryOwner: "my-github-username",
  adopt: true
});
```

## Repository with Custom Code Configuration

Create a repository with a custom code configuration for initial setup.

```ts
const customCodeRepo = await AWS.CodeStar.GitHubRepository("CustomCodeGitHubRepo", {
  RepositoryName: "CustomCodeRepo",
  RepositoryOwner: "my-github-username",
  Code: {
    S3: {
      Bucket: "my-code-bucket",
      Key: "path/to/my/code.zip"
    }
  }
});
``` 

This example demonstrates how to set up a GitHub repository with an initial code configuration from an S3 bucket, facilitating an automated deployment process.