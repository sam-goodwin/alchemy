---
title: Managing AWS AppSync DomainNames with Alchemy
description: Learn how to create, update, and manage AWS AppSync DomainNames using Alchemy Cloud Control.
---

# DomainName

The DomainName resource lets you manage [AWS AppSync DomainNames](https://docs.aws.amazon.com/appsync/latest/userguide/) for your GraphQL APIs, enabling you to configure custom domains for your applications.

## Minimal Example

Create a basic AppSync DomainName with a description and a certificate ARN.

```ts
import AWS from "alchemy/aws/control";

const AppSyncDomain = await AWS.AppSync.DomainName("MyDomainName", {
  DomainName: "api.myapp.com",
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-90mn1234opqr",
  Description: "My custom AppSync domain name"
});
```

## Advanced Configuration

Configure a DomainName with tags for better resource management.

```ts
const TaggedAppSyncDomain = await AWS.AppSync.DomainName("TaggedDomainName", {
  DomainName: "api.taggedapp.com",
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-90mn1234opqr",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing AppSync DomainName by setting the `adopt` property to true.

```ts
const ExistingAppSyncDomain = await AWS.AppSync.DomainName("AdoptedDomainName", {
  DomainName: "api.existingapp.com",
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-90mn1234opqr",
  adopt: true
});
```

## Updating an Existing DomainName

Update the description of an existing DomainName.

```ts
const UpdatedAppSyncDomain = await AWS.AppSync.DomainName("UpdatedDomainName", {
  DomainName: "api.updatedapp.com",
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-90mn1234opqr",
  Description: "Updated description for the custom AppSync domain name"
});
```