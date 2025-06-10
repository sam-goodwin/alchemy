---
title: Repository
description: Learn how to create, update, and manage AWS CodeCommit Repositorys using Alchemy Cloud Control.
---


The Repository resource lets you manage [AWS CodeCommit repositories](https://docs.aws.amazon.com/codecommit/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic CodeCommit repository with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const codeCommitRepo = await AWS.CodeCommit.Repository("myRepo", {
  RepositoryName: "MyFirstRepo",
  RepositoryDescription: "This is my first CodeCommit repository",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id"
});
```

## Advanced Configuration

Create a repository with triggers that notify an AWS Lambda function on repository events.

```ts
const repoWithTriggers = await AWS.CodeCommit.Repository("repoWithTriggers", {
  RepositoryName: "MyRepoWithTriggers",
  Triggers: [{
    Name: "MyTrigger",
    DestinationArn: "arn:aws:lambda:us-east-1:123456789012:function:myLambdaFunction",
    Events: ["all"],
    Branches: ["main"]
  }],
  RepositoryDescription: "This repository has triggers configured."
});
```

## Repository with Tags

Create a CodeCommit repository and apply tags to it for better organization and management.

```ts
const taggedRepo = await AWS.CodeCommit.Repository("taggedRepo", {
  RepositoryName: "MyTaggedRepo",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "ProjectX" }
  ]
});
```

## Repository with Initial Code

Create a repository and also initialize it with some initial code.

```ts
const repoWithInitialCode = await AWS.CodeCommit.Repository("repoWithInitialCode", {
  RepositoryName: "MyRepoWithInitialCode",
  Code: {
    S3: {
      Bucket: "my-bucket",
      Key: "initial-code.zip"
    }
  },
  RepositoryDescription: "This repository is initialized with code from S3."
});
```
