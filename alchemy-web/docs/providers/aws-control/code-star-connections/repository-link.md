---
title: Managing AWS CodeStarConnections RepositoryLinks with Alchemy
description: Learn how to create, update, and manage AWS CodeStarConnections RepositoryLinks using Alchemy Cloud Control.
---

# RepositoryLink

The RepositoryLink resource allows you to manage [AWS CodeStarConnections RepositoryLinks](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) for integrating your repositories with AWS services.

## Minimal Example

Create a basic RepositoryLink with required properties and one optional encryption key:

```ts
import AWS from "alchemy/aws/control";

const BasicRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("BasicRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-5678-90ef-ghij-klmnopqrst",
  RepositoryName: "MyRepository",
  EncryptionKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-123456abcdef",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a RepositoryLink with additional settings including tags for better organization:

```ts
const AdvancedRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("AdvancedRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:us-west-2:123456789012:connection/xyz9876-5432-10ab-cdef-ghijklmnopqr",
  RepositoryName: "AnotherRepo",
  Tags: [
    { Key: "Project", Value: "WebApp" },
    { Key: "Team", Value: "Frontend" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing RepositoryLink instead of failing when it already exists, set the adopt property to true:

```ts
const AdoptExistingRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("AdoptRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:eu-central-1:123456789012:connection/abcd5678-1234-90ef-ghij-klmnopqrst",
  RepositoryName: "ExistingRepo",
  adopt: true
});
```