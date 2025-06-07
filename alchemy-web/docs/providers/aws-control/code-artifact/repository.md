---
title: Managing AWS CodeArtifact Repositorys with Alchemy
description: Learn how to create, update, and manage AWS CodeArtifact Repositorys using Alchemy Cloud Control.
---

# Repository

The Repository resource allows you to create and manage [AWS CodeArtifact Repositories](https://docs.aws.amazon.com/codeartifact/latest/userguide/) for storing and sharing software packages. CodeArtifact is a fully managed artifact repository service that makes it easy to store and retrieve software packages used in your development process.

## Minimal Example

Create a basic CodeArtifact repository with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const minimalRepository = await AWS.CodeArtifact.Repository("MyRepository", {
  DomainName: "MyDomain",
  RepositoryName: "MyRepo",
  Description: "This repository stores my project's artifacts.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a repository with permissions policy and upstream connections.

```ts
const advancedRepository = await AWS.CodeArtifact.Repository("AdvancedRepository", {
  DomainName: "MyDomain",
  RepositoryName: "AdvancedRepo",
  PermissionsPolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "codeartifact:*",
        Resource: "*"
      }
    ]
  },
  Upstreams: ["npmjs", "maven"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## External Connections

Create a repository that utilizes external connections for package sources.

```ts
const externalConnectionRepository = await AWS.CodeArtifact.Repository("ExternalConnectionRepo", {
  DomainName: "MyDomain",
  RepositoryName: "ExternalRepo",
  ExternalConnections: ["public:npm"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing CodeArtifact repository rather than creating a new one.

```ts
const existingRepository = await AWS.CodeArtifact.Repository("ExistingRepository", {
  DomainName: "MyDomain",
  RepositoryName: "MyExistingRepo",
  adopt: true
});
```