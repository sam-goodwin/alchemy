---
title: Repository
description: Learn how to create, update, and manage AWS CodeArtifact Repositorys using Alchemy Cloud Control.
---


The Repository resource lets you manage [AWS CodeArtifact Repositorys](https://docs.aws.amazon.com/codeartifact/latest/userguide/) for storing and retrieving packages.

## Minimal Example

Create a basic CodeArtifact repository with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicRepository = await AWS.CodeArtifact.Repository("basic-repo", {
  DomainName: "my-domain",
  RepositoryName: "my-repo",
  Description: "A basic repository for storing npm packages.",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a repository with external connections and permissions policy.

```ts
const advancedRepository = await AWS.CodeArtifact.Repository("advanced-repo", {
  DomainName: "my-domain",
  RepositoryName: "advanced-repo",
  Description: "An advanced repository with external connections.",
  ExternalConnections: ["public:npm"],
  PermissionsPolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "*" },
        Action: "codeartifact:GetPackageVersion",
        Resource: "*"
      }
    ]
  },
  Upstreams: ["public:npm"]
});
```

## Repository with Multiple Upstreams

Create a repository that includes multiple upstream repositories for package resolution.

```ts
const multiUpstreamRepo = await AWS.CodeArtifact.Repository("multi-upstream-repo", {
  DomainName: "my-domain",
  RepositoryName: "multi-upstream-repo",
  Description: "Repository with multiple upstreams for package resolution.",
  Upstreams: ["public:pypi", "public:npm"],
  Tags: [
    { Key: "Project", Value: "MultiRepoIntegration" }
  ]
});
```

## Repository with Domain Owner

Set up a repository specifying a domain owner for better control and management.

```ts
const ownerRepo = await AWS.CodeArtifact.Repository("owner-repo", {
  DomainName: "my-domain",
  RepositoryName: "owner-repo",
  DomainOwner: "123456789012", // Example AWS Account ID
  Description: "A repository owned by a specific AWS account.",
  Tags: [
    { Key: "Owner", Value: "MyAccount" }
  ]
});
```
