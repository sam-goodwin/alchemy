---
title: Managing AWS AppSync DomainNameApiAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppSync DomainNameApiAssociations using Alchemy Cloud Control.
---

# DomainNameApiAssociation

The DomainNameApiAssociation resource lets you create and manage [AWS AppSync DomainNameApiAssociations](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-domainnameapiassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domainnameapiassociation = await AWS.AppSync.DomainNameApiAssociation(
  "domainnameapiassociation-example",
  { DomainName: "domainnameapiassociation-domain", ApiId: "example-apiid" }
);
```

