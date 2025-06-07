---
title: Managing AWS CodeArtifact Domains with Alchemy
description: Learn how to create, update, and manage AWS CodeArtifact Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource allows you to manage [AWS CodeArtifact Domains](https://docs.aws.amazon.com/codeartifact/latest/userguide/) for your software packages, enabling you to effectively organize and control your package repositories.

## Minimal Example

Create a basic CodeArtifact Domain with default settings and a permissions policy.

```ts
import AWS from "alchemy/aws/control";

const CodeArtifactDomain = await AWS.CodeArtifact.Domain("MyDomain", {
  DomainName: "my-domain",
  PermissionsPolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "codeartifact:*",
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a CodeArtifact Domain with encryption and tags for better management.

```ts
const EncryptedDomain = await AWS.CodeArtifact.Domain("EncryptedDomain", {
  DomainName: "secure-domain",
  EncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing CodeArtifact Domain instead of failing if it already exists.

```ts
const ExistingDomain = await AWS.CodeArtifact.Domain("AdoptedDomain", {
  DomainName: "existing-domain",
  adopt: true
});
```

## Adding Additional Tags

Add tags to an existing CodeArtifact Domain for better resource tracking.

```ts
const TaggedDomain = await AWS.CodeArtifact.Domain("TaggedDomain", {
  DomainName: "tagged-domain",
  Tags: [
    { Key: "Project", Value: "ProjectX" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```