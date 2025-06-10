---
title: GitHubRepository
description: Learn how to create, update, and manage AWS CodeStar GitHubRepositorys using Alchemy Cloud Control.
---


The GitHubRepository resource lets you manage [AWS CodeStar GitHubRepositorys](https://docs.aws.amazon.com/codestar/latest/userguide/) for integration with GitHub repositories, facilitating project management and development workflows.

## Minimal Example

Create a basic GitHub repository with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicGitHubRepository = await AWS.CodeStar.GitHubRepository("basicRepo", {
  RepositoryName: "my-awesome-repo",
  RepositoryOwner: "my-github-username",
  EnableIssues: true // Optional: Enable issues for the repository
});
```

## Advanced Configuration

Configure a GitHub repository with additional options such as privacy settings and a description.

```ts
const advancedGitHubRepository = await AWS.CodeStar.GitHubRepository("advancedRepo", {
  RepositoryName: "my-private-repo",
  RepositoryOwner: "my-github-username",
  IsPrivate: true, // Optional: Make the repository private
  RepositoryDescription: "This is a private repository for my project."
});
```

## Repository Access Token

Create a GitHub repository that includes a repository access token for authentication purposes.

```ts
const secureGitHubRepository = await AWS.CodeStar.GitHubRepository("secureRepo", {
  RepositoryName: "my-secure-repo",
  RepositoryOwner: "my-github-username",
  RepositoryAccessToken: alchemy.secret(process.env.GITHUB_ACCESS_TOKEN!), // Secure access token
  EnableIssues: false // Optional: Disable issues for the repository
});
```

## Using Connection ARN

Create a GitHub repository linked with a specific connection ARN for integration.

```ts
const connectedGitHubRepository = await AWS.CodeStar.GitHubRepository("connectedRepo", {
  RepositoryName: "my-connected-repo",
  RepositoryOwner: "my-github-username",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abc12345-6789-0abc-def0-123456789abc", // Example connection ARN
  IsPrivate: true // Optional: Make the repository private
});
```
