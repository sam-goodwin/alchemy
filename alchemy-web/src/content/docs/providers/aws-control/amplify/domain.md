---
title: Domain
description: Learn how to create, update, and manage AWS Amplify Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS Amplify Domains](https://docs.aws.amazon.com/amplify/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Amplify Domain with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const amplifyDomain = await AWS.Amplify.Domain("myAmplifyDomain", {
  SubDomainSettings: [
    {
      DomainPrefix: "app",
      BranchName: "main"
    }
  ],
  AppId: "abcdefgh123456",
  DomainName: "myapp.com",
  EnableAutoSubDomain: true
});
```

## Advanced Configuration

Configure an Amplify Domain with custom certificate settings.

```ts
const secureAmplifyDomain = await AWS.Amplify.Domain("secureAmplifyDomain", {
  SubDomainSettings: [
    {
      DomainPrefix: "blog",
      BranchName: "blog"
    }
  ],
  AppId: "abcdefgh123456",
  DomainName: "myapp.com",
  EnableAutoSubDomain: true,
  CertificateSettings: {
    CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv"
  }
});
```

## Custom IAM Role for Auto Subdomains

Create an Amplify Domain with a custom IAM role for automatic subdomain management.

```ts
const domainWithCustomRole = await AWS.Amplify.Domain("customRoleAmplifyDomain", {
  SubDomainSettings: [
    {
      DomainPrefix: "shop",
      BranchName: "main"
    }
  ],
  AppId: "abcdefgh123456",
  DomainName: "myapp.com",
  EnableAutoSubDomain: true,
  AutoSubDomainIAMRole: "arn:aws:iam::123456789012:role/MyCustomRole"
});
```

## Multiple Subdomains Configuration

Manage multiple subdomains under a single Amplify Domain.

```ts
const multiSubdomainAmplifyDomain = await AWS.Amplify.Domain("multiSubDomainAmplifyDomain", {
  SubDomainSettings: [
    {
      DomainPrefix: "app",
      BranchName: "main"
    },
    {
      DomainPrefix: "admin",
      BranchName: "admin"
    }
  ],
  AppId: "abcdefgh123456",
  DomainName: "myapp.com"
});
```
