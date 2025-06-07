---
title: Managing AWS CodeGuruReviewer RepositoryAssociations with Alchemy
description: Learn how to create, update, and manage AWS CodeGuruReviewer RepositoryAssociations using Alchemy Cloud Control.
---

# RepositoryAssociation

The RepositoryAssociation resource lets you manage [AWS CodeGuruReviewer RepositoryAssociations](https://docs.aws.amazon.com/codegurureviewer/latest/userguide/) for integrating version control systems with AWS CodeGuru Reviewer.

## Minimal Example

This example demonstrates how to create a basic RepositoryAssociation with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicRepositoryAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("BasicRepoAssoc", {
  Type: "GitHub",
  Owner: "my-github-organization",
  Name: "my-repo",
  ConnectionArn: "arn:aws:codestar-connections:us-west-2:123456789012:connection/abcd1234-ab12-ab12-ab12-abcd1234abcd",
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

In this example, we configure a RepositoryAssociation with additional properties, including a bucket name.

```ts
const AdvancedRepositoryAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("AdvancedRepoAssoc", {
  Type: "GitHub",
  Owner: "my-github-organization",
  Name: "my-repo",
  ConnectionArn: "arn:aws:codestar-connections:us-west-2:123456789012:connection/abcd1234-ab12-ab12-ab12-abcd1234abcd",
  BucketName: "codeguru-reviewer-bucket",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "CodeGuru" }
  ]
});
```

## Using Adopt Option

This example illustrates how to use the adopt option to associate with an existing repository without failing.

```ts
const AdoptRepositoryAssociation = await AWS.CodeGuruReviewer.RepositoryAssociation("AdoptRepoAssoc", {
  Type: "GitHub",
  Owner: "my-github-organization",
  Name: "existing-repo",
  ConnectionArn: "arn:aws:codestar-connections:us-west-2:123456789012:connection/abcd1234-ab12-ab12-ab12-abcd1234abcd",
  adopt: true
});
```