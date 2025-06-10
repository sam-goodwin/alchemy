---
title: RepositoryLink
description: Learn how to create, update, and manage AWS CodeStarConnections RepositoryLinks using Alchemy Cloud Control.
---


The RepositoryLink resource allows you to manage [AWS CodeStarConnections RepositoryLinks](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) for linking your source code repositories to your AWS CodeStar projects.

## Minimal Example

Create a basic RepositoryLink with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("BasicRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrst",
  RepositoryName: "MyAwesomeRepo",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "CodeStarDemo" }
  ]
});
```

## Advanced Configuration

Add an encryption key ARN for enhanced security when creating a RepositoryLink.

```ts
const secureRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("SecureRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrst",
  RepositoryName: "MySecureRepo",
  EncryptionKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Example with Existing Resource Adoption

Create a RepositoryLink that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedRepositoryLink = await AWS.CodeStarConnections.RepositoryLink("AdoptedRepoLink", {
  OwnerId: "123456789012",
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-56ef-78gh-90ij-klmnopqrst",
  RepositoryName: "MyAdoptedRepo",
  adopt: true
});
```
