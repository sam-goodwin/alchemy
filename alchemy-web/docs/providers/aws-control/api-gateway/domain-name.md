---
title: Managing AWS ApiGateway DomainNames with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway DomainNames using Alchemy Cloud Control.
---

# DomainName

The DomainName resource lets you create and manage [AWS ApiGateway DomainNames](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-domainname.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domainname = await AWS.ApiGateway.DomainName("domainname-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a domainname with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomainName = await AWS.ApiGateway.DomainName("advanced-domainname", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

