---
title: Managing AWS Route53Resolver ResolverEndpoints with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverEndpoints using Alchemy Cloud Control.
---

# ResolverEndpoint

The ResolverEndpoint resource lets you create and manage [AWS Route53Resolver ResolverEndpoints](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resolverendpoint = await AWS.Route53Resolver.ResolverEndpoint("resolverendpoint-example", {
  IpAddresses: [],
  Direction: "example-direction",
  SecurityGroupIds: ["example-securitygroupids-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a resolverendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResolverEndpoint = await AWS.Route53Resolver.ResolverEndpoint(
  "advanced-resolverendpoint",
  {
    IpAddresses: [],
    Direction: "example-direction",
    SecurityGroupIds: ["example-securitygroupids-1"],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

