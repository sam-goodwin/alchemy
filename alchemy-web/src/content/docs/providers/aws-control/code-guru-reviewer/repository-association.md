---
title: RepositoryAssociation
description: Learn how to create, update, and manage AWS CodeGuruReviewer RepositoryAssociations using Alchemy Cloud Control.
---


The RepositoryAssociation resource allows you to manage [AWS CodeGuruReviewer RepositoryAssociations](https://docs.aws.amazon.com/codegurureviewer/latest/userguide/) that link your repositories to CodeGuru Reviewer for automated code reviews.

## Minimal Example

Create a basic repository association with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const repositoryAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("basicRepoAssociation", {
  Type: "GitHub",
  Name: "my-repo",
  Owner: "my-github-user",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrstuvwxyz"
});
```

## Advanced Configuration

Configure a repository association with additional settings, such as tags for better management.

```ts
const advancedRepoAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("advancedRepoAssociation", {
  Type: "GitHub",
  Name: "advanced-repo",
  Owner: "my-github-user",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrstuvwxyz",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CodeReview" }
  ]
});
```

## Adopting Existing Resources

Create a repository association while adopting an existing resource if it already exists.

```ts
const adoptRepoAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("adoptExistingRepo", {
  Type: "GitHub",
  Name: "existing-repo",
  Owner: "my-github-user",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrstuvwxyz",
  adopt: true
});
```

## Using S3 for Artifacts

Create an association that uses an S3 bucket for storing review artifacts.

```ts
const s3RepoAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("s3RepoAssociation", {
  Type: "GitHub",
  Name: "s3-repo",
  Owner: "my-github-user",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrstuvwxyz",
  BucketName: "my-codeguru-bucket"
});
```
