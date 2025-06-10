---
title: DomainName
description: Learn how to create, update, and manage AWS AppSync DomainNames using Alchemy Cloud Control.
---


The DomainName resource lets you manage [AWS AppSync DomainNames](https://docs.aws.amazon.com/appsync/latest/userguide/) for your applications. This resource allows you to define a custom domain for your AppSync API, enabling better branding and easier access for clients.

## Minimal Example

Create a basic AppSync DomainName with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const domainName = await AWS.AppSync.DomainName("myDomainName", {
  DomainName: "api.myapp.com",
  CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Description: "My AppSync API custom domain"
});
```

## Advanced Configuration

Configure an AppSync DomainName with tags for better resource management and organization.

```ts
const taggedDomainName = await AWS.AppSync.DomainName("taggedDomainName", {
  DomainName: "api.myapp.com",
  CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing AppSync DomainName instead of failing when the resource already exists, you can set the `adopt` property to true.

```ts
const adoptExistingDomainName = await AWS.AppSync.DomainName("existingDomain", {
  DomainName: "api.myapp.com",
  CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  adopt: true
});
```
