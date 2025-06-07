---
title: Managing AWS Amplify Domains with Alchemy
description: Learn how to create, update, and manage AWS Amplify Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS Amplify Domains](https://docs.aws.amazon.com/amplify/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.Amplify.Domain("domain-example", {
  SubDomainSettings: [],
  AppId: "example-appid",
  DomainName: "domain-domain",
});
```

