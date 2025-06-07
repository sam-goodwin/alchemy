---
title: Managing AWS ApiGatewayV2 DomainNames with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 DomainNames using Alchemy Cloud Control.
---

# DomainName

The DomainName resource lets you create and manage [AWS ApiGatewayV2 DomainNames](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domainname = await AWS.ApiGatewayV2.DomainName("domainname-example", {
  DomainName: "domainname-domain",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a domainname with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomainName = await AWS.ApiGatewayV2.DomainName("advanced-domainname", {
  DomainName: "domainname-domain",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

