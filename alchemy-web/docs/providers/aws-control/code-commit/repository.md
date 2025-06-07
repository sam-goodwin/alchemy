---
title: Managing AWS CodeCommit Repositorys with Alchemy
description: Learn how to create, update, and manage AWS CodeCommit Repositorys using Alchemy Cloud Control.
---

# Repository

The Repository resource lets you manage [AWS CodeCommit Repositories](https://docs.aws.amazon.com/codecommit/latest/userguide/) for source control and collaboration on your code.

## Minimal Example

Create a basic CodeCommit repository with a name and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicRepository = await AWS.CodeCommit.Repository("BasicRepo", {
  RepositoryName: "MyFirstRepo",
  RepositoryDescription: "This is my first CodeCommit repository",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a repository with encryption using KMS and custom triggers for notifications:

```ts
const AdvancedRepository = await AWS.CodeCommit.Repository("AdvancedRepo", {
  RepositoryName: "MyAdvancedRepo",
  RepositoryDescription: "This repository uses advanced settings",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Triggers: [
    {
      Name: "NotifyOnPush",
      DestinationArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
      Events: ["all"],
      Branches: ["main"]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Initial Code Setup

Create a repository and provide initial code from a local directory:

```ts
const RepositoryWithCode = await AWS.CodeCommit.Repository("RepoWithCode", {
  RepositoryName: "MyRepoWithInitialCode",
  RepositoryDescription: "Repository with initial code from local",
  Code: {
    S3: {
      Bucket: "my-code-bucket",
      Key: "initial-code.zip"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```