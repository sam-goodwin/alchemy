---
title: Domain
description: Learn how to create, update, and manage AWS CodeArtifact Domains using Alchemy Cloud Control.
---


The Domain resource allows you to manage [AWS CodeArtifact Domains](https://docs.aws.amazon.com/codeartifact/latest/userguide/) which serve as a central repository for your software packages.

## Minimal Example

Create a basic CodeArtifact Domain with a specified name and a permissions policy document.

```ts
import AWS from "alchemy/aws/control";

const codeArtifactDomain = await AWS.CodeArtifact.Domain("myCodeArtifactDomain", {
  DomainName: "my-domain",
  PermissionsPolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "codeartifact:GetDomain",
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a CodeArtifact Domain with additional properties such as an encryption key and tags.

```ts
const secureCodeArtifactDomain = await AWS.CodeArtifact.Domain("secureDomain", {
  DomainName: "secure-domain",
  PermissionsPolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "codeartifact:GetDomain",
        Resource: "*"
      }
    ]
  },
  EncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Adoption of Existing Resource

Use the adoption feature to create a domain only if it does not already exist.

```ts
const adoptedCodeArtifactDomain = await AWS.CodeArtifact.Domain("adoptedDomain", {
  DomainName: "adopted-domain",
  adopt: true // Adopt existing resource if it already exists
});
```

## Managing Tags

Create a CodeArtifact Domain with detailed tagging for better resource management and organization.

```ts
const taggedCodeArtifactDomain = await AWS.CodeArtifact.Domain("taggedDomain", {
  DomainName: "tagged-domain",
  Tags: [
    { Key: "Team", Value: "Development" },
    { Key: "CostCenter", Value: "CC12345" },
    { Key: "Project", Value: "CodeArtifactProject" }
  ]
});
```
